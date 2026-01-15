import { SearchDrugType } from "@/hooks/store/useSearch";
import { getPostHogServer } from "@/lib/posthog-server";
import { db, drugsTable } from "@sudan-codex/db";
import { asc, like, sql } from "drizzle-orm";
import type { NextRequest } from "next/server";
import { literal } from "zod";

const searchSchema = literal([
  "brand_name",
  "generic_name",
  "agent_name",
  "company_name",
  "country_name",
]);
function escapeLike(str: string): string {
  return str.replace(/[%_\\]/g, "\\$&");
}
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const limit = Math.min(Number(searchParams.get("limit")) || 20, 50);

  const q = searchParams.get("q")?.toLowerCase() || "";

  const offset = (page - 1) * limit;
  const filterBy = searchParams.get("filterBy") || "";
  const columnMap: Record<SearchDrugType, (typeof drugsTable)[SearchDrugType]> =
    {
      brand_name: drugsTable.brand_name,
      generic_name: drugsTable.generic_name,
      agent_name: drugsTable.agent_name,
      company_name: drugsTable.company_name,
      country_name: drugsTable.country_name,
    };

  const column = searchSchema.safeParse(filterBy);

  const filterColumn = column.success
    ? columnMap[column.data]
    : columnMap.brand_name;

  try {
    const rows = await db
      .select()
      .from(drugsTable)
      .where(like(sql`lower(${filterColumn})`, `%${escapeLike(q)}%`))
      .orderBy(asc(filterColumn))
      .limit(limit)
      .offset(offset);

    const nextPage = rows.length === limit ? page + 1 : null;
    const res = {
      data: rows,
      nextPage,
    };

    return Response.json(res);
  } catch (error) {
    const posthog = getPostHogServer();

    const phCookie = req.cookies.get(
      "ph_" + process.env.NEXT_PUBLIC_POSTHOG_KEY + "_posthog"
    );
    let distinctId: string | null = null;
    try {
      distinctId = JSON.parse(phCookie?.value || "")?.distinct_id || "";

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      distinctId = null;
    }
    posthog.captureException(error, "get_drugs_api_error", {
      distinctId,
      path: "/api/v1/drugs",
      query: searchParams.toString(),
      column: column.data,
    });
    console.error(error);
    await posthog.shutdown();

    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

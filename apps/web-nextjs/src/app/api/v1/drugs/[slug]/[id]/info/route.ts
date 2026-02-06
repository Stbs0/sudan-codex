import { db, drugInfoTable } from "@sudan-codex/db";
import { eq } from "drizzle-orm";
import type { NextRequest } from "next/server";

import { getPostHogServer } from "@/lib/posthog-server";

export async function GET(
  req: NextRequest,
  ctx: RouteContext<"/api/v1/drugs/[slug]/[id]/info">
) {
  const { id } = await ctx.params;

  const drugId = parseInt(id, 10);

  if (isNaN(drugId)) {
    return Response.json({ error: "Invalid drug ID" }, { status: 400 });
  }

  try {
    const info = await db.query.drugInfoTable.findFirst({
      where: eq(drugInfoTable.drug_id, drugId),
    });

    if (!info) {
      return Response.json(
        { error: "Drug information not found" },
        { status: 404 }
      );
    }

    return Response.json(info);
  } catch (error) {
    const posthog = getPostHogServer();
    const phCookie = req.cookies.get(
      "ph_" + process.env.NEXT_PUBLIC_POSTHOG_KEY + "_posthog"
    );
    let distinctId: string | null = null;
    try {
      distinctId = JSON.parse(phCookie?.value || "")?.distinct_id || "";
    } catch (_) {
      distinctId = null;
    }

    console.error(`Error fetching drug info for ID ${drugId}:`, error);

    posthog.captureException(error, "get_drug_info_api_error", {
      distinctId,
      drugId,
      path: `/api/v1/drug-info/${id}`,
    });
    await posthog.shutdown();

    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

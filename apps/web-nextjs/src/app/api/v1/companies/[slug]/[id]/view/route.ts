import { companyStatsTable, db } from "@sudan-codex/db";
import { eq, sql } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  ctx: RouteContext<"/api/v1/companies/[slug]/[id]/view">
) {
  const { slug, id } = await ctx.params;
  if (!slug) {
    return Response.json({ error: "No slug provided" }, { status: 400 });
  }
  if (!id) {
    return Response.json({ error: "No id provided" }, { status: 400 });
  }

  try {
    const newViewCount = await db
      .update(companyStatsTable)
      .set({ view_count: sql`${companyStatsTable.view_count} + 1` })
      .where(eq(companyStatsTable.company_id, Number(id)))
      .returning({ view_count: companyStatsTable.view_count });

    return Response.json(newViewCount[0]);
  } catch (error) {
    console.error(`Error fetching company details for slug "${slug}":`, error);
    return Response.json(
      { error: "Failed to fetch company details" },
      { status: 500 }
    );
  }
}

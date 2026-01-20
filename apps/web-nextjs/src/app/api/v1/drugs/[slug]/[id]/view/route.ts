import { db, drugStatsTable } from "@sudan-codex/db";
import { eq, sql } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  ctx: RouteContext<"/api/v1/drugs/[slug]/[id]/view">
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
      .update(drugStatsTable)
      .set({ view_count: sql`${drugStatsTable.view_count} + 1` })
      .where(eq(drugStatsTable.drug_id, Number(id)))
      .returning({ view_count: drugStatsTable.view_count });

    return Response.json(newViewCount[0]);
  } catch (error) {
    console.error(`Error fetching agent details for slug "${slug}":`, error);
    return Response.json(
      { error: "Failed to fetch agent details" },
      { status: 500 }
    );
  }
}

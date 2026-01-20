import { db, genericStatsTable } from "@sudan-codex/db";
import { eq, sql } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  ctx: RouteContext<"/api/v1/generics/[slug]/[id]/view">
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
      .update(genericStatsTable)
      .set({ view_count: sql`${genericStatsTable.view_count} + 1` })
      .where(eq(genericStatsTable.generic_id, Number(id)))
      .returning({ view_count: genericStatsTable.view_count });

    return Response.json(newViewCount[0]);
  } catch (error) {
    console.error(`Error fetching generic details for slug "${slug}":`, error);
    return Response.json(
      { error: "Failed to fetch generic details" },
      { status: 500 }
    );
  }
}

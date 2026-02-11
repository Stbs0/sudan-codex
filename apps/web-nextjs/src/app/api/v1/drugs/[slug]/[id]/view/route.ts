import { updateViewCount } from "@sudan-codex/db";
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
    const result = await updateViewCount("drugs", Number(id));
    return Response.json(result);
  } catch (error) {
    console.error(`Error updating view count for drug slug "${slug}":`, error);
    return Response.json(
      { error: "Failed to update view count" },
      { status: 500 }
    );
  }
}

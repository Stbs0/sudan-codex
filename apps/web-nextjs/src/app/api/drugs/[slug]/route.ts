import { getDrugBySlug } from "@/services/server/getDrugs";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  ctx: RouteContext<"/api/drugs/[slug]">
) {
  const { slug } = await ctx.params;
  if (!slug) {
    return Response.json({ error: "No slug provided" }, { status: 400 });
  }

  const drug = await getDrugBySlug(slug);

  if (!drug) {
    return Response.json({ error: "Drug not found" }, { status: 404 });
  }
  return Response.json(drug);
}

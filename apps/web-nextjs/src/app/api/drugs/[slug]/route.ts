import { getDrugBySlug } from "@/services/server/getDrugs";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  ctx: RouteContext<"/api/drugs/[slug]">
) {
  const { slug } = await ctx.params;
  if (!slug)
    return Response.json({ error: "No slug provided" }, { status: 400 });
  const products = await getDrugBySlug(slug);
  return Response.json(products);
}

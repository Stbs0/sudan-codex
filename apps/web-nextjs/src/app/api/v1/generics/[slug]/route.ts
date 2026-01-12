import { db, drugsTable, genericsTable } from "@sudan-codex/db";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  ctx: RouteContext<"/api/v1/generics/[slug]">
) {
  const { slug } = await ctx.params;
  if (!slug) {
    return Response.json({ error: "No slug provided" }, { status: 400 });
  }

  const generic = await db.query.genericsTable.findFirst({
    where: eq(genericsTable.slug, slug),
    with: {
      stats: {
        columns: {
          total_brands: true,
          related_agents: true,
          related_companies: true,
        },
      },
    },
  });

  if (!generic)
    return Response.json({ error: "Generic not found" }, { status: 404 });
  const drugsWithAll = await db.query.drugsTable.findMany({
    where: eq(drugsTable.generic_id, generic.id),
    columns: {
      brand_name: true,
      pack_size: true,
      slug: true,
      company_name: true,
      agent_name: true,
      strength: true,
    },
    with: {
      agent: {
        columns: {
          slug: true,
        },
      },
      company: {
        columns: {
          slug: true,
        },
      },
    },
  });

  return Response.json({
    stats: {
      total_brands: generic.stats.total_brands,
      related_agents: generic.stats.related_agents,
      related_companies: generic.stats.related_companies,
    },
    drugs: drugsWithAll,
    name: generic.name,
  });
}

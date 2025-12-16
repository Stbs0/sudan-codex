import db from "@/db";
import { agentsTable, drugsTable } from "@/db/schemas/schema";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  ctx: RouteContext<"/api/agents/[slug]">,
) {
  const { slug } = await ctx.params;
  if (!slug) {
    return Response.json({ error: "No slug provided" }, { status: 400 });
  }

  const agent = await db.query.agentsTable.findFirst({
    where: eq(agentsTable.slug, slug),
    with: {
      stats: true,
    },
  });

  if (!agent)
    return Response.json({ error: "Drug not found" }, { status: 404 });
  const drugsWithAll = await db.query.drugsTable.findMany({
    where: eq(drugsTable.agent_id, agent.id),
    columns: {
      brand_name: true,
      pack_size: true,
      slug: true,
      company_name: true,
      generic_name: true,
      strength: true,
    },
    with: {
      generic: {
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
  const res = {
    stats: {
      total_brands: agent.stats.total_brands,
      related_generics: agent.stats.related_generics,
      related_companies: agent.stats.related_companies,
    },
    drugs: drugsWithAll,
    name: agent.name,
  };
  return Response.json(res);
}

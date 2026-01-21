import { agentsTable, db, drugsTable } from "@sudan-codex/db";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  ctx: RouteContext<"/api/v1/agents/[slug]">
) {
  // TODO: add error handling
  const { slug } = await ctx.params;
  if (!slug) {
    return Response.json({ error: "No slug provided" }, { status: 400 });
  }

  try {
    const agent = await db.query.agentsTable.findFirst({
      where: eq(agentsTable.slug, slug),
      with: {
        stats: {
          columns: {
            total_brands: true,
            related_generics: true,
            related_companies: true,
          },
        },
      },
    });

    if (!agent)
      return Response.json({ error: "Agent not found" }, { status: 404 });
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
      drugs: drugsWithAll,
      agent,
    };
    return Response.json(res);
  } catch (error) {
    console.error(`Error fetching agent details for slug "${slug}":`, error);
    return Response.json(
      { error: "Failed to fetch agent details" },
      { status: 500 }
    );
  }
}

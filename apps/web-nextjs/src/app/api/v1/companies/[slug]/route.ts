import { companiesTable, db, drugsTable } from "@sudan-codex/db";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  ctx: RouteContext<"/api/v1/companies/[slug]">
) {
  // TODO: Add error handiling
  const { slug } = await ctx.params;
  if (!slug) {
    return Response.json({ error: "No slug provided" }, { status: 400 });
  }

  try {
    const company = await db.query.companiesTable.findFirst({
      where: eq(companiesTable.slug, slug),
      with: {
        stats: {
          columns: {
            total_brands: true,
            related_agents: true,
            related_generics: true,
          },
        },
      },
    });

    if (!company)
      return Response.json({ error: "Company not found" }, { status: 404 });
    const drugsWithAll = await db.query.drugsTable.findMany({
      where: eq(drugsTable.company_id, company.id),
      columns: {
        brand_name: true,
        pack_size: true,
        slug: true,
        agent_name: true,
        generic_name: true,
        strength: true,
      },
      with: {
        generic: {
          columns: {
            slug: true,
          },
        },
        agent: {
          columns: {
            slug: true,
          },
        },
      },
    });
    const res = {
      stats: {
        total_brands: company.stats?.total_brands ?? 0,
        related_generics: company.stats?.related_generics ?? 0,
        related_agents: company.stats?.related_agents ?? 0,
      },
      drugs: drugsWithAll,
      name: company.name,
    };
    return Response.json(res);
  } catch (error) {
    console.error(`Error fetching company details for slug "${slug}":`, error);
    return Response.json(
      { error: "Failed to fetch company details" },
      { status: 500 }
    );
  }
}

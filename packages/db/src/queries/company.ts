import { eq } from "drizzle-orm";
import { cache } from "react";

import { db } from "../db";
import { companiesTable } from "../schemas/companySchema";
import { drugsTable } from "../schemas/drugsSchema";

export const getAllCompanies = cache(
  async () =>
    await db.select({ slug: companiesTable.slug }).from(companiesTable)
);

export const getCompanyBySlug = cache(
  async (slug: string) =>
    await db.query.companiesTable.findFirst({
      where: eq(companiesTable.slug, slug),
    })
);
export type GetCompanyBySlugWithStatsReturnType = Awaited<
  ReturnType<typeof getCompanyBySlugWithStats>
>;
export const getCompanyBySlugWithStats = cache(
  async (slug: string) =>
    await db.query.companiesTable.findFirst({
      where: eq(companiesTable.slug, slug),
      with: {
        stats: true,
      },
    })
);
export const getAllDrugsRelatedToCompanyWithGenericAndAgents = cache(
  async (companyId: number) =>
    await db.query.drugsTable.findMany({
      where: eq(drugsTable.company_id, companyId),
      with: {
        generic: {
          columns: {
            name: true,
            slug: true,
          },
        },
        agent: {
          columns: {
            name: true,
            slug: true,
          },
        },
      },
    })
);

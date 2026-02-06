import { eq, not } from "drizzle-orm";
import { cache } from "react";

import { db } from "../db";
import { drugsTable } from "../schemas/drugsSchema";
import { genericsTable } from "../schemas/genericSchema";

export type GetGenericBySlugWithStatsReturnType = Awaited<
  ReturnType<typeof getGenericBySlugWithStats>
>;
export const getGenericBySlugWithStats = cache(
  async (slug: string) =>
    await db.query.genericsTable.findFirst({
      where: eq(genericsTable.slug, slug),
      with: {
        stats: true,
      },
    })
);

export const getAllGenericSlugs = cache(
  async () =>
    await db
      .select({ slug: genericsTable.slug })
      .from(genericsTable)
      .where(not(eq(genericsTable.slug, "")))
);

export const getAllDrugsRelatedToGenericWithAgentsAndCompanies = cache(
  async (genericId: number) =>
    await db.query.drugsTable.findMany({
      where: eq(drugsTable.generic_id, genericId),

      with: {
        company: {
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

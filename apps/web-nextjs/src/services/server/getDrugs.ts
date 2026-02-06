"use server";
import "server-only";

import { db, drugsTable } from "@sudan-codex/db";
import { eq } from "drizzle-orm";
import { cache } from "react";

export type GetDrugBySlugReturnType = NonNullable<
  Awaited<ReturnType<typeof getDrugBySlug>>
>;

export const getDrugBySlug = cache(async (slug: string) => {
  try {
    return await db.query.drugsTable.findFirst({
      columns: {
        agent_id: false,
        company_id: false,
        generic_id: false,
        country_id: false,
      },
      where: eq(drugsTable.slug, slug),
      with: {
        agent: {
          columns: { slug: true, name: true },
        },
        company: {
          columns: { slug: true, name: true },
        },
        generic: {
          columns: { slug: true, name: true },
        },
      },
    });
  } catch (error) {
    console.error(`Error fetching drug by slug "${slug}":`, error);
    return null;
  }
});

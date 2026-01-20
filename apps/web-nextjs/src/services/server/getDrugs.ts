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
      where: eq(drugsTable.slug, slug),
      with: {
        agent: true,
        company: true,
        generic: true,
        stats: { columns: { view_count: true } },
      },
    });
  } catch (error) {
    console.error(`Error fetching drug by slug "${slug}":`, error);
    return null;
  }
});

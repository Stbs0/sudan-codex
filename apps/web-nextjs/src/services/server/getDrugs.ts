"use server";
import "server-only";

import { db, drugsTable } from "@sudan-codex/db";
import { eq } from "drizzle-orm";
import { cache } from "react";

export type GetDrugBySlugReturnType = NonNullable<
  Awaited<ReturnType<typeof getDrugBySlug>>
>;

export const getDrugBySlug = cache(async (slug: string) => {
  return await db.query.drugsTable.findFirst({
    where: eq(drugsTable.slug, slug),
    with: {
      agent: true,
      company: true,
      generic: true,
      stats: { columns: { view_count: true } },
    },
  });
});

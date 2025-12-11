"use server";
import "server-only";

import db from "@/db";
import { drugsTable } from "@/db/schemas/schema";
import { eq } from "drizzle-orm";
import { cache } from "react";

export type DrugWithRelations = NonNullable<
  Awaited<ReturnType<typeof getDrugBySlug>>
>;

export const getDrugBySlug = cache(async (slug: string) => {
  "use cache";
  return await db.query.drugsTable.findFirst({
    where: eq(drugsTable.slug, slug),
    with: {
      agent: true,
      company: true,
      generic: true,
    },
  });
});

"use server";
import "server-only";

import db from "@/db";
import { drugsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cache } from "react";

export type DrugWithRelations = NonNullable<
  Awaited<ReturnType<typeof getDrugBySlug>>
>;

export const getDrugBySlug = cache(
  async (slug: string) =>
    await db.query.drugsTable.findFirst({
      where: eq(drugsTable.slug, slug),
      with: {
        agent: true,
        company: true,
        generic: true,
      },
    })
);

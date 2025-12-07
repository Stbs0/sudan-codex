"use server";
import "server-only";

import db from "@/db";
import { eq } from "drizzle-orm";
import { cache } from "react";

export type DrugWithRelations = NonNullable<
  Awaited<ReturnType<typeof getDrugById>>
>;

export const getDrugById = cache(async (id: number) => {
  // You can even reuse the first function to keep caching efficient
  const data = await db.query.drugsTable.findFirst({
    where: (table) => eq(table.id, id),
    with: {
      agent: true,
      company: true,
      generic: true,
    },
  });

  if (!data) return null;
  return data;
});

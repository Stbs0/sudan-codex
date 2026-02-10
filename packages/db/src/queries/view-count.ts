import { eq, sql } from "drizzle-orm";

import { db } from "../db";
import { agentStatsTable } from "../schemas/agentsSchema";
import { companyStatsTable } from "../schemas/companySchema";
import { drugStatsTable } from "../schemas/drugsSchema";
import { genericStatsTable } from "../schemas/genericSchema";

export type EntityType = "agents" | "generics" | "companies" | "drugs";

export async function updateViewCount(entity: EntityType, id: number) {
  const tables = {
    agents: { table: agentStatsTable, column: agentStatsTable.agent_id },
    generics: {
      table: genericStatsTable,
      column: genericStatsTable.generic_id,
    },
    companies: {
      table: companyStatsTable,
      column: companyStatsTable.company_id,
    },
    drugs: { table: drugStatsTable, column: drugStatsTable.drug_id },
  };

  const { table, column } = tables[entity];

  const result = await db
    .update(table)
    .set({
      view_count: sql`${table.view_count} + 1`,
      updatedAt: new Date(),
    })
    .where(eq(column, id))
    .returning({ view_count: table.view_count });

  return result[0] || { view_count: 0 };
}

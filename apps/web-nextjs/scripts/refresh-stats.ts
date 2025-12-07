import { createClient } from "@libsql/client";
import { count, countDistinct, eq, isNotNull, isNull, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "../src/db/schema";

// Check for environment variables
if (!process.env.TURSO_DATABASE_URL) {
  throw new Error("Environment variable TURSO_DATABASE_URL is not set.");
}
if (!process.env.TURSO_AUTH_TOKEN) {
  throw new Error("Environment variable TURSO_AUTH_TOKEN is not set.");
}

// Setup Turso client
const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

// Pass schema to drizzle.
const db = drizzle(client, { schema });

/**
 * Refreshes the statistics tables (company_stats, agent_stats, generic_stats)
 * by clearing them and repopulating with aggregated data from the drugs table.
 */
async function refreshStats() {
  console.log("🔄 Starting to refresh statistics for Turso DB...");

  try {
    await db.transaction(async (tx) => {
      console.log("🗑️ Clearing old statistics...");
      await Promise.all([
        tx.delete(schema.companyStatsTable),
        tx.delete(schema.agentStatsTable),
        tx.delete(schema.genericStatsTable),
        tx.delete(schema.drugStatsTable),
      ]);
      console.log("✅ Old statistics cleared.");

      // --- Company Stats ---
      console.log("📊 Calculating and inserting company stats...");
      const companyStatsQuery = await tx
        .select({
          company_id: sql<number>`${schema.drugsTable.company_id}`,
          total_brands: count(schema.drugsTable.id),
          related_agents: countDistinct(schema.drugsTable.agent_id),
          related_generics: countDistinct(schema.drugsTable.generic_id),
        })
        .from(schema.drugsTable)
        .where(isNotNull(schema.drugsTable.company_id))
        .groupBy(schema.drugsTable.company_id);

      await tx.insert(schema.companyStatsTable).values(companyStatsQuery);
      console.log("✅ Company stats inserted.");

      // --- Agent Stats ---
      console.log("📊 Calculating and inserting agent stats...");
      const agentStatsQuery = await tx
        .select({
          agent_id: sql<number>`${schema.drugsTable.agent_id}`,
          total_brands: count(schema.drugsTable.id),
          related_companies: countDistinct(schema.drugsTable.company_id),
          related_generics: countDistinct(schema.drugsTable.generic_id),
        })
        .from(schema.drugsTable)
        .where(isNotNull(schema.drugsTable.agent_id))
        .groupBy(schema.drugsTable.agent_id);

      await tx.insert(schema.agentStatsTable).values(agentStatsQuery);
      console.log("✅ Agent stats inserted.");

      // --- Generic Stats ---
      console.log("📊 Calculating and inserting generic stats...");
      const genericStatsQuery = await tx
        .select({
          generic_id: sql<number>`${schema.drugsTable.generic_id}`,
          total_brands: count(schema.drugsTable.id),
          related_companies: countDistinct(schema.drugsTable.company_id),
          related_agents: countDistinct(schema.drugsTable.agent_id),
        })
        .from(schema.drugsTable)
        .where(isNotNull(schema.drugsTable.generic_id))
        .groupBy(schema.drugsTable.generic_id);

      await tx.insert(schema.genericStatsTable).values(genericStatsQuery);
      console.log("✅ Generic stats inserted.");

      // --- Drug Stats (Initialization) ---
      console.log("📊 Ensuring drug stats entries exist for all drugs...");

      const newDrugsQuery = await tx
        .select({
          drug_id: schema.drugsTable.id,
        })
        .from(schema.drugsTable)
        .leftJoin(
          schema.drugStatsTable,
          eq(schema.drugsTable.id, schema.drugStatsTable.drug_id)
        )
        .where(isNull(schema.drugStatsTable.drug_id));

      await tx.insert(schema.drugStatsTable).values(newDrugsQuery);

      console.log("✅ Drug stats entries verified.");
    });

    console.log("🎉 Statistics refreshed successfully!");
  } catch (error) {
    console.error("❌ An error occurred during statistics refresh:", error);
    throw error;
  }
}

// Main execution block
(async () => {
  try {
    await refreshStats();
    // The Turso client does not require explicit closing for a short-lived script.
    // The process will exit and connections will be terminated.
    process.exit(0);
  } catch (err) {
    // Error is already logged in refreshStats
    process.exit(1);
  }
})();

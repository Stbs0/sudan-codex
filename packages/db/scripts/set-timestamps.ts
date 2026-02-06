import path from "path";

import { createClient } from "@libsql/client";
import dotenv from "dotenv";

// Load environment variables from the web app's production env
dotenv.config({
  path: path.resolve(
    __dirname,
    "../../../apps/web-nextjs/.env.development.local"
  ),
});

const TURSO_URL = process.env.TURSO_DATABASE_URL;
const TURSO_TOKEN = process.env.TURSO_AUTH_TOKEN;

if (!TURSO_URL || !TURSO_TOKEN) {
  console.error(
    "Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN in environment"
  );
  process.exit(1);
}

// Tables that need timestamp updates
const TABLES_WITH_TIMESTAMPS = [
  "agents",
  "agent_stats",
  "companies",
  "company_stats",
  "generics",
  "generic_stats",
  "countries",
  "drugs",
  "drug_stats",
  "drugInfo",
];

async function setTimestamps() {
  console.log("Connecting to Turso...");
  const client = createClient({
    url: TURSO_URL as string,
    authToken: TURSO_TOKEN as string,
  });

  console.log("Setting createdAt and updatedAt to current timestamp...");

  for (const table of TABLES_WITH_TIMESTAMPS) {
    try {
      // Update all records where createdAt is NULL using SQLite's unixepoch
      const result = await client.execute(
        `UPDATE ${table} SET created_at = (cast(unixepoch('subsecond') * 1000 as integer)), updated_at = (cast(unixepoch('subsecond') * 1000 as integer)) WHERE created_at IS NULL`
      );

      console.log(`✓ Updated ${result.rowsAffected} rows in '${table}'`);
    } catch (error) {
      // Table might not exist or might not have these columns yet
      console.error(`✗ Error updating '${table}':`, (error as Error).message);
    }
  }

  console.log("\nTimestamp migration completed!");
}

setTimestamps().catch(console.error);

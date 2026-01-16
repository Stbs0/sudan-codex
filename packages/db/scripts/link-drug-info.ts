import { createClient } from "@libsql/client";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

// Load environment variables from the web app's production env
dotenv.config({
  path: path.resolve(
    __dirname,
    "../../../apps/web-nextjs/.env.production.local",
  ),
});

const TURSO_URL = process.env.TURSO_DATABASE_URL;
const TURSO_TOKEN = process.env.TURSO_AUTH_TOKEN;

if (!TURSO_URL || !TURSO_TOKEN) {
  console.error(
    "Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN in environment",
  );
  process.exit(1);
}

const JSON_PATH = path.resolve(__dirname, "../../megred.json");

async function link() {
  console.log("Connecting to Turso...");
  const client = createClient({
    url: TURSO_URL as string,
    authToken: TURSO_TOKEN as string,
  });

  console.log(`Reading mapping from ${JSON_PATH}...`);
  const data = JSON.parse(fs.readFileSync(JSON_PATH, "utf-8"));

  // Filter for valid mappings
  const mappings = data.filter((item: any) => item.no && item.drugInfoRef);
  console.log(`Found ${mappings.length} items with drugInfoRef.`);

  if (mappings.length === 0) {
    console.log("No valid mappings found. Exiting.");
    return;
  }

  // Batch update logic
  const BATCH_SIZE = 100;
  for (let i = 0; i < mappings.length; i += BATCH_SIZE) {
    const batch = mappings.slice(i, i + BATCH_SIZE);
    const statements = batch.map((item: any) => ({
      sql: `UPDATE drugs SET drug_info_id = ? WHERE id = ?`,
      args: [parseInt(item.drugInfoRef, 10), parseInt(item.no, 10)],
    }));

    try {
      await client.batch(statements, "write");
      console.log(
        `Updated batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(mappings.length / BATCH_SIZE)}`,
      );
    } catch (e) {
      console.error(`Error in batch starting at index ${i}:`, e);
      // Optionally continue or break
    }
  }

  console.log("Linking completed successfully!");
}

link().catch(console.error);

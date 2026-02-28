/**
 * Exports slug arrays from the local dev.db to JSON files consumed by
 * generateStaticParams in the web app. Run this whenever the DB content changes.
 *
 * Usage: bun run db:export-slugs   (from packages/db)
 */
import fs from "fs";
import path from "path";

import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import * as agentsSchema from "../src/schemas/agentsSchema";
import * as companySchema from "../src/schemas/companySchema";
import * as drugsSchema from "../src/schemas/drugsSchema";
import * as genericSchema from "../src/schemas/genericSchema";

const DB_PATH = path.resolve(__dirname, "../src/dev.db");
const OUT_DIR = path.resolve(__dirname, "../../../apps/web-nextjs/src/data");

async function exportSlugs() {
  console.log(`📂 Opening local DB: ${DB_PATH}`);

  const client = createClient({ url: `file:${DB_PATH}` });
  const db = drizzle({
    client,
    schema: {
      ...drugsSchema,
      ...agentsSchema,
      ...companySchema,
      ...genericSchema,
    },
  });

  // Ensure output directory exists
  fs.mkdirSync(OUT_DIR, { recursive: true });

  // --- Drugs ---
  console.log("Fetching drug slugs...");
  const drugs = await db.query.drugsTable.findMany({
    columns: { slug: true },
  });
  const drugSlugs = drugs.map((d) => d.slug).filter(Boolean);
  write("drug-slugs.json", drugSlugs);

  // --- Agents ---
  console.log("Fetching agent slugs...");
  const agents = await db.query.agentsTable.findMany({
    columns: { slug: true },
  });
  const agentSlugs = agents.map((a) => a.slug).filter(Boolean);
  write("agent-slugs.json", agentSlugs);

  // --- Companies ---
  console.log("Fetching company slugs...");
  const companies = await db.query.companiesTable.findMany({
    columns: { slug: true },
  });
  const companySlugs = companies.map((c) => c.slug).filter(Boolean);
  write("company-slugs.json", companySlugs);

  // --- Generics ---
  console.log("Fetching generic slugs...");
  const generics = await db.query.genericsTable.findMany({
    columns: { slug: true },
  });
  const genericSlugs = generics.map((g) => g.slug).filter(Boolean);
  write("generic-slugs.json", genericSlugs);

  console.log("\n✅ Done!");
  console.log(`  drugs:     ${drugSlugs.length}`);
  console.log(`  agents:    ${agentSlugs.length}`);
  console.log(`  companies: ${companySlugs.length}`);
  console.log(`  generics:  ${genericSlugs.length}`);

  client.close();
}

function write(filename: string, data: unknown[]) {
  const dest = path.join(OUT_DIR, filename);
  fs.writeFileSync(dest, JSON.stringify(data, null, 2));
  console.log(`  → wrote ${data.length} entries to ${dest}`);
}

exportSlugs().catch((err) => {
  console.error("Export failed:", err);
  process.exit(1);
});

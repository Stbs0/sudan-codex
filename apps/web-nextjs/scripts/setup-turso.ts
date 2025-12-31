import { config } from "dotenv";
import { drizzle, type LibSQLDatabase } from "drizzle-orm/libsql";
config({
  path: path.join(
    process.cwd(),
    process.env.NODE_ENV === "production"
      ? ".env.production.local"
      : ".env.development.local"
  ),
});

import * as schema from "@sudan-codex/db";
import fs from "fs/promises";
import path from "path";
import z from "zod";

// Replace with your Turso database URL and Auth Token
// It's recommended to use environment variables for this
const tursoConfig = {
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
};

const DATA_FILE_PATH = path.join(process.cwd(), "public/data/newForm.json");

// --- Slugify Helper ---
function slugify(text: string): string {
  if (!text) return "";
  // This is a simplified version that should be safe.
  // The original zod slugify might have specific behavior you rely on.
  return z.string().slugify().parse(text);
}

// --- Main Setup Function ---
async function setupDatabase() {
  if (!tursoConfig.url || !tursoConfig.authToken) {
    console.error(
      "🔥 Turso configuration is missing. Please set TURSO_DATABASE_URL and TURSO_AUTH_TOKEN environment variables."
    );
    process.exit(1);
  }

  const db = drizzle({
    schema,
    connection: tursoConfig,
  });
  console.log("✅ Connected to Turso client.");
  try {
    const drugData = await loadDrugData();
    await seedData(db, drugData);
    console.log("\n🎉 Database seeding complete!");
  } catch (error) {
    console.error("❌ An error occurred during database setup:", error);
    process.exit(1);
  } finally {
    console.log("🔌 Connection to Turso closed.");
  }
}

// --- Table Creation ---
// Schema is managed by drizzle-kit. Use `npx drizzle-kit push:sqlite` to apply schema changes.

// --- Data Loading ---
async function loadDrugData(): Promise<Drug[]> {
  console.log(`\n📦 Loading data from ${DATA_FILE_PATH}...`);
  const fileContent = await fs.readFile(DATA_FILE_PATH, "utf-8");
  const data = JSON.parse(fileContent);
  console.log(`✅ Found ${data.length} drug records.`);
  return data;
}

type Drug = {
  id: number;
  brand_name: string;
  slug: string;
  dosage_form: string;
  strength: string;
  company_name: string;
  agent_name: string;
  generic_name: string;
  country_name: string;
};

// --- Data Seeding ---
async function seedData(
  db: LibSQLDatabase<typeof schema>,
  data: Drug[]
): Promise<void> {
  console.log("\n🌱 Starting data seeding...");
  // 1. Extract unique entities for helper tables
  const countries = [
    ...new Set(data.map((d) => d.country_name).filter(Boolean)),
  ].map((name) => ({ name }));
  const companies = [
    ...new Map<string, { name: string; slug: string }>(
      // @ts-expect-error ignore
      data
        .map((d) => [
          d.company_name,
          { name: d.company_name, slug: slugify(d.company_name) },
        ])
        .filter((d) => d[0])
    ).values(),
  ];
  const agents = [
    ...new Map<string, { name: string; slug: string }>(
      // @ts-expect-error ignore
      data
        .map((d) => [
          d.agent_name,
          { name: d.agent_name, slug: slugify(d.agent_name) },
        ])
        .filter((d) => d[0])
    ).values(),
  ];
  const generics = [
    ...new Map<string, { name: string; slug: string }>(
      // @ts-expect-error ignore
      data
        .map((d) => [
          d.generic_name,
          { name: d.generic_name, slug: slugify(d.generic_name) },
        ])
        .filter((d) => d[0])
    ).values(),
  ];

  try {
    await db.transaction(async (tx) => {
      // 2. Seed helper tables
      if (countries.length > 0) {
        await tx
          .insert(schema.countriesTable)
          .values(countries)
          .onConflictDoNothing();
      }
      console.log(`   -> Seeded ${countries.length} countries.`);

      if (companies.length > 0) {
        await tx
          .insert(schema.companiesTable)
          .values(companies)
          .onConflictDoNothing();
      }
      console.log(`   -> Seeded ${companies.length} companies.`);

      if (agents.length > 0) {
        await tx
          .insert(schema.agentsTable)
          .values(agents)
          .onConflictDoNothing();
      }
      console.log(`   -> Seeded ${agents.length} agents.`);

      if (generics.length > 0) {
        await tx
          .insert(schema.genericsTable)
          .values(generics)
          .onConflictDoNothing();
      }
      console.log(`   -> Seeded ${generics.length} generics.`);

      // 3. Prepare drug data for insertion by mapping names to IDs
      const allCountries = await tx
        .select({
          id: schema.countriesTable.id,
          name: schema.countriesTable.name,
        })
        .from(schema.countriesTable);
      const countryMap = new Map(allCountries.map((c) => [c.name, c.id]));

      const allCompanies = await tx
        .select({
          id: schema.companiesTable.id,
          name: schema.companiesTable.name,
        })
        .from(schema.companiesTable);
      const companyMap = new Map(allCompanies.map((c) => [c.name, c.id]));

      const allAgents = await tx
        .select({ id: schema.agentsTable.id, name: schema.agentsTable.name })
        .from(schema.agentsTable);
      const agentMap = new Map(allAgents.map((a) => [a.name, a.id]));

      const allGenerics = await tx
        .select({
          id: schema.genericsTable.id,
          name: schema.genericsTable.name,
        })
        .from(schema.genericsTable);
      const genericMap = new Map(allGenerics.map((g) => [g.name, g.id]));

      const drugsToInsert = data
        .map((drug) => ({
          ...drug,
          company_id: drug.company_name
            ? companyMap.get(drug.company_name)
            : undefined,
          agent_id: drug.agent_name ? agentMap.get(drug.agent_name) : undefined,
          generic_id: drug.generic_name
            ? genericMap.get(drug.generic_name)
            : undefined,
          country_id: drug.country_name
            ? countryMap.get(drug.country_name)
            : undefined,
        }))
        .filter((d) => Boolean(d.brand_name && d.slug));

      // 4. Seed drugs table
      console.log(
        `   -> Seeding ${drugsToInsert.length} drugs (this may take a moment)...`
      );

      if (drugsToInsert.length > 0) {
        const chunkSize = 100; // Chunking to avoid query size limits
        for (let i = 0; i < drugsToInsert.length; i += chunkSize) {
          const chunk = drugsToInsert.slice(i, i + chunkSize);
          await tx
            .insert(schema.drugsTable)
            .values(chunk)
            .onConflictDoNothing();
        }
      }
      console.log("✅ All data inserted successfully.");
    });
  } catch (err) {
    console.error("🔥 Transaction failed.", err);
    throw err; // Re-throw to be caught by the main try/catch
  }
}

// --- Execute Script ---
setupDatabase();

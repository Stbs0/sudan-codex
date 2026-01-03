import { createClient } from "@libsql/client";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config({ path: ".env.local" });

const client = createClient({
  url: process.env.TURSO_DATABASE_URL || "",
  authToken: process.env.TURSO_AUTH_TOKEN,
});

async function main() {
  const inputPath = path.join(process.cwd(), "public/data/newForm.json");
  const data = fs.readFileSync(inputPath, "utf8");
  const drugs = JSON.parse(data);

  try {
    // await client.execute(`
    //   CREATE TABLE IF NOT EXISTS drugs (
    //     no TEXT PRIMARY KEY,
    //     brandName TEXT,
    //     genericName TEXT,
    //     dosageFormName TEXT,
    //     strength TEXT,
    //     packSize TEXT,
    //     companyName TEXT,
    //     countryOfOrigin TEXT,
    //     agentName TEXT,
    //     genericNameSlug TEXT,
    //     companyNameSlug TEXT,
    //     agentNameSlug TEXT,
    //     countryOfOriginSlug TEXT
    //   )
    // `);
    // console.log('"drugs" table created or already exists.');

    // await client.execute(
    //   "CREATE INDEX IF NOT EXISTS idx_brandName ON drugs(brandName);"
    // );
    // await client.execute(
    //   "CREATE INDEX IF NOT EXISTS idx_genericName ON drugs(genericName);"
    // );
    // await client.execute(
    //   "CREATE INDEX IF NOT EXISTS idx_companyName ON drugs(companyName);"
    // );
    // await client.execute(
    //   "CREATE INDEX IF NOT EXISTS idx_agentName ON drugs(agentName);"
    // );
    // await client.execute(
    //   "CREATE INDEX IF NOT EXISTS idx_countryOfOrigin ON drugs(countryOfOrigin);"
    // );
    console.log('Indexes created for "drugs".');
    await client.execute("DROP TABLE IF EXISTS drugs_fts;");
    await client.execute(`
      CREATE VIRTUAL TABLE IF NOT EXISTS drugs_fts USING fts5(
        brandName,
        genericName,
        companyName,
        agentName,
        countryOfOrigin,
        tokenize = 'porter unicode61'
      );
    `);
    console.log('FTS virtual table "drugs_fts" created.');

    // // Clear the tables before inserting new data
    // await client.execute("DELETE FROM drugs");
    // console.log('Cleared all records from the "drugs" table.');
    await client.execute("DELETE FROM drugs_fts");
    console.log('Cleared all records from the "drugs_fts" table.');

    const batchSize = 100;
    // for (let i = 0; i < drugs.length; i += batchSize) {
    //   const batch = drugs.slice(i, i + batchSize);
    //   const statements = batch.map((drug) => ({
    //     sql: "INSERT INTO drugs (no, brandName, genericName, dosageFormName, strength, packSize, companyName, countryOfOrigin, agentName, genericNameSlug, companyNameSlug, agentNameSlug, countryOfOriginSlug) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    //     args: [
    //       drug.no,
    //       drug.brandName,
    //       drug.genericName,
    //       drug.dosageFormName,
    //       drug.strength,
    //       drug.packSize,
    //       drug.companyName,
    //       drug.countryOfOrigin,
    //       drug.agentName,
    //       drug.genericNameSlug,
    //       drug.companyNameSlug,
    //       drug.agentNameSlug,
    //       drug.countryOfOriginSlug,
    //     ],
    //   }));
    //   await client.batch(statements);
    //   console.log(`Batch ${i / batchSize + 1} uploaded.`);
    // }

    console.log("Successfully uploaded all drug data to Turso DB.");

    await client.execute(`
        INSERT INTO drugs_fts (brandName, genericName, companyName, agentName, countryOfOrigin)
        SELECT brandName, genericName, companyName, agentName, countryOfOrigin FROM drugs;
    `);
    console.log('Successfully populated FTS table "drugs_fts".');
  } catch (e) {
    console.error("Failed to upload data to Turso DB:");
    console.error(e);
  }
}

main();

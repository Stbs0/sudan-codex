import { createClient } from "@libsql/client";
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
  url: process.env.TURSO_DATABASE_URL || "",
  authToken: process.env.TURSO_AUTH_TOKEN,
});

async function main() {
  const inputPath = path.join(process.cwd(), 'public/data/drugDataWithSlugs.json');
  const data = fs.readFileSync(inputPath, 'utf8');
  const drugs = JSON.parse(data);

  try {
    await client.execute(`
      CREATE TABLE IF NOT EXISTS drugs_with_slug (
        no TEXT PRIMARY KEY,
        brandName TEXT,
        genericName TEXT,
        dosageFormName TEXT,
        strength TEXT,
        packSize TEXT,
        companyName TEXT,
        countryOfOrigin TEXT,
        agentName TEXT,
        genericNameSlug TEXT,
        companyNameSlug TEXT,
        agentNameSlug TEXT,
        countryOfOriginSlug TEXT
      )
    `);
    console.log('"drugs_with_slug" table created or already exists.');

    await client.execute('CREATE INDEX IF NOT EXISTS idx_brandName ON drugs_with_slug(brandName);');
    await client.execute('CREATE INDEX IF NOT EXISTS idx_genericName ON drugs_with_slug(genericName);');
    await client.execute('CREATE INDEX IF NOT EXISTS idx_companyName ON drugs_with_slug(companyName);');
    await client.execute('CREATE INDEX IF NOT EXISTS idx_agentName ON drugs_with_slug(agentName);');
    await client.execute('CREATE INDEX IF NOT EXISTS idx_countryOfOrigin ON drugs_with_slug(countryOfOrigin);');
    console.log('Indexes created for "drugs_with_slug".');

    await client.execute(`
      CREATE VIRTUAL TABLE IF NOT EXISTS drugs_fts USING fts5(
        no,
        brandName,
        genericName,
        companyName,
        agentName,
        countryOfOrigin,
        tokenize = 'porter unicode61'
      );
    `);
    console.log('FTS virtual table "drugs_fts" created.');

    // Clear the tables before inserting new data
    await client.execute('DELETE FROM drugs_with_slug');
    console.log('Cleared all records from the "drugs_with_slug" table.');
    await client.execute('DELETE FROM drugs_fts');
    console.log('Cleared all records from the "drugs_fts" table.');

    const batchSize = 100;
    for (let i = 0; i < drugs.length; i += batchSize) {
      const batch = drugs.slice(i, i + batchSize);
      const statements = batch.map(drug => ({
        sql: "INSERT INTO drugs_with_slug (no, brandName, genericName, dosageFormName, strength, packSize, companyName, countryOfOrigin, agentName, genericNameSlug, companyNameSlug, agentNameSlug, countryOfOriginSlug) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        args: [
          drug.no,
          drug.brandName,
          drug.genericName,
          drug.dosageFormName,
          drug.strength,
          drug.packSize,
          drug.companyName,
          drug.countryOfOrigin,
          drug.agentName,
          drug.genericNameSlug,
          drug.companyNameSlug,
          drug.agentNameSlug,
          drug.countryOfOriginSlug
        ]
      }));
      await client.batch(statements);
      console.log(`Batch ${i / batchSize + 1} uploaded.`);
    }

    console.log('Successfully uploaded all drug data to Turso DB.');

    await client.execute(`
        INSERT INTO drugs_fts (no, brandName, genericName, companyName, agentName, countryOfOrigin)
        SELECT no, brandName, genericName, companyName, agentName, countryOfOrigin FROM drugs_with_slug;
    `);
    console.log('Successfully populated FTS table "drugs_fts".');

  } catch (e) {
    console.error('Failed to upload data to Turso DB:');
    console.error(e);
  }
}

main();

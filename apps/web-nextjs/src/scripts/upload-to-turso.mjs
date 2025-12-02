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
      CREATE TABLE IF NOT EXISTS drugs (
        no TEXT,
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
    console.log('"drugs" table created or already exists.');

    // Clear the table before inserting new data
    await client.execute('DELETE FROM drugs');
    console.log('Cleared all records from the "drugs" table.');

    const batchSize = 100;
    for (let i = 0; i < drugs.length; i += batchSize) {
      const batch = drugs.slice(i, i + batchSize);
      const statements = batch.map(drug => ({
        sql: "INSERT INTO drugs (no, brandName, genericName, dosageFormName, strength, packSize, companyName, countryOfOrigin, agentName, genericNameSlug, companyNameSlug, agentNameSlug, countryOfOriginSlug) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
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
  } catch (e) {
    console.error('Failed to upload data to Turso DB:');
    console.error(e);
  }
}

main();

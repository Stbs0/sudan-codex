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
    console.log('Dropping existing tables if they exist...');
    await client.execute('DROP TABLE IF EXISTS drugs');
    await client.execute('DROP TABLE IF EXISTS drugs_fts');

    console.log('Creating "drugs" table with PRIMARY KEY on "no"...');
    await client.execute(`
      CREATE TABLE drugs (
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
    console.log('"drugs" table created successfully.');

    console.log('Creating FTS table "drugs_fts"...');
    await client.execute(`
      CREATE VIRTUAL TABLE drugs_fts USING fts5(
        brandName,
        genericName,
        companyName,
        agentName,
        content='drugs',
        content_rowid='no'
      )
    `);
    console.log('"drugs_fts" table created successfully.');

    console.log('Populating the "drugs" table...');
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
      console.log(`Batch ${i / batchSize + 1} inserted into "drugs".`);
    }
    console.log('Successfully populated the "drugs" table.');
    
    console.log('Populating the FTS table...');
    await client.execute(`
      INSERT INTO drugs_fts(drugs_fts) VALUES('rebuild')
    `);
    console.log('Successfully populated the FTS table.');

    console.log('Database schema updated and data re-uploaded successfully.');

  } catch (e) {
    console.error('Failed to update schema and upload data:');
    console.error(e);
  }
}

main();

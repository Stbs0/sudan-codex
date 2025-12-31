import { client } from "../src/lib/tursoDB.js";

async function setupDatabase() {
  try {
    console.log("Starting database setup...");

    // Create a table for countries of origin
    await client.execute(`
      CREATE TABLE IF NOT EXISTS countries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE
      );
    `);
    console.log('Table "countries" created or already exists.');

    // Create a table for companies/manufacturers
    await client.execute(`
      CREATE TABLE IF NOT EXISTS companies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        slug TEXT NOT NULL UNIQUE
      );
    `);
    console.log('Table "companies" created or already exists.');

    // Create a table for agents
    await client.execute(`
      CREATE TABLE IF NOT EXISTS agents (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        slug TEXT NOT NULL UNIQUE
      );
    `);
    console.log('Table "agents" created or already exists.');

    // Create a table for generic names
    await client.execute(`
      CREATE TABLE IF NOT EXISTS generics (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        slug TEXT NOT NULL UNIQUE
      );
    `);
    console.log('Table "generics" created or already exists.');

    // Create the main drugs table with foreign keys
    await client.execute(`
      CREATE TABLE IF NOT EXISTS drugs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        brand_name TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        dosage_form TEXT,
        strength TEXT,
        company_id INTEGER,
        agent_id INTEGER,
        generic_id INTEGER,
        country_id INTEGER,
        FOREIGN KEY (company_id) REFERENCES companies(id),
        FOREIGN KEY (agent_id) REFERENCES agents(id),
        FOREIGN KEY (generic_id) REFERENCES generics(id),
        FOREIGN KEY (country_id) REFERENCES countries(id)
      );
    `);
    console.log('Table "drugs" created or already exists.');

    console.log("Database setup completed successfully!");
  } catch (error) {
    console.error("Error setting up the database:", error);
    process.exit(1);
  }
}

setupDatabase();

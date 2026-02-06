#!/usr/bin/env bun
/**
 * Company & Agent Info Scraper using Google Gemini API & LibSQL
 * Usage: bun scraper.js [limit] [output.json]
 * Requires TURSO_DATABASE_URL, TURSO_AUTH_TOKEN, and GEMINI_API_KEY in environment
 */

import { writeFileSync } from "fs";
import https from "https";

import { createClient } from "@libsql/client";

// Configuration
const LIMIT = process.env.SCRAPER_LIMIT || process.argv[2] || 2;
const OUTPUT_PATH = process.argv[3] || "enriched_entities.json";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const TURSO_URL = process.env.TURSO_DATABASE_URL;
const TURSO_TOKEN = process.env.TURSO_AUTH_TOKEN;

if (!GEMINI_API_KEY || !TURSO_URL || !TURSO_TOKEN) {
  console.error(
    "Missing required environment variables (GEMINI_API_KEY, TURSO_DATABASE_URL, TURSO_AUTH_TOKEN)"
  );
  process.exit(1);
}

class CompanyInfoScraper {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.results = [];
  }

  log(message, level = "INFO") {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`[${timestamp}] [${level}] ${message}`);
  }

  async callGemini(prompt, retryCount = 0) {
    return new Promise((resolve, reject) => {
      const data = JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 1024,
        },
      });

      const options = {
        hostname: "generativelanguage.googleapis.com",
        path: `/v1beta/models/gemini-2.5-flash:generateContent?key=${this.apiKey}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": data.length,
        },
      };

      const req = https.request(options, (res) => {
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", async () => {
          try {
            const response = JSON.parse(body);
            if (response.error) {
              if (response.error.code === 429 && retryCount < 3) {
                const wait = Math.pow(2, retryCount) * 10000;
                this.log(
                  `Rate limited. Retrying in ${wait / 1000}s...`,
                  "WARNING"
                );
                await new Promise((r) => setTimeout(r, wait));
                return resolve(await this.callGemini(prompt, retryCount + 1));
              }
              return reject(new Error(response.error.message));
            }
            if (
              response.candidates &&
              response.candidates[0]?.content?.parts?.[0]?.text
            ) {
              resolve(response.candidates[0].content.parts[0].text);
            } else {
              reject(new Error("No response from Gemini"));
            }
          } catch (error) {
            reject(new Error(`Failed to parse response: ${error.message}`));
          }
        });
      });

      req.on("error", (error) =>
        reject(new Error(`API request failed: ${error.message}`))
      );
      req.write(data);
      req.end();
    });
  }

  extractJSON(text) {
    try {
      const cleanText = text.replace(/```json|```/g, "").trim();
      return JSON.parse(cleanText);
    } catch (e) {
      return null;
    }
  }

  async scrapeEntity(entity) {
    const { id, name, type } = entity;
    this.log(`Scraping ${type}: ${name} (ID: ${id})`);

    try {
      const prompt = `Research the pharmaceutical ${type} named "${name}".
      Find their official website, description of their role in medicine, and key specializations.
      Return ONLY a JSON object with this format:
      {
        "id": ${id},
        "name": "${name}",
        "type": "${type}",
        "website": "URL",
        "description": "Comprehensive description",
        "specialties": "Key therapeutic areas or services",
        "headquarters": "City, Country"
      }
      If information is unavailable, use "Not found". Return ONLY the JSON.`;

      const result = await this.callGemini(prompt);
      const data = this.extractJSON(result);

      if (data) {
        this.log(`Successfully scraped ${name}`, "SUCCESS");
        return { ...data, status: "success" };
      }

      return {
        id,
        name,
        type,
        status: "failed",
        error: "Invalid JSON response",
      };
    } catch (error) {
      this.log(`Error processing ${name}: ${error.message}`, "ERROR");
      return { id, name, type, status: "error", error: error.message };
    }
  }

  async run() {
    this.log("Connecting to LibSQL...");
    const client = createClient({ url: TURSO_URL, authToken: TURSO_TOKEN });

    try {
      this.log(`Fetching up to ${LIMIT} unique companies and agents...`);
      const companies = await client.execute({
        sql: "SELECT id, name FROM companies LIMIT ?",
        args: [Math.ceil(LIMIT / 2)],
      });
      const agents = await client.execute({
        sql: "SELECT id, name FROM agents LIMIT ?",
        args: [Math.floor(LIMIT / 2)],
      });

      const entities = [
        ...companies.rows.map((r) => ({ ...r, type: "company" })),
        ...agents.rows.map((r) => ({ ...r, type: "agent" })),
      ];

      this.log(`Found ${entities.length} entities to process.`);

      for (const entity of entities) {
        const result = await this.scrapeEntity(entity);
        this.results.push(result);
        // Small delay to be polite
        await new Promise((r) => setTimeout(r, 10000));
      }

      this.saveResults();
    } catch (error) {
      this.log(`Critical Error: ${error.message}`, "ERROR");
    } finally {
      client.close();
    }
  }

  saveResults() {
    writeFileSync(OUTPUT_PATH, JSON.stringify(this.results, null, 2));
    this.log(`Results saved to ${OUTPUT_PATH}`, "SUCCESS");
  }
}

const scraper = new CompanyInfoScraper(GEMINI_API_KEY);
scraper.run().catch(console.error);

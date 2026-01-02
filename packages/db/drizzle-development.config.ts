import "dotenv/config";
import { defineConfig } from "drizzle-kit";

import dotenv from "dotenv";
import path from "path";
console.log(
  "path:",
  path.resolve(__dirname, `../../apps/web-nextjs/.env.development.local`),
);
dotenv.config({
  path: path.resolve(__dirname, `../../apps/web-nextjs/.env.development.local`),
});
if (!process.env.TURSO_DATABASE_URL) {
  throw new Error("TURSO_DATABASE_URL is not set");
}
if (!process.env.TURSO_AUTH_TOKEN) {
  throw new Error("TURSO_AUTH_TOKEN is not set");
}

export default defineConfig({
  out: "./drizzle",
  schema: "./src/schemas/*",
  dialect: "turso",
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
});

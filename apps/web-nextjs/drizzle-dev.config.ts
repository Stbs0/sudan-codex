import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.development.local" });
export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schemas/*",
  dialect: "turso",
  dbCredentials: {
    url: "http://127.0.0.1:8080",
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
});

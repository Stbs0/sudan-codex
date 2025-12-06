import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.dev.local" });
export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "turso",
  dbCredentials: {
    url: "http://127.0.0.1:8080",
  },
});

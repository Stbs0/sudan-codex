import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/schemas/schema.ts",
  out: "./drizzle",
  dialect: "sqlite",
  driver: "expo",migrations:{}
});

import { createClient } from "@libsql/client";

const isProd = process.env.NODE_ENV === "production";
if (isProd && !process.env.TURSO_DATABASE_URL) {
  throw new Error("TURSO_DATABASE_URL is not configured");
}
export const client = createClient({
  url: isProd
    ? (process.env.TURSO_DATABASE_URL as string)
    : "http://127.0.0.1:8080",
  authToken: isProd ? process.env.TURSO_AUTH_TOKEN : undefined,
});

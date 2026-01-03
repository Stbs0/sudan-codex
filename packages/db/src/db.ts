import { drizzle } from "drizzle-orm/libsql";
import * as authSchema from "./schemas/auth-schema";
import * as schema from "./schemas/schema";


// import dotenv from "dotenv";
// import path from "path";
// dotenv.config({
//   path: `../../apps/web-nextjs/.env.development.local`,
// });

if (!process.env.TURSO_DATABASE_URL || !process.env.TURSO_AUTH_TOKEN) {
  throw new Error(
    "Missing required database environment variables: TURSO_DATABASE_URL and TURSO_AUTH_TOKEN",
  );
}

export const db = drizzle({
  connection: {
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
  schema: { ...schema, ...authSchema },
});

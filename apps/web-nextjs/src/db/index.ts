import { drizzle } from "drizzle-orm/libsql";
import * as authSchema from "./schemas/auth-schema";
import * as schema from "./schemas/schema";

const db = drizzle({
  // process.env.NODE_ENV === "development"
  // "http://127.0.0.1:8080",
  connection: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
  schema: { ...schema, ...authSchema },
});

export default db;

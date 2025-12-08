import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schemas/schema";
import * as authSchema from "./schemas/auth-schema";

const db = drizzle({
  connection: {
    url:
      // process.env.NODE_ENV === "development"
      "http://127.0.0.1:8080",
    // : process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
  schema: { ...schema, ...authSchema },
});

export default db;

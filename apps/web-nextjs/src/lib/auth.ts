import db from "@/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { tellUsMoreSchema } from "./schemas";
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error(
    "Missing required Google OAuth environment variables: GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET"
  );
}
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    usePlural: true,
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      accessType: "offline",
      prompt: "select_account consent",
    },
  },
  databaseHooks: {
    user: {
      update: {
        before: async (user) => {
          const payload = tellUsMoreSchema.safeParse(user);
          return payload.success
            ? { data: { ...user, isProfileComplete: true } }
            : false;
        },
      },
    },
  },

  user: {
    additionalFields: {
      isProfileComplete: {
        type: "boolean",
        required: false,
        defaultValue: false,
        input: false,
      },
      age: {
        type: "number",
        required: false,
      },
      phoneNumber: {
        type: "string",
        required: false,
      },
      university: {
        type: "string",
        required: false,
      },
      occupation: {
        type: "string",
        required: false,
      },
    },
  },
});

import db from "@/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
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

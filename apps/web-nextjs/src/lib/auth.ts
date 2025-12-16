import db from "@/db";
import { expo } from "@better-auth/expo";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { tellUsMoreSchema } from "./schemas";

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error(
    "Missing required Google OAuth environment variables: GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET",
  );
}
export const auth = betterAuth({
  plugins: [expo()],
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  account: {
    skipStateCookieCheck: process.env.NODE_ENV === "development",
  },
  trustedOrigins: [
    process.env.NEXT_PUBLIC_EXPO_SCHEMA as string,
    process.env.NEXT_PUBLIC_SITE_URL as string,
    ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
    ...(process.env.NODE_ENV === "development"
      ? [
          "exp://*/*",
          "exp://10.0.0.*:*/*", // Trust 10.0.0.x IP range
          "exp://192.168.*.*:*/*", // Trust 192.168.x.x IP range
          "exp://172.*.*.*:*/*", // Trust 172.x.x.x IP range
          "exp://localhost:*/*", // Trust localhost
        ]
      : []),
  ].filter(Boolean),
  database: drizzleAdapter(db, {
    provider: "sqlite",
    usePlural: true,
  }),
  logger: {
    level: "debug",
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
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
    deleteUser: { enabled: true },
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

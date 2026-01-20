import { expo } from "@better-auth/expo";
import { db } from "@sudan-codex/db";
import { updateUser } from "@sudan-codex/types";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import z from "zod/v3";
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error(
    "Missing required Google OAuth environment variables: GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET"
  );
}
export const auth = betterAuth({
  plugins: [expo()],
  session: {
    cookieCache: {
      strategy: "jwt",
      enabled: true,
      maxAge: 5 * 60, // Cache for 5 hours
    },
  },

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
          "http://localhost:3000",
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
        before: async (user, ctx) => {
          const payload = updateUser.safeParse(ctx?.body);
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
        validator: {
          input: z.number().min(1).max(120),
        },
      },
      phoneNumber: {
        type: "string",
        required: false,
        validator: {
          input: z.string().min(1).max(18),
        },
      },
      university: {
        type: "string",
        required: false,
        validator: {
          input: z.string().min(3).max(255),
        },
      },
      occupation: {
        type: "string",
        required: false,
        validator: {
          input: z.string().min(3).max(255),
        },
      },
      specialty: {
        type: [
          "Pharmacist",
          "Doctor",
          "Nurse",
          "Allied health professionals",
          "Other",
        ],
        required: false,
        validator: {
          input: z.enum([
            "Pharmacist",
            "Doctor",
            "Nurse",
            "Allied health professionals",
            "Other",
          ]),
        },
      },
      workPlace: {
        type: "string",
        required: false,
        validator: {
          input: z.string().min(3).max(255),
        },
      },
    },
  },
});

import { expoClient } from "@better-auth/expo/client";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";
import z from "zod";
export const authClient = createAuthClient({
  baseURL: process.env.EXPO_PUBLIC_BACKEND_URI,
  disableDefaultFetchPlugins: true,
  plugins: [
    expoClient({
      scheme: Constants.expoConfig?.scheme as string,
      storagePrefix: "mobile-better-auth",
      storage: SecureStore,
    }),
    inferAdditionalFields({
      user: {
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
    }),
  ],
});
export type Session = typeof authClient.$Infer.Session;

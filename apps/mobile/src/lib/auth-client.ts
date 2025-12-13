import { expoClient } from "@better-auth/expo/client";
import { logger } from "@better-fetch/logger";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";

export const authClient = createAuthClient({
  baseURL: "http://10.0.2.2:3000",
  fetchOptions: { plugins: [logger()] },
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
    }),
  ],
});
export type Session = typeof authClient.$Infer.Session;

import { createFetch, createSchema } from "@better-fetch/fetch";
import {
  AgentApiResponseSchema,
  CompanyApiResponseSchema,
  DrugInfoSchema,
  DrugListApiResponseSchema,
  GenericApiResponseSchema,
  GetDrugApiResponseSchema,
} from "@sudan-codex/db/schema";
import Constants from "expo-constants";
import { Platform } from "react-native";
import { z } from "zod";
const APP_VERSION = Constants.expoConfig?.version ?? "dev";

const USER_AGENT = `SudanCodex/${APP_VERSION} (${Platform.OS})`;
// Constants
const BASE_URL = process.env.EXPO_PUBLIC_BACKEND_URI;

type Endpoints = Parameters<typeof createSchema>[0];
const agentsEndpoint = {
  "/api/v1/agents/:slug": {
    output: AgentApiResponseSchema,
    params: z.object({ slug: z.string() }),
  },
  "/api/v1/agents/:slug/:id/view": {
    output: z.object({ view_count: z.number() }),
    params: z.object({ slug: z.string(), id: z.string() }),
  },
} satisfies Endpoints;
const companiesEndpoint = {
  "/api/v1/companies/:slug": {
    output: CompanyApiResponseSchema,
    params: z.object({ slug: z.string() }),
  },
  "/api/v1/companies/:slug/:id/view": {
    output: z.object({ view_count: z.number() }),
    params: z.object({ slug: z.string(), id: z.string() }),
  },
} satisfies Endpoints;
const genericsEndpoint = {
  "/api/v1/generics/:slug": {
    output: GenericApiResponseSchema,
    params: z.object({ slug: z.string() }),
  },
  "/api/v1/generics/:slug/:id/view": {
    output: z.object({ view_count: z.number() }),
    params: z.object({ slug: z.string(), id: z.string() }),
  },
} satisfies Endpoints;
const drugEndpoint = {
  "/api/v1/drugs": {
    output: DrugListApiResponseSchema,
    query: z.object({
      page: z.number().optional(),
      q: z.string().optional(),
      filterBy: z
        .enum([
          "brand_name",
          "company_name",
          "agent_name",
          "generic_name",
          "country_name",
        ])
        .optional(),
    }),
  },
  "/api/v1/drugs/:slug/:id/info": {
    output: DrugInfoSchema,
    params: z.object({ slug: z.string(), id: z.string() }),
  },
  "/api/v1/drugs/:slug": {
    output: GetDrugApiResponseSchema,
    params: z.object({ slug: z.string() }),
  },
  "/api/v1/drugs/:slug/:id/view": {
    output: z.object({ view_count: z.number() }),
    params: z.object({ slug: z.string(), id: z.string() }),
  },
} satisfies Endpoints;

const schema = createSchema({
  "/api/auth/:all": {},
  ...agentsEndpoint,
  ...companiesEndpoint,
  ...genericsEndpoint,
  ...drugEndpoint,
});
// Create Axios instance
export const api = createFetch({
  baseURL: BASE_URL,
  retry: {
    type: "linear",
    attempts: 3,
    delay: 1000,
  },

  headers: {
    "User-Agent": USER_AGENT,
    Accept: "application/json",
  },
  defaultOutput: z.any(),
  // onError(context) {
  //   const status = context.response?.status;
  //   const message =
  //     (context.error.response?.data as { message?: string })?.message ||
  //     context.error.message;

  //   // Log error for debugging
  //   console.error(`API Error [${status}]:`, message);
  //   // Global Error Handling
  //   if (status === 401) {
  //     // Optional: Trigger logout or redirect to login
  //     // For now, we just log it. The UI should handle 401 states.
  //     console.warn("Unauthorized access. Token may be expired.");
  //   } else if (status === 500) {
  //     toast.error("Server Error", {
  //       description:
  //         "Something went wrong on the server. Please try again later.",
  //     });
  //   } else if (status === 0) {
  //     // Network error
  //     toast.error("Network Error", {
  //       description: "Please check your internet connection.",
  //     });
  //   }
  // },
  // plugins: [
  //   logger({
  //     enabled: process.env.NODE_ENV === "development",
  //   }),
  // ],
  schema,
});

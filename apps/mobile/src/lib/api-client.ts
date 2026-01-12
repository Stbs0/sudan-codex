import { createFetch, createSchema } from "@better-fetch/fetch";
import {
  AgentApiResponseSchema,
  CompanyApiResponseSchema,
  DrugListApiResponseSchema,
  DrugWithRelationsSelectSchema,
  GenericApiResponseSchema,
} from "@sudan-codex/db/schema";
import Constants from "expo-constants";
import { Platform } from "react-native";
import { z } from "zod";

const APP_VERSION = Constants.expoConfig?.version ?? "dev";

const USER_AGENT = `SudanCodex/${APP_VERSION} (${Platform.OS})`;
// Constants
const BASE_URL = process.env.EXPO_PUBLIC_BACKEND_URI;

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
  schema: createSchema({
    "/api/agents/:slug": {
      output: AgentApiResponseSchema,
      params: z.object({ slug: z.string() }),
    },
    "/api/auth/:all": {},
    "/api/companies/:slug": {
      output: CompanyApiResponseSchema,
      params: z.object({ slug: z.string() }),
    },
    "/api/drugs": {
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
    "/api/drugs/:slug": { output: DrugWithRelationsSelectSchema },
    "/api/generics/:slug": {
      output: GenericApiResponseSchema,
      params: z.object({ slug: z.string() }),
    },
  }),
});
// Request Interceptor: Inject Auth Token
// api.interceptors.Request.use(
//   async (config) => {
//     try {
//       const token = await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//     } catch (error) {
//       console.error("Error retrieving auth token:", error);
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// Response Interceptor: Handle Errors

// // Generic API Helper functions for cleaner usage
// export const apiClient = {
//   get: <T>(url: string, config?: AxiosRequestConfig) =>
//     api.get<T>(url, config).then((res) => res.data),

//   post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
//     api.post<T>(url, data, config).then((res) => res.data),

//   put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
//     api.put<T>(url, data, config).then((res) => res.data),

//   patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
//     api.patch<T>(url, data, config).then((res) => res.data),

//   delete: <T>(url: string, config?: AxiosRequestConfig) =>
//     api.delete<T>(url, config).then((res) => res.data),
// } as const;

import axios, { type AxiosError } from "axios";
import { toast } from "sonner-native";

// Constants
const BASE_URL = process.env.EXPO_PUBLIC_BACKEND_URI;

// Create Axios instance
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Inject Auth Token
// api.interceptors.request.use(
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
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    const status = error.response?.status;
    const message =
      (error.response?.data as { message?: string })?.message || error.message;

    // Log error for debugging
    console.error(`API Error [${status}]:`, message);
    // Global Error Handling
    if (status === 401) {
      // Optional: Trigger logout or redirect to login
      // For now, we just log it. The UI should handle 401 states.
      console.warn("Unauthorized access. Token may be expired.");
    } else if (status === 500) {
      toast.error("Server Error", {
        description:
          "Something went wrong on the server. Please try again later.",
      });
    } else if (status === 0) {
      // Network error
      toast.error("Network Error", {
        description: "Please check your internet connection.",
      });
    }

    return Promise.reject(error);
  }
);

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

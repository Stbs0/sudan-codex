import Axios, { InternalAxiosRequestConfig } from "axios";
import { auth } from "./firebase";

async function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = "application/json";
    const token = auth.currentUser && (await auth.currentUser.getIdToken());
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
}

const api = Axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    console.log(message);

    return Promise.reject(error);
  }
);
export default api;

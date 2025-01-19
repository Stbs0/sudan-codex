import Axios, { InternalAxiosRequestConfig } from "axios";

async function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = "application/json";
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }
  }
  return config;
}

const api = Axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.log("axiose", error);
    const message = error.response?.data?.message || error.message;
    console.log(message);

    return Promise.reject(error);
  }
);
export default api;

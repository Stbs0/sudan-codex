import env from "@/config/env";
import axios from "axios";

const api = axios.create({
  baseURL: env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

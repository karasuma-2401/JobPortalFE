// src/api/api.ts
import axios from "axios";
import { toast } from "sonner";

const BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:8081/api";

export const publicApi = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

publicApi.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message || "An error occurred during processing.";
    toast.error(message);
    return Promise.reject(error);
  },
);

export const privateApi = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});
privateApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

privateApi.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      toast.error("Session expired. Please log in again.");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      // force return to login if session expired
      window.location.href = "/login";
    } else {
      const message =
        error.response?.data?.message || "An error occurred during processing.";
      toast.error(message);
    }
    return Promise.reject(error);
  },
);

import axios from "axios";
import { clearAuthToken } from "@/utils/auth";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "content-type": "application/json",
  },
});

console.log("NEXT_PUBLIC_API_URL", process.env.NEXT_PUBLIC_API_URL);

axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window === "undefined") return config;
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const status = error?.response?.status;
    const requestUrl = String(error?.config?.url || "");
    const isLoginRequest = requestUrl.includes("/auth/login");

    if (typeof window !== "undefined" && status === 401 && !isLoginRequest) {
      clearAuthToken();
      const currentPath = `${window.location.pathname}${window.location.search}`;
      const redirect = encodeURIComponent(currentPath);
      window.location.href = `/login?redirect=${redirect}`;
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

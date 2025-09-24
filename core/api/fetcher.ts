import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json;version=v1_web",
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/";
    }
    return Promise.reject(error);
  },
);

const fetcher = async <T = unknown>(url: string, method: "GET" | "POST", data?: unknown): Promise<T> => {
  try {
    const response = await api({
      url,
      method,
      data,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.detail || error.response?.data?.message || error.message || "Erro na requisição";
      throw new Error(errorMessage);
    }
    throw error;
  }
};

export default fetcher;

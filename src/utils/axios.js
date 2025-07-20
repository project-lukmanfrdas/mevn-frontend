import axios from "axios";

/**
 * Axios instance for communicating with the backend API.
 * Automatically adds the Authorization header if a token exists in localStorage.
 */
const apiClient = axios.create({
  baseURL: "/api", // Base URL for all API requests
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Axios request interceptor to attach JWT token (if available).
 *
 * @param {import('axios').AxiosRequestConfig} config - Axios request configuration.
 * @returns {import('axios').AxiosRequestConfig} Modified config with Authorization header if token exists.
 */
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;

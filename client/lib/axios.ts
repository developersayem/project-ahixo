import axios, { AxiosRequestConfig, AxiosError } from "axios";

interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
  _retry?: boolean;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // e.g. http://localhost:5001
  withCredentials: true, // send cookies (important for refresh tokens)
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfigWithRetry;

    // If access token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Call refresh endpoint
        await api.post("/api/v1/auth/refresh-token");

        // Retry original request
        return api(originalRequest);
      } catch (refreshError: unknown) {
        if (refreshError instanceof AxiosError) {
          console.error("Refresh token expired or invalid", refreshError);

          // Only redirect if refresh ALSO failed with 401
          if (refreshError.response?.status === 401) {
            window.location.href = "/login";
          }
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

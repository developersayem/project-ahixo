import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // e.g. http://localhost:5001
  withCredentials: true, // ✅ send cookies (important for refresh tokens)
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If access token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // call refresh endpoint
        await api.get("api/v1/auth/refresh-token");

        // retry original request
        return api(originalRequest);
      } catch (refreshError) {
        // logout user if refresh fails
        console.error("Refresh token expired or invalid",refreshError);
        // maybe redirect to login
      }
    }
    return Promise.reject(error);
  }
);

export default api;

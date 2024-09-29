import axios from "axios";
import { getRefreshToken } from "./spotifyAuth";

// Creating an axios instance
const api = axios.create({
  baseURL: "https://api.spotify.com/v1",
});

api.interceptors.response.use(
  (response) => response, // If the response is successful, just return the response

  async (error) => {
    const originalRequest = error.config;

    // Check if the error is a 401 Unauthorized
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // Prevent infinite retry loop

      try {
        const newAccessToken = await getRefreshToken(); // Refresh the access token

        // Update the Authorization header with the new token
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        // Retry the original request with the new token
        return api(originalRequest);
      } catch (refreshError) {
        // Handle failure to refresh the token (e.g., refresh token expired)
        console.error("Token refresh failed:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    // If error is not related to token or refreshing failed, reject the promise
    return Promise.reject(error);
  }
);

export default api;

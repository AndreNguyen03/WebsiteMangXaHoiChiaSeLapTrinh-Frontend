import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5114/api", // Your API base URL
});

// Request Interceptor to add JWT token to each request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Attach JWT to headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor to refresh the token if expired (401 Unauthorized)
axiosInstance.interceptors.response.use(
  (response) => response, // If successful response, just pass it through
  async (error) => {
    if (error.response?.status === 401) {
      // If token is expired, attempt to refresh
      const newToken = await refreshJwtToken();
      if (newToken) {
        // Retry the original request with the new token
        error.config.headers["Authorization"] = `Bearer ${newToken}`;
        return axiosInstance(error.config);  // Retry the request with the new token
      }
    }
    return Promise.reject(error);  // If no new token or error persists, reject the error
  }
);

// Function to refresh the JWT using the refresh token
const refreshJwtToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  try {
    const response = await axiosInstance.post("/Auth/Refresh", {
      refreshToken,  // Send the refresh token to the backend
    });
    const newJwtToken = response.data.jwtToken;  // Get the new JWT token
    localStorage.setItem("jwtToken", newJwtToken);  // Store the new token
    return newJwtToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return null;  // Return null if refresh failed
  }
};

export default axiosInstance;

import axios from "axios";
import useAuthStore from "../stores/authStore";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    const checkTokenExpiration = useAuthStore.getState().checkTokenExpiration;

    if (token) {
      const isValid = checkTokenExpiration();
      
      if (!isValid) {

        window.location.href = '/';
        return Promise.reject(new Error("Token expired"));
      }
      
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;
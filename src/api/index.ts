import axios from "axios";

const token = localStorage.getItem("token");
console.log(token);

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_ENDPOINT}`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to set the Authorization header dynamically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

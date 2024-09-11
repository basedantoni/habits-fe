import { notFound } from "@tanstack/react-router";
import axios, { AxiosResponse } from "axios";
import { getSessionToken } from "@/lib/auth";

export const client = axios.create({
  baseURL: `${import.meta.env.VITE_API_ENDPOINT}`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to set the Authorization header dynamically
client.interceptors.request.use(
  async (config) => {
    const token = await getSessionToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
client.interceptors.response.use(
  (res: AxiosResponse) => {
    return res; // Simply return the response
  },
  async (err) => {
    const status = err.response ? err.response.status : null;

    if (status === 401) {
      // implement refresh token logic
    }

    if (status === 403 && err.response.data) {
      return Promise.reject(err.response.data);
    }

    if (status === 404 && err.response.data) {
      throw notFound();
    }

    return Promise.reject(err);
  }
);

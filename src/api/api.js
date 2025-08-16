import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // 👈 change to your Django base URL
  withCredentials: true,
});

// Attach token if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;

import axios from "axios";

export const backendHttp = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fileServerHttp = axios.create({
  baseURL: import.meta.env.VITE_FILE_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

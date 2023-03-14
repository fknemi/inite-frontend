import axios, { AxiosInstance, AxiosResponse } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: "https://inite-prod-backend-alpha.vercel.app/",
  headers: {
    "x-token": localStorage.getItem("x-token") || "",
    "x-refresh-token": localStorage.getItem("x-refresh-token") || "",
  },
});

instance.interceptors.response.use((response: AxiosResponse) => {
  const token = response.headers["x-token"];
  const refreshToken = response.headers["x-refresh-token"];
  if (token && refreshToken) {
    localStorage.setItem("x-token", token);
    localStorage.setItem("x-refresh-token", refreshToken);
  }
  return response;
});

export default instance;

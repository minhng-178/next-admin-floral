import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const REQUEST_TIME_OUT = 30000;
const networkInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: REQUEST_TIME_OUT,
});

networkInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

networkInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default networkInstance;

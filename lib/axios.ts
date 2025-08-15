import { API_BASE_URL } from "@/constants/API_BASE_URL";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

// Attach token to every request (if present)
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("userToken");
  if (token) {
    config.headers = config.headers ?? {};
    (config.headers as any).Authorization = `Bearer ${token}`;
  }
  return config;
});

// Optional: normalize errors here
api.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err)
);

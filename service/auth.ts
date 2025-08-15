import { api } from "@/lib/axios";

type LoginResponse = { token: string };

export async function login(username: string, password: string) {
  const { data } = await api.post<LoginResponse>("/api/auth/login", {
    username,
    password,
  });
  return data;
}

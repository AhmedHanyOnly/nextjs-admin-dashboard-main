'use client'

import { useAuthStore } from "@/store/useAuthStore";
import api from "@/utils/api";

interface LoginPayload {
  email: string;
  password: string;
}

interface UserData {
  id: number;
  name: string;
  email: string;
}

interface LoginResponse {
  token?: string;
  data?: UserData;
  message?: string;
}

interface LogoutResponse {
  message?: string;
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>("/api/login", payload);
  console.log(data);
  if (data.token && data.data) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.data));
    useAuthStore.getState().setAuth(data.data, data.token);
    document.cookie = `token=${data.token}; path=/; SameSite=Lax`;
  }
  return data;
}

export async function logout(): Promise<LogoutResponse> {
  const { data } = await api.post<LogoutResponse>("/api/logout");
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  useAuthStore.getState().clearAuth();
  return data;
}

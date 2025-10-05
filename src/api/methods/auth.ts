'use client';

import { useAuthStore } from '@/store/useAuthStore';
import api from '@/api/api';

// Types
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

// 🟢 Login
export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>('/api/login', payload);

  return data;
}

// 🔴 Logout
export async function logout(): Promise<LogoutResponse> {
  const { data } = await api.post<LogoutResponse>('/api/logout');

  // حذف البيانات من localStorage و Zustand
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  useAuthStore.getState().clearAuth();

  return data;
}

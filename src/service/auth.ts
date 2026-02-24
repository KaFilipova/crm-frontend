import { request } from "./api";

export interface User {
  id: string;
  email: string;
}

export interface AuthTokens {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

export interface LogoutResponse {
  success: boolean;
}

export async function register(email: string, password: string) {
  return request<AuthTokens>("/auth/register", {
    method: "POST",
    body: { email, password },
  });
}

export async function login(email: string, password: string) {
  return request<AuthTokens>("/auth/login", {
    method: "POST",
    body: { email, password },
  });
}

export async function refresh(refreshToken: string) {
  return request<RefreshResponse>("/auth/refresh", {
    method: "POST",
    body: { refreshToken },
  });
}

export async function logout(accessToken: string) {
  return request<LogoutResponse>("/auth/logout", {
    method: "POST",
    token: accessToken,
  });
}

export async function me(accessToken: string) {
  return request<User>("/auth/me", {
    method: "GET",
    token: accessToken,
  });
}


import { getToken } from "../auth/utils/token.ts";

export const API_BASE = "http://localhost:3022";

export async function apiGet<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`API ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export async function apiPost<T, C>(
  path: string,
  data?: T,
  options?: RequestInit,
): Promise<C | null> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: data === undefined ? undefined : JSON.stringify(data),
    ...options,
  });

  const text = await res.text();

  return text ? JSON.parse(text) : null;
}

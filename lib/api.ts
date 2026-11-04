import { authClient } from "./auth-client";
import type { Book } from "./types";

export const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/$/, "");

/** Public (no token) fetch — safe for server components. */
export async function getBooks(params: Record<string, string | number | undefined> = {}): Promise<Book[]> {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => v !== undefined && v !== "" && qs.set(k, String(v)));
  try {
    const res = await fetch(`${API_URL}/books?${qs}`, { cache: "no-store" });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

/** Authenticated fetch for client components — attaches the BetterAuth JWT. */
export async function apiFetch<T = unknown>(path: string, init: RequestInit = {}): Promise<T> {
  const { data, error } = await authClient.token();
  if (error || !data?.token) throw new Error("Your session has expired. Please log in again.");

  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init.headers,
      Authorization: `Bearer ${data.token}`,
    },
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body?.message || "Request failed");
  return body as T;
}

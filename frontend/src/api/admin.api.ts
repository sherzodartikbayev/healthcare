import type { Admin } from "../types/admin.type.ts";

const BASE_URL = import.meta.env.VITE_API_URL;

export async function getDashboardData() {
  const response = await fetch(`${BASE_URL}/api/admin/dashboard`, {
    credentials: "include",
  });
  if (!response.ok)
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  return await response.json();
}

export async function registerAdmin(admin: Admin) {
  const response = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(admin),
  });
  if (!response.ok)
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  return await response.json();
}

export async function logout() {
  const response = await fetch(`${BASE_URL}/api/auth/logout`, {
    credentials: "include",
  });
  if (!response.ok)
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  return await response.json();
}

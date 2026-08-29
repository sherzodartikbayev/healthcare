import type {LoginData, LoginResponse} from "../types/user.types.ts";

const BASE_URL = 'http://localhost:8080';

export async function getMe() {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/me`, {credentials: 'include'});
    if (!response.ok) throw new Error("Unauthorized");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export const loginRequest = async (data: LoginData): Promise<LoginResponse> => {
  const response = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error(response.statusText || "Login error");

  const result = await response.json();
  return result;
};

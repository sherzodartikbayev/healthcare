export type UserRole = "ADMIN" | "DOCTOR";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (isLoading: boolean) => void;
  logout: () => void;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  success?: boolean;
  message: string;
  user: User;
}

import { create } from "zustand";
import type {AuthState} from "../types/user.types.ts";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
  logout: () => set({
    user: null,
    isLoading: false,
  }),
}));

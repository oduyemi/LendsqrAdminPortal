import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  email: string;
  password: string;

  user: { email: string } | null;
  token: string | null;
  isAuthenticated: boolean;

  setEmail: (email: string) => void;
  setPassword: (password: string) => void;

  login: (data: { email: string; token: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      email: "",
      password: "",

      user: null,
      token: null,
      isAuthenticated: false,

      setEmail: (email) => set({ email }),
      setPassword: (password) => set({ password }),

      login: ({ email, token }) =>
        set({
          user: { email },
          token,
          isAuthenticated: true,
          password: "", 
        }),

      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth-storage", 
    }
  )
);
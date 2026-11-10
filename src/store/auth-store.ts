import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
  email: string | null;
  isAuthenticated: boolean;
  signIn: (email: string) => void;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      email: null,
      isAuthenticated: false,
      signIn: (email) => set({ email, isAuthenticated: true }),
      signOut: () => set({ email: null, isAuthenticated: false }),
    }),
    { name: "rcarental.auth", storage: createJSONStorage(() => AsyncStorage) },
  ),
);

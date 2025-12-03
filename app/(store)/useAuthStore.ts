import { asyncStorageWithoutRefreshToken } from '@/app/lib/auth-storage';
import { User } from '@/app/types/user';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null; // kept in memory only (or SecureStore separately)
  isAuthenticated: boolean;

  // Actions
  login: (data: { user: User; accessToken: string; refreshToken: string }) => Promise<void>;
  logout: () => Promise<void>;
  updateAccessToken: (accessToken: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

      login: async ({ user, accessToken, refreshToken }) => {
        set({
          user,
          accessToken,
          refreshToken, // stays in memory + will be saved to SecureStore via storage.setItem
          isAuthenticated: true,
        });
      },

      logout: async () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        });
      },

      updateAccessToken: (accessToken) =>
        set({ accessToken, isAuthenticated: true }),
    }),
    {
      name: 'auth-storage', // Key in AsyncStorage
      storage: createJSONStorage(() => asyncStorageWithoutRefreshToken),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
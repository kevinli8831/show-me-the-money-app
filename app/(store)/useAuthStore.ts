import { asyncStorage } from '@/app/lib/auth-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  hydrateFromRefreshToken: () => Promise<void>;
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

      // App 啟動時自動嘗試 refresh
      hydrateFromRefreshToken: async () => {
        const storedData = await AsyncStorage.getItem('refreshToken');
        const storedRefreshToken = storedData
        if (!storedRefreshToken) return;

        try {
          const res = await fetch(`${process.env.EXPO_PUBLIC_API_BASE_URL}/auth/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken: storedRefreshToken }),
          });

          if (!res.ok) throw new Error('Refresh failed');

          const responseData = await res.json();
          const data = responseData?.data;
          set({ user: data.user, accessToken: data.accessToken });

          // 如果後端有回新 refreshToken，也存起來
          if (data.refreshToken) {
            await AsyncStorage.setItem('refreshToken', data.refreshToken);
          }
        } catch (error) {
          console.warn('Token refresh failed, clearing storage', error);
          await AsyncStorage.clear();
          set({ user: null, accessToken: null });
        }
      },

      updateAccessToken: (accessToken) =>
        set({ accessToken, isAuthenticated: true }),
    }),
    {
      name: 'auth-storage', // Key in AsyncStorage
      storage: createJSONStorage(() => asyncStorage),
      partialize: (state) => ({
        user: state.user,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
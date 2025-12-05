import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/app/types/user';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
  user: User | null;
  refreshToken: string | null; // kept in memory only (or SecureStore separately)
  accessToken: string | null;
  isAuthenticated: boolean;

  // Actions
  login: (data: { user: User; accessToken: string; refreshToken: string }) => Promise<void>;
  logout: () => Promise<void>;
  hydrateFromRefreshToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      refreshToken: null,
      accessToken: null,
      isAuthenticated: false,

      login: async ({ user, refreshToken, accessToken }) => {
        set({
          user,
          refreshToken, // stays in memory + will be saved to SecureStore via storage.setItem
          accessToken,
          isAuthenticated: true,
        });
      },

      logout: async () => {
        set({
          user: null,
          refreshToken: null,
          accessToken: null,
          isAuthenticated: false,
        });

        await AsyncStorage.clear();
      },

      // App 啟動時自動嘗試 refresh
      hydrateFromRefreshToken: async () => {
        const storedData = await AsyncStorage.getItem('auth-storage');
        let refreshToken: string | null = null;

        if(storedData !== null) {
           const parsedData = JSON.parse(storedData);
           refreshToken = parsedData.state.refreshToken;
        }
        if(refreshToken === null){
          console.warn('No refresh token, clearing storage');
          await AsyncStorage.clear();
          set({ user: null, accessToken: null, refreshToken: null});
        }

        try {
          const res = await fetch(`${process.env.EXPO_PUBLIC_API_BASE_URL}/auth/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken: refreshToken }),
          });

          if (!res.ok) throw new Error('Refresh failed');

          const responseData = await res.json();
          const data = responseData?.data;
          set({
            user: data.user,
            refreshToken: data.refreshToken, // stays in memory + will be saved to SecureStore via storage.setItem
            accessToken: data.accessToken,
            isAuthenticated: true,
          });

          // 如果後端有回新 refreshToken，也存起來
          if (data.refreshToken) {
            await AsyncStorage.setItem('refreshToken', data.refreshToken);
          }
        } catch (error) {
          console.warn('Token refresh failed, clearing storage', error);
          await AsyncStorage.clear();
          set({ user: null, accessToken: null, refreshToken: null});
        }
      },
    }),
    {
      name: 'auth-storage', // Key in AsyncStorage
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        refreshToken: state.refreshToken
      }),
    }
  )
);
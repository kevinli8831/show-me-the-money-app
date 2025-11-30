// app/(store)/authStore.ts
import { create } from 'zustand';
import { persist, PersistStorage } from 'zustand/middleware';
import authStorage from '@/app/lib/auth-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage } from 'zustand/middleware';

const storage = createJSONStorage(() => AsyncStorage);

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  provider: string;
  providerId: string;
  refreshToken: string;
  userType: string;
  avatarUrl: string;
  claimedBy: string;
  createdBy: string;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  login: (data: { user: User; accessToken: string; refreshToken?: string }) => Promise<void>;
  logout: () => Promise<void>;
  hydrateFromRefreshToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,

      login: async ({ user, accessToken, refreshToken }) => {
        set({ user, accessToken });
        if (refreshToken) {
          await authStorage.saveRefreshToken(refreshToken);
        }
      },

      logout: async () => {
        set({ user: null, accessToken: null });
        await authStorage.clear();
        try {
          await fetch(`${process.env.EXPO_PUBLIC_API_BASE_URL}/auth/logout`, {
            method: 'POST',
            credentials: 'include',
          });
        } catch (e) {
          console.warn('Logout API failed', e);
        }
      },

      hydrateFromRefreshToken: async () => {
        const storedRefreshToken = await authStorage.getRefreshToken();
        if (!storedRefreshToken) return;

        try {
          const res = await fetch(`${process.env.EXPO_PUBLIC_API_BASE_URL}/auth/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken: storedRefreshToken }),
          });

          if (!res.ok) throw new Error();

          const data = await res.json();
          set({ user: data.user, accessToken: data.accessToken });

          if (data.refreshToken) {
            await authStorage.saveRefreshToken(data.refreshToken);
          }
        } catch {
          await authStorage.clear();
          set({ user: null, accessToken: null });
        }
      },
    }),
    {
      name: 'auth-storage',
      storage,          // 直接傳這個
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
      }),
    }
  )
);
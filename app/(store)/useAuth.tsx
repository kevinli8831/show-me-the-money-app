import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Platform } from 'react-native';
import authStorage from '@/app/lib/auth-storage';

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

interface AuthContextType {
  user: User | null;
  accessToken?: string | null;
  login:(data: {user: any; accessToken: string; refreshToken?: string}) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;
  

  // 載入時檢查 secure store
  useEffect(() => {
    const loadUser = async () => {
      const storedRefreshToken = await authStorage.getRefreshToken();
      if (storedRefreshToken) {
        // 用 refresh token 換新 access token，並載入 user
        // 這裡假設你有 API /auth/refresh
        try {
          const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken: storedRefreshToken }),
          });
          const data = await res.json();
          setUser(data.user);
        } catch (error) {
          await authStorage.clear();
        }
      }
    };
    loadUser();
  }, []);

  const login = async (data: {user: User, accessToken: string, refreshToken?: string}) => {
    setUser(data.user);
    setAccessToken(data.accessToken);

    // 儲存 refreshToken（Web 靠 cookie，手機用 SecureStore）
    if(data.refreshToken && Platform.OS !== 'web') {
      await authStorage.saveRefreshToken(data.refreshToken);
    }
  };

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    },
    onSuccess: async () => {
      setUser(null);
      await authStorage.clear();
      // 導回登入頁
    },
  });

  const logout = () => logoutMutation.mutate();

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
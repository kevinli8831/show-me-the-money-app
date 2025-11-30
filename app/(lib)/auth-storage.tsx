import { isPlatformWeb } from '@/app/constants/constants';
import * as SecureStore from 'expo-secure-store';

const KEY = 'refreshToken';

const authStorage = {
  async saveRefreshToken(token: string) {
    if (isPlatformWeb) return; // Web 靠 HttpOnly Cookie
    await SecureStore.setItemAsync(KEY, token);
  },

  async getRefreshToken(): Promise<string | null> {
    if (isPlatformWeb) return null;
    return await SecureStore.getItemAsync(KEY);
  },

  async clear() {
    if (isPlatformWeb) return;
    await SecureStore.deleteItemAsync(KEY);
  },
};

export default authStorage;

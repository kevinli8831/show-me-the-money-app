import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const KEY = 'refreshToken';

const authStorage = {
  async saveRefreshToken(token: string) {
    if (Platform.OS === 'web') return; // Web 靠 HttpOnly Cookie
    await SecureStore.setItemAsync(KEY, token);
  },

  async getRefreshToken(): Promise<string | null> {
    if (Platform.OS === 'web') return null;
    return await SecureStore.getItemAsync(KEY);
  },

  async clear() {
    if (Platform.OS === 'web') return;
    await SecureStore.deleteItemAsync(KEY);
  },
};

export default authStorage;

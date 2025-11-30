import { isPlatformWeb } from '@/app/constants/constants';
import { createMMKV } from 'react-native-mmkv';

const KEY = 'refreshToken';

const mmkv = createMMKV({
  id: 'auth-storage',
  encryptionKey: isPlatformWeb ? undefined : 'hunter2-hunter2-hunter2-hunter2', // Web 不加密
});


const authStorage = {
  async saveRefreshToken(token: string) {
    if (!token) return;

    if (isPlatformWeb) return; // Web 靠 HttpOnly Cookie
    mmkv.set(KEY, token);
  },

  async getRefreshToken(): Promise<string | null> {
    if (isPlatformWeb) return null;
     return mmkv.getString(KEY) || null;
  },

  async clear() {
    if (isPlatformWeb) return;
    await mmkv.remove(KEY);
  },
};

export default authStorage;

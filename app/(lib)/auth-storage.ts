import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'refreshToken';

// Custom storage from AsyncStorage
export const asyncStorage = {
  getItem: async (name: string) => {
    const value = await AsyncStorage.getItem(name);
    if (!value) return value;

    const parsed = JSON.parse(value);
    // Re-inject refreshToken from SecureStore if it exists
    const secureRefresh = await AsyncStorage.getItem(KEY);
    if (secureRefresh) {
      parsed.state.refreshToken = secureRefresh;
    }
    return JSON.stringify(parsed);
  },
  setItem: async (name: string, value: string) => {
    const parsed = JSON.parse(value);

    // Save refreshToken to SecureStore (encrypted)
    if (parsed.state.refreshToken) {
      await AsyncStorage.setItem(KEY, parsed.state.refreshToken);
      // Remove it from what goes into AsyncStorage
      delete parsed.state.refreshToken;
    }

    return AsyncStorage.setItem(name, JSON.stringify(parsed));
  },
  removeItem: async (name: string) => {
    await AsyncStorage.removeItem(KEY);
    return AsyncStorage.removeItem(name);
  },
};

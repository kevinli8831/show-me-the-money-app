import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import { LanguageDetectorAsyncModule } from 'i18next';

const STORE_LANGUAGE_KEY = 'settings.lang';
const STORE_LANGUAGE_ICON_KEY = 'settings.lang.icon';

// 語言與圖示對應
const LANGUAGE_ICON_MAP: Record<string, string> = {
  'english': 'english_icon',
  'zh-HK': 'zh-HK_icon',
};

const languageDetector: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  init: () => { },
  detect: async function (callback: (lng: string | readonly string[] | undefined) => void) {
    try {
      // 1. Check AsyncStorage for saved language
      const savedLanguage = await AsyncStorage.getItem(STORE_LANGUAGE_KEY);
      if (savedLanguage) {
        // 同步儲存該語言對應的 icon
        const iconName = LANGUAGE_ICON_MAP[savedLanguage] || 'icon';
        await AsyncStorage.setItem(STORE_LANGUAGE_ICON_KEY, iconName);
        callback(savedLanguage);
        return savedLanguage;
      }

      // 2. If no saved language, use device locale
      const locales = Localization.getLocales();
      const bestLanguage = locales[0]?.languageTag || 'en';

      // 同步儲存該語言對應的 icon
      const iconName = LANGUAGE_ICON_MAP[bestLanguage] || 'icon';
      await AsyncStorage.setItem(STORE_LANGUAGE_ICON_KEY, iconName);

      callback(bestLanguage);
      return bestLanguage;
    } catch (error) {
      console.log('Error reading language', error);
      callback('en');
      return 'en';
    }
  },
  cacheUserLanguage: async function (language: string) {
    try {
      await AsyncStorage.setItem(STORE_LANGUAGE_KEY, language);
      // 同步儲存該語言對應的 icon
      const iconName = LANGUAGE_ICON_MAP[language] || 'icon';
      await AsyncStorage.setItem(STORE_LANGUAGE_ICON_KEY, iconName);
    } catch (error) {
      console.log('Error saving language', error);
    }
  },
};

export default languageDetector;

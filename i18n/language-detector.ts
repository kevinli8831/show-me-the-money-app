import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import { LanguageDetectorAsyncModule } from 'i18next';

const STORE_LANGUAGE_KEY = 'settings.lang';

const languageDetector: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  init: () => { },
  detect: async function (callback: (lng: string | readonly string[] | undefined) => void) {
    try {
      // 1. Check AsyncStorage for saved language
      const savedLanguage = await AsyncStorage.getItem(STORE_LANGUAGE_KEY);
      if (savedLanguage) {
        callback(savedLanguage);
        return savedLanguage;
      }

      // 2. If no saved language, use device locale
      const locales = Localization.getLocales();
      const bestLanguage = locales[0]?.languageTag || 'en';

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
    } catch (error) {
      console.log('Error saving language', error);
    }
  },
};

export default languageDetector;

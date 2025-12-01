import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 用新包
import LanguageDetector from '@os-team/i18next-react-native-language-detector';

import en from '../locales/en.json';
import hk from '../locales/zh-HK.json';

const resources = {
  en: { translation: en },
  'zh-HK': { translation: hk },
};

i18n
  .use(LanguageDetector)  // ← 用呢個新 detector，自動偵測 + 存 AsyncStorage
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });

export default i18n;
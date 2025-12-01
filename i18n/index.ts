import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 用新包
import languageDetector from './language-detector';

import en from '../locales/en.json';
import hk from '../locales/zh-HK.json';

const resources = {
  en: { translation: en },
  'zh-HK': { translation: hk },
};

i18n
  .use(languageDetector)  // Use custom detector
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });

export default i18n;
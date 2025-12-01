// API 配置
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:3000';

// Google OAuth 配置
export const GOOGLE_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID || '';

// App 配置
export const APP_CONFIG = {
  api: {
    baseUrl: API_BASE_URL,
    googleClientId: GOOGLE_CLIENT_ID,
  },
};

export default APP_CONFIG;

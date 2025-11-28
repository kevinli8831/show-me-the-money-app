export default ({ config }) => {
    const isDev = process.env.APP_VARIANT === 'development' || process.env.NODE_ENV === 'development';

    return {
        ...config,
        name: "show-me-the-money",
        slug: "show-me-the-money",
        version: "1.0.0",
        // 自動根據執行模式載入對應的 .env 檔案
        extra: {
            googleWebClientId: process.env.GOOGLE_WEB_CLIENT_ID,
            apiBaseUrl: process.env.API_BASE_URL,
        },
    };
};
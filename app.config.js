export default ({ config }) => {
    const isDev = process.env.APP_VARIANT === 'development' || process.env.NODE_ENV === 'development';

    return {
        ...config,
        name: "Show Me The Money App",
        slug: "show-me-the-money-app",
        version: "1.0.0",
        // 自動根據執行模式載入對應的 .env 檔案
        extra: {
            apiBaseUrl: isDev? "http://localhost:3000": process.env.API_BASE_URL,
        },
    };
};
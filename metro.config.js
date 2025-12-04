const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
 
/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// 強制 Zustand 使用 CommonJS 版本（避開 import.meta）
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName.includes('zustand')) {
    // 強制解析為 CommonJS 版本，避開 ESM 的 import.meta
    const result = require.resolve(moduleName, { paths: [__dirname] });
    return context.resolveRequest(context, result, platform);
  }
  // 其他模組正常解析
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = withNativeWind(config, { input: './global.css', inlineRem: 16 });
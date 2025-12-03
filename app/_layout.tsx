/**
 * 根佈局組件 (Root Layout)
 * 
 * 這是應用的根佈局檔案，負責：
 * 1. 設置 React Query 客戶端，用於資料獲取和快取
 * 2. 配置 Expo Router 的 Stack 導航
 * 3. 根據平台（Web/移動設備）顯示不同的導航欄
 *    - Web: 顯示頂部導航欄 (TopUpBar)
 *    - 移動設備: 不顯示頂部導航欄（使用底部導航欄）
 */

import TopUpBar from "@/app/components/top-up-bar";
import breakpoints from '@/app/constants/breakpoints';
import AuthProvider from '@/app/hooks/useAuth';
import "@/global.css";
import '@/i18n';
import { PortalHost } from '@rn-primitives/portal';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Stack } from "expo-router";
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect } from 'react';
import { Platform, useWindowDimensions } from 'react-native';

// 處理 OAuth callback - 必須喺 component 外面 call
WebBrowser.maybeCompleteAuthSession();

// 建立 React Query 客戶端實例，用於管理伺服器狀態和快取
const queryClient = new QueryClient()


export default function RootLayout() {
  // 檢測當前執行平台是否為 Web
  const { width } = useWindowDimensions();
  const isWeb = width > breakpoints.sm;

  // 檢查係咪喺 OAuth popup window 入面,如果係就自動 close
  useEffect(() => {
    if (Platform.OS === 'web') {
      console.log('=== RootLayout Popup Close Debug ===');
      console.log('Platform.OS:', Platform.OS);
      console.log('window.location.href:', window.location.href);
      console.log('window.location.search:', window.location.search);
      
      // 檢查 URL 有冇 OAuth callback 參數 (code, state 等)
      const urlParams = new URLSearchParams(window.location.search);
      const hasAuthParams = urlParams.has('code') || urlParams.has('state');
      console.log('hasAuthParams:', hasAuthParams);
      console.log('window.opener exists:', !!window.opener);
      
      // 如果有 auth params 而且係 popup window (opener 存在)
      if (hasAuthParams && window.opener) {
        console.log('✅ Detected OAuth popup in RootLayout, will close after auth completes');
        // 等 auth flow 完成後 close (短暫延遲確保 token 已經傳咗去 parent window)
        setTimeout(() => {
          console.log('Closing popup now from RootLayout...');
          window.close();
        }, 1500);
      } else {
        console.log('❌ Not closing popup because:');
        if (!hasAuthParams) console.log('  - No auth params in URL');
        if (!window.opener) console.log('  - No window.opener (not a popup)');
      }
    }
  }, []);

  return (
    // 提供 React Query 上下文，使所有子組件可以使用 useQuery 等 hooks
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Stack
          screenOptions={{
            // 僅在 Web 平台顯示頂部導航欄
            headerShown: isWeb,
            // 在 Web 平台使用自訂的 TopUpBar 組件作為 header
            // 移動設備不顯示 header，因為使用底部導航欄
            header: isWeb ? () => <TopUpBar /> : undefined,
          }}
        />
        <PortalHost />
      </AuthProvider>
    </QueryClientProvider>
  );
}

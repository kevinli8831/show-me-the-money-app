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

import { PortalHost } from '@rn-primitives/portal';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import '@/i18n';
import { Stack } from "expo-router";
import React from 'react';
import { useWindowDimensions } from 'react-native';
import "@/global.css";
import TopUpBar from "@/app/components/top-up-bar";
import breakpoints from '@/app/constants/breakpoints';
import AuthProvider from '@/app/hooks/useAuth';

// 建立 React Query 客戶端實例，用於管理伺服器狀態和快取
const queryClient = new QueryClient()


export default function RootLayout() {
  // 檢測當前執行平台是否為 Web
  const { width } = useWindowDimensions();
  const isWeb = width > breakpoints.sm;

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

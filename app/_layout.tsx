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
import { SplashScreen } from 'expo-router';
import { useAuthStore } from "@/app/store/useAuthStore";
import TopUpBar from "@/app/components/top-up-bar";
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
import { Platform, View } from 'react-native';

// 處理 OAuth callback - 必須喺 component 外面 call
WebBrowser.maybeCompleteAuthSession();

// 建立 React Query 客戶端實例，用於管理伺服器狀態和快取
const queryClient = new QueryClient();

export default function RootLayout() {
  const { user, hydrateFromRefreshToken } = useAuthStore();

  // 檢查係咪喺 OAuth popup window 入面,如果係就自動 close
  useEffect(() => {
    if (Platform.OS === 'web') {
      const urlParams = new URLSearchParams(window.location.search);
      const hasAuthParams = urlParams.has('code') || urlParams.has('state');

      // 如果有 auth params 而且係 popup window (opener 存在)
      if (hasAuthParams && window.opener) {
        setTimeout(() => {
          window.close();
        }, 1500);
      }

    }

    let cancelled = false;

    const tryRefresh = async () => {
      try {
        await hydrateFromRefreshToken();  // 自動去 SecureStore 拿 refreshToken 換新 accessToken
        if (!cancelled) {
          SplashScreen.hideAsync();       // 成功或失敗都隱藏 splash
        }
      } catch (error) {
        console.warn('Auto refresh failed', error);
        if (!cancelled) {
          SplashScreen.hideAsync();
        }
      }
    };

    tryRefresh();

    return () => {
      cancelled = true;
    };
  }, []);

  const isHydrated = useAuthStore.persist.hasHydrated();
  if (!isHydrated) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <p>Loading...</p>
      </View>
    )
  }

  return (
    // 提供 React Query 上下文，使所有子組件可以使用 useQuery 等 hooks
    <QueryClientProvider client={queryClient}>
        <Stack
          screenOptions={{
            // 在 Web 平台使用自訂的 TopUpBar 組件作為 header
            // 移動設備不顯示 header，因為使用底部導航欄
            header: () => (
              <View className={`hidden sm:flex`}>
                <TopUpBar />
              </View>
            ),
          }}
        >
          <Stack.Screen name="(tabs)/index" options={{ title: 'Home', animation: 'slide_from_right' }} />
          <Stack.Screen name="(tabs)/trip" options={{ title: 'Trip', animation: 'slide_from_right' }} />
          <Stack.Screen name="(tabs)/login" options={{ title: 'Login', animation: 'slide_from_right' }} />
        </Stack>
        <PortalHost />
    </QueryClientProvider>
  );
}

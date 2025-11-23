/**
 * Tabs 佈局組件 (Tab Layout)
 * 
 * 這個檔案定義了 (tabs) 路由組的佈局結構
 * 使用 Stack 導航來管理 tabs 目錄下的所有頁面
 * 
 * 注意：這裡隱藏了預設的 header，因為：
 * - Web 平台：使用根佈局中的 TopUpBar 作為頂部導航
 * - 移動設備：使用 BottomTabBar 作為底部導航
 */

import { Stack } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Stack
      screenOptions={{
        // 隱藏預設的 header，使用自訂導航欄
        headerShown: false,
      }}
    />
  );
}


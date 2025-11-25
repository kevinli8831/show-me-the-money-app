/**
 * 導航包裝器組件 (NavigationWrapper)
 * 
 * 功能：
 * 1. 根據平台自動顯示/隱藏底部導航欄
 * 2. Web 平台：不顯示底部導航欄（使用頂部導航欄）
 * 3. 移動設備：顯示底部導航欄
 * 
 * 使用方式：
 * 將頁面內容包裹在此組件中，移動設備上會自動顯示底部導航欄
 * 
 * @example
 * <NavigationWrapper>
 *   <YourPageContent />
 * </NavigationWrapper>
 */

import React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { BottomTabBar } from './bottom-tab-bar';
import { breakpoints } from '../constants/breakpoints';

interface NavigationWrapperProps {
  children: React.ReactNode;
}

export function NavigationWrapper({ children }: NavigationWrapperProps) {
  // 檢測當前執行平台是否為 Web
  const { width } = useWindowDimensions();
  const isWeb = width > breakpoints.sm;

  if (isWeb) {
    // Web 平台：頂部導航欄由 Stack 的 header 處理，這裡只渲染子內容
    return <>{children}</>;
  }

  // 移動設備：顯示底部導航欄
  // 使用 flex: 1 確保內容區域和導航欄正確佈局
  return (
    <View style={{ flex: 1 }}>
      {children}
      <BottomTabBar />
    </View>
  );
}


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
import { View } from 'react-native';
import BottomTabBar from '@/app/components/bottom-tab-bar';

interface NavigationWrapperProps {
  children: React.ReactNode;
}

export default function NavigationWrapper({ children }: NavigationWrapperProps) {

  // 移動設備：顯示底部導航欄
  // 使用 flex: 1 確保內容區域和導航欄正確佈局
  return (
    <>
      <View className="hidden sm:flex flex-1">
        {children}
      </View>
      <View className="flex-1 sm:hidden">
        {children}
        <BottomTabBar />
      </View>
    </>
  );
}


/**
 * 頂部導航欄組件 (TopUpBar)
 * 
 * 功能：
 * 1. 在 Web 平台顯示頂部導航欄
 * 2. 響應式設計：
 *    - 螢幕寬度 >= 600px: 顯示完整的導航項（Home, Trip, Login）
 *    - 螢幕寬度 < 600px: 顯示漢堡選單按鈕，點擊後顯示下拉選單
 * 3. 支援深色/淺色主題切換
 * 4. 包含應用 Logo 和標題
 * 
 * 使用場景：僅在 Web 平台使用，作為 Stack 的 header
 */

import breakpoints from '@/app/constants/breakpoints';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Animated, Image, Platform, Pressable, Text, useColorScheme, useWindowDimensions, View } from 'react-native';
import { Menu } from 'react-native-feather';

// 導航項配置：定義所有可用的導航連結
const NAV_ITEMS = [
  { label: 'Home', route: '/(tabs)' },
  { label: 'Trip', route: '/(tabs)/trip' },
  { label: 'Login', route: '/(tabs)/login' },
];

export default function TopUpBar() {
  // 獲取視窗寬度，用於響應式設計
  const { width } = useWindowDimensions();
  // 獲取路由導航器，用於頁面跳轉
  const router = useRouter();
  // 獲取當前顏色主題（深色/淺色）
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  // 控制下拉選單的顯示/隱藏狀態
  const [menuOpen, setMenuOpen] = useState(false);
  // 當螢幕寬度小於 600px 時，顯示漢堡選單按鈕而不是完整導航項
  const showMenuButton = width < breakpoints.sm;
  
  // 下拉選單的動畫值，用於淡入淡出和滑動效果
  const [dropdownAnim] = useState(new Animated.Value(0));

  /**
   * 切換選單顯示/隱藏狀態
   * 同時觸發下拉選單的動畫效果
   */
  const handleMenuToggle = () => {
    setMenuOpen((open) => {
      // 使用 Animated API 建立平滑的動畫效果
      Animated.timing(dropdownAnim, {
        toValue: open ? 0 : 1, // 關閉時回到 0，打開時到 1
        duration: 200, // 動畫持續時間 200ms
        useNativeDriver: true, // 使用原生驅動，提升效能
      }).start();
      return !open;
    });
  };

  /**
   * 處理導航項點擊事件
   * @param route - 目標路由路徑
   */
  const handleNavItemPress = (route: string) => {
    setMenuOpen(false); // 關閉選單
    router.push(route as any); // 導航到目標頁面
  };

  return (
    <View className="w-full flex-row items-center justify-between bg-white dark:bg-neutral-900 px-6 py-3 shadow-md border-b border-gray-100 dark:border-neutral-800">
      {/* Left: React Logo */}
      <View className="flex-row items-center space-x-2">
        <Image
          source={require('../../assets/images/react-logo.png')}
          style={[
            {
              borderRadius: 9999,
              borderWidth: 1,
              borderColor: '#e5e7eb',
              backgroundColor: 'white',
            },
            Platform.OS === 'web' 
              ? { width: 24, height: 24 }
              : { width: 36, height: 36 }
          ]}
          resizeMode="contain"
          accessibilityLabel="React Logo"
        />
        <Text className={`${Platform.OS === 'web' ? 'text-lg' : 'text-xl'} font-bold text-blue-600 dark:text-blue-400 tracking-tight`}>Show me the money</Text>
      </View>
      {/* Right: Nav Items or Hamburger Menu Button */}
      {showMenuButton ? (
        <View style={{ position: 'relative' }}>
          <Pressable
            onPress={handleMenuToggle}
            style={({ pressed }) => [
              {
                padding: 8,
                borderRadius: 8,
                backgroundColor: isDark ? '#1f2937' : '#f3f4f6',
                borderWidth: 1,
                borderColor: isDark ? '#374151' : '#e5e7eb',
                alignItems: 'center',
                justifyContent: 'center',
              },
              pressed && {
                opacity: 0.7,
              },
            ]}
            accessibilityLabel="Open menu"
          >
            <Menu 
              stroke={isDark ? '#f3f4f6' : '#1f2937'} 
              width={24} 
              height={24} 
            />
          </Pressable>
          {menuOpen && (
            <Animated.View
              style={{
                position: 'absolute',
                right: 0,
                top: 48,
                opacity: dropdownAnim,
                transform: [
                  {
                    translateY: dropdownAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-10, 0],
                    }),
                  },
                ],
                width: 160,
                borderRadius: 12,
                backgroundColor: isDark ? '#171717' : '#ffffff',
                borderWidth: 1,
                borderColor: isDark ? '#333' : '#e5e7eb',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 5,
                zIndex: 1000,
                paddingVertical: 8,
                paddingHorizontal: 8,
              }}
            >
              {NAV_ITEMS.map((item) => (
                <Pressable
                  key={item.route}
                  onPress={() => handleNavItemPress(item.route)}
                  style={({ pressed }) => [
                    {
                      width: '100%',
                      paddingVertical: 12,
                      paddingHorizontal: 12,
                      borderRadius: 8,
                      backgroundColor: pressed 
                        ? (isDark ? '#f3f4f6' : '#1f2937')
                        : 'transparent',
                    },
                  ]}
                >
                  <Text 
                    style={{
                      fontSize: 16,
                      fontWeight: '500',
                      color: isDark ? '#f3f4f6' : '#1f2937',
                    }}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              ))}
            </Animated.View>
          )}
        </View>
      ) : (
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {NAV_ITEMS.map((item) => (
            <Pressable
              key={item.route}
              onPress={() => handleNavItemPress(item.route)}
              style={({ pressed }) => [
                {
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  borderRadius: 8,
                  marginHorizontal: 4,
                  backgroundColor: 'transparent',
                },
                pressed && {
                  backgroundColor: Platform.OS === 'web' ? '#f3f4f6' : '#e5e7eb',
                },
              ]}
            >
              <Text 
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: isDark ? '#1f2937' : '#f3f4f6',
                }}
              >
                {item.label}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

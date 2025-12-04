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
import { useAuthStore as useAuth } from '@/app/(store)/useAuthStore';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { Animated, Image, Pressable, Text, View } from 'react-native';

export default function TopUpBar() {
  // 獲取路由導航器，用於頁面跳轉
  const router = useRouter();

  // 控制下拉選單的顯示/隱藏狀態
  const [menuOpen, setMenuOpen] = useState(false);
  
  // 下拉選單的動畫值，用於淡入淡出和滑動效果
  const [dropdownAnim] = useState(new Animated.Value(0));

  const { t } = useTranslation();

  const { user } = useAuth();

  // 導航項配置：定義所有可用的導航連結
  const NAV_ITEMS = [
    { label: 'home', route: '/(tabs)' },
    { label: 'analysis', route: '/(tabs)/analysis' },
    { label: 'notice', route: '/(tabs)/notice' },
    // 根據登入狀態動態切換標籤頁
    user
      ? { label: 'profile', route: '/(tabs)/profile'}
      : { label: 'login', route: '/(tabs)/login'},
  ];

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
    <View className="w-full flex-row items-center justify-between h-16 bg-white dark:bg-neutral-900 px-6 py-3 shadow-md border-b border-gray-100 dark:border-neutral-800">
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
              width: 36,
              height: 36
            },
          ]}
          resizeMode="contain"
          accessibilityLabel="React Logo"
        />
        <Text className={`lg:text-lg font-bold text-blue-600 dark:text-blue-400 tracking-tight`}>Show me the money</Text>
      </View>
      {/*
      //TODO: dropdown menu using shadcn
      // Right: Nav Items or Hamburger Menu Button
      {showMenuButton ? (
        <View style={{ position: 'relative' }}>
          <Pressable
            onPress={handleMenuToggle}
            style={({ pressed }) => [
              {
                padding: 8,
                borderRadius: 8,
                backgroundColor: isBackgroundDarkMode ? '#1f2937' : '#f3f4f6',
                borderWidth: 1,
                borderColor: isBackgroundDarkMode ? '#374151' : '#e5e7eb',
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
              stroke={isBackgroundDarkMode ? '#f3f4f6' : '#1f2937'}
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
                backgroundColor: isBackgroundDarkMode ? '#171717' : '#ffffff',
                borderWidth: 1,
                borderColor: isBackgroundDarkMode ? '#333' : '#e5e7eb',
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
                        ? (isBackgroundDarkMode ? '#f3f4f6' : '#1f2937')
                        : 'transparent',
                    },
                  ]}
                >
                  <Text 
                    style={{
                      fontSize: 16,
                      fontWeight: '500',
                      color: isBackgroundDarkMode ? '#1f2937' : '#1f2937', //TODO: adjust colors
                    }}
                  >
                    {t(item.label)}
                  </Text>
                </Pressable>
              ))}
            </Animated.View>
          )}
        </View>
      ) : ( */}
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {NAV_ITEMS.map((item) => (
            <Pressable className={`px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-800`}
              key={item.route}
              onPress={() => handleNavItemPress(item.route)}
            >
              {item.label === 'profile' && user?.avatarUrl ?(
                <View className="w-7 h-7 rounded-full overflow-hidden mb-1 border-2 border-transparent">
                  <Image
                    source={{ uri: user.avatarUrl }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                  <View className="absolute inset-0 rounded-full border-2 border-blue-500 dark:border-blue-400" />

                </View>
              ) : (
                  <Text
                    className={`dark:text-[#244444] text-[#1f2937]`}
                    style={{
                      fontSize: 16,
                      fontWeight: '500',
                    }}
                  >
                    {t(item.label)}
                  </Text>
                  )}
            </Pressable>
          ))}
        </View>
      {/* )} */}
    </View>
  );
}

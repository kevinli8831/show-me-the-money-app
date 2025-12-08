/**
 * 底部導航欄組件 (BottomTabBar)
 * 
 * 功能：
 * 1. 在移動設備上顯示底部導航欄
 * 2. 包含三個導航項：Home、Login、Trip
 * 3. 使用 react-native-feather 圖示庫顯示圖示
 * 4. 支援深色/淺色主題
 * 5. 高亮顯示當前啟動的標籤頁
 * 6. 適配 iOS 安全區域（底部留白）
 * 
 * 使用場景：僅在移動設備（iOS/Android）使用
 */
import { useAuthStore as useAuth } from '@/app/store/useAuthStore'; // Corrected import path based on file tree
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { usePathname, useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Platform, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { BarChart, Bell, Home, LogIn, Plus, User } from 'react-native-feather';

// Allow it to receive props, even if we don't fully depend on them yet (we use router/pathname)
export default function BottomTabBar(props: Partial<BottomTabBarProps>) {
  // 獲取路由導航器，用於頁面跳轉
  const router = useRouter();
  // 獲取當前路徑，用於判斷哪個標籤頁處於啟動狀態
  const pathname = usePathname();

  const { t } = useTranslation();

  const { user } = useAuth();

  // 導航項配置：定義底部導航欄的所有標籤頁
  const NAV_ITEMS_LEFT = [
    { label: 'home', route: '/(tabs)', icon: Home },
    { label: 'analysis', route: '/(tabs)/analysis', icon: BarChart },
  ];

  const NAV_ITEMS_RIGHT = [
    { label: 'notice', route: '/(tabs)/notice', icon: Bell},
    // 根據登入狀態動態切換標籤頁
    user
      ? { label: 'profile', route: '/(tabs)/profile', icon: user.avatarUrl || User }
      : { label: 'login', route: '/(tabs)/login', icon: LogIn },
  ];

  const handleCreateActivity = () => {
    // 改成你實際的新建活動頁面路由
    router.push('/(tabs)');
  };
  /**
   * 處理標籤頁點擊事件
   * @param route - 目標路由路徑
   */
  const handleTabPress = (route: string) => {
    router.push(route as any);
  };

  return (
    <View
      className="flex-row border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#171717]"
      style={{
        paddingBottom: Platform.OS === 'ios' ? 20 : 12,
        paddingTop: 12,
        minHeight: 80,
      }}
    >
      {NAV_ITEMS_LEFT.map((item) => {
        // 檢查當前路徑是否匹配該導航項的路由，用於判斷啟動狀態
        const isActive = pathname === item.route ||
                        (item.route === '/(tabs)' && pathname === '/');

        return (
          <Pressable
            key={item.route}
            onPress={() => handleTabPress(item.route)}
            className="flex-1 items-center justify-center py-2 active:opacity-70"
          >
          <item.icon
            width={26}
            height={26}
            strokeWidth={2}
            stroke={isActive
              ? '#2563eb'
              : '#6b7280'
            }
            className={isActive ? 'dark:stroke-[#60a5fa]' : 'dark:stroke-[#9ca3af]'}
            style={{ marginBottom: 4 }}
          />
          {/* 文字標籤 */}
          <Text
            className={`text-xs font-medium ${
              isActive
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
              {t(item.label)}
            </Text>
          </Pressable>
        );
      })}
      <View className="items-center justify-center -mt-6">
        <TouchableOpacity
          onPress={handleCreateActivity}
          activeOpacity={0.8}
          className="w-16 h-16 bg-blue-600 rounded-full items-center justify-center shadow-lg shadow-black/30"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 10,
          }}
        >
          <Plus stroke="white" width={32} height={32} strokeWidth={3} />
        </TouchableOpacity>
      </View>
      {NAV_ITEMS_RIGHT.map((item) => {
        // 檢查當前路徑是否匹配該導航項的路由，用於判斷啟動狀態
        const isActive = pathname === item.route ||
                  (item.route === '/(tabs)' && pathname === '/');
        return (
          <Pressable
            key={item.route}
            onPress={() => handleTabPress(item.route)}
            className="flex-1 items-center justify-center py-2 active:opacity-70"
          >
            {/* 頭像或圖示 */}
            {item.label === 'profile' && user?.avatarUrl ? (
              <View className="w-7 h-7 rounded-full overflow-hidden mb-1 border-2 border-transparent">
                <Image
                  source={{ uri: user.avatarUrl }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
                {/* 活躍時加藍色邊框 */}
                {isActive && (
                  <View className="absolute inset-0 rounded-full border-2 border-blue-500 dark:border-blue-400" />
                )}
              </View>
            ) : (
              <item.icon
                width={26}
                height={26}
                strokeWidth={2}
                stroke={isActive
                  ? '#2563eb'
                  : '#6b7280'
                }
                className={isActive ? 'dark:stroke-[#60a5fa]' : 'dark:stroke-[#9ca3af]'}
                style={{ marginBottom: 4 }}
              />
            )}

            {/* 文字標籤 */}
            <Text
              className={`text-xs font-medium ${
                isActive
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              {t(item.label)}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
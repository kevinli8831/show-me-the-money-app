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

import { usePathname, useRouter } from 'expo-router';
import React from 'react';
import { Platform, Pressable, StyleSheet, Text, useColorScheme, View, Image } from 'react-native';
import { Home, LogIn, MapPin, User } from 'react-native-feather';
import { useAuth } from '@/hooks/useAuth';

// 導航項配置：定義底部導航欄的所有標籤頁
const NAV_ITEMS = [
  { label: 'Home', route: '/(tabs)', icon: Home },      // 首頁
  { label: 'Trip', route: '/(tabs)/trip', icon: MapPin },  // 行程頁
];

export default function BottomTabBar() {
  // 獲取路由導航器，用於頁面跳轉
  const router = useRouter();
  // 獲取當前路徑，用於判斷哪個標籤頁處於啟動狀態
  const pathname = usePathname();
  // 獲取當前顏色主題（深色/淺色）
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { user } = useAuth();
  console.log("user36:"+user)

  /**
   * 處理標籤頁點擊事件
   * @param route - 目標路由路徑
   */
  const handleTabPress = (route: string) => {
    router.push(route as any);
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark ? '#171717' : '#ffffff',
          borderTopColor: isDark ? '#333' : '#e5e7eb',
        },
      ]}>
      {NAV_ITEMS.map((item) => {
        // 檢查當前路徑是否匹配該導航項的路由，用於判斷啟動狀態
        const isActive = pathname === item.route;
        
        // 根據啟動狀態和主題設置圖示顏色
        // 啟動：藍色（淺色模式 #2563eb，深色模式 #60a5fa）
        // 未啟動：灰色（淺色模式 #6b7280，深色模式 #9ca3af）
        const iconColor = isActive
          ? isDark
            ? '#60a5fa'
            : '#2563eb'
          : isDark
            ? '#9ca3af'
            : '#6b7280';
        
        // 文字顏色與圖示顏色保持一致
        const textColor = isActive
          ? isDark
            ? '#60a5fa'
            : '#2563eb'
          : isDark
            ? '#9ca3af'
            : '#6b7280';

        // 獲取對應的圖示組件
        const IconComponent = item.icon;

        return (
          <Pressable
            key={item.route}
            onPress={() => handleTabPress(item.route)}
            style={({ pressed }) => [
              styles.tab,
              pressed && styles.tabPressed,
            ]}>
            <IconComponent 
              stroke={iconColor} 
              width={24} 
              height={24} 
              style={styles.icon}
            />
            <Text
              style={[
                styles.label,
                {
                  color: textColor,
                },
              ]}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
      {/* Profile / Login tab */}
      <Pressable
        onPress={() => router.push('/(tabs)/login')} // 假設有 profile 頁
        style={({ pressed }) => [
          styles.tab,
          pressed && styles.tabPressed,
        ]}>
        {user ? (
          <Image
            source={{ uri: user.avatarUrl || 'default-avatar-url' }}
            style={styles.avatarImage}
          />
        ) : (
          <User 
            stroke={pathname.includes('login') ? (isDark ? '#3b82f6' : '#2563eb') : (isDark ? '#9ca3af' : '#6b7280')} 
            width={24} 
            height={24} 
            style={styles.icon}
          />
        )}
        <Text
          style={[
            styles.label,
            { color: pathname.includes('profile') || pathname.includes('login') ? (isDark ? '#f3f4f6' : '#1f2937') : (isDark ? '#9ca3af' : '#6b7280') },
          ]}>
          {user ? 'Profile' : 'Login'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  // 容器樣式：底部導航欄的整體佈局
  container: {
    flexDirection: 'row', // 水平排列
    alignItems: 'center', // 垂直居中
    justifyContent: 'space-around', // 均勻分佈
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderTopWidth: 1, // 頂部邊框，分隔內容區域
    minHeight: 60, // 最小高度
    ...Platform.select({
      ios: {
        // iOS 設備需要額外的底部內邊距，適配安全區域（如 iPhone X 的底部指示器）
        paddingBottom: 20,
      },
    }),
  },
  // 單個標籤頁樣式
  tab: {
    flex: 1, // 平均分配空間
    alignItems: 'center', // 內容置中對齊
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  // 按下時的樣式
  tabPressed: {
    opacity: 0.7, // 降低透明度，提供視覺回饋
  },
  // 圖示樣式
  icon: {
    marginBottom: 4, // 圖示與文字之間的間距
  },
  // 標籤文字樣式
  label: {
    fontSize: 12,
    fontWeight: '500', // 中等粗細
  },
  avatarCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 4,
  },
  avatarImage: {
    width: 24,
    height: 24,
  },
});


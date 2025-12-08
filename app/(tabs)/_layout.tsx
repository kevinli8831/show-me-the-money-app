import BottomTabBar from '@/app/(components)/bottom-tab-bar';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        // Hide standard tab bar on web (we use the top bar)
        // On mobile, we use our custom tab bar
        tabBarStyle: Platform.OS === 'web' ? { display: 'none' } : {},
      }}
      tabBar={(props) => Platform.OS === 'web' ? null : <BottomTabBar {...props} />}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="trip"
        options={{
          title: 'Trip',
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          title: 'Login',
        }}
      />
      {/* 
        Ensure other routes that might be pushed to are registered here 
        or they will fall back to Stack or Modal 
      */}
      <Tabs.Screen name="analysis" options={{ title: 'Analysis' }} />
      <Tabs.Screen name="notice" options={{ title: 'Notice' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}

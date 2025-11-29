/**
 * 行程頁面組件 (Trip Page)
 * 
 * 功能：
 * 1. 顯示行程頁面內容
 * 2. 使用 NavigationWrapper 包裹，自動顯示底部導航欄（移動設備）
 * 
 * 路由：/(tabs)/trip
 * 
 * 注意：這是一個範例頁面，實際使用時需要新增行程列表和詳情功能
 */

import { Text, View } from "react-native";
import NavigationWrapper from "@/app/components/navigation-wrapper";
import React from "react";

export default function Trip() {
    return (
        <NavigationWrapper>
            <View className="flex-1 bg-white dark:bg-black items-center justify-center">
                <Text className="text-2xl font-bold mb-2">Trip</Text>
                <Text className="text-base text-gray-700 dark:text-gray-200">Trip page content</Text>
            </View>
        </NavigationWrapper>
    );
}


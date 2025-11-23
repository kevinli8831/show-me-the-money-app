/**
 * 登入頁面組件 (Login Page)
 * 
 * 功能：
 * 1. 顯示登入頁面內容
 * 2. 使用 NavigationWrapper 包裹，自動顯示底部導航欄（移動設備）
 * 
 * 路由：/(tabs)/login
 * 
 * 注意：這是一個範例頁面，實際使用時需要新增登入表單和邏輯
 */

import { Text, View } from "react-native";
import { NavigationWrapper } from "../components/navigation-wrapper";

export default function Login() {
    return (
        <NavigationWrapper>
            <View className="flex-1 bg-white dark:bg-black items-center justify-center">
                <Text className="text-2xl font-bold mb-2">Login</Text>
                <Text className="text-base text-gray-700 dark:text-gray-200">Login page content</Text>
            </View>
        </NavigationWrapper>
    );
}


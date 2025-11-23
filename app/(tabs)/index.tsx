/**
 * 首頁組件 (Index/Home Page)
 * 
 * 功能：
 * 1. 使用 React Query 從 GitHub API 獲取資料
 * 2. 顯示載入狀態和錯誤處理
 * 3. 展示獲取到的倉庫資訊
 * 4. 使用 NavigationWrapper 包裹，自動顯示底部導航欄（移動設備）
 * 
 * 路由：/(tabs) 或 /
 */

import {
    useQuery
} from '@tanstack/react-query';
import { Text, View } from "react-native";
import { NavigationWrapper } from "../components/navigation-wrapper";

export default function Index() {
    // 使用 React Query 獲取 GitHub 倉庫資料
    // queryKey: 快取鍵，用於標識這個查詢
    // queryFn: 查詢函數，執行實際的資料獲取
    const { isPending, error, data } = useQuery({
        queryKey: ['repoData'],
        queryFn: () =>
            fetch('https://api.github.com/repos/TanStack/query').then((res) =>
                res.json(),
            ),
    })


    // 顯示載入狀態
    if (isPending) return <Text>Loading...</Text>;

    // 顯示錯誤資訊
    if (error) return <Text>An error has occurred: {error.message}</Text>;

    // 渲染主要內容
    return (
        <NavigationWrapper>
            <View className="flex-1 bg-white dark:bg-black items-center justify-center">
                {/* 顯示倉庫名稱 */}
                <Text className="text-2xl font-bold mb-2">{data.name}</Text>
                {/* 顯示倉庫描述 */}
                <Text className="text-base text-gray-700 dark:text-gray-200">{data.description}</Text>
            </View>
        </NavigationWrapper>
    );
}


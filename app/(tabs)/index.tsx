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

import { useQuery } from '@tanstack/react-query';
import { View } from "react-native";
import { Button } from '../../components/ui/button';
import { Text } from '../../components/ui/text';
import NavigationWrapper from "@/app/(components)/navigation-wrapper";
import React from 'react';

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
    if (isPending) return (
        <NavigationWrapper>
            <View className="flex-1 items-center justify-center">
                <Text>Loading...</Text>
            </View>
        </NavigationWrapper>
    );

    // 顯示錯誤資訊
    if (error) return (
        <NavigationWrapper>
            <View className="flex-1 items-center justify-center">
                <Text>An error has occurred: {error.message}</Text>
            </View>
        </NavigationWrapper>
    );

    // 渲染主要內容
    return (
        <NavigationWrapper>
            <View className="flex-1 bg-white dark:bg-background items-center justify-center gap-4 p-4">
                <Text variant="h1" className="mb-4">NativeWind v4 + Reusables</Text>

                <Text className="text-center mb-4">
                    Repo: {data.name}
                </Text>

                <View className="flex-row flex-wrap gap-4 justify-center">
                    <Button onPress={() => console.log('Default pressed')}>
                        <Text>Default Button</Text>
                    </Button>

                    <Button variant="destructive" onPress={() => console.log('Destructive pressed')}>
                        <Text>Destructive</Text>
                    </Button>

                    <Button variant="outline" onPress={() => console.log('Outline pressed')}>
                        <Text>Outline</Text>
                    </Button>

                    <Button variant="secondary" onPress={() => console.log('Secondary pressed')}>
                        <Text>Secondary</Text>
                    </Button>

                    <Button variant="ghost" onPress={() => console.log('Ghost pressed')}>
                        <Text>Ghost</Text>
                    </Button>
                </View>
            </View>
        </NavigationWrapper>
    );
}


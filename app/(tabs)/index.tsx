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

import NavigationWrapper from "@/app/(components)/navigation-wrapper";
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from "react-native";
import { Button } from '../../components/ui/button';
import { Text } from '../../components/ui/text';
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';

export default function Index() {

    const { t, i18n } = useTranslation();

    // const fetchTrip = async ({ queryKey }: { queryKey: any }) => {
    // const [_, id] = queryKey;
    // const { data } = await axios.get(`https://show-me-the-money-svc-production.up.railway.app/trips/${id}`);
    //     // 如果你有 auth header：
    //     // axios.get(url, { headers: { Authorization: `Bearer ${token}` } })

    //     return data;
    // };

    // const tripId = null; // hard code temp

    // const {
    //     data: trip,
    //     isPending,
    //     error,
    //     refetch,
    // } = useQuery({
    //     queryKey: ['id', tripId],
    //     queryFn: fetchTrip,
    //     enabled: !!tripId,
    //     staleTime: 1000 * 60 * 5,
    // });

    // // 顯示載入狀態
    // if (isPending) return (
    //     <NavigationWrapper>
    //         <View className="flex-1 items-center justify-center">
    //             <Text>Loading...</Text>
    //         </View>
    //     </NavigationWrapper>
    // );

    // // 顯示錯誤資訊
    // if (error) return (
    //     <NavigationWrapper>
    //         <View className="flex-1 items-center justify-center">
    //             <Text>An error has occurred: {error.message}</Text>
    //         </View>
    //     </NavigationWrapper>
    // );

    // 渲染主要內容
    return (
        <NavigationWrapper>
            <View className="flex-1 bg-white dark:bg-background items-center justify-center gap-4 p-4">
                <Text variant="h1" className="mb-4">傍水</Text>
                <Text className="text-center mb-4">
                    Trip:
                </Text>

                <View className="flex-row flex-wrap gap-4 justify-center">
                    <Button onPress={() => console.log('Default pressed')}>
                        <Text>Create Your Activity</Text>
                    </Button>
                </View>
            </View>
        </NavigationWrapper>
    );
}


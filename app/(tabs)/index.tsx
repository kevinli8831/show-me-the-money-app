import NavigationWrapper from "@/app/(components)/navigation-wrapper";
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from "react-native";
import { Button } from '../../components/ui/button';
import { Text } from '../../components/ui/text';

export default function Index() {
    const { t, i18n } = useTranslation();

    // const fetchTrip = async ({ queryKey }: { queryKey: any }) => {
    // const [_, id] = queryKey;
    // const { data } = await axios.get(`https://show-me-the-money-svc-production.up.railway.app/trips/${id}`);
    //     // 如果你有 auth header：
    //     // axios.get(url, { headers: { Authorization: `Bearer ${token}` } })

    //     return data;
    // };

    // const tripId = "60"; // hard code temp

    // const {
    //     data: trip,
    //     isPending,
    //     error,
    //     refetch,
    // } = useQuery({
    //     queryKey: ['id', tripId],
    //     queryFn: fetchTrip,
    //     enabled: false,
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
                <Text variant="h1" className="mb-4">NativeWind v4 + Reusables</Text>

                <Text>{t('loading')}</Text>
                <Text className="text-center mb-4">
                    Trip: 
                </Text>

                <View className="flex-row flex-wrap gap-4 justify-center">
                    <Button onPress={() => console.log('Default pressed')}>
                        <Text>Create Your Event</Text>
                    </Button>
                </View>

                <View style={{ flexDirection: 'row', gap: 10 }}>
                    <Button onPress={() => i18n.changeLanguage('zh-HK')}>
                        <Text>HK</Text>
                    </Button>
                    <Button onPress={() => i18n.changeLanguage('en')}>
                        <Text>EN</Text>
                    </Button>
                </View>
            </View>
        </NavigationWrapper>
    );
}


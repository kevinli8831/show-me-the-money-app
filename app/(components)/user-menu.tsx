import { API_BASE_URL } from '@/lib/config';
import { useAuthStore as useAuth } from '@/app/store/useAuthStore';
import { UserShortDesc } from '@/app/components/userShortDesc';
import { UserAvatar } from '@/app/components/userAvatar';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Text } from '@/components/ui/text';
import type { TriggerRef } from '@rn-primitives/popover';
import { LogOutIcon, SettingsIcon} from 'lucide-react-native';
import * as React from 'react';
import { View } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next'


export function UserMenu() {

    const { user } = useAuth();
    const router = useRouter();
    const { t } = useTranslation();
    const logout = useAuth((state) => state.logout);

    const popoverTriggerRef = React.useRef<TriggerRef>(null);

    const onSignOut = async () => {
        popoverTriggerRef.current?.close();

        try {
            // 直接 await 拿到 token（支援你所有可能的儲存方式）
            const accessToken = useAuth.getState().accessToken;

            // 有 token 才打後端
            if (accessToken) {
                await axios.post(                          // ← 這裡可以安心用 await
                    `${API_BASE_URL}/auth/logout`,
                    {},// body
                    {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,  // ← Bearer 要大寫
                    },
                    }
                );
            }
        } catch (error) {
            console.log('Force logout');
        } finally {
            await AsyncStorage.clear();
            logout();
            router.replace('/');
        }
    };

    return (
        <Popover>
            <PopoverTrigger asChild ref={popoverTriggerRef}>
                <Button variant="ghost" size="icon" className="size-8 rounded-full">
                    <UserAvatar className='size-10 border-background web:border-0 web:ring-2 web:ring-background border-2'/>
                </Button>
            </PopoverTrigger>
            <PopoverContent align="center" side="bottom" className="w-80 p-0">
                <View className="border-border gap-3 border-b p-3">
                    <View className="flex-row items-center gap-3">
                        <UserAvatar className="size-10" />
                        <View className="flex-1">
                            <Text className="font-medium leading-5">{user?.name}</Text>
                            {user?.name?.length ? (
                                <Text className="text-muted-foreground text-sm font-normal leading-4">
                                {user?.name}
                                </Text>
                            ) : null}
                        </View>
                    </View>
                    <View className="flex-row flex-wrap gap-3 py-0.5">
                        <Button
                            variant="outline"
                            size="sm"
                            onPress={() => {
                                // TODO: Navigate to account settings screen
                            }}>
                            <Icon as={SettingsIcon} className="size-4" />
                            <Text>{t('manageAccount')}</Text>
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1" onPress={onSignOut}>
                            <Icon as={LogOutIcon} className="size-4" />
                            <Text>{t('logout')}</Text>
                        </Button>
                    </View>
                </View>
            </PopoverContent>
        </Popover>
    );
}
  import { useMutation } from '@tanstack/react-query';
  import {
    Alert,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    useColorScheme,
    View
  } from 'react-native';
  import { NavigationWrapper } from '../components/navigation-wrapper';
  import Constants from 'expo-constants';

  export default function Login() {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    const API_BASE_URL = Constants.expoConfig?.extra?.apiBaseUrl;

    const mutation = useMutation({
      mutationFn: async () => {
        const res = await fetch(`${API_BASE_URL}/auth/google`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(text.trim() || res.statusText || 'Login failed');
        }
        return res.json();
      },

      onSuccess: (data) => {
        Alert.alert('Login success', 'Welcome back!');
        console.log('Login success:', data);
      },

      onError: (error: any) => {
        console.error('Login error:', error);
        Alert.alert('Login Failed', error.message || 'Please try again.');
      },
    });

    const handleGoogleLogin = () => {
      mutation.reset();        // 清除舊的錯誤狀態
      mutation.mutate();       // 觸發登入
    };

    return (
      <NavigationWrapper>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          {/* 整個登入卡片外框 */}
          <View style={[styles.card, isDark && styles.cardDark]}>
            {/* 標題 */}
            <Text style={[styles.title, { color: isDark ? '#f3f4f6' : '#1f2937' }]}>
              Log in
            </Text>

            {/* Google 登入按鈕 */}
            <Pressable
              onPress={handleGoogleLogin}
              disabled={mutation.isPending}
              style={[
                styles.googleButton,
                mutation.isPending && styles.googleButtonDisabled,
              ]}
            >
              <Image
                source={{ uri: 'https://developers.google.com/identity/images/g-logo.png' }}
                style={styles.googleLogo}
              />
              <Text style={styles.googleButtonText}>
                {mutation.isPending ? 'is loading...' : 'Continue with Google'}
              </Text>
            </Pressable>

            {/* 錯誤訊息 */}
            {mutation.isError && (
              <Text style={styles.errorText}>
              {'System error, please try again.'}
              </Text>
            )}

            {/* 成功訊息 */}
            {mutation.isSuccess && (
              <View style={styles.successContainer}>
                <Text style={styles.successText}>Login Success！</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </NavigationWrapper>
    );
  }

  const styles = StyleSheet.create({
    // 讓內容永遠在畫面正中間
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#f3f4f6', // 淺色背景
    },

    // 登入卡片外框
    card: {
      width: '100%',
      maxWidth: 420,
      backgroundColor: '#ffffff',
      borderRadius: 20,
      padding: 40,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.15,
      shadowRadius: 20,
      elevation: 20,
      alignItems: 'center',
    },
    cardDark: {
      backgroundColor: '#111827',
      shadowColor: '#000',
    },

    title: {
      fontSize: 36,
      fontWeight: 'bold',
      marginBottom: 40,
      textAlign: 'center',
    },

    googleButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#4285f4',
      height: 56,
      width: '100%',
      borderRadius: 12,
      gap: 16,
    },
    googleButtonDisabled: {
      opacity: 0.7,
    },
    googleLogo: {
      width: 24,
      height: 24,
    },
    googleButtonText: {
      color: '#ffffff',
      fontSize: 17,
      fontWeight: '600',
    },

    // 錯誤訊息區塊
    errorContainer: {
      marginTop: 24,
      padding: 16,
      backgroundColor: '#fee2e2',
      borderRadius: 12,
      width: '100%',
      borderWidth: 1,
      borderColor: '#fecaca',
    },
    errorText: {
      color: '#dc2626',
      fontSize: 15,
      textAlign: 'center',
      fontWeight: '500',
    },

    // 成功訊息
    successContainer: {
      marginTop: 24,
      padding: 16,
      backgroundColor: '#dcfce7',
      borderRadius: 12,
      width: '100%',
      borderWidth: 1,
      borderColor: '#bbf7d0',
    },
    successText: {
      color: '#16a34a',
      fontSize: 15,
      textAlign: 'center',
      fontWeight: '500',
    },
  });
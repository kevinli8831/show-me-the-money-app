import { useMutation } from '@tanstack/react-query';
import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native';
import NavigationWrapper from '@/components/navigation-wrapper';

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;
  console.log('redirectUri', AuthSession.makeRedirectUri({ scheme: 'showmethemoney' }));
  
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
    responseType: 'code',
    usePKCE: true,
    shouldAutoExchangeCode:false,
    redirectUri: AuthSession.makeRedirectUri({ scheme: 'showmethemoney' }),
    scopes: ['profile', 'email'],
  });

  // 用 useMutation 封裝「把 idToken 送去後端」的邏輯
  const mutation = useMutation({
    mutationFn: async (code: string) => {
      const res = await fetch(`${API_BASE_URL}/auth/google/exchange`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, redirectUri: AuthSession.makeRedirectUri({ scheme: 'showmethemoney' }), codeVerifier: request?.codeVerifier }),
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

  const handleGoogleLogin = async () => {
    // mutation.reset(); // 清除舊錯誤
    try {
      const result = await promptAsync();
      if (result.type === 'success' && result.params.code) {
        const { code } = result.params;  // 攞code（如果auto exchange fail，呢度仲有code）
        console.log(code);
        console.log(result);
        // 即時傳畀後端，唔等response變token
        mutation.mutate(code);
        if (mutation.data) {
          // 存JWT，登入成功
          console.log('User:', mutation.data);
        }
      } else if (result.type === 'error') {
        console.log('Error:', result.error);  // 睇full error
      }
    } catch (error) {
      console.error('Login error:', error);
    }
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
            disabled={!request || mutation.isPending}
            style={[
              styles.googleButton,
              (!request || mutation.isPending) && styles.googleButtonDisabled,
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
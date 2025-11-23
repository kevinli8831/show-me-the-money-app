/**
 * 登入頁面組件 (Login Page)
 * 
 * 功能：
 * 1. 顯示登入/註冊切換按鈕
 * 2. 登入模式：顯示用戶名和密碼輸入框
 * 3. 註冊模式：顯示用戶名、密碼、郵箱和電話輸入框
 * 4. 使用 NavigationWrapper 包裹，自動顯示底部導航欄（移動設備）
 * 
 * 路由：/(tabs)/login
 */

import { useState } from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    useColorScheme,
    View
} from "react-native";
import { NavigationWrapper } from "../components/navigation-wrapper";

type FormMode = 'login' | 'register';

export default function Login() {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    const [mode, setMode] = useState<FormMode>('login');
    
    // 表單狀態
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    // 輸入框樣式
    const inputStyle = [
        styles.input,
        {
            backgroundColor: isDark ? '#1f2937' : '#f9fafb',
            borderColor: isDark ? '#374151' : '#e5e7eb',
            color: isDark ? '#f3f4f6' : '#1f2937',
        },
    ];

    const placeholderTextColor = isDark ? '#9ca3af' : '#6b7280';

    return (
        <NavigationWrapper>
            <ScrollView 
                contentContainerStyle={[
                    styles.container,
                    { backgroundColor: isDark ? '#000000' : '#ffffff' }
                ]}
            >
                <View style={styles.content}>
                    {/* 標題 */}
                    <Text style={[
                        styles.title,
                        { color: isDark ? '#f3f4f6' : '#1f2937' }
                    ]}>
                        {mode === 'login' ? 'Login' : 'Register'}
                    </Text>

                    {/* 切換按鈕 */}
                    <View style={styles.toggleContainer}>
                        <Pressable
                            onPress={() => setMode('login')}
                            style={[
                                styles.toggleButton,
                                mode === 'login' && styles.toggleButtonActive,
                                {
                                    backgroundColor: mode === 'login'
                                        ? (isDark ? '#2563eb' : '#3b82f6')
                                        : (isDark ? '#1f2937' : '#f3f4f6'),
                                }
                            ]}
                        >
                            <Text style={[
                                styles.toggleButtonText,
                                {
                                    color: mode === 'login'
                                        ? '#ffffff'
                                        : (isDark ? '#9ca3af' : '#6b7280'),
                                }
                            ]}>
                                Login
                            </Text>
                        </Pressable>
                        <Pressable
                            onPress={() => setMode('register')}
                            style={[
                                styles.toggleButton,
                                mode === 'register' && styles.toggleButtonActive,
                                {
                                    backgroundColor: mode === 'register'
                                        ? (isDark ? '#2563eb' : '#3b82f6')
                                        : (isDark ? '#1f2937' : '#f3f4f6'),
                                }
                            ]}
                        >
                            <Text style={[
                                styles.toggleButtonText,
                                {
                                    color: mode === 'register'
                                        ? '#ffffff'
                                        : (isDark ? '#9ca3af' : '#6b7280'),
                                }
                            ]}>
                                Register
                            </Text>
                        </Pressable>
                    </View>

                    {/* 表單 */}
                    <View style={styles.form}>
                        {/* 用戶名 */}
                        <View style={styles.inputGroup}>
                            <Text style={[
                                styles.label,
                                { color: isDark ? '#f3f4f6' : '#1f2937' }
                            ]}>
                                Username
                            </Text>
                            <TextInput
                                style={inputStyle}
                                placeholder="Please enter your username"
                                placeholderTextColor={placeholderTextColor}
                                value={username}
                                onChangeText={setUsername}
                                autoCapitalize="none"
                            />
                        </View>

                        {/* 密碼 */}
                        <View style={styles.inputGroup}>
                            <Text style={[
                                styles.label,
                                { color: isDark ? '#f3f4f6' : '#1f2937' }
                            ]}>
                                Password
                            </Text>
                            <TextInput
                                style={inputStyle}
                                placeholder="Please enter your password"
                                placeholderTextColor={placeholderTextColor}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                autoCapitalize="none"
                            />
                        </View>

                        {/* 註冊模式：顯示郵箱和電話 */}
                        {mode === 'register' && (
                            <>
                                {/* 郵箱 */}
                                <View style={styles.inputGroup}>
                                    <Text style={[
                                        styles.label,
                                        { color: isDark ? '#f3f4f6' : '#1f2937' }
                                    ]}>
                                        Email
                                    </Text>
                                    <TextInput
                                        style={inputStyle}
                                        placeholder="Please enter your email"
                                        placeholderTextColor={placeholderTextColor}
                                        value={email}
                                        onChangeText={setEmail}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                    />
                                </View>

                                {/* 電話 */}
                                <View style={styles.inputGroup}>
                                    <Text style={[
                                        styles.label,
                                        { color: isDark ? '#f3f4f6' : '#1f2937' }
                                    ]}>
                                        Phone
                                    </Text>
                                    <TextInput
                                        style={inputStyle}
                                        placeholder="Please enter your phone number"
                                        placeholderTextColor={placeholderTextColor}
                                        value={phone}
                                        onChangeText={setPhone}
                                        keyboardType="phone-pad"
                                    />
                                </View>
                            </>
                        )}

                        {/* 提交按鈕 */}
                        <Pressable
                            style={[
                                styles.submitButton,
                                {
                                    backgroundColor: isDark ? '#2563eb' : '#3b82f6',
                                }
                            ]}
                            onPress={() => {
                                // TODO: 實作登入/註冊邏輯
                                console.log(mode === 'login' ? 'Login' : 'Register', {
                                    username,
                                    password,
                                    ...(mode === 'register' && { email, phone }),
                                });
                            }}
                        >
                            <Text style={styles.submitButtonText}>
                                {mode === 'login' ? 'Login' : 'Register'}
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </NavigationWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
    },
    content: {
        width: '100%',
        maxWidth: 400,
        alignSelf: 'center',
        marginTop: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    toggleContainer: {
        flexDirection: 'row',
        marginBottom: 30,
        borderRadius: 8,
        padding: 4,
        backgroundColor: '#f3f4f6',
    },
    toggleButton: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 6,
        alignItems: 'center',
    },
    toggleButtonActive: {
        // Active state handled by backgroundColor
    },
    toggleButtonText: {
        fontSize: 16,
        fontWeight: '600',
    },
    form: {
        gap: 20,
    },
    inputGroup: {
        gap: 8,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        fontSize: 16,
    },
    submitButton: {
        height: 50,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    submitButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
});


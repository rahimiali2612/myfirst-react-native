import { Slot, Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

import { AuthProvider } from '../contexts/AuthContext';
import { refreshService } from '../services/authService';
import '../global.css';

// Define which screens use the tabs layout
export const unstable_settings = {
  initialRouteName: 'index',
};

export default function RootLayout() {
  const router = useRouter();
  React.useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        router.replace('/login');
        return;
      }
      try {
        // Try to refresh the token (will fail if expired)
        const data = await refreshService(token);
        await AsyncStorage.setItem('token', data.token);
        await AsyncStorage.setItem('user', JSON.stringify(data.user));
        router.replace('/(tabs)');
      } catch (error) {
        // If refresh fails, remove token and redirect to login
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('user');
        router.replace('/login');
      }
    })();
  }, [router]);
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="login" />
          <Stack.Screen name="(tabs)" />
        </Stack>
        <StatusBar style="auto" />
      </AuthProvider>
    </SafeAreaProvider>
  );
}

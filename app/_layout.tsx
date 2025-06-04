import { Slot, Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { AuthProvider, useAuth } from '../context/auth';
import '../global.css';

function AuthGate({ children }: { children: React.ReactNode }) {
  const { token, loading, refresh, logout } = useAuth();
  const router = require('expo-router').useRouter();

  React.useEffect(() => {
    // Check connection by calling refresh (which pings the backend)
    let cancelled = false;
    const checkConnection = async () => {
      try {
        if (token) {
          await refresh();
        }
      } catch (error) {
        if (!cancelled) {
          if (typeof logout === 'function') {
            await logout();
          }
          router.replace('/login');
        }
      }
    };
    if (!loading && token) {
      checkConnection();
    }
    return () => {
      cancelled = true;
    };
  }, [token, loading, refresh, logout, router]);

  React.useEffect(() => {
    if (!loading && !token) {
      router.replace('/login');
    } else if (!loading && token) {
      // If the user has a token and is on login page, redirect them to home
      if (router.pathname === '/login') {
        router.replace('/(tabs)');
      }
    }
  }, [token, loading, router]);

  if (loading) return null;
  return <>{children}</>;
}

// Define which screens use the tabs layout
export const unstable_settings = {
  initialRouteName: 'index',
};

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AuthGate>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="login" />
            <Stack.Screen name="(tabs)" />
          </Stack>
          <StatusBar style="auto" />
        </AuthGate>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

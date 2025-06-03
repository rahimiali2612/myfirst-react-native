import React from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function LogoutScreen() {
  const router = useRouter();

  React.useEffect(() => {
    // Simulate logout process
    const timer = setTimeout(() => {
      // Show confirmation
      Alert.alert('Logged Out', 'You have been successfully logged out.', [
        {
          text: 'OK',
          onPress: () => router.replace('/'),
        },
      ]);
    }, 1500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 items-center justify-center px-6">
        <View className="mb-6 rounded-full bg-blue-100 p-4">
          <Ionicons name="log-out" size={48} color="#3b82f6" />
        </View>
        <Text className="mb-8 text-center text-2xl font-bold text-gray-800">Signing Out</Text>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text className="mt-6 text-center text-gray-500">
          Please wait while we complete the logout process...
        </Text>
      </View>
    </SafeAreaView>
  );
}

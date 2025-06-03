import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { ScreenContent } from '../components/ScreenContent';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1">
      <ScreenContent title="Home" path="app/index.tsx">
        <View className="px-4">
          <Text className="mt-4 text-center text-gray-500">Welcome to the Home Screen!</Text>

          <View className="mt-6 space-y-4">
            <View className="rounded-lg bg-blue-50 p-4">
              <Text className="text-lg font-medium text-blue-600">Recent Activity</Text>
              <Text className="mt-2 text-gray-600">Your recent activity will appear here.</Text>
            </View>

            <View className="rounded-lg bg-green-50 p-4">
              <Text className="text-lg font-medium text-green-600">Notifications</Text>
              <Text className="mt-2 text-gray-600">You have no new notifications.</Text>
            </View>

            <View className="rounded-lg bg-purple-50 p-4">
              <Text className="text-lg font-medium text-purple-600">Quick Actions</Text>
              <Text className="mt-2 text-gray-600">Frequently used actions will appear here.</Text>
            </View>
          </View>
        </View>
      </ScreenContent>
    </SafeAreaView>
  );
}

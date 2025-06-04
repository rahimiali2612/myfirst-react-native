import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenContent } from '../../components/ScreenContent';
import { useAuth } from '../../context/auth';
import { Ionicons } from '@expo/vector-icons';
import { API_URL } from '../../app-env';

export default function ProfileScreen() {
  const { user, token, refresh } = useAuth();
  const [testingRefresh, setTestingRefresh] = useState(false);
  const [testingUserInfo, setTestingUserInfo] = useState(false);

  const testTokenRefresh = async () => {
    setTestingRefresh(true);
    try {
      await refresh();
      Alert.alert(
        'Token Refresh',
        'Token refresh attempt completed. Check console logs for details.'
      );
    } catch (error) {
      console.error('Manual token refresh error:', error);
      Alert.alert('Token Refresh Error', 'Failed to refresh token. See console for details.');
    } finally {
      setTestingRefresh(false);
    }
  };

  const testUserInfo = async () => {
    if (!token) {
      Alert.alert('Error', 'No authentication token available');
      return;
    }

    setTestingUserInfo(true);
    try {
      console.log(`Making user info request to: ${API_URL}/api/auth/me`);
      console.log(`Using token: ${token.substring(0, 15)}...`);

      const response = await fetch(`${API_URL}/api/auth/me`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(`User info response status: ${response.status}`);

      if (!response.ok) {
        const errorText = await response.text();
        console.log('Error response:', errorText);
        Alert.alert('API Error', `Failed to get user info. Status: ${response.status}`);
        return;
      }

      const data = await response.json();
      Alert.alert('Success', 'User info retrieved successfully');
      console.log('User info data:', JSON.stringify(data));
    } catch (error) {
      console.error('User info error:', error);
      Alert.alert('Error', 'Failed to fetch user info. See console for details.');
    } finally {
      setTestingUserInfo(false);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <ScreenContent title="Profile" path="app/(tabs)/profile.tsx">
        <View className="flex-1 px-4">
          <View className="mb-6 items-center pt-4">
            <View className="mb-3 rounded-full bg-blue-100 p-5">
              <Ionicons name="person" size={60} color="#3b82f6" />
            </View>
            <Text className="text-2xl font-bold text-gray-800">{user?.name || 'User'}</Text>
            <Text className="text-gray-500">{user?.email || 'user@example.com'}</Text>
          </View>

          <View className="mb-4 overflow-hidden rounded-lg bg-white shadow-sm">
            <View className="border-b border-gray-200 px-4 py-3">
              <Text className="font-medium text-gray-800">Account Information</Text>
            </View>

            <View className="flex-row items-center justify-between px-4 py-3">
              <Text className="text-gray-600">User ID</Text>
              <Text className="font-medium text-gray-800">#{user?.id || '0'}</Text>
            </View>

            <View className="flex-row items-center justify-between border-t border-gray-100 px-4 py-3">
              <Text className="text-gray-600">Roles</Text>
              <View className="flex-row space-x-1">
                {user?.roles?.map((role: string) => (
                  <View key={role} className="rounded bg-blue-50 px-2 py-1">
                    <Text className="text-xs text-blue-600">{role}</Text>
                  </View>
                )) || (
                  <View className="rounded bg-gray-50 px-2 py-1">
                    <Text className="text-xs text-gray-600">No roles</Text>
                  </View>
                )}
              </View>
            </View>

            <View className="flex-row items-center justify-between border-t border-gray-100 px-4 py-3">
              <Text className="text-gray-600">Joined</Text>
              <Text className="text-gray-800">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}{' '}
              </Text>
            </View>
          </View>

          {/* Test buttons */}
          <View className="mt-6 space-y-3">
            <TouchableOpacity
              className="flex-row items-center justify-center rounded-lg bg-blue-600 px-4 py-3"
              onPress={testTokenRefresh}
              disabled={testingRefresh}>
              {testingRefresh ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <>
                  <Ionicons name="refresh" size={20} color="#fff" className="mr-2" />
                  <Text className="ml-2 font-medium text-white">Test Token Refresh</Text>
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row items-center justify-center rounded-lg bg-green-600 px-4 py-3"
              onPress={testUserInfo}
              disabled={testingUserInfo}>
              {testingUserInfo ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <>
                  <Ionicons name="person" size={20} color="#fff" className="mr-2" />
                  <Text className="ml-2 font-medium text-white">Test User Info API</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScreenContent>
    </SafeAreaView>
  );
}

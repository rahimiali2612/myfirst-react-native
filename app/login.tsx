import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Keyboard,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/auth';
import { API_URL } from '../app-env';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('admin1234');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login, logout } = useAuth();

  const handleLogin = async () => {
    setLoading(true);
    try {
      console.log(`Attempting to connect to: ${API_URL}/api/auth/login`);

      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      // Log only status for debugging
      console.log('Login response status:', response.status);

      if (!response.ok) {
        if (response.status === 401) {
          Alert.alert('Login Failed', 'Invalid email or password');
        } else {
          Alert.alert('Login Failed', `Server returned status: ${response.status}`);
        }
        setLoading(false);
        return;
      }
      const data = await response.json();
      if (data.token) {
        await login(data.token, data.user);
        router.replace('/(tabs)');
      } else {
        Alert.alert('Login Failed', 'Server response missing token');
      }
    } catch (error) {
      console.error('Login error:', error);

      // More detailed network error handling
      if (error instanceof TypeError && error.message.includes('Network request failed')) {
        // If the backend is down, log out the user automatically
        if (typeof logout === 'function') {
          await logout();
        }
        Alert.alert(
          'Connection Error',
          `Could not connect to the server at ${API_URL}. You have been logged out.\n\n` +
            'This might be because:\n' +
            '1. The server is not running\n' +
            '2. The IP address is incorrect\n' +
            '3. Your device is not on the same network as the server\n\n' +
            'Please check your connection and try again.'
        );
      } else {
        Alert.alert('Login Error', 'An unexpected error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Pressable className="flex-1" onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 bg-white">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1 justify-center px-6">
          <View className="mb-10 items-center">
            <View className="mb-4 h-24 w-24 items-center justify-center rounded-full bg-blue-50">
              <Ionicons name="lock-closed" size={40} color="#3b82f6" />
            </View>
            <Text className="text-center text-3xl font-bold text-gray-800">Welcome Back</Text>
            <Text className="mt-2 text-center text-gray-500">Sign in to your account</Text>
          </View>

          <View className="space-y-4">
            <View>
              <Text className="mb-2 ml-1 font-medium text-gray-700">Email</Text>
              <View className="flex-row items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                <Ionicons name="mail-outline" size={20} color="#6b7280" />
                <TextInput
                  className="flex-1 pl-3 text-gray-800"
                  placeholder="Enter your email"
                  placeholderTextColor="#9ca3af"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>

            <View>
              <Text className="mb-2 ml-1 font-medium text-gray-700">Password</Text>
              <View className="flex-row items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                <Ionicons name="lock-closed-outline" size={20} color="#6b7280" />
                <TextInput
                  className="flex-1 pl-3 text-gray-800"
                  placeholder="Enter your password"
                  placeholderTextColor="#9ca3af"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>
            </View>

            <TouchableOpacity
              className="mt-6 rounded-xl bg-blue-600 py-4"
              onPress={handleLogin}
              disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-center text-lg font-bold text-white">Sign In</Text>
              )}
            </TouchableOpacity>
          </View>

          <Text className="mt-8 text-center text-gray-500">Demo credentials are pre-filled</Text>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Pressable>
  );
}

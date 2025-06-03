import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ScreenContent } from '../components/ScreenContent';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAtom } from 'jotai';
import { navigationStateAtom } from '../context/navigationState';

export default function ProfileScreen() {
  const [navigationState, setNavigationState] = useAtom(navigationStateAtom);

  // Update navigation state to 'Profile' when this screen mounts
  React.useEffect(() => {
    setNavigationState({ currentRoute: 'Profile' });
  }, [setNavigationState]);

  return (
    <SafeAreaView className="flex-1">
      <ScreenContent title="Profile" path="app/profile.tsx">
        <View className="mt-4 items-center">
          <View className="mb-4 h-24 w-24 items-center justify-center rounded-full bg-blue-100">
            <Text className="text-3xl text-blue-600">👤</Text>
          </View>
          <Text className="text-xl font-bold">John Doe</Text>
          <Text className="mt-1 text-gray-500">john.doe@example.com</Text>

          <View className="mt-8 w-full px-6">
            <ProfileMenuItem
              icon="settings-outline"
              title="Account Settings"
              subtitle="Privacy, security, and language"
            />
            <ProfileMenuItem
              icon="notifications-outline"
              title="Notifications"
              subtitle="Customize your alerts and notifications"
            />
            <ProfileMenuItem
              icon="moon-outline"
              title="Appearance"
              subtitle="Dark mode and theme settings"
            />
            <ProfileMenuItem
              icon="help-circle-outline"
              title="Help & Support"
              subtitle="FAQs, contact support, report an issue"
            />
          </View>
        </View>
      </ScreenContent>
    </SafeAreaView>
  );
}

function ProfileMenuItem({
  icon,
  title,
  subtitle,
}: {
  icon: string;
  title: string;
  subtitle: string;
}) {
  return (
    <TouchableOpacity className="mb-4 flex-row items-center rounded-xl bg-gray-50 p-4">
      <View className="mr-4 rounded-full bg-blue-50 p-2">
        <Ionicons name={icon as any} size={24} color="#3b82f6" />
      </View>
      <View className="flex-1">
        <Text className="text-base font-medium">{title}</Text>
        <Text className="text-sm text-gray-500">{subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
    </TouchableOpacity>
  );
}

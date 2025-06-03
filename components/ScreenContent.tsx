import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { EditScreenInfo } from './EditScreenInfo';
import { Ionicons } from '@expo/vector-icons';

type ScreenContentProps = {
  title: string;
  path: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  children?: React.ReactNode;
};

export const ScreenContent = ({
  title,
  path,
  showBackButton = false,
  onBackPress,
  children,
}: ScreenContentProps) => {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      className="bg-white"
      showsVerticalScrollIndicator={false}>
      <View className={styles.container}>
        <View className="mb-2 w-full flex-row items-center justify-center">
          {showBackButton && (
            <TouchableOpacity onPress={onBackPress} className="absolute left-0 p-2">
              <Ionicons name="arrow-back" size={24} color="#3b82f6" />
            </TouchableOpacity>
          )}
          <Text className={styles.title}>{title}</Text>
        </View>

        <View className={styles.separator} />
        <EditScreenInfo path={path} />
        {children}
      </View>
    </ScrollView>
  );
};

const styles = {
  container: `items-center flex-1 justify-start pt-6 px-4 pb-20`,
  separator: `h-[1px] my-7 w-4/5 bg-gray-200`,
  title: `text-2xl font-bold text-blue-600`,
};

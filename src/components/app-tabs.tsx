import { Tabs } from 'expo-router';
import { Image } from 'react-native';
import { useTheme } from '@/hooks/use-theme';

export default function AppTabs() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: theme.background },
        tabBarActiveTintColor: theme.text,
        tabBarInactiveTintColor: theme.textSecondary,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '홈',
          tabBarIcon: ({ size, color }) => (
            <Image
              source={require('@/assets/images/tabIcons/home.png')}
              style={{ width: size, height: size }}
              tintColor={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

import { Tabs, useTheme as useNavigationTheme } from 'expo-router';
import { Image, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/use-theme';

export default function TabsLayout() {
  const theme = useTheme();
  const { fonts } = useNavigationTheme();
  const insets = useSafeAreaInsets();
  const { fontScale } = useWindowDimensions();
  const extraHeight = Math.ceil(16 * Math.max(0, fontScale - 1));

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.surface,
          borderTopColor: theme.border,
          height: 60 + extraHeight + insets.bottom,
        },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarLabelPosition: 'below-icon',
        tabBarLabelStyle: {
          ...fonts.bold,
          fontSize: 12,
          lineHeight: 16,
          marginTop: 4,
        },
        tabBarAllowFontScaling: true,
        tabBarIconStyle: {
          width: 24,
          height: 24,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '홈',
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={
                focused
                  ? require('@/assets/images/tabIcons/home-filled.png')
                  : require('@/assets/images/tabIcons/home-outline.png')
              }
              style={{ width: 24, height: 24 }}
              tintColor={color}
              accessible={false}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: '서재',
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={
                focused
                  ? require('@/assets/images/tabIcons/bookmark-filled.png')
                  : require('@/assets/images/tabIcons/bookmark-outline.png')
              }
              style={{ width: 24, height: 24 }}
              tintColor={color}
              accessible={false}
            />
          ),
        }}
      />
    </Tabs>
  );
}

import { DarkTheme, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'react-native';
import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';
import { useTheme } from '@/hooks/use-theme';

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const theme = useTheme();

  const customTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: theme.background,
      card: theme.background,
      text: theme.text,
    },
  };

  return (
    <ThemeProvider value={customTheme}>
      <AnimatedSplashOverlay />
      <AppTabs />
      <StatusBar barStyle="light-content" />
    </ThemeProvider>
  );
}

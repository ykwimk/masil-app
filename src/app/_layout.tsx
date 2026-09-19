import { useEffect } from 'react';
import { DarkTheme, Stack, ThemeProvider } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'react-native';
import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { useTheme } from '@/hooks/use-theme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontsError] = useFonts({
    MulgyeolBold: require('@/assets/fonts/HakgyoansimMulgyeolOTFB.otf'),
    PretendardRegular: require('@/assets/fonts/Pretendard-Regular.otf'),
    PretendardSemiBold: require('@/assets/fonts/Pretendard-SemiBold.otf'),
  });
  const theme = useTheme();

  const customTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: theme.background,
      card: theme.background,
      text: theme.text,
    },
    fonts: {
      ...DarkTheme.fonts,
      regular: {
        ...DarkTheme.fonts.regular,
        fontFamily:
          fontsLoaded && !fontsError
            ? 'PretendardRegular'
            : DarkTheme.fonts.regular.fontFamily,
      },
      bold: {
        ...DarkTheme.fonts.bold,
        fontFamily:
          fontsLoaded && !fontsError
            ? 'PretendardSemiBold'
            : DarkTheme.fonts.bold.fontFamily,
      },
    },
  };

  useEffect(() => {
    if (fontsError) console.warn('fonts error: ', fontsError);
  }, [fontsError]);

  if (!fontsLoaded && !fontsError) {
    return null;
  }

  return (
    <ThemeProvider value={customTheme}>
      <AnimatedSplashOverlay />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar barStyle="light-content" />
    </ThemeProvider>
  );
}

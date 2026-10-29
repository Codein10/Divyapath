import {
  Mukta_400Regular,
  Mukta_500Medium,
  Mukta_600SemiBold,
  Mukta_700Bold,
} from '@expo-google-fonts/mukta';
import { TiroDevanagariHindi_400Regular } from '@expo-google-fonts/tiro-devanagari-hindi';
import { useFonts } from 'expo-font';
import { DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { ToastHost } from '@/components/ui/toast-host';
import { Colors } from '@/constants/theme';
import { usePlayerTicker } from '@/features/aarti';
import { AppProviders } from '@/providers/app-providers';

SplashScreen.preventAutoHideAsync();

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.bg,
    card: Colors.bg,
    primary: Colors.accent,
  },
};

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Mukta_400Regular,
    Mukta_500Medium,
    Mukta_600SemiBold,
    Mukta_700Bold,
    TiroDevanagariHindi_400Regular,
  });
  usePlayerTicker();

  useEffect(() => {
    if (fontsLoaded || fontError) SplashScreen.hideAsync();
  }, [fontsLoaded, fontError]);

  // Wait for fonts so text doesn't jump; if they fail, the system font is used.
  if (!fontsLoaded && !fontError) return null;

  return (
    <AppProviders>
      <ThemeProvider value={navigationTheme}>
        <Stack
          screenOptions={{ headerShown: false, contentStyle: { backgroundColor: Colors.bg } }}
        />
        <ToastHost />
      </ThemeProvider>
    </AppProviders>
  );
}

import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { fontAssets } from "@/constants/fonts";
import ThemeProvider from "@/context/theme-provider";
import { useTheme } from "@/hooks/use-theme";

import WebPhoneFrame from "./web-phone-frame";

SplashScreen.preventAutoHideAsync().catch(() => undefined);

function RootNavigator() {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="index" options={{ animation: "fade" }} />
      <Stack.Screen name="(auth)" options={{ animation: "fade" }} />
      <Stack.Screen name="(main)" options={{ animation: "fade" }} />
    </Stack>
  );
}

/** App shell: fonts, splash screen, safe area and theme providers + root navigator. */
export default function RootLayout() {
  const [loaded, error] = useFonts(fontAssets);

  useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync().catch(() => undefined);
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <WebPhoneFrame>
          <RootNavigator />
        </WebPhoneFrame>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

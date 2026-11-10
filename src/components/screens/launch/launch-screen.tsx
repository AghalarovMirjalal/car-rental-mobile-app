import { router } from "expo-router";
import { useEffect } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

import AppStatusBar from "@/components/ui/app-status-bar";
import CarLogo, { carLogoBox } from "@/components/ui/car-logo";
import { useTheme } from "@/hooks/use-theme";
import { useAuthStore } from "@/store/auth-store";
import { fs, s } from "@/utils/scale";

const LAUNCH_DELAY_MS = 1800;

/** Design: car center 18px above the vertical middle, wordmark center 176px below the car center. */
const LOGO_WIDTH = 245;
const CAR_OFFSET = -18;
const TEXT_GAP = 176;
const TEXT_SIZE = 43;

/** Yellow brand screen. Decides where to go next: auth flow or the main tabs. */
export default function LaunchScreen() {
  const { colors } = useTheme();

  const goNext = () => {
    const { isAuthenticated } = useAuthStore.getState();
    router.replace(isAuthenticated ? "/(main)/(tabs)/(home)" : "/(auth)/sign-up");
  };

  useEffect(() => {
    const timer = setTimeout(goNext, LAUNCH_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const { boxH } = carLogoBox(LOGO_WIDTH);
  const lineHeight = fs(TEXT_SIZE) * 1.2;
  const gap = s(TEXT_GAP) - boxH / 2 - lineHeight / 2;
  // Shift the centered group so the car (not the whole group) lands on the design position.
  const shift = gap + lineHeight + s(CAR_OFFSET) * 2;

  return (
    <Pressable style={[styles.root, { backgroundColor: colors.primary }]} onPress={goNext}>
      <AppStatusBar style="light" indicator="light" />
      <View style={[styles.center, { marginTop: shift }]}>
        <CarLogo width={LOGO_WIDTH} />
        <Text style={[styles.title, { color: colors.onPrimary, marginTop: gap, fontSize: fs(TEXT_SIZE), lineHeight }]}>
          RCARENTAL
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, alignItems: "center", justifyContent: "center" },
  center: { alignItems: "center" },
  // The wordmark in Figma is set in Arial Bold (not Poppins).
  title: {
    fontFamily: Platform.select({ ios: "Helvetica-Bold", android: "sans-serif", default: "Arial, Helvetica, sans-serif" }),
    fontWeight: "700",
    letterSpacing: 0.3,
  },
});

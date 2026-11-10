import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import AppText from "@/components/ui/app-text";
import CarLogo from "@/components/ui/car-logo";
import { useTheme } from "@/hooks/use-theme";
import { useAuthStore } from "@/store/auth-store";
import { s } from "@/utils/scale";

const LAUNCH_DELAY_MS = 1800;

/** Yellow brand screen. Decides where to go next: auth flow or the main tabs. */
export default function LaunchScreen() {
  const { colors } = useTheme();

  const goNext = () => {
    const { isAuthenticated } = useAuthStore.getState();
    router.replace(isAuthenticated ? "/(main)/(tabs)" : "/(auth)/sign-up");
  };

  useEffect(() => {
    const timer = setTimeout(goNext, LAUNCH_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Pressable style={[styles.root, { backgroundColor: colors.primary }]} onPress={goNext}>
      <StatusBar style="light" />
      <View style={styles.center}>
        <CarLogo width={236} />
        <AppText size={38} weight="extraBold" color={colors.onPrimary} style={styles.title}>
          RCARENTAL
        </AppText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, alignItems: "center", justifyContent: "center" },
  // Logo center sits 7px above the vertical middle; the wordmark center is 159px below it.
  center: { alignItems: "center", marginTop: s(101) },
  title: { marginTop: s(51), letterSpacing: 0.5 },
});

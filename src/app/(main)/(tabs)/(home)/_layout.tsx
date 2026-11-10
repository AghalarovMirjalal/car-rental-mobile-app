import { Stack } from "expo-router";

import { useTheme } from "@/hooks/use-theme";

/** Home tab stack: Home -> brand models page (keeps the tab bar visible like in the design). */
export default function HomeStackLayout() {
  const { colors } = useTheme();
  return <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }} />;
}

import { Stack } from "expo-router";

import { useTheme } from "@/hooks/use-theme";

/** Authentication flow: sign up / sign in. */
export default function AuthLayout() {
  const { colors } = useTheme();
  return <Stack screenOptions={{ headerShown: false, animation: "fade", contentStyle: { backgroundColor: colors.background } }} />;
}

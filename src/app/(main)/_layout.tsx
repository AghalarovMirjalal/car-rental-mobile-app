import { Stack } from "expo-router";

import { useTheme } from "@/hooks/use-theme";

/** Main area: tabs + screens pushed on top of them (car details, information, payment). */
export default function MainLayout() {
  const { colors } = useTheme();
  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="car/[id]" />
      <Stack.Screen name="information" />
      <Stack.Screen name="payment" />
    </Stack>
  );
}

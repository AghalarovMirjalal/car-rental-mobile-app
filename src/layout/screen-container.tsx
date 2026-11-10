import { StatusBar } from "expo-status-bar";
import { PropsWithChildren } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Edge, SafeAreaView } from "react-native-safe-area-context";

import { useTheme } from "@/hooks/use-theme";

interface ScreenContainerProps extends PropsWithChildren {
  /** Background painted behind the status bar (defaults to the theme background). */
  topColor?: string;
  backgroundColor?: string;
  /** Status bar icon color: "light" = white icons. Derived from the theme when omitted. */
  statusBarStyle?: "light" | "dark";
  edges?: Edge[];
  style?: StyleProp<ViewStyle>;
}

/**
 * Base wrapper of every screen: safe area, status bar style and themed background.
 */
export default function ScreenContainer({
  children,
  topColor,
  backgroundColor,
  statusBarStyle,
  edges = ["top"],
  style,
}: ScreenContainerProps) {
  const { colors, isDark } = useTheme();
  const bg = backgroundColor ?? colors.background;

  return (
    <View style={[styles.root, { backgroundColor: bg }]}>
      <StatusBar style={statusBarStyle ?? (isDark ? "light" : "dark")} />
      <SafeAreaView edges={edges} style={[styles.root, style, topColor ? { backgroundColor: topColor } : null]}>
        <View style={[styles.root, { backgroundColor: bg }]}>{children}</View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});

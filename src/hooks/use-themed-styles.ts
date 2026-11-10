import { useMemo } from "react";
import { StyleSheet } from "react-native";

import type { ThemeColors } from "@/constants/colors";

import { useTheme } from "./use-theme";

/**
 * Builds a StyleSheet from the active theme colors and memoizes it per scheme.
 *
 * const styles = useThemedStyles(createStyles);
 * const createStyles = (c: ThemeColors) => StyleSheet.create({ ... })
 */
export function useThemedStyles<T extends ReturnType<typeof StyleSheet.create>>(
  factory: (colors: ThemeColors) => T,
): T {
  const { colors } = useTheme();
  return useMemo(() => factory(colors), [colors, factory]);
}

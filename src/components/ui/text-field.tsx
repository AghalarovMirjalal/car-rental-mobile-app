import { ReactNode, useMemo } from "react";
import { StyleProp, StyleSheet, TextInput, TextInputProps, View, ViewStyle } from "react-native";

import type { ThemeColors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";
import { useTheme } from "@/hooks/use-theme";
import { fs, s } from "@/utils/scale";

/**
 * Three input looks from the design:
 * - `pill`  — auth screen (rounded, 44px, leading icon)
 * - `box`   — driver details (70px, big medium placeholder)
 * - `field` — card form on the payment screen (49px, square corners)
 */
type Variant = "pill" | "box" | "field";

interface TextFieldProps extends TextInputProps {
  variant?: Variant;
  icon?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  /** Highlights the border when the value is missing / invalid. */
  error?: boolean;
}

export default function TextField({ variant = "box", icon, containerStyle, error, style, ...props }: TextFieldProps) {
  const { colors } = useTheme();
  const v = useMemo(() => variants(colors)[variant], [colors, variant]);

  return (
    <View style={[v.container, error && styles.error, containerStyle]}>
      {icon ? <View style={styles.icon}>{icon}</View> : null}
      <TextInput
        placeholderTextColor={colors.placeholder}
        selectionColor={colors.primary}
        style={[styles.input, v.input, { color: colors.text }, style]}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  // `outlineWidth: 0` removes the browser focus ring on web.
  input: { flex: 1, height: "100%", paddingVertical: 0, outlineWidth: 0 },
  icon: { marginRight: s(13) },
  error: { borderColor: "#E5484D" },
});

const variants = (c: ThemeColors) => ({
  pill: StyleSheet.create({
    container: {
      height: s(44),
      borderRadius: s(22),
      borderWidth: 1,
      borderColor: c.inputBorder,
      flexDirection: "row",
      alignItems: "center",
      paddingLeft: s(24),
      paddingRight: s(16),
      backgroundColor: c.card,
    },
    input: { fontFamily: fonts.regular, fontSize: fs(12) },
  }),
  box: StyleSheet.create({
    container: {
      height: s(70),
      borderRadius: s(6),
      borderWidth: 1,
      borderColor: c.border,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: s(17),
      backgroundColor: c.background,
    },
    input: { fontFamily: fonts.medium, fontSize: fs(18) },
  }),
  field: StyleSheet.create({
    container: {
      height: s(49),
      borderRadius: s(3),
      borderWidth: 1,
      borderColor: c.fieldBorder,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: s(20),
      backgroundColor: c.background,
    },
    input: { fontFamily: fonts.light, fontSize: fs(13) },
  }),
});

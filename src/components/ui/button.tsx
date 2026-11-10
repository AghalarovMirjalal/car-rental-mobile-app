import { ReactNode } from "react";
import { ActivityIndicator, Pressable, StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import { useTheme } from "@/hooks/use-theme";
import { s } from "@/utils/scale";

import AppText from "./app-text";

type Variant = "primary" | "facebook";

interface ButtonProps {
  title: string;
  onPress?: () => void;
  variant?: Variant;
  disabled?: boolean;
  loading?: boolean;
  /** Height in design px. */
  height?: number;
  /** Corner radius in design px — defaults to a full pill. */
  radius?: number;
  fontSize?: number;
  fontWeight?: "medium" | "semiBold" | "bold";
  textColor?: string;
  icon?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default function Button({
  title,
  onPress,
  variant = "primary",
  disabled,
  loading,
  height = 50,
  radius,
  fontSize = 16,
  fontWeight = "semiBold",
  textColor,
  icon,
  style,
}: ButtonProps) {
  const { colors } = useTheme();
  const background =
    variant === "facebook" ? colors.facebook : disabled ? colors.primaryDisabled : colors.primary;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        {
          height: s(height),
          borderRadius: radius === undefined ? s(height) / 2 : s(radius),
          backgroundColor: background,
          opacity: pressed ? 0.85 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={colors.onPrimary} />
      ) : (
        <>
          {icon ? <View style={styles.icon}>{icon}</View> : null}
          <AppText size={fontSize} weight={fontWeight} color={textColor ?? colors.onPrimary}>
            {title}
          </AppText>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: { position: "absolute", left: s(28) },
});

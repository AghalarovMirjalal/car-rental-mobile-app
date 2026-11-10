import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { ReactNode } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { useTheme } from "@/hooks/use-theme";
import { s } from "@/utils/scale";

import AppText from "./app-text";

interface ScreenHeaderProps {
  title?: string;
  onBack?: () => void;
  /** Hide the back chevron (e.g. root tab screens). */
  hideBack?: boolean;
  tint?: string;
  right?: ReactNode;
  /** Row height in design px (title / chevron are vertically centered). */
  height?: number;
}

/** Back chevron + centered title. Default 78px tall (title centered 39px below the status bar). */
export default function ScreenHeader({ title, onBack, hideBack, tint, right, height = 78 }: ScreenHeaderProps) {
  const { colors } = useTheme();
  const color = tint ?? colors.text;

  const handleBack = () => {
    if (onBack) return onBack();
    if (router.canGoBack()) router.back();
    else router.replace("/(main)/(tabs)");
  };

  return (
    <View style={[styles.header, { height: s(height) }]}>
      <View style={styles.side}>
        {!hideBack && (
          <Pressable onPress={handleBack} hitSlop={12} style={styles.back} accessibilityLabel="Go back">
            <Feather name="chevron-left" size={s(28)} color={color} />
          </Pressable>
        )}
      </View>
      {title ? (
        <AppText size={18} weight="bold" color={color} align="center" numberOfLines={1} style={styles.title}>
          {title}
        </AppText>
      ) : (
        <View style={styles.title} />
      )}
      <View style={[styles.side, styles.right]}>{right}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: s(30),
  },
  side: { width: s(44), justifyContent: "center" },
  right: { alignItems: "flex-end" },
  back: { alignSelf: "flex-start" },
  title: { flex: 1 },
});

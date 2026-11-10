import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { ReactNode } from "react";
import { Pressable, StyleSheet, Switch, View } from "react-native";

import AppText from "@/components/ui/app-text";
import ScreenHeader from "@/components/ui/screen-header";
import type { ThemeColors } from "@/constants/colors";
import { useTheme } from "@/hooks/use-theme";
import { useThemedStyles } from "@/hooks/use-themed-styles";
import ScreenContainer from "@/layout/screen-container";
import { useAuthStore } from "@/store/auth-store";
import type { ThemeMode } from "@/types/theme";
import { s } from "@/utils/scale";

const MODES: { mode: ThemeMode; label: string }[] = [
  { mode: "system", label: "System" },
  { mode: "light", label: "Light" },
  { mode: "dark", label: "Dark" },
];

interface RowProps {
  icon: keyof typeof Feather.glyphMap;
  title: string;
  onPress?: () => void;
  right?: ReactNode;
}

function Row({ icon, title, onPress, right }: RowProps) {
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);

  return (
    <Pressable onPress={onPress} disabled={!onPress} style={styles.row}>
      <View style={styles.iconBox}>
        <Feather name={icon} size={s(20)} color={colors.primary} />
      </View>
      <AppText size={16} weight="semiBold" style={styles.rowTitle}>
        {title}
      </AppText>
      {right ?? <Feather name="chevron-right" size={s(20)} color={colors.textSecondary} />}
    </Pressable>
  );
}

/** Settings tab (not in the Figma file) — built from the same list-row style as Recent History. */
export default function SettingsScreen() {
  const { colors, isDark, mode, setMode, toggleTheme } = useTheme();
  const styles = useThemedStyles(createStyles);
  const email = useAuthStore((state) => state.email);
  const signOut = useAuthStore((state) => state.signOut);

  const logout = () => {
    signOut();
    router.replace("/(auth)/sign-in");
  };

  return (
    <ScreenContainer>
      <ScreenHeader title="Settings" hideBack />
      <View style={styles.content}>
        {email ? (
          <AppText size={13} weight="medium" color={colors.textSecondary} style={styles.email}>
            Signed in as {email}
          </AppText>
        ) : null}

        <Row
          icon={isDark ? "moon" : "sun"}
          title="Dark mode"
          right={
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ true: colors.primary, false: colors.radio }}
              thumbColor={colors.onPrimary}
            />
          }
        />
        <View style={styles.modes}>
          {MODES.map((item) => {
            const active = item.mode === mode;
            return (
              <Pressable
                key={item.mode}
                onPress={() => setMode(item.mode)}
                style={[styles.mode, active && { backgroundColor: colors.primary, borderColor: colors.primary }]}
              >
                <AppText size={13} weight="semiBold" color={active ? colors.onPrimary : colors.textSecondary}>
                  {item.label}
                </AppText>
              </Pressable>
            );
          })}
        </View>

        <Row icon="user" title="Personal Data" onPress={() => router.push("/information/personal-data")} />
        <Row icon="credit-card" title="Driving Licence" onPress={() => router.push("/information/driving-licence")} />
        <Row icon="clock" title="Recent History" onPress={() => router.navigate("/(main)/(tabs)/history")} />
        <Row icon="log-out" title="Log out" onPress={logout} />
      </View>
    </ScreenContainer>
  );
}

const createStyles = (c: ThemeColors) =>
  StyleSheet.create({
    content: { paddingHorizontal: s(30), paddingTop: s(17), gap: s(15) },
    email: { marginBottom: s(4) },
    row: {
      height: s(70),
      borderRadius: s(10),
      borderWidth: 1,
      borderColor: c.border,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: s(18),
      backgroundColor: c.background,
    },
    iconBox: {
      width: s(40),
      height: s(40),
      borderRadius: s(8),
      backgroundColor: c.surface,
      alignItems: "center",
      justifyContent: "center",
    },
    rowTitle: { flex: 1, marginLeft: s(16) },
    modes: { flexDirection: "row", gap: s(10) },
    mode: {
      flex: 1,
      height: s(40),
      borderRadius: s(20),
      borderWidth: 1,
      borderColor: c.border,
      alignItems: "center",
      justifyContent: "center",
    },
  });

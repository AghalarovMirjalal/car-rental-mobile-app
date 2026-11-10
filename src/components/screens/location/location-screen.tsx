import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

import AppText from "@/components/ui/app-text";
import ScreenHeader from "@/components/ui/screen-header";
import type { ThemeColors } from "@/constants/colors";
import { useTheme } from "@/hooks/use-theme";
import { useThemedStyles } from "@/hooks/use-themed-styles";
import ScreenContainer from "@/layout/screen-container";
import { s } from "@/utils/scale";

const OFFICES = [
  { id: "1", title: "RCARENTAL Downtown", address: "Central avenue 12", hours: "09:00 – 22:00" },
  { id: "2", title: "RCARENTAL Airport", address: "International Airport, Terminal 1", hours: "24 / 7" },
  { id: "3", title: "RCARENTAL Seaside", address: "Seaside boulevard 77", hours: "10:00 – 20:00" },
];

/** Location tab (not in the Figma file) — pickup points in the app's visual language. */
export default function LocationScreen() {
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);

  return (
    <ScreenContainer>
      <ScreenHeader title="Pickup points" hideBack />
      <View style={styles.content}>
        {OFFICES.map((office) => (
          <View key={office.id} style={styles.card}>
            <View style={styles.pin}>
              <Ionicons name="location-sharp" size={s(24)} color={colors.onPrimary} />
            </View>
            <View style={styles.info}>
              <AppText size={16} weight="bold">
                {office.title}
              </AppText>
              <AppText size={13} weight="medium" color={colors.textSecondary}>
                {office.address}
              </AppText>
              <AppText size={12} weight="semiBold" color={colors.primary}>
                {office.hours}
              </AppText>
            </View>
          </View>
        ))}
      </View>
    </ScreenContainer>
  );
}

const createStyles = (c: ThemeColors) =>
  StyleSheet.create({
    content: { paddingHorizontal: s(30), paddingTop: s(17), gap: s(15) },
    card: {
      flexDirection: "row",
      alignItems: "center",
      borderRadius: s(12),
      backgroundColor: c.surface,
      padding: s(18),
    },
    pin: {
      width: s(48),
      height: s(48),
      borderRadius: s(24),
      backgroundColor: c.primary,
      alignItems: "center",
      justifyContent: "center",
    },
    info: { flex: 1, marginLeft: s(16), gap: s(2) },
  });

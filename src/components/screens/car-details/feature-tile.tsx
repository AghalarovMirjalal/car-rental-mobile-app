import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

import AppText from "@/components/ui/app-text";
import { useTheme } from "@/hooks/use-theme";
import type { CarFeature, FeatureIcon } from "@/types/car";
import { s } from "@/utils/scale";

const ICONS: Record<FeatureIcon, (color: string, size: number) => ReactNode> = {
  speed: (color, size) => <Ionicons name="speedometer-outline" color={color} size={size} />,
  wifi: (color, size) => <Ionicons name="wifi" color={color} size={size} />,
  seats: (color, size) => <MaterialCommunityIcons name="seat-recline-normal" color={color} size={size} />,
  sensor: (color, size) => <MaterialCommunityIcons name="access-point" color={color} size={size} />,
  bluetooth: (color, size) => <Feather name="bluetooth" color={color} size={size} />,
  doors: (color, size) => <MaterialCommunityIcons name="car-door" color={color} size={size} />,
};

interface FeatureTileProps {
  feature: CarFeature;
  width: number;
}

export default function FeatureTile({ feature, width }: FeatureTileProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.tile, { width, backgroundColor: colors.panelTile }]}>
      <View style={styles.icon}>{ICONS[feature.icon](colors.onHeader, s(26))}</View>
      <AppText size={12} weight="medium" color={colors.panelLabel} uppercase style={styles.label}>
        {feature.label}
      </AppText>
      <AppText size={13} weight="semiBold" color={colors.onHeader} style={styles.value}>
        {feature.value}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    height: s(119),
    borderRadius: s(12),
    alignItems: "center",
    paddingTop: s(19),
  },
  icon: { height: s(26), justifyContent: "center" },
  label: { marginTop: s(16) },
  value: { marginTop: s(4) },
});

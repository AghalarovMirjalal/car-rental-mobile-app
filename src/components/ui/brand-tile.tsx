import { Image } from "expo-image";
import { memo } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import type { ThemeColors } from "@/constants/colors";
import { useThemedStyles } from "@/hooks/use-themed-styles";
import type { Brand } from "@/types/car";
import { s } from "@/utils/scale";

interface BrandTileProps {
  brand: Brand;
  selected?: boolean;
  onPress?: (brand: Brand) => void;
  size?: number;
}

function BrandTile({ brand, selected, onPress, size = 80 }: BrandTileProps) {
  const styles = useThemedStyles(createStyles);

  return (
    <Pressable
      onPress={() => onPress?.(brand)}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={brand.name}
      style={[styles.tile, { width: s(size), height: s(size) }, selected && styles.selected]}
    >
      <View style={styles.clip}>
        <Image
          source={brand.logo}
          contentFit={brand.fillTile ? "cover" : "contain"}
          style={brand.fillTile ? styles.fill : styles.logo}
        />
      </View>
    </Pressable>
  );
}

export default memo(BrandTile);

const createStyles = (c: ThemeColors) =>
  StyleSheet.create({
    tile: {
      borderRadius: s(8),
      backgroundColor: c.tile,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: s(2.5),
      borderColor: "transparent",
      shadowColor: c.tileShadow,
      shadowOpacity: 0.08,
      shadowRadius: s(6),
      shadowOffset: { width: 0, height: s(2) },
      elevation: 3,
    },
    selected: { borderColor: c.primary },
    clip: {
      flex: 1,
      alignSelf: "stretch",
      borderRadius: s(6),
      overflow: "hidden",
      alignItems: "center",
      justifyContent: "center",
    },
    logo: { width: s(44), height: s(44) },
    fill: { width: "100%", height: "100%" },
  });

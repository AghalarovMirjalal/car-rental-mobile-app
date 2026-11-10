import { Image } from "expo-image";
import { router } from "expo-router";
import { memo } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import AppText from "@/components/ui/app-text";
import type { ThemeColors } from "@/constants/colors";
import { useTheme } from "@/hooks/use-theme";
import { useThemedStyles } from "@/hooks/use-themed-styles";
import type { Car } from "@/types/car";
import { formatPrice } from "@/utils/format";
import { s } from "@/utils/scale";

interface CarCardProps {
  car: Car;
  /** Card height in design px: 234 on Home (hot deals), 200 in the models catalog. */
  height?: number;
}

/** Catalog card: brand + model top-left, price top-right, car photo centered at the bottom. */
function CarCard({ car, height = 200 }: CarCardProps) {
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);
  const imageHeight = height >= 220 ? 130 : 140;

  const openDetails = () =>
    // Dynamic route `/car/[id]` — the id is passed as a route param, the rest is looked up by it.
    router.push({ pathname: "/car/[id]", params: { id: car.id, from: "catalog" } });

  return (
    <Pressable
      onPress={openDetails}
      style={({ pressed }) => [styles.card, { height: s(height), opacity: pressed ? 0.9 : 1 }]}
    >
      <View style={styles.top}>
        <View>
          <AppText size={12} weight="semiBold" color={colors.textMuted} uppercase>
            {car.brandName}
          </AppText>
          <AppText size={14} weight="bold">
            {car.model}
          </AppText>
        </View>
        <AppText size={14} weight="bold">
          {formatPrice(car.price)}
        </AppText>
      </View>
      <Image
        source={car.image}
        contentFit="contain"
        style={[styles.image, { height: s(imageHeight) }]}
        transition={150}
      />
    </Pressable>
  );
}

export default memo(CarCard);

const createStyles = (c: ThemeColors) =>
  StyleSheet.create({
    card: {
      width: "100%",
      borderRadius: s(12),
      backgroundColor: c.surface,
      paddingTop: s(22),
      paddingHorizontal: s(13),
      paddingBottom: s(22),
      justifyContent: "space-between",
    },
    top: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
    image: {
      width: s(250),
      alignSelf: "center",
    },
  });

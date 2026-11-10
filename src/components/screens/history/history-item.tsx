import { Image } from "expo-image";
import { memo } from "react";
import { StyleSheet, View } from "react-native";

import AppText from "@/components/ui/app-text";
import type { ThemeColors } from "@/constants/colors";
import { useTheme } from "@/hooks/use-theme";
import { useThemedStyles } from "@/hooks/use-themed-styles";
import { getBrand } from "@/mock";
import type { HistoryItem as HistoryItemType } from "@/types/booking";
import { formatDays, formatPrice } from "@/utils/format";
import { s } from "@/utils/scale";

function HistoryItem({ item }: { item: HistoryItemType }) {
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);
  const brand = getBrand(item.brand);

  return (
    <View style={styles.row}>
      <View style={styles.logoBox}>
        {brand ? <Image source={brand.logo} contentFit="contain" style={styles.logo} /> : null}
      </View>
      <View style={styles.info}>
        <AppText size={16} weight="bold" numberOfLines={1}>
          {item.title}
        </AppText>
        <AppText size={13} weight="semiBold" color={colors.textSecondary}>
          {item.date}
        </AppText>
      </View>
      <View style={styles.right}>
        <AppText size={16} weight="bold">
          {formatPrice(item.price)}
        </AppText>
        <AppText size={12} weight="semiBold" color={colors.textSecondary}>
          {formatDays(item.days)}
        </AppText>
      </View>
    </View>
  );
}

export default memo(HistoryItem);

const createStyles = (c: ThemeColors) =>
  StyleSheet.create({
    row: {
      height: s(90),
      borderRadius: s(10),
      borderWidth: 1,
      borderColor: c.border,
      flexDirection: "row",
      alignItems: "center",
      paddingLeft: s(23),
      paddingRight: s(19),
      backgroundColor: c.background,
    },
    logoBox: {
      width: s(61),
      height: s(61),
      borderRadius: s(8),
      borderWidth: 1,
      borderColor: c.border,
      backgroundColor: c.tile,
      alignItems: "center",
      justifyContent: "center",
    },
    logo: { width: s(36), height: s(36) },
    info: { flex: 1, marginLeft: s(18), gap: s(2) },
    right: { alignItems: "flex-end", gap: s(2) },
  });

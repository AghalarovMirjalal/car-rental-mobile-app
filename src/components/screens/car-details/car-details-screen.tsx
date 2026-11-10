import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AppText from "@/components/ui/app-text";
import Button from "@/components/ui/button";
import ScreenHeader from "@/components/ui/screen-header";
import type { ThemeColors } from "@/constants/colors";
import { useTheme } from "@/hooks/use-theme";
import { useThemedStyles } from "@/hooks/use-themed-styles";
import ScreenContainer from "@/layout/screen-container";
import { getCarById } from "@/mock";
import { useBookingStore } from "@/store/booking-store";
import { formatPrice } from "@/utils/format";
import { s, SCREEN_WIDTH } from "@/utils/scale";

import FeatureTile from "./feature-tile";

const GRID_INSET = 15;
const GRID_GAP = 19;

/** "Booking" frame: big car photo + black panel with rating, features and the Book now action. */
export default function CarDetailsScreen() {
  // Data passed through the dynamic route `/car/[id]`.
  const { id } = useLocalSearchParams<{ id: string }>();
  const car = getCarById(id);
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);
  const insets = useSafeAreaInsets();
  const startBooking = useBookingStore((state) => state.startBooking);

  if (!car) {
    return (
      <ScreenContainer>
        <ScreenHeader title="Not found" />
        <View style={styles.notFound}>
          <AppText size={16} weight="medium" color={colors.textSecondary} align="center">
            We couldn&apos;t find this car.
          </AppText>
        </View>
      </ScreenContainer>
    );
  }

  // Floor it: fractional widths + gaps can overflow the row by a sub-pixel on Android and wrap to 2 columns.
  const tileWidth = Math.floor((Math.min(SCREEN_WIDTH, 520) - s(GRID_INSET) * 2 - s(GRID_GAP) * 2) / 3);

  const book = () => {
    startBooking(car.id);
    router.push({ pathname: "/information/personal-data", params: { carId: car.id } });
  };

  return (
    <ScreenContainer indicator="light">
      <ScrollView bounces={false} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <ScreenHeader height={48} />
        <Image source={car.image} contentFit="contain" style={styles.image} transition={200} />

        <View style={[styles.panel, { paddingBottom: insets.bottom + s(27) }]}>
          <View style={styles.titleRow}>
            <AppText size={22} weight="bold" color={colors.onHeader}>
              {car.brandName} {car.model}
            </AppText>
            <View style={styles.rating}>
              <Ionicons name="star" size={s(20)} color={colors.primary} />
              <AppText size={16} weight="semiBold" color={colors.onHeader} style={styles.ratingText}>
                {car.rating.toFixed(1)}
              </AppText>
            </View>
          </View>
          <AppText size={17} weight="semiBold" color={colors.panelSubtitle} style={styles.perDay}>
            {formatPrice(car.pricePerDay)} per day
          </AppText>

          <AppText size={18} weight="medium" color={colors.onHeader} style={styles.featuresTitle}>
            Features
          </AppText>
          <View style={styles.grid}>
            {car.features.map((feature) => (
              <FeatureTile key={feature.id} feature={feature} width={tileWidth} />
            ))}
          </View>

          <View style={styles.footer}>
            <AppText size={23} weight="bold" color={colors.onHeader}>
              {formatPrice(car.pricePerDay)}
            </AppText>
            <Button
              title="Book now"
              onPress={book}
              height={49}
              radius={9}
              fontSize={17}
              fontWeight="semiBold"
              textColor={colors.onPrimary}
              style={styles.book}
            />
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const createStyles = (c: ThemeColors) =>
  StyleSheet.create({
    scroll: { flexGrow: 1 },
    image: { width: s(352), height: s(207), marginTop: s(52), marginLeft: s(30) },
    panel: {
      flexGrow: 1,
      marginTop: s(30),
      backgroundColor: c.panel,
      borderTopLeftRadius: s(59),
      borderTopRightRadius: s(59),
      paddingTop: s(31),
    },
    titleRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: s(22),
    },
    rating: { flexDirection: "row", alignItems: "center" },
    ratingText: { marginLeft: s(6) },
    perDay: { paddingHorizontal: s(22), marginTop: s(1) },
    featuresTitle: { paddingHorizontal: s(22), marginTop: s(35) },
    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      columnGap: s(GRID_GAP),
      rowGap: s(14),
      paddingHorizontal: s(GRID_INSET),
      marginTop: s(11),
    },
    footer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingLeft: s(22),
      paddingRight: s(22),
      marginTop: s(17),
    },
    book: { width: s(166) },
    notFound: { flex: 1, alignItems: "center", justifyContent: "center", padding: s(30) },
  });

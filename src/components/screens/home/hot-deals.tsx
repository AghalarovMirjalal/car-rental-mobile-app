import { router } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

import CarCard from "@/components/shared/car-card";
import Catalog from "@/components/shared/catalog";
import AppText from "@/components/ui/app-text";
import { useTheme } from "@/hooks/use-theme";
import { hotDeals } from "@/mock";
import { s } from "@/utils/scale";

/** "Hot deals" header + list of discounted cars (rendered inside the Home scroll view). */
export default function HotDeals() {
  const { colors } = useTheme();

  return (
    <View>
      <View style={styles.header}>
        <AppText size={20} weight="medium">
          Hot deals
        </AppText>
        <Pressable onPress={() => router.push("/models")} hitSlop={8}>
          <AppText size={20} weight="medium" color={colors.primary}>
            View all...
          </AppText>
        </Pressable>
      </View>
      <Catalog
        data={hotDeals}
        renderItem={({ item }) => <CarCard car={item} height={234} />}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        gap={24}
        inset={30}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: s(30),
    marginBottom: s(10),
  },
});

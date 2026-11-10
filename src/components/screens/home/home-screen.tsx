import { router } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

import Brands from "@/components/screens/models/brands";
import { useTheme } from "@/hooks/use-theme";
import ScreenContainer from "@/layout/screen-container";
import { useSideMenuStore } from "@/store/side-menu-store";
import type { BrandSlug } from "@/types/car";
import { s } from "@/utils/scale";

import HotDeals from "./hot-deals";
import SearchBar from "./search-bar";

/** Height of the black header block, measured from the safe-area top (design: 405 - 47). */
const HEADER_HEIGHT = 358;

export default function HomeScreen() {
  const { colors } = useTheme();
  const [query, setQuery] = useState("");
  const openMenu = useSideMenuStore((state) => state.setOpen);

  const openBrand = (slug: BrandSlug) => router.push({ pathname: "/models", params: { brand: slug } });
  const search = () => router.push({ pathname: "/models", params: query.trim() ? { query: query.trim() } : {} });

  return (
    <ScreenContainer topColor={colors.header} statusBarStyle="light">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={[styles.header, { backgroundColor: colors.header }]} />
        <Pressable
          onPress={() => openMenu(true)}
          hitSlop={12}
          style={styles.burger}
          accessibilityRole="button"
          accessibilityLabel="Open menu"
        >
          {[0, 1, 2].map((line) => (
            <View key={line} style={[styles.burgerLine, { backgroundColor: colors.onHeader }]} />
          ))}
        </Pressable>
        <SearchBar value={query} onChangeText={setQuery} onSubmit={search} onFilterPress={() => router.push("/models")} />
        <View style={styles.brands}>
          <Brands onSelect={openBrand} titleColor={colors.onHeader} />
        </View>
        <View style={styles.deals}>
          <HotDeals />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: s(125), paddingBottom: s(24) },
  header: { position: "absolute", top: 0, left: 0, right: 0, height: s(HEADER_HEIGHT) },
  brands: { marginTop: s(93) },
  deals: { marginTop: s(92) },
  // Burger (three lines) in the empty black area above the search bar.
  burger: { position: "absolute", top: s(42), left: s(30), width: s(28), height: s(22), justifyContent: "space-between", zIndex: 1 },
  burgerLine: { height: s(3), borderRadius: s(2) },
});

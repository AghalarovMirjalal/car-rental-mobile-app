import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import Brands from "@/components/screens/models/brands";
import { useTheme } from "@/hooks/use-theme";
import ScreenContainer from "@/layout/screen-container";
import type { BrandSlug } from "@/types/car";
import { s } from "@/utils/scale";

import HotDeals from "./hot-deals";
import SearchBar from "./search-bar";

/** Height of the black header block, measured from the safe-area top (design: 405 - 47). */
const HEADER_HEIGHT = 358;

export default function HomeScreen() {
  const { colors } = useTheme();
  const [query, setQuery] = useState("");

  const openBrand = (slug: BrandSlug) => router.push({ pathname: "/models", params: { brand: slug } });
  const search = () => router.push({ pathname: "/models", params: query.trim() ? { query: query.trim() } : {} });

  return (
    <ScreenContainer topColor={colors.header} statusBarStyle="light">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={[styles.header, { backgroundColor: colors.header }]} />
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
});

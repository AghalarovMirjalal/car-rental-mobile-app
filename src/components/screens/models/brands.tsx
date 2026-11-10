import { useCallback } from "react";
import { ListRenderItem, StyleSheet, View } from "react-native";

import Catalog from "@/components/shared/catalog";
import AppText from "@/components/ui/app-text";
import BrandTile from "@/components/ui/brand-tile";
import { brands } from "@/mock";
import type { Brand, BrandSlug } from "@/types/car";
import { s } from "@/utils/scale";

interface BrandsProps {
  selectedSlug?: BrandSlug | null;
  onSelect: (slug: BrandSlug) => void;
  title?: string;
  titleColor?: string;
}

/** "Brands" title + horizontal strip of brand tiles (shared by Home and Models). */
export default function Brands({ selectedSlug, onSelect, title = "Brands", titleColor }: BrandsProps) {
  const handlePress = useCallback((brand: Brand) => onSelect(brand.slug), [onSelect]);

  const renderItem: ListRenderItem<Brand> = useCallback(
    ({ item }) => <BrandTile brand={item} selected={item.slug === selectedSlug} onPress={handlePress} />,
    [selectedSlug, handlePress],
  );

  return (
    <View>
      <AppText size={20} weight="semiBold" color={titleColor} style={styles.title}>
        {title}
      </AppText>
      <Catalog
        horizontal
        data={brands}
        renderItem={renderItem}
        keyExtractor={(item) => item.slug}
        extraData={selectedSlug}
        gap={12}
        inset={30}
        style={styles.list}
        contentContainerStyle={styles.content}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: { marginLeft: s(30), marginBottom: s(10) },
  // Room for tile shadows so FlatList doesn't clip them.
  list: { marginVertical: -s(8) },
  content: { paddingVertical: s(8) },
});

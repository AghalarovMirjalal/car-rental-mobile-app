import { ReactElement, useCallback, useMemo } from "react";
import { ListRenderItem, StyleSheet, View } from "react-native";

import CarCard from "@/components/shared/car-card";
import Catalog from "@/components/shared/catalog";
import { getBrand, getCarsByBrand } from "@/mock";
import type { BrandSlug, Car } from "@/types/car";
import { s } from "@/utils/scale";

interface ModelsProps {
  /** Brand to filter by — `null` shows every model. */
  selectedSlug: BrandSlug | null;
  /** Free-text search coming from the Home search bar. */
  query?: string;
  header?: ReactElement;
}

/** Vertical catalog of car models filtered by the selected brand. */
export default function Models({ selectedSlug, query, header }: ModelsProps) {
  const models = useMemo(() => {
    const byBrand = getCarsByBrand(selectedSlug);
    const q = query?.trim().toLowerCase();
    if (!q) return byBrand;
    return byBrand.filter((car) => `${car.brandName} ${car.model}`.toLowerCase().includes(q));
  }, [selectedSlug, query]);
  const brandName = selectedSlug ? getBrand(selectedSlug)?.name : undefined;

  const renderItem: ListRenderItem<Car> = useCallback(({ item }) => (
      <View style={styles.item}>
        <CarCard car={item} height={200} />
      </View>
    ), []);

  return (
    <Catalog
      data={models}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      gap={24}
      ListHeaderComponent={header}
      contentContainerStyle={styles.content}
      emptyText={brandName ? `No ${brandName} cars available right now` : "No cars available"}
    />
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: s(40) },
  // Padding lives on items (not the list) so the brands header can stay full-bleed.
  item: { paddingHorizontal: s(30) },
});

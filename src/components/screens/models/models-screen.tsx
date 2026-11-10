import { useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";

import { brands } from "@/mock";
import ScreenContainer from "@/layout/screen-container";
import type { BrandSlug } from "@/types/car";
import { s } from "@/utils/scale";

import Brands from "./brands";
import Models from "./models";

const isBrandSlug = (value: unknown): value is BrandSlug => brands.some((brand) => brand.slug === value);

/**
 * Brand page from the design ("Bmw" frame): brand strip on top, filtered models below.
 * Receives the initial brand through the `brand` route param.
 */
export default function ModelsScreen() {
  const params = useLocalSearchParams<{ brand?: string; query?: string }>();
  const initial = isBrandSlug(params.brand) ? params.brand : null;
  const [selectedSlug, setSelectedSlug] = useState<BrandSlug | null>(initial);

  // Coming back from Home with another brand while this screen is still mounted:
  // reset the selection when the route param changes (adjusting state during render).
  const [prevBrandParam, setPrevBrandParam] = useState(params.brand);
  if (params.brand !== prevBrandParam) {
    setPrevBrandParam(params.brand);
    setSelectedSlug(isBrandSlug(params.brand) ? params.brand : null);
  }

  // Tapping the active brand again clears the filter and shows every model.
  const handleSelect = useCallback(
    (slug: BrandSlug) => setSelectedSlug((current) => (current === slug ? null : slug)),
    [],
  );

  return (
    <ScreenContainer>
      <Models
        selectedSlug={selectedSlug}
        query={params.query}
        header={
          <View style={styles.header}>
            <Brands selectedSlug={selectedSlug} onSelect={handleSelect} />
          </View>
        }
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: { paddingTop: s(30), paddingBottom: s(52) },
});

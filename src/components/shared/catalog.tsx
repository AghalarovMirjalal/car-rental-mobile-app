import { ReactElement, useCallback } from "react";
import { FlatList, FlatListProps, ListRenderItem, StyleSheet, View } from "react-native";

import AppText from "@/components/ui/app-text";
import { useTheme } from "@/hooks/use-theme";
import { s } from "@/utils/scale";

export interface CatalogProps<T> extends Omit<FlatListProps<T>, "renderItem" | "data" | "keyExtractor"> {
  data: readonly T[];
  renderItem: ListRenderItem<T>;
  keyExtractor: (item: T, index: number) => string;
  /** Space between items, design px. */
  gap?: number;
  /** Horizontal padding of the list, design px. */
  inset?: number;
  emptyText?: string;
}

/**
 * Shared catalog list built on FlatList.
 * Used for the brands strip, car models, hot deals and the booking history —
 * one place for spacing, empty state and scroll indicators.
 */
export default function Catalog<T>({
  data,
  renderItem,
  keyExtractor,
  gap = 0,
  inset = 0,
  horizontal,
  emptyText = "Nothing here yet",
  contentContainerStyle,
  ...props
}: CatalogProps<T>): ReactElement {
  const { colors } = useTheme();

  const Separator = useCallback(
    () => <View style={horizontal ? { width: s(gap) } : { height: s(gap) }} />,
    [gap, horizontal],
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      horizontal={horizontal}
      ItemSeparatorComponent={gap ? Separator : undefined}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[inset ? { paddingHorizontal: s(inset) } : null, contentContainerStyle]}
      ListEmptyComponent={
        <View style={styles.empty}>
          <AppText size={14} weight="medium" color={colors.textSecondary} align="center">
            {emptyText}
          </AppText>
        </View>
      }
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  empty: { paddingVertical: s(40), alignItems: "center", flexGrow: 1 },
});

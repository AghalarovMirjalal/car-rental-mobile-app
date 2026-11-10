import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import Catalog from "@/components/shared/catalog";
import ScreenHeader from "@/components/ui/screen-header";
import TextField from "@/components/ui/text-field";
import { useTheme } from "@/hooks/use-theme";
import ScreenContainer from "@/layout/screen-container";
import { useBookingStore } from "@/store/booking-store";
import { s } from "@/utils/scale";

import HistoryItem from "./history-item";

/** "Recent History" frame — bookings list with a search toggle. */
export default function HistoryScreen() {
  const { colors } = useTheme();
  const history = useBookingStore((state) => state.history);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? history.filter((item) => item.title.toLowerCase().includes(q)) : history;
  }, [history, query]);

  const toggleSearch = () => {
    setSearchOpen((open) => !open);
    setQuery("");
  };

  return (
    <ScreenContainer>
      <ScreenHeader
        title="Recent History"
        onBack={() => router.navigate("/(main)/(tabs)/(home)")}
        right={
          <Pressable onPress={toggleSearch} hitSlop={10} accessibilityLabel="Search history">
            <Feather name={searchOpen ? "x" : "search"} size={s(22)} color={colors.text} />
          </Pressable>
        }
      />
      {searchOpen ? (
        <View style={styles.search}>
          <TextField variant="pill" placeholder="Search by car" value={query} onChangeText={setQuery} autoFocus />
        </View>
      ) : null}
      <Catalog
        data={items}
        renderItem={({ item }) => <HistoryItem item={item} />}
        keyExtractor={(item) => item.id}
        gap={15}
        contentContainerStyle={styles.list}
        emptyText="No bookings found"
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  search: { paddingLeft: s(40), paddingRight: s(24), marginTop: s(8) },
  list: { paddingLeft: s(40), paddingRight: s(24), paddingTop: s(17), paddingBottom: s(24) },
});

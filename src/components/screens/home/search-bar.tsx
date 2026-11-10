import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

import type { ThemeColors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";
import { useTheme } from "@/hooks/use-theme";
import { useThemedStyles } from "@/hooks/use-themed-styles";
import { fs, s } from "@/utils/scale";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  onFilterPress: () => void;
}

export default function SearchBar({ value, onChangeText, onSubmit, onFilterPress }: SearchBarProps) {
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.bar}>
      <Ionicons name="search-outline" size={s(24)} color={colors.searchPlaceholder} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        placeholder="Search"
        placeholderTextColor={colors.searchPlaceholder}
        returnKeyType="search"
        selectionColor={colors.primary}
        style={styles.input}
      />
      <Pressable onPress={onFilterPress} style={styles.filter} hitSlop={8} accessibilityLabel="Filters">
        <MaterialCommunityIcons name="tune-variant" size={s(24)} color={colors.onPrimary} />
      </Pressable>
    </View>
  );
}

const createStyles = (c: ThemeColors) =>
  StyleSheet.create({
    bar: {
      height: s(59),
      marginHorizontal: s(30),
      borderRadius: s(8),
      backgroundColor: c.card,
      flexDirection: "row",
      alignItems: "center",
      paddingLeft: s(22),
      paddingRight: s(14),
    },
    input: {
      flex: 1,
      height: "100%",
      marginLeft: s(8),
      fontFamily: fonts.regular,
      fontSize: fs(17),
      color: c.text,
      paddingVertical: 0,
      outlineWidth: 0,
    },
    filter: {
      width: s(30),
      height: s(30),
      borderRadius: s(4),
      backgroundColor: c.primary,
      alignItems: "center",
      justifyContent: "center",
    },
  });

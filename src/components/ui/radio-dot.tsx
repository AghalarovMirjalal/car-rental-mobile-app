import { StyleSheet, View } from "react-native";

import { useTheme } from "@/hooks/use-theme";
import { s } from "@/utils/scale";

interface RadioDotProps {
  selected: boolean;
  size?: number;
}

/** Filled circle used as a radio indicator on the payment screen. */
export default function RadioDot({ selected, size = 19 }: RadioDotProps) {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.dot,
        { width: s(size), height: s(size), borderRadius: s(size) / 2 },
        { backgroundColor: selected ? colors.primary : colors.radio },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  dot: {},
});

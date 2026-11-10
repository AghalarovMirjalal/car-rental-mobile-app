import type { BottomTabBarProps } from "expo-router/js-tabs";
import { Pressable, StyleSheet, View } from "react-native";

import { useTheme } from "@/hooks/use-theme";
import { s } from "@/utils/scale";

const DOT = 10;

/**
 * Top tab bar of the Information screen, drawn as the design's progress line:
 * one dot per tab, the line and dots turn yellow up to the active step. Dots are tappable.
 */
export default function StepTabBar({ state, navigateToTab, descriptors }: BottomTabBarProps) {
  const { colors } = useTheme();
  const last = state.routes.length - 1;
  const progress = last === 0 ? 1 : state.index / last;

  return (
    <View style={styles.wrap}>
      <View style={[styles.track, { backgroundColor: colors.radio }]} />
      {progress > 0 && (
        <View
          style={[
            styles.track,
            { backgroundColor: colors.primary },
            progress < 1 ? { right: undefined, width: `${progress * 100}%` } : null,
          ]}
        />
      )}
      <View style={styles.dots}>
        {state.routes.map((route, index) => {
          const reached = index <= state.index;
          return (
            <Pressable
              key={route.key}
              hitSlop={14}
              accessibilityRole="tab"
              accessibilityState={{ selected: index === state.index }}
              accessibilityLabel={descriptors[route.key].options.title ?? route.name}
              onPress={() => navigateToTab(route.key)}
              style={[styles.dot, { backgroundColor: reached ? colors.primary : colors.radio }]}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: s(25),
    marginHorizontal: s(36),
    height: s(DOT),
    justifyContent: "center",
  },
  track: {
    position: "absolute",
    left: s(DOT) / 2,
    right: s(DOT) / 2,
    height: s(2),
    borderRadius: s(1),
  },
  dots: { flexDirection: "row", justifyContent: "space-between" },
  dot: { width: s(DOT), height: s(DOT), borderRadius: s(DOT) / 2 },
});

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import type { BottomTabBarProps } from "expo-router/js-tabs";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import type { ThemeColors } from "@/constants/colors";
import { useTheme } from "@/hooks/use-theme";
import { useThemedStyles } from "@/hooks/use-themed-styles";
import { s } from "@/utils/scale";

type TabIconRenderer = (color: string, size: number) => React.ReactNode;

const ICONS: Record<string, TabIconRenderer> = {
  "(home)": (color, size) => <MaterialCommunityIcons name="view-grid" color={color} size={size} />,
  history: (color, size) => <Ionicons name="notifications" color={color} size={size} />,
  location: (color, size) => <Ionicons name="location-sharp" color={color} size={size} />,
  settings: (color, size) => <Ionicons name="settings-sharp" color={color} size={size} />,
};

/** Icon-only bottom bar from the design: yellow active icon, gray inactive ones. */
export default function TabBar({ state, descriptors, emitter, navigateToTab }: BottomTabBarProps) {
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.bar, { paddingBottom: insets.bottom }]}>
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const { options } = descriptors[route.key];
        const color = focused ? colors.primary : colors.tabInactive;

        const onPress = () => {
          const event = emitter.emit({ type: "tabPress", target: route.key, canPreventDefault: true });
          if (!focused && !event.defaultPrevented) navigateToTab(route.key);
        };

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            style={styles.item}
            accessibilityRole="tab"
            accessibilityState={{ selected: focused }}
            accessibilityLabel={options.title ?? route.name}
          >
            {ICONS[route.name]?.(color, s(24))}
          </Pressable>
        );
      })}
    </View>
  );
}

const createStyles = (c: ThemeColors) =>
  StyleSheet.create({
    bar: {
      flexDirection: "row",
      backgroundColor: c.tabBar,
      paddingHorizontal: s(18),
      shadowColor: c.shadow,
      shadowOpacity: 0.06,
      shadowRadius: s(10),
      shadowOffset: { width: 0, height: -s(2) },
      elevation: 12,
    },
    item: { flex: 1, height: s(63), alignItems: "center", justifyContent: "center" },
  });

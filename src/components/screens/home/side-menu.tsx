import { Feather } from "@expo/vector-icons";
import { router, type Href } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AppText from "@/components/ui/app-text";
import CarLogo from "@/components/ui/car-logo";
import OverlayModal from "@/components/ui/overlay-modal";
import type { ThemeColors } from "@/constants/colors";
import { useTheme } from "@/hooks/use-theme";
import { useThemedStyles } from "@/hooks/use-themed-styles";
import { useAuthStore } from "@/store/auth-store";
import { useSideMenuStore } from "@/store/side-menu-store";
import { s } from "@/utils/scale";

const ITEMS: { icon: keyof typeof Feather.glyphMap; title: string; href: Href }[] = [
  { icon: "grid", title: "Home", href: "/(main)/(tabs)/(home)" },
  { icon: "list", title: "All cars", href: "/(main)/(tabs)/(home)/models" },
  { icon: "bell", title: "Recent History", href: "/(main)/(tabs)/history" },
  { icon: "map-pin", title: "Location", href: "/(main)/(tabs)/location" },
  { icon: "settings", title: "Settings", href: "/(main)/(tabs)/settings" },
];

/** Drawer opened by the burger button on Home. */
export default function SideMenu() {
  const visible = useSideMenuStore((state) => state.open);
  const setOpen = useSideMenuStore((state) => state.setOpen);
  const onClose = () => setOpen(false);
  const { colors, isDark, toggleTheme } = useTheme();
  const styles = useThemedStyles(createStyles);
  const insets = useSafeAreaInsets();
  const email = useAuthStore((state) => state.email);
  const signOut = useAuthStore((state) => state.signOut);

  const go = (href: Href) => {
    onClose();
    router.navigate(href);
  };

  const logout = () => {
    onClose();
    signOut();
    router.replace("/(auth)/sign-in");
  };

  return (
    <OverlayModal visible={visible} onRequestClose={onClose} animationType="fade">
      <View style={styles.root}>
        <View style={[styles.panel, { paddingTop: insets.top + s(24), paddingBottom: insets.bottom + s(24) }]}>
          <View style={styles.brand}>
            <CarLogo width={110} />
            <AppText size={22} weight="extraBold" color={colors.onHeader} style={styles.brandName}>
              RCARENTAL
            </AppText>
            {email ? (
              <AppText size={12} weight="medium" color={colors.panelLabel} numberOfLines={1}>
                {email}
              </AppText>
            ) : null}
          </View>

          <View style={styles.items}>
            {ITEMS.map((item) => (
              <Pressable key={item.title} onPress={() => go(item.href)} style={styles.item}>
                <Feather name={item.icon} size={s(22)} color={colors.primary} />
                <AppText size={16} weight="semiBold" color={colors.onHeader} style={styles.itemText}>
                  {item.title}
                </AppText>
              </Pressable>
            ))}
            <Pressable onPress={toggleTheme} style={styles.item}>
              <Feather name={isDark ? "sun" : "moon"} size={s(22)} color={colors.primary} />
              <AppText size={16} weight="semiBold" color={colors.onHeader} style={styles.itemText}>
                {isDark ? "Light mode" : "Dark mode"}
              </AppText>
            </Pressable>
          </View>

          <Pressable onPress={logout} style={styles.item}>
            <Feather name="log-out" size={s(22)} color={colors.panelLabel} />
            <AppText size={16} weight="semiBold" color={colors.panelLabel} style={styles.itemText}>
              Log out
            </AppText>
          </Pressable>
        </View>
        <Pressable style={styles.backdrop} onPress={onClose} accessibilityLabel="Close menu" />
      </View>
    </OverlayModal>
  );
}

const createStyles = (c: ThemeColors) =>
  StyleSheet.create({
    root: { flex: 1, flexDirection: "row" },
    panel: {
      width: s(290),
      backgroundColor: c.panel,
      paddingHorizontal: s(28),
      borderTopRightRadius: s(30),
      borderBottomRightRadius: s(30),
    },
    backdrop: { flex: 1, backgroundColor: c.overlay },
    brand: { alignItems: "flex-start", marginBottom: s(36) },
    brandName: { marginTop: s(8), letterSpacing: 0.5 },
    items: { flex: 1 },
    item: { flexDirection: "row", alignItems: "center", height: s(54) },
    itemText: { marginLeft: s(16) },
  });

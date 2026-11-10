import { PropsWithChildren } from "react";
import { Dimensions, Platform, StyleSheet, View } from "react-native";
import { SafeAreaInsetsContext } from "react-native-safe-area-context";

import { DESIGN_HEIGHT, DESIGN_HOME_INDICATOR, DESIGN_STATUS_BAR, DESIGN_WIDTH, IS_WEB_FRAMED } from "@/utils/scale";

import WebDeviceChrome from "./web-device-chrome";

/** Insets of the iPhone frame used in Figma — web has no real status bar / home indicator. */
const DESIGN_INSETS = { top: DESIGN_STATUS_BAR, bottom: DESIGN_HOME_INDICATOR, left: 0, right: 0 };

/**
 * Web preview only: renders the app with the design's safe-area insets and,
 * on a wide browser window, inside a centered 428×926 phone frame — exactly like the Figma frames.
 * On iOS / Android it renders children untouched.
 */
export default function WebPhoneFrame({ children }: PropsWithChildren) {
  if (Platform.OS !== "web") return <>{children}</>;

  const content = (
    <SafeAreaInsetsContext.Provider value={DESIGN_INSETS}>
      {children}
      <WebDeviceChrome />
    </SafeAreaInsetsContext.Provider>
  );

  if (!IS_WEB_FRAMED) return content;

  // Shrink the whole frame (keeping 1:1 proportions) when the browser window is shorter than the phone.
  const fit = Math.min(1, (Dimensions.get("window").height - 32) / DESIGN_HEIGHT);

  return (
    <View style={styles.page}>
      <View style={[styles.phone, { transform: [{ scale: fit }] }]}>{content}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#E5E5E5",
    alignItems: "center",
    justifyContent: "center",
  },
  phone: {
    width: DESIGN_WIDTH,
    height: DESIGN_HEIGHT,
    overflow: "hidden",
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    // The transform (scale) also makes the frame the containing block for `position: fixed` overlays.
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.18)",
  },
});

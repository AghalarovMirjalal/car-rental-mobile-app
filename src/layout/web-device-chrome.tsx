import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { useWebChromeStore } from "@/store/web-chrome-store";
import { DESIGN_HOME_INDICATOR, DESIGN_STATUS_BAR } from "@/utils/scale";

/** iOS status bar ("19:02", signal, wifi, battery) and home indicator from the Figma frames — web preview only. */
export default function WebDeviceChrome() {
  const statusBar = useWebChromeStore((state) => state.statusBar);
  const indicator = useWebChromeStore((state) => state.indicator);
  const color = statusBar === "light" ? "#FFFFFF" : "#000000";

  return (
    <>
      <View style={styles.top} pointerEvents="none">
        <Text style={[styles.time, { color }]}>19:02</Text>
        <View style={styles.icons}>
          <Ionicons name="cellular" size={15} color={color} />
          <Ionicons name="wifi" size={16} color={color} style={styles.wifi} />
          <Ionicons name="battery-full" size={25} color={color} />
        </View>
      </View>
      <View style={styles.bottom} pointerEvents="none">
        <View style={[styles.indicator, { backgroundColor: indicator === "light" ? "#FFFFFF" : "#000000" }]} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  top: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: DESIGN_STATUS_BAR,
    zIndex: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 21,
    paddingRight: 20,
    paddingTop: 2,
  },
  time: { fontSize: 17, fontWeight: "600", letterSpacing: -0.4 },
  icons: { flexDirection: "row", alignItems: "center" },
  wifi: { marginHorizontal: 5 },
  bottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: DESIGN_HOME_INDICATOR,
    zIndex: 100,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 13,
  },
  indicator: { width: 134, height: 5, borderRadius: 3 },
});

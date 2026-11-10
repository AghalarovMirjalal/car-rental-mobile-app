import { useFocusEffect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback } from "react";
import { Platform } from "react-native";

import { useWebChromeStore } from "@/store/web-chrome-store";

interface AppStatusBarProps {
  /** "light" = white status bar content (for dark headers). */
  style: "light" | "dark";
  /** Color of the iOS home indicator in the web preview. */
  indicator?: "light" | "dark";
}

/**
 * Native: the system status bar.
 * Web: tells the phone frame which colors to use for the drawn iOS status bar / home indicator
 * of the focused screen (see `WebDeviceChrome`).
 */
export default function AppStatusBar({ style, indicator = "dark" }: AppStatusBarProps) {
  const setChrome = useWebChromeStore((state) => state.setChrome);

  useFocusEffect(
    useCallback(() => {
      if (Platform.OS === "web") setChrome({ statusBar: style, indicator });
    }, [style, indicator, setChrome]),
  );

  if (Platform.OS === "web") return null;
  return <StatusBar style={style} />;
}

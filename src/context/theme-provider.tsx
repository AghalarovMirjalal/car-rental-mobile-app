import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, PropsWithChildren, useCallback, useEffect, useMemo, useState } from "react";
import { useColorScheme } from "react-native";

import { darkColors, lightColors } from "@/constants/colors";
import type { ColorScheme, ThemeContextValue, ThemeMode } from "@/types/theme";

const STORAGE_KEY = "rcarental.theme-mode";

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export default function ThemeProvider({ children }: PropsWithChildren) {
  const systemScheme = useColorScheme();
  const [mode, setModeState] = useState<ThemeMode>("system");

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((saved) => {
        if (saved === "light" || saved === "dark" || saved === "system") setModeState(saved);
      })
      .catch(() => undefined);
  }, []);

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next);
    AsyncStorage.setItem(STORAGE_KEY, next).catch(() => undefined);
  }, []);

  const colorScheme: ColorScheme =
    mode === "system" ? (systemScheme === "dark" ? "dark" : "light") : mode;

  const toggleTheme = useCallback(() => {
    setMode(colorScheme === "dark" ? "light" : "dark");
  }, [colorScheme, setMode]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      colorScheme,
      mode,
      isDark: colorScheme === "dark",
      colors: colorScheme === "dark" ? darkColors : lightColors,
      setMode,
      toggleTheme,
    }),
    [colorScheme, mode, setMode, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

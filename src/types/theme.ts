import type { ThemeColors } from "@/constants/colors";

export type ColorScheme = "light" | "dark";
export type ThemeMode = ColorScheme | "system";

export interface ThemeContextValue {
  /** Resolved scheme that is currently painted. */
  colorScheme: ColorScheme;
  /** What the user picked: a fixed scheme or follow the OS. */
  mode: ThemeMode;
  isDark: boolean;
  colors: ThemeColors;
  setMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

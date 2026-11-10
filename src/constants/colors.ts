/**
 * Color tokens taken from the Figma design (light) and a matching dark palette.
 * Components never use raw hex values — they read tokens through `useTheme()`.
 */
export const palette = {
  yellow: "#F9B401",
  yellowDisabled: "#FBD67D",
  black: "#000000",
  white: "#FFFFFF",
  facebook: "#3B5998",
  green: "#079914",
  graphite: "#171B1E",
};

export const lightColors = {
  primary: palette.yellow,
  primaryDisabled: palette.yellowDisabled,
  onPrimary: palette.white,

  background: palette.white,
  surface: "#F5F6FA",
  card: palette.white,
  header: palette.black,
  onHeader: palette.white,

  text: palette.black,
  textSecondary: "#B5B5B5",
  textMuted: "#BBBCC0",
  placeholder: "#B5B5B5",
  searchPlaceholder: "#8F8F8F",

  border: "#E5E5E5",
  inputBorder: "#D6D6D6",
  fieldBorder: "#E2E2E2",

  tile: palette.white,
  tileShadow: "#000000",
  radio: "#C4C4C4",
  photoBox: "#F2F2F2",
  photoIcon: "#C4C4C4",

  tabBar: palette.white,
  tabInactive: "#999999",

  panel: palette.black,
  panelTile: palette.graphite,
  panelLabel: "#BCC0C3",
  panelSubtitle: "#D6D6D6",

  facebook: palette.facebook,
  success: palette.green,
  overlay: "rgba(0, 0, 0, 0.6)",
  shadow: "#000000",
};

export type ThemeColors = typeof lightColors;

export const darkColors: ThemeColors = {
  primary: palette.yellow,
  primaryDisabled: "#6E5A1F",
  onPrimary: palette.white,

  background: "#0E1013",
  surface: "#1A1D21",
  card: "#16191D",
  header: palette.black,
  onHeader: palette.white,

  text: palette.white,
  textSecondary: "#8A8F98",
  textMuted: "#7C818A",
  placeholder: "#6F747C",
  searchPlaceholder: "#8F8F8F",

  border: "#2A2E35",
  inputBorder: "#33373E",
  fieldBorder: "#2F333A",

  tile: palette.white,
  tileShadow: "#000000",
  radio: "#4A4F57",
  photoBox: "#1F2328",
  photoIcon: "#5C6169",

  tabBar: "#14171A",
  tabInactive: "#6F747C",

  panel: "#050607",
  panelTile: "#1C2125",
  panelLabel: "#9DA2A6",
  panelSubtitle: "#D6D6D6",

  facebook: palette.facebook,
  success: "#16B524",
  overlay: "rgba(0, 0, 0, 0.75)",
  shadow: "#000000",
};

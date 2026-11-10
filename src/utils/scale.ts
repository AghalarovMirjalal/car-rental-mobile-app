import { Dimensions, Platform } from "react-native";

/** Figma frame size (iPhone 13 Pro Max). Every measurement in the app comes from this frame. */
export const DESIGN_WIDTH = 428;
export const DESIGN_HEIGHT = 926;
/** iOS status bar / home indicator heights inside the design frame. */
export const DESIGN_STATUS_BAR = 47;
export const DESIGN_HOME_INDICATOR = 34;

const window = Dimensions.get("window");

/**
 * On a wide web window the app is rendered inside a 428×926 phone frame (see `WebPhoneFrame`),
 * so layout is computed for the design width there.
 */
export const IS_WEB_FRAMED = Platform.OS === "web" && window.width > 600;

/** Width of the screen the app is laid out in. */
export const SCREEN_WIDTH = IS_WEB_FRAMED ? DESIGN_WIDTH : window.width;

// Keep proportions on phones, but don't blow the layout up on tablets.
const ratio = Math.min(SCREEN_WIDTH, 520) / DESIGN_WIDTH;

/** Scales a design pixel value to the current screen width. */
export const s = (size: number) => Math.round(size * ratio * 100) / 100;

/** Scales a font size slightly softer than layout values. */
export const fs = (size: number) => Math.round(size * (1 + (ratio - 1) * 0.85) * 100) / 100;

import { Dimensions } from "react-native";

/** Figma frame size (iPhone 13 Pro Max). Every measurement in the app comes from this frame. */
export const DESIGN_WIDTH = 428;
export const DESIGN_HEIGHT = 926;
/** iOS status bar height inside the design frame — content offsets are measured below it. */
export const DESIGN_STATUS_BAR = 47;

const { width } = Dimensions.get("window");
// Keep proportions on phones, but don't blow the layout up on tablets / wide web windows.
const ratio = Math.min(width, 520) / DESIGN_WIDTH;

/** Scales a design pixel value to the current screen width. */
export const s = (size: number) => Math.round(size * ratio * 100) / 100;

/** Scales a font size slightly softer than layout values. */
export const fs = (size: number) => Math.round(size * (1 + (ratio - 1) * 0.85) * 100) / 100;

import { StyleSheet } from "react-native";
import Svg, { Polygon } from "react-native-svg";

import { useTheme } from "@/hooks/use-theme";
import { s, SCREEN_WIDTH } from "@/utils/scale";

interface AuthBackgroundProps {
  /** Safe-area top inset — the shape is measured from the top of the design frame. */
  topInset: number;
}

/**
 * Black backdrop of the auth screen. Its bottom edge is a "V": 410px at the sides,
 * dipping towards the center (hidden behind the form card).
 */
export default function AuthBackground({ topInset }: AuthBackgroundProps) {
  const { colors } = useTheme();
  const width = SCREEN_WIDTH;
  const offset = topInset - s(47);
  const side = s(410) + offset;
  const dip = s(410 + 214 * 0.9) + offset;
  const height = dip + 2;

  return (
    <Svg width={width} height={height} style={styles.svg} pointerEvents="none">
      <Polygon points={`0,0 ${width},0 ${width},${side} ${width / 2},${dip} 0,${side}`} fill={colors.header} />
    </Svg>
  );
}

const styles = StyleSheet.create({
  svg: { position: "absolute", top: 0, left: 0 },
});

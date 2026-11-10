import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";

import { s } from "@/utils/scale";

const LOGO_RATIO = 510 / 190;
const ROTATION_DEG = 29;

interface CarLogoProps {
  /** Width of the (unrotated) car silhouette in design px. */
  width?: number;
}

/** White car silhouette from the design, tilted like on the Launch and Auth screens. */
/** Bounding box of the rotated silhouette, so the logo takes its real visual space in layout. */
export function carLogoBox(width: number) {
  const w = s(width);
  const h = w / LOGO_RATIO;
  const rad = (ROTATION_DEG * Math.PI) / 180;
  return { w, h, boxW: w * Math.cos(rad) + h * Math.sin(rad), boxH: w * Math.sin(rad) + h * Math.cos(rad) };
}

export default function CarLogo({ width = 245 }: CarLogoProps) {
  const { w, h, boxW, boxH } = carLogoBox(width);

  return (
    <View style={[styles.box, { width: boxW, height: boxH }]}>
      <Image
        source={require("@assets/images/logo/car-logo.png")}
        contentFit="contain"
        style={{ width: w, height: h, transform: [{ rotate: `${ROTATION_DEG}deg` }] }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  box: { alignItems: "center", justifyContent: "center" },
});

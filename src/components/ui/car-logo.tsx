import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";

import { s } from "@/utils/scale";

const LOGO_RATIO = 510 / 190;
const ROTATION_DEG = 19;

interface CarLogoProps {
  /** Width of the (unrotated) car silhouette in design px. */
  width?: number;
}

/** White car silhouette from the design, tilted like on the Launch and Auth screens. */
export default function CarLogo({ width = 214 }: CarLogoProps) {
  const w = s(width);
  const h = w / LOGO_RATIO;
  const rad = (ROTATION_DEG * Math.PI) / 180;
  // Bounding box of the rotated image, so the logo takes its real visual space in layout.
  const boxW = w * Math.cos(rad) + h * Math.sin(rad);
  const boxH = w * Math.sin(rad) + h * Math.cos(rad);

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

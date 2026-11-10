import { StyleSheet, Text, TextProps } from "react-native";

import { fonts } from "@/constants/fonts";
import { useTheme } from "@/hooks/use-theme";
import { fs } from "@/utils/scale";

type Weight = keyof typeof fonts;

interface AppTextProps extends TextProps {
  /** Font size in design pixels (scaled automatically). */
  size?: number;
  weight?: Weight;
  color?: string;
  align?: "left" | "center" | "right";
  uppercase?: boolean;
}

/** Poppins text with design-scale sizing and theme-aware default color. */
export default function AppText({
  size = 14,
  weight = "regular",
  color,
  align,
  uppercase,
  style,
  ...props
}: AppTextProps) {
  const { colors } = useTheme();

  return (
    <Text
      {...props}
      style={[
        styles.base,
        {
          fontFamily: fonts[weight],
          fontSize: fs(size),
          lineHeight: fs(size) * 1.5,
          color: color ?? colors.text,
          textAlign: align,
          textTransform: uppercase ? "uppercase" : undefined,
        },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  base: { includeFontPadding: false },
});

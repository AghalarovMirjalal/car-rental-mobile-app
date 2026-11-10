import { Image } from "expo-image";
import { PropsWithChildren } from "react";
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import RadioDot from "@/components/ui/radio-dot";
import type { ThemeColors } from "@/constants/colors";
import { useThemedStyles } from "@/hooks/use-themed-styles";
import type { PaymentMethod } from "@/types/payment";
import { s } from "@/utils/scale";

interface PaymentOptionProps extends PropsWithChildren {
  method: PaymentMethod;
  selected: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

/** Bordered row with the payment logo and a radio dot. Expanded content (card form) goes in children. */
export default function PaymentOption({ method, selected, onPress, style, children }: PaymentOptionProps) {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={[styles.box, selected && styles.expanded, style]}>
      <Pressable onPress={onPress} style={styles.row} accessibilityRole="radio" accessibilityState={{ checked: selected }}>
        <View style={styles.logoBox}>
          <Image
            source={method.logo}
            contentFit={method.logoFit ?? "contain"}
            style={{ width: s(method.logoSize.width), height: s(method.logoSize.height) }}
          />
        </View>
        <RadioDot selected={selected} />
      </Pressable>
      {children}
    </View>
  );
}

const createStyles = (c: ThemeColors) =>
  StyleSheet.create({
    box: {
      borderWidth: 1,
      borderColor: c.border,
      borderRadius: s(7),
      backgroundColor: c.background,
    },
    expanded: { borderRadius: s(10), paddingBottom: s(14) },
    row: {
      height: s(70),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingLeft: s(15),
      paddingRight: s(25),
    },
    logoBox: { width: s(70), height: s(50), justifyContent: "center", alignItems: "flex-start" },
  });

import { Pressable, StyleSheet, View } from "react-native";
import Svg, { Polyline } from "react-native-svg";

import AppText from "@/components/ui/app-text";
import OverlayModal from "@/components/ui/overlay-modal";
import { useTheme } from "@/hooks/use-theme";
import { s } from "@/utils/scale";

interface SuccessModalProps {
  visible: boolean;
  onBack: () => void;
}

/** "Payment 3(Done)" frame — dimmed screen with a white card and a yellow Back bar. */
export default function SuccessModal({ visible, onBack }: SuccessModalProps) {
  const { colors } = useTheme();

  return (
    <OverlayModal visible={visible} onRequestClose={onBack}>
      <View style={[styles.backdrop, { backgroundColor: colors.overlay }]}>
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <View style={styles.body}>
            <View style={[styles.circle, { backgroundColor: colors.primary }]}>
              <Svg width={s(74)} height={s(74)} viewBox="0 0 62 62">
                <Polyline
                  points="10,32 25,46 52,17"
                  fill="none"
                  stroke={colors.onPrimary}
                  strokeWidth={6.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </View>
            <AppText size={19} weight="semiBold" color={colors.primary} style={styles.text}>
              Succesfully  Done
            </AppText>
          </View>
          <Pressable onPress={onBack} style={({ pressed }) => [styles.back, { backgroundColor: colors.primary, opacity: pressed ? 0.85 : 1 }]}>
            <AppText size={20} weight="semiBold" color={colors.onPrimary}>
              Back
            </AppText>
          </Pressable>
        </View>
      </View>
    </OverlayModal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: s(38) },
  card: { width: "100%", maxWidth: s(353), borderRadius: s(8), overflow: "hidden" },
  body: { alignItems: "center", paddingTop: s(78), paddingBottom: s(17) },
  circle: { width: s(100), height: s(100), borderRadius: s(50), alignItems: "center", justifyContent: "center" },
  text: { marginTop: s(22) },
  back: { height: s(52), alignItems: "center", justifyContent: "center" },
});

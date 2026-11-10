import { Feather } from "@expo/vector-icons";
import { Modal, Pressable, StyleSheet, View } from "react-native";

import AppText from "@/components/ui/app-text";
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
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onBack} statusBarTranslucent>
      <View style={[styles.backdrop, { backgroundColor: colors.overlay }]}>
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <View style={styles.body}>
            <View style={[styles.circle, { backgroundColor: colors.primary }]}>
              <Feather name="check" size={s(58)} color={colors.onPrimary} />
            </View>
            <AppText size={18} weight="semiBold" color={colors.primary} style={styles.text}>
              Succesfully  Done
            </AppText>
          </View>
          <Pressable onPress={onBack} style={({ pressed }) => [styles.back, { backgroundColor: colors.primary, opacity: pressed ? 0.85 : 1 }]}>
            <AppText size={18} weight="semiBold" color={colors.onPrimary}>
              Back
            </AppText>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: s(38) },
  card: { width: "100%", maxWidth: s(353), borderRadius: s(8), overflow: "hidden" },
  body: { alignItems: "center", paddingTop: s(77), paddingBottom: s(16) },
  circle: { width: s(100), height: s(100), borderRadius: s(50), alignItems: "center", justifyContent: "center" },
  text: { marginTop: s(23) },
  back: { height: s(52), alignItems: "center", justifyContent: "center" },
});

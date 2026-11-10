import { PropsWithChildren } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useTheme } from "@/hooks/use-theme";

import OverlayModal from "./overlay-modal";
import { s } from "@/utils/scale";

interface BottomSheetProps extends PropsWithChildren {
  visible: boolean;
  onClose: () => void;
}

/** Simple modal sheet sliding from the bottom (works on iOS, Android and web). */
export default function BottomSheet({ visible, onClose, children }: BottomSheetProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <OverlayModal visible={visible} onRequestClose={onClose} animationType="slide">
      <Pressable style={[styles.backdrop, { backgroundColor: colors.overlay }]} onPress={onClose} />
      <View style={[styles.sheet, { backgroundColor: colors.card, paddingBottom: insets.bottom + s(16) }]}>
        <View style={[styles.handle, { backgroundColor: colors.border }]} />
        {children}
      </View>
    </OverlayModal>
  );
}

const styles = StyleSheet.create({
  backdrop: { ...StyleSheet.absoluteFill },
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: s(24),
    borderTopRightRadius: s(24),
    paddingHorizontal: s(30),
    paddingTop: s(10),
    gap: s(12),
  },
  handle: { alignSelf: "center", width: s(40), height: s(4), borderRadius: s(2), marginBottom: s(8) },
});

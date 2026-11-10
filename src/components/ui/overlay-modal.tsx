import { PropsWithChildren } from "react";
import { Modal, Platform, StyleSheet, View } from "react-native";

interface OverlayModalProps extends PropsWithChildren {
  visible: boolean;
  onRequestClose: () => void;
  animationType?: "fade" | "slide";
}

/**
 * Native: a regular transparent Modal.
 * Web: a fixed overlay, so it stays inside the phone frame (the frame is the containing block).
 */
export default function OverlayModal({ visible, onRequestClose, animationType = "fade", children }: OverlayModalProps) {
  if (Platform.OS === "web") {
    if (!visible) return null;
    return <View style={styles.web}>{children}</View>;
  }

  return (
    <Modal visible={visible} transparent animationType={animationType} onRequestClose={onRequestClose} statusBarTranslucent>
      {children}
    </Modal>
  );
}

const styles = StyleSheet.create({
  // "fixed" is web-only; inside the transformed phone frame it is relative to the frame.
  web: { position: "fixed" as "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 200 },
});

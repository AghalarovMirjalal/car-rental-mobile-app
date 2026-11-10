import { PropsWithChildren } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AppText from "@/components/ui/app-text";
import Button from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import { s } from "@/utils/scale";

interface FormStepProps extends PropsWithChildren {
  title: string;
  actionTitle: string;
  onAction: () => void;
}

/** Shared body of an Information tab: section title, scrollable fields and a bottom action. */
export default function FormStep({ title, actionTitle, onAction, children }: FormStepProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      style={[styles.root, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <AppText size={20} weight="bold" style={styles.title}>
          {title}
        </AppText>
        {children}
      </ScrollView>
      <View style={[styles.footer, { paddingBottom: insets.bottom + s(9) }]}>
        <Button title={actionTitle} onPress={onAction} style={styles.button} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { paddingHorizontal: s(33), paddingTop: s(30.5), paddingBottom: s(24), gap: s(31) },
  // Title -> first field is 15px in the design; the list gap is 31px.
  title: { marginBottom: -s(18) },
  footer: { alignItems: "center", paddingTop: s(8) },
  button: { width: s(302) },
});

import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";

import AppText from "@/components/ui/app-text";
import TextField from "@/components/ui/text-field";
import { useTheme } from "@/hooks/use-theme";
import type { CardDetails } from "@/types/payment";
import { formatCardNumber, formatExpiry } from "@/utils/format";
import { s } from "@/utils/scale";

interface CardFormProps {
  value: CardDetails;
  onChange: (value: CardDetails) => void;
  /** Highlight missing / invalid fields after "Pay now" was pressed. */
  showErrors?: boolean;
}

/** Card number / holder / expiry + CVV fields shown inside the selected payment option. */
export default function CardForm({ value, onChange, showErrors }: CardFormProps) {
  const { colors } = useTheme();
  const set = (patch: Partial<CardDetails>) => onChange({ ...value, ...patch });

  return (
    <View style={styles.form}>
      <TextField
        variant="field"
        placeholder="Card Number"
        keyboardType="number-pad"
        value={value.cardNumber}
        onChangeText={(text) => set({ cardNumber: formatCardNumber(text) })}
        error={showErrors && value.cardNumber.replace(/\s/g, "").length < 12}
      />
      <TextField
        variant="field"
        placeholder="Card Holder's Name"
        autoCapitalize="words"
        value={value.holderName}
        onChangeText={(holderName) => set({ holderName })}
        error={showErrors && value.holderName.trim().length < 2}
      />
      <View style={styles.row}>
        <TextField
          variant="field"
          placeholder="DD/MM/YY"
          keyboardType="number-pad"
          value={value.expiry}
          onChangeText={(text) => set({ expiry: formatExpiry(text) })}
          error={showErrors && value.expiry.length < 5}
          containerStyle={styles.expiry}
        />
        <TextField
          variant="field"
          placeholder="CVV"
          keyboardType="number-pad"
          secureTextEntry
          maxLength={4}
          value={value.cvv}
          onChangeText={(text) => set({ cvv: text.replace(/\D/g, "") })}
          error={showErrors && value.cvv.length < 3}
          containerStyle={styles.cvv}
        />
      </View>
      <Pressable style={styles.save} onPress={() => set({ saveCard: !value.saveCard })} accessibilityRole="checkbox">
        <Ionicons
          name={value.saveCard ? "checkmark-circle" : "ellipse-outline"}
          size={s(21)}
          color={value.saveCard ? colors.success : colors.radio}
        />
        <AppText size={14} weight="light" color={colors.textSecondary} style={styles.saveText}>
          Save Card Information
        </AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  form: { paddingLeft: s(15), paddingRight: s(25), gap: s(10) },
  row: { flexDirection: "row" },
  expiry: { width: "58%", borderTopRightRadius: 0, borderBottomRightRadius: 0 },
  cvv: { flex: 1, marginLeft: -1, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 },
  save: { flexDirection: "row", alignItems: "center", marginTop: s(4) },
  saveText: { marginLeft: s(8) },
});

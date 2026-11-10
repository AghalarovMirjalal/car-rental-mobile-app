import { router } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Button from "@/components/ui/button";
import HeaderSheetLayout from "@/layout/header-sheet-layout";
import { paymentMethods } from "@/mock";
import { useBookingStore } from "@/store/booking-store";
import type { CardDetails } from "@/types/payment";
import { s } from "@/utils/scale";

import CardForm from "./card-form";
import PaymentOption from "./payment-option";
import SuccessModal from "./success-modal";

const emptyCard: CardDetails = { cardNumber: "", holderName: "", expiry: "", cvv: "", saveCard: true };

const isCardComplete = (card: CardDetails) =>
  card.cardNumber.replace(/\s/g, "").length >= 12 &&
  card.holderName.trim().length > 1 &&
  card.expiry.length >= 5 &&
  card.cvv.length >= 3;

/** Payment 1 / 2 / 3 frames: pick a method, fill the card, pay, see the success modal. */
export default function PaymentScreen() {
  const insets = useSafeAreaInsets();
  const selected = useBookingStore((state) => state.paymentMethod);
  const selectPaymentMethod = useBookingStore((state) => state.selectPaymentMethod);
  const completeBooking = useBookingStore((state) => state.completeBooking);
  const [card, setCard] = useState<CardDetails>(emptyCard);
  const [paying, setPaying] = useState(false);
  const [done, setDone] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  // Like in the design, "Pay now" turns active as soon as a method is picked; the card is validated on press.
  const canPay = Boolean(selected);
  const selectedIndex = paymentMethods.findIndex((method) => method.id === selected);

  const pay = () => {
    if (!isCardComplete(card)) {
      setShowErrors(true);
      return;
    }
    setShowErrors(false);
    setPaying(true);
    // Mock payment request.
    setTimeout(() => {
      setPaying(false);
      setDone(true);
    }, 900);
  };

  const finish = () => {
    setDone(false);
    completeBooking();
    // Back to Home: pop the booking flow, or replace when it was opened directly (deep link / web reload).
    if (router.canDismiss()) router.dismissAll();
    else router.replace("/(main)/(tabs)/(home)");
  };

  return (
    <HeaderSheetLayout title="Payment" sheetOffset={122}>
      <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView
          contentContainerStyle={[styles.list, { gap: s(selected ? 15 : 31.5) }]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {paymentMethods.map((method, index) => {
            const isSelected = method.id === selected;
            const afterSelected = selectedIndex >= 0 && index > selectedIndex;
            return (
              <PaymentOption
                key={method.id}
                method={method}
                selected={isSelected}
                onPress={() => selectPaymentMethod(method.id)}
                style={[afterSelected && styles.afterSelected, index === selectedIndex + 1 && styles.firstAfterSelected]}
              >
                {isSelected ? <CardForm value={card} onChange={setCard} showErrors={showErrors} /> : null}
              </PaymentOption>
            );
          })}
        </ScrollView>
        <View style={[styles.footer, { paddingBottom: insets.bottom + s(9) }]}>
          <Button title="Pay now" disabled={!canPay} loading={paying} onPress={pay} style={styles.button} />
        </View>
      </KeyboardAvoidingView>
      <SuccessModal visible={done} onBack={finish} />
    </HeaderSheetLayout>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  list: { paddingLeft: s(34), paddingRight: s(30), paddingTop: s(60), paddingBottom: s(24) },
  footer: { alignItems: "center", paddingTop: s(8) },
  button: { width: s(302) },
  // In the Payment 2 frame the collapsed options under the open card sit 6px to the right and 27px lower.
  afterSelected: { marginLeft: s(6), marginRight: -s(6) },
  firstAfterSelected: { marginTop: s(27) },
});

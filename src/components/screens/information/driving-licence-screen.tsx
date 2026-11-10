import { router } from "expo-router";
import { useState } from "react";

import TextField from "@/components/ui/text-field";
import { useBookingStore } from "@/store/booking-store";
import { formatExpiry } from "@/utils/format";

import FormStep from "./form-step";
import LicencePhotoPicker from "./licence-photo-picker";

/** Information tab 2 — "Driving Licence" with a photo taken / picked via expo-image-picker. */
export default function DrivingLicenceScreen() {
  const licence = useBookingStore((state) => state.licence);
  const updateLicence = useBookingStore((state) => state.updateLicence);
  const [showErrors, setShowErrors] = useState(false);

  const checkout = () => {
    const valid = Boolean(licence.number.trim() && licence.expiryDate.trim() && licence.photoUri);
    setShowErrors(!valid);
    if (valid) router.push("/payment");
  };

  return (
    <FormStep title="Driving Licence" actionTitle="Check out" onAction={checkout}>
      <TextField
        placeholder="Licence Number"
        autoCapitalize="characters"
        value={licence.number}
        onChangeText={(number) => updateLicence({ number })}
        error={showErrors && !licence.number.trim()}
      />
      <TextField
        placeholder="Expiry Date"
        keyboardType="number-pad"
        value={licence.expiryDate}
        onChangeText={(value) => updateLicence({ expiryDate: formatExpiry(value) })}
        error={showErrors && !licence.expiryDate.trim()}
      />
      <LicencePhotoPicker
        uri={licence.photoUri}
        onChange={(photoUri) => updateLicence({ photoUri })}
        error={showErrors && !licence.photoUri}
      />
    </FormStep>
  );
}

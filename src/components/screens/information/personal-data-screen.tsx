import { router } from "expo-router";
import { useState } from "react";

import TextField from "@/components/ui/text-field";
import { useBookingStore } from "@/store/booking-store";
import type { PersonalData } from "@/types/booking";

import FormStep from "./form-step";

const FIELDS: { key: keyof PersonalData; placeholder: string; keyboard?: "phone-pad" | "number-pad" }[] = [
  { key: "fullName", placeholder: "Full Name" },
  { key: "phone", placeholder: "Phone Number", keyboard: "phone-pad" },
  { key: "address", placeholder: "Address" },
  { key: "nationalId", placeholder: "National Identiy Number" },
];

/** Information tab 1 — "Personal Data". */
export default function PersonalDataScreen() {
  const personalData = useBookingStore((state) => state.personalData);
  const updatePersonalData = useBookingStore((state) => state.updatePersonalData);
  const [showErrors, setShowErrors] = useState(false);

  const next = () => {
    const valid = FIELDS.every(({ key }) => personalData[key].trim().length > 0);
    setShowErrors(!valid);
    if (valid) router.navigate("/information/driving-licence");
  };

  return (
    <FormStep title="Personal Data" actionTitle="Next" onAction={next}>
      {FIELDS.map(({ key, placeholder, keyboard }) => (
        <TextField
          key={key}
          placeholder={placeholder}
          keyboardType={keyboard}
          value={personalData[key]}
          onChangeText={(value) => updatePersonalData({ [key]: value })}
          error={showErrors && !personalData[key].trim()}
        />
      ))}
    </FormStep>
  );
}

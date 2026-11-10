import { create } from "zustand";

import { getCarById, recentHistory } from "@/mock";
import type { DrivingLicence, HistoryItem, PersonalData } from "@/types/booking";
import type { BrandSlug } from "@/types/car";
import type { PaymentMethodId } from "@/types/payment";

const emptyPersonalData: PersonalData = { fullName: "", phone: "", address: "", nationalId: "" };
const emptyLicence: DrivingLicence = { number: "", expiryDate: "", photoUri: null };

const formatDate = (date: Date) => {
  const month = date.toLocaleString("en-US", { month: "short" });
  return `${month} ${String(date.getDate()).padStart(2, "0")},${date.getFullYear()}`;
};

interface BookingState {
  carId: string | null;
  personalData: PersonalData;
  licence: DrivingLicence;
  paymentMethod: PaymentMethodId | null;
  history: HistoryItem[];

  startBooking: (carId: string) => void;
  updatePersonalData: (data: Partial<PersonalData>) => void;
  updateLicence: (data: Partial<DrivingLicence>) => void;
  selectPaymentMethod: (id: PaymentMethodId) => void;
  /** Moves the current booking into the history list and clears the draft. */
  completeBooking: () => void;
}

export const useBookingStore = create<BookingState>()((set, get) => ({
  carId: null,
  personalData: emptyPersonalData,
  licence: emptyLicence,
  paymentMethod: null,
  history: recentHistory,

  startBooking: (carId) => set({ carId }),
  updatePersonalData: (data) => set((state) => ({ personalData: { ...state.personalData, ...data } })),
  updateLicence: (data) => set((state) => ({ licence: { ...state.licence, ...data } })),
  selectPaymentMethod: (id) => set({ paymentMethod: id }),

  completeBooking: () => {
    const car = get().carId ? getCarById(get().carId as string) : undefined;
    if (car) {
      const item: HistoryItem = {
        id: `booking-${Date.now()}`,
        brand: car.brand as BrandSlug,
        title: `${car.brandName} ${car.model}`,
        date: formatDate(new Date()),
        price: car.pricePerDay,
        days: 1,
      };
      set((state) => ({ history: [item, ...state.history] }));
    }
    set({ carId: null, paymentMethod: null, licence: emptyLicence });
  },
}));

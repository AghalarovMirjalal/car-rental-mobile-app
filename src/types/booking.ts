import type { BrandSlug } from "./car";
import type { PaymentMethodId } from "./payment";

export interface PersonalData {
  fullName: string;
  phone: string;
  address: string;
  nationalId: string;
}

export interface DrivingLicence {
  number: string;
  expiryDate: string;
  photoUri: string | null;
}

export interface HistoryItem {
  id: string;
  brand: BrandSlug;
  title: string;
  date: string;
  price: number;
  days: number;
}

export interface Booking {
  carId: string;
  paymentMethod: PaymentMethodId | null;
}

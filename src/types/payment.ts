export type PaymentMethodId = "mastercard" | "visa" | "paypal" | "amex";

export interface PaymentMethod {
  id: PaymentMethodId;
  name: string;
  logo: number;
  /** Logo box size inside the option row, in design pixels. */
  logoSize: { width: number; height: number };
}

export interface CardDetails {
  cardNumber: string;
  holderName: string;
  expiry: string;
  cvv: string;
  saveCard: boolean;
}

import type { PaymentMethod } from "@/types/payment";

export const paymentMethods: PaymentMethod[] = [
  {
    id: "mastercard",
    name: "MasterCard",
    logo: require("@assets/images/payments/mastercard.png"),
    logoSize: { width: 64, height: 38 },
  },
  {
    id: "visa",
    name: "Visa",
    logo: require("@assets/images/payments/visa.png"),
    logoSize: { width: 66, height: 47 },
  },
  {
    id: "paypal",
    name: "PayPal",
    logo: require("@assets/images/payments/paypal.png"),
    logoSize: { width: 70, height: 23 },
  },
  {
    id: "amex",
    name: "American Express",
    logo: require("@assets/images/payments/amex.png"),
    // Stretched to a 59×43 rectangle in the Figma frame.
    logoSize: { width: 59, height: 43 },
    logoFit: "fill",
  },
];

/** 14.99 -> "$14.99", 32 -> "$32" */
export const formatPrice = (value: number) =>
  `$${Number.isInteger(value) ? value : value.toFixed(2)}`;

/** 1 -> "1 DAY", 3 -> "3 DAYS" */
export const formatDays = (days: number) => `${days} ${days === 1 ? "DAY" : "DAYS"}`;

/** Groups card number digits: "4242424242424242" -> "4242 4242 4242 4242" */
export const formatCardNumber = (value: string) =>
  value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, "$1 ");

/** "141225" -> "14/12/25" */
export const formatExpiry = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 6);
  return digits.replace(/(\d{2})(?=\d)/g, "$1/");
};

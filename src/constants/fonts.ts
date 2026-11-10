export const fonts = {
  light: "Poppins-Light",
  regular: "Poppins-Regular",
  medium: "Poppins-Medium",
  semiBold: "Poppins-SemiBold",
  bold: "Poppins-Bold",
  extraBold: "Poppins-ExtraBold",
  black: "Poppins-Black",
} as const;

export const fontAssets = {
  [fonts.light]: require("@assets/fonts/Poppins-Light.ttf"),
  [fonts.regular]: require("@assets/fonts/Poppins-Regular.ttf"),
  [fonts.medium]: require("@assets/fonts/Poppins-Medium.ttf"),
  [fonts.semiBold]: require("@assets/fonts/Poppins-SemiBold.ttf"),
  [fonts.bold]: require("@assets/fonts/Poppins-Bold.ttf"),
  [fonts.extraBold]: require("@assets/fonts/Poppins-ExtraBold.ttf"),
  [fonts.black]: require("@assets/fonts/Poppins-Black.ttf"),
};

export type FontName = (typeof fonts)[keyof typeof fonts];

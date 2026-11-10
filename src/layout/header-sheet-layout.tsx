import { PropsWithChildren, ReactNode } from "react";
import { StyleSheet, View } from "react-native";

import ScreenHeader from "@/components/ui/screen-header";
import type { ThemeColors } from "@/constants/colors";
import { useThemedStyles } from "@/hooks/use-themed-styles";
import { useTheme } from "@/hooks/use-theme";
import { s } from "@/utils/scale";

import ScreenContainer from "./screen-container";

interface HeaderSheetLayoutProps extends PropsWithChildren {
  title: string;
  /** Distance from the safe-area top to the top edge of the rounded sheet (design px). */
  sheetOffset: number;
  onBack?: () => void;
  footer?: ReactNode;
}

/**
 * Black header with a title + rounded sheet below it.
 * Used by the Payment and Information (driver details) screens.
 */
export default function HeaderSheetLayout({ title, sheetOffset, onBack, footer, children }: HeaderSheetLayoutProps) {
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);

  return (
    <ScreenContainer topColor={colors.header} backgroundColor={colors.header} statusBarStyle="light" edges={["top"]}>
      <ScreenHeader title={title} onBack={onBack} tint={colors.onHeader} />
      <View style={[styles.sheet, { marginTop: s(sheetOffset) - s(HEADER_HEIGHT) }]}>
        <View style={styles.body}>{children}</View>
        {footer}
      </View>
    </ScreenContainer>
  );
}

/** Height of `ScreenHeader` (title centered at 39px under the status bar). */
const HEADER_HEIGHT = 78;

const createStyles = (c: ThemeColors) =>
  StyleSheet.create({
    sheet: {
      flex: 1,
      backgroundColor: c.background,
      borderTopLeftRadius: s(55),
      borderTopRightRadius: s(55),
      overflow: "hidden",
    },
    body: { flex: 1 },
  });

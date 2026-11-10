import { Tabs } from "expo-router/js-tabs";

import { useTheme } from "@/hooks/use-theme";
import HeaderSheetLayout from "@/layout/header-sheet-layout";

import StepTabBar from "./step-tab-bar";

/**
 * "Information" screen with tabs: Personal Data -> Driving Licence.
 * The tab bar sits on top of the sheet and is drawn as the design's progress line.
 */
export default function InformationLayout() {
  const { colors } = useTheme();

  return (
    <HeaderSheetLayout title="Information" sheetOffset={74}>
      <Tabs
        tabBar={(props) => <StepTabBar {...props} />}
        screenOptions={{
          headerShown: false,
          tabBarPosition: "top",
          sceneStyle: { backgroundColor: colors.background },
          animation: "shift",
        }}
      >
        <Tabs.Screen name="personal-data" options={{ title: "Personal Data" }} />
        <Tabs.Screen name="driving-licence" options={{ title: "Driving Licence" }} />
      </Tabs>
    </HeaderSheetLayout>
  );
}

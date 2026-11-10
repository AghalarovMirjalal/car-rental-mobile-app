import { Tabs } from "expo-router/js-tabs";

import { useTheme } from "@/hooks/use-theme";
import TabBar from "@/layout/tab-bar";

/** Main screen tabs: Home (with the brand models page in its stack), Recent History (bell), Location, Settings. */
export default function TabsLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: colors.background } }}
    >
      <Tabs.Screen name="(home)" options={{ title: "Home" }} />
      <Tabs.Screen name="history" options={{ title: "Recent History" }} />
      <Tabs.Screen name="location" options={{ title: "Location" }} />
      <Tabs.Screen name="settings" options={{ title: "Settings" }} />
    </Tabs>
  );
}

import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import CarLogo from "@/components/ui/car-logo";
import { fonts } from "@/constants/fonts";
import { useTheme } from "@/hooks/use-theme";
import { useAuthStore } from "@/store/auth-store";
import { fs, s } from "@/utils/scale";

import AuthBackground from "./auth-background";
import AuthForm, { AuthMode } from "./auth-form";

interface AuthScreenProps {
  mode: AuthMode;
}

/** Welcome screen from the design. Works for both sign up and sign in. */
export default function AuthScreen({ mode }: AuthScreenProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const signIn = useAuthStore((state) => state.signIn);
  const isSignUp = mode === "sign-up";

  const handleSubmit = (email: string) => {
    signIn(email);
    router.replace("/(main)/(tabs)");
  };

  const switchMode = () => router.replace(isSignUp ? "/(auth)/sign-in" : "/(auth)/sign-up");

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <StatusBar style="light" />
      <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView
          contentContainerStyle={[styles.content, { paddingTop: insets.top, paddingBottom: insets.bottom + s(24) }]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <AuthBackground topInset={insets.top} />
          <View style={styles.logo}>
            <CarLogo width={236} />
          </View>

          <AuthForm mode={mode} onSubmit={handleSubmit} />

          <Text style={[styles.footer, { color: colors.textSecondary }]}>
            {isSignUp ? "Have an account?" : "Don't have an account?"}
            <Text style={{ color: colors.primary }} onPress={switchMode} suppressHighlighting>
              {isSignUp ? "Sign in" : "Sign up"}
            </Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { flexGrow: 1 },
  logo: { alignItems: "center", marginTop: s(89), marginBottom: s(65) },
  footer: {
    marginTop: s(33),
    textAlign: "center",
    fontFamily: fonts.medium,
    fontSize: fs(12),
    lineHeight: fs(18),
  },
});

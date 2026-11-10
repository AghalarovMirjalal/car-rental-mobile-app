import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

import AppText from "@/components/ui/app-text";
import Button from "@/components/ui/button";
import TextField from "@/components/ui/text-field";
import type { ThemeColors } from "@/constants/colors";
import { useTheme } from "@/hooks/use-theme";
import { useThemedStyles } from "@/hooks/use-themed-styles";
import { s } from "@/utils/scale";

export type AuthMode = "sign-up" | "sign-in";

interface AuthFormProps {
  mode: AuthMode;
  onSubmit: (email: string) => void;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** White card with email / password, the primary action and the facebook button. */
export default function AuthForm({ mode, onSubmit }: AuthFormProps) {
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const isSignUp = mode === "sign-up";

  const handleSubmit = () => {
    if (!EMAIL_RE.test(email.trim())) return setError("Enter a valid email address");
    if (password.length < 6) return setError("Password must be at least 6 characters");
    setError(null);
    onSubmit(email.trim());
  };

  return (
    <View style={styles.card}>
      <AppText size={20} weight="semiBold" color={colors.textSecondary} align="center" style={styles.title}>
        {isSignUp ? "Sign up to join" : "Sign in to continue"}
      </AppText>

      <TextField
        variant="pill"
        placeholder="Email Address"
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        value={email}
        onChangeText={setEmail}
        icon={<Ionicons name="mail-outline" size={s(20)} color={colors.placeholder} />}
      />
      <TextField
        variant="pill"
        placeholder="Password"
        secureTextEntry
        autoComplete={isSignUp ? "new-password" : "password"}
        value={password}
        onChangeText={setPassword}
        containerStyle={styles.gap}
        icon={<Ionicons name="lock-closed" size={s(19)} color={colors.placeholder} />}
      />

      {error ? (
        <AppText size={11} weight="medium" color="#E5484D" style={styles.error}>
          {error}
        </AppText>
      ) : null}

      <Button
        title={isSignUp ? "Sign up" : "Sign in"}
        height={46}
        fontSize={12}
        fontWeight="medium"
        onPress={handleSubmit}
        style={[styles.submit, error ? styles.submitWithError : null]}
      />

      <AppText size={12} color={colors.textSecondary} align="center" style={styles.or}>
        or
      </AppText>

      <Button
        title={isSignUp ? "Sign up with facebook" : "Sign in with facebook"}
        variant="facebook"
        height={45}
        fontSize={12}
        fontWeight="medium"
        onPress={() => onSubmit("facebook.user@rcarental.app")}
        icon={<FontAwesome name="facebook" size={s(18)} color={colors.onPrimary} />}
      />
    </View>
  );
}

const createStyles = (c: ThemeColors) =>
  StyleSheet.create({
    card: {
      marginHorizontal: s(33),
      borderRadius: s(10),
      backgroundColor: c.card,
      paddingHorizontal: s(23),
      paddingTop: s(37),
      paddingBottom: s(56),
      shadowColor: c.shadow,
      shadowOpacity: 0.12,
      shadowRadius: s(8),
      shadowOffset: { width: 0, height: s(2) },
      elevation: 4,
    },
    title: { marginBottom: s(44) },
    gap: { marginTop: s(20) },
    error: { marginTop: s(8), marginLeft: s(12) },
    submit: { marginTop: s(19) },
    submitWithError: { marginTop: s(8) },
    or: { marginTop: s(19), marginBottom: s(18) },
  });

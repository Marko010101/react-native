// components/LoginForm.tsx
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  ImageBackground,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Colors } from "../constants/Colors";
import { useLogin } from "../hooks/auth/useLogin";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import CustomButton from "./ui/CustomButton";

const LoginForm = () => {
  const { dark } = useTheme();
  const scheme = (dark ? "dark" : "light") as "light" | "dark";
  const styles = useMemo(() => createStyles(scheme), [scheme]);
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { mutateAsync: login, isPending, error, reset } = useLogin();
  const canSubmit =
    username.trim().length > 0 && password.length > 0 && !isPending;

  const handleLogin = async () => {
    if (!canSubmit) return;
    Keyboard.dismiss();
    try {
      // reset previous error state (from a failed attempt)
      reset();
      await login({ username, password }); // token storage + ["me"] invalidation happen inside the hook
      router.replace("/(drawer)/(tabs)");
    } catch {
      // error UI is handled below via `error`
    }
  };

  // Try to extract a readable message (Axios-style or fetch-style)
  const errorMsg =
    (error as any)?.response?.data?.message || (error as any)?.message || null;

  return (
    <ThemedView style={styles.container}>
      <View style={styles.centerBlock}>
        <ImageBackground
          source={require("../assets/images/logo-rsm.png")}
          style={styles.topBackground}
          resizeMode="contain"
        />

        <ThemedText type="title" style={styles.title}>
          მოგესალმებით!
        </ThemedText>

        <ThemedView style={styles.formContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setUsername}
            value={username}
            placeholder="სახელი"
            placeholderTextColor={Colors[scheme].icon}
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="username"
            returnKeyType="next"
          />

          <ThemedView style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              onChangeText={setPassword}
              value={password}
              placeholder="პაროლი"
              placeholderTextColor={Colors[scheme].icon}
              secureTextEntry={!showPassword}
              textContentType="password"
              returnKeyType="done"
              onSubmitEditing={handleLogin}
            />
            <TouchableOpacity
              onPress={() => setShowPassword((v) => !v)}
              style={styles.eyeButton}
            >
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={22}
                color={Colors[scheme].icon}
              />
            </TouchableOpacity>
          </ThemedView>

          {errorMsg ? (
            <Text style={styles.errorText}>
              სახელი ან პაროლი არასწორია, სცადეთ ხელახლა.
            </Text>
          ) : null}

          <ThemedView>
            <CustomButton
              title="შესვლა"
              onPress={handleLogin}
              disabled={!canSubmit}
              loading={isPending}
              style={styles.buttonLogin}
            />
          </ThemedView>
        </ThemedView>
      </View>
    </ThemedView>
  );
};

export default LoginForm;

const createStyles = (scheme: "light" | "dark") =>
  StyleSheet.create({
    container: { flex: 1 },
    centerBlock: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 16,
      marginBottom: 150,
    },
    topBackground: {
      height: 150,
      justifyContent: "flex-end",
      alignItems: "center",
      width: "100%",
      borderRadius: 12,
      overflow: "hidden",
      marginBottom: 20,
      backgroundColor:
        scheme === "light" ? Colors[scheme].tint : Colors[scheme].background,
    },
    formContainer: { width: "90%", alignItems: "center" },
    passwordContainer: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      marginVertical: 6,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: Colors[scheme].tint,
      backgroundColor: "transparent",
    },
    input: {
      marginVertical: 6,
      height: 44,
      width: "100%",
      borderWidth: 1,
      borderRadius: 10,
      borderColor: Colors[scheme].tint,
      color: Colors[scheme].text,
      paddingHorizontal: 12,
    },
    passwordInput: {
      flex: 1,
      height: 44,
      paddingHorizontal: 12,
      margin: 0,
      borderWidth: 0,
      borderColor: Colors[scheme].tint,
      color: Colors[scheme].text,
    },
    eyeButton: { paddingHorizontal: 12, height: 44, justifyContent: "center" },
    errorText: {
      width: "100%",
      marginTop: 6,
      textAlign: "left",
      fontSize: 13,
      lineHeight: 18,
      color: Colors[scheme].errorText,
    },
    title: {
      fontSize: 24,
      marginBottom: 16,
      textAlign: "center",
      fontWeight: "bold",
    },
    buttonLogin: { marginTop: 16 },
  });

import LoginForm from "@/components/LoginForm";
import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function LoginScreen() {
  const router = useRouter();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <LoginForm />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

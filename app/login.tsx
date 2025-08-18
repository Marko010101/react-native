import LoginForm from "@/components/LoginForm";
import React from "react";
import { SafeAreaView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function LoginScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <LoginForm />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

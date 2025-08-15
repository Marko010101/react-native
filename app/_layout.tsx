import { usePushNotifications } from "@/hooks/usePushNotifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Platform, StatusBar, View } from "react-native";
import { Colors } from "../constants/Colors";
import { queryClient } from "../lib/queryClient";
import { AppThemeProvider, useAppTheme } from "../lib/theme";

function AppShell() {
  const router = useRouter();
  const { isDark, theme } = useAppTheme();
  const { notification, expoPushToken } = usePushNotifications();

  const data = JSON.stringify(notification, undefined, 2);

  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem("userToken");
      setIsLoggedIn(!!token);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (loading) return;
    router.replace(isLoggedIn ? "/(drawer)/(tabs)" : "/login");
  }, [loading, isLoggedIn, router]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Stack
          screenOptions={{ headerShown: false, animation: "slide_from_right" }}
        >
          <Stack.Screen name="(drawer)" />
          <Stack.Screen name="terminal/[id]" options={{ headerShown: true }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" options={{ headerShown: false }} />
        </Stack>
      </QueryClientProvider>

      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        {...(Platform.OS === "android"
          ? { backgroundColor: Colors[theme].background }
          : {})}
      />
    </>
  );
}

export default function RootLayout() {
  return (
    <AppThemeProvider>
      <AppShell />
    </AppThemeProvider>
  );
}

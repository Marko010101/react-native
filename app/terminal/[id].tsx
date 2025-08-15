import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useTheme } from "@react-navigation/native";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useCallback } from "react";
import { BackHandler, Pressable, SafeAreaView, StyleSheet } from "react-native";
import { ThemedView } from "../../components/ThemedView";
import TerminalItem, { Terminal } from "../../components/ui/TerminalItem";
import { useTerminals } from "../../hooks/terminals/useTerminals";

export default function TerminalDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data } = useTerminals();
  const { colors } = useTheme();

  const list: Terminal[] = (data?.value ?? data ?? []) as Terminal[];
  const terminal = list.find((t) => String(t.id) === String(id));

  useFocusEffect(
    useCallback(() => {
      const sub = BackHandler.addEventListener("hardwareBackPress", () => {
        if (router.canGoBack()) {
          router.back(); // ✅ reverse animation (slides the opposite way)
        } else {
          router.replace("/(drawer)/(tabs)"); // fallback (no history)
        }
        return true;
      });
      return () => sub.remove();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: terminal?.name ?? "Terminal",
          // Always go to terminals tab
          headerLeft: () => (
            <Pressable
              onPress={() => {
                if (router.canGoBack()) {
                  router.back();
                } else {
                  router.replace("/(drawer)/(tabs)");
                }
              }}
              style={{ paddingHorizontal: 8 }}
              hitSlop={10}
              accessibilityRole="button"
              accessibilityLabel="Back to terminals"
            >
              <Ionicons name="chevron-back" size={24} color={colors.text} />
            </Pressable>
          ),
        }}
      />
      {terminal ? (
        <TerminalItem item={terminal} compact={false} />
      ) : (
        <ThemedView />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 16 } });

import TerminalItem, { Terminal } from "@/components/ui/TerminalItem";
import { useTerminals } from "@/hooks/terminals/useTerminals";
import { usePushNotifications } from "@/hooks/usePushNotifications";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { router } from "expo-router";
import { useCallback, useMemo } from "react";
import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { data } = useTerminals();
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();
  const { notification, expoPushToken } = usePushNotifications();

  const dataNot = JSON.stringify(notification, undefined, 2);

  const list: Terminal[] = useMemo(() => data?.value ?? data ?? [], [data]);

  const renderItem = useCallback(
    ({ item }: { item: Terminal }) => (
      <TerminalItem
        item={item}
        compact
        onPress={() =>
          router.push({
            pathname: "/terminal/[id]",
            params: { id: String(item.id) },
          })
        }
      />
    ),
    []
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* <ThemedText>
        Token: {expoPushToken?.data ?? "No token available"}
      </ThemedText> */}
      <FlatList
        data={list}
        keyExtractor={(i) => String(i.id)}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        contentContainerStyle={{
          padding: 16,
          paddingBottom: tabBarHeight + insets.bottom,
        }}
        scrollIndicatorInsets={{ bottom: tabBarHeight + insets.bottom }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ container: { flex: 1 } });

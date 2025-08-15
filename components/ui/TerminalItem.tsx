import { memo } from "react";
import { Pressable, StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

export type Terminal = {
  id: number;
  name: string;
  ip: string;
  warehouseId: number;
  terminalType: string;
  equipmentNotification: string;
  updateDate: string;
};

type Props = {
  item: Terminal;
  onPress?: () => void;
  compact?: boolean; // ← list = true (default), details = false
};

function TerminalItem({ item, onPress, compact = true }: Props) {
  return (
    <Pressable onPress={onPress} android_ripple={{}}>
      <ThemedView style={styles.card}>
        <ThemedText style={styles.title}>{item.name}</ThemedText>
        <ThemedView style={styles.container}>
          <ThemedText>IP: {item.ip}</ThemedText>
          <ThemedText>Warehouse: {item.warehouseId}</ThemedText>
        </ThemedView>

        {!compact && (
          <>
            <ThemedText>Type: {item.terminalType}</ThemedText>
            <ThemedText>Notif: {item.equipmentNotification}</ThemedText>
            <ThemedText>
              Updated: {new Date(item.updateDate).toLocaleString()}
            </ThemedText>
          </>
        )}
      </ThemedView>
    </Pressable>
  );
}

export default memo(TerminalItem);

const styles = StyleSheet.create({
  card: { padding: 12, borderRadius: 12, alignItems: "center" },
  title: { fontSize: 16, fontWeight: "600", marginBottom: 4 },
  container: {
    alignSelf: "stretch",
    marginTop: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

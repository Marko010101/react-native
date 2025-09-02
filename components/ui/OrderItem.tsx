import { Colors } from "@/constants/Colors";
import { enumService } from "@/constants/enumService";
import { useAppTheme } from "@/lib/theme";
import { Order } from "@/types/Order";
import { StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

export default function OrderItem({ item }: { item: Order }) {
  const { theme } = useAppTheme();

  const recipeName = item?.ggddLine?.ggdd?.itemName ?? "—";
  const statusName = enumService.orderStatuses.find(
    (status) => item.statusInt === status.id
  )?.name;

  const matchColor = (statusId: number) => {
    switch (statusId) {
      case 1:
        return Colors[theme].orange;
      case 2:
        return Colors[theme].darkRed;
      case 3:
        return Colors[theme].green;
      case 4:
        return Colors[theme].blue;
      default:
        return "#9E9E9E";
    }
  };

  const statusColor = matchColor(item.statusInt);

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.boldText}>{String(item.id)}</ThemedText>
      <ThemedText>{item.itemName}</ThemedText>
      <ThemedText
        style={styles.boldText}
      >{`მშობელი: ${recipeName}`}</ThemedText>
      <ThemedText
        style={styles.boldText}
      >{`თარიღი: ${item.businessDay}`}</ThemedText>
      <ThemedView
        style={[styles.statusBadge, { backgroundColor: statusColor }]}
      >
        <ThemedText style={styles.statusText}>
          {`(${item.status} - ${statusName ?? "—"})`}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 12,
    gap: 3,
  },
  boldText: {
    fontWeight: "600",
  },
  statusBadge: {
    alignSelf: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: 8,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  statusText: {
    color: "#fff",
    fontWeight: "500",
    textAlign: "center",
  },
});

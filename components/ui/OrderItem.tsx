import { Order } from "@/types/Order";
import { StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

const orderItem = ({ item }: { item: Order }) => {
  const recipeName = item?.ggddLine?.ggdd?.itemName ?? "—";
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.boldText}>{`${item.id}`}</ThemedText>
      <ThemedText>{`${item.itemName}`}</ThemedText>
      <ThemedText
        style={styles.boldText}
      >{`მშობელი: ${recipeName}`}</ThemedText>
      <ThemedText
        style={styles.boldText}
      >{`თარიღი: ${item.businessDay}`}</ThemedText>
      <ThemedText>{`(${item.statusInt} - ${item.status})`}</ThemedText>
    </ThemedView>
  );
};

export default orderItem;

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 12,
    gap: 3,
  },
  boldText: {
    fontWeight: 600,
  },
});

import React from "react";
import { StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

export default function EmptyOrders() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.text}>ორდერები ვერ მოიძებნა</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    marginTop: 8,
    borderRadius: 16,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
  },
});

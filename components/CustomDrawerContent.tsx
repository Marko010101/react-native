import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Switch } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import CustomButton from "./ui/CustomButton";

export default function CustomDrawerContent(
  props: DrawerContentComponentProps & {
    isDark: boolean;
    onToggleTheme: () => void;
  }
) {
  const { isDark, onToggleTheme, ...drawerProps } = props;

  const handleLogOut = () => {
    AsyncStorage.removeItem("userToken").then(() => {
      router.replace("/login");
    });
  };

  return (
    <DrawerContentScrollView
      {...drawerProps}
      contentContainerStyle={styles.container}
    >
      <DrawerItemList {...drawerProps} />
      <ThemedView style={styles.separator} />

      <ThemedView style={styles.themeLogutContainer}>
        <ThemedView style={styles.row}>
          <ThemedText>Dark Mode</ThemedText>
          <Switch value={isDark} onValueChange={onToggleTheme} />
        </ThemedView>

        <CustomButton
          style={styles.button}
          title="გასვლა"
          onPress={handleLogOut}
        />
      </ThemedView>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
  },
  container: { paddingHorizontal: 16, flex: 1 },
  row: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    width: "40%",
    alignSelf: "center",
    marginHorizontal: 16,
  },
  themeLogutContainer: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 16,
  },
});

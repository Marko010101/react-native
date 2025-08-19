// app/(drawer)/(tabs)/_layout.tsx
import { Colors } from "@/constants/Colors";
import { useAppTheme } from "@/lib/theme";
import { Ionicons } from "@expo/vector-icons";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  const { theme = "light" } = useAppTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "center",
        headerLeft: () => <DrawerToggleButton tintColor={Colors[theme].icon} />,
        headerStyle: { backgroundColor: Colors[theme].background },
        headerTintColor: Colors[theme].text,
        tabBarActiveTintColor: Colors[theme].tint,
        tabBarStyle: { backgroundColor: Colors[theme].border },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Terminals",
          tabBarLabel: "Terminals",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="server" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: "Orders",
          tabBarLabel: "Orders",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

import { DrawerToggleButton } from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";
import CustomDrawerContent from "../../components/CustomDrawerContent";
import { Colors } from "../../constants/Colors";
import { useAppTheme } from "../../lib/theme";

export default function DrawerLayout() {
  const { theme, isDark, toggleTheme } = useAppTheme();

  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        headerLeft: () => <DrawerToggleButton tintColor={Colors[theme].icon} />,
        headerStyle: { backgroundColor: Colors[theme].background },
        headerTintColor: Colors[theme].text,
      }}
      drawerContent={(props) => (
        <CustomDrawerContent
          {...props}
          isDark={isDark}
          onToggleTheme={toggleTheme}
        />
      )}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          headerShown: false, // hide Drawer’s header, let tabs handle it
        }}
      />
    </Drawer>
  );
}

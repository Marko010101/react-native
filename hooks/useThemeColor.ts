// hooks/useThemeColor.ts
import { Colors } from "@/constants/Colors";
import { useTheme } from "@react-navigation/native";

type ColorsKey = keyof typeof Colors.light;

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: ColorsKey
) {
  const { dark } = useTheme();
  const themeName = dark ? "dark" : "light";

  const override = props[themeName];
  return override ?? Colors[themeName][colorName];
}

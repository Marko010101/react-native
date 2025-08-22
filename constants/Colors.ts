const tintLight = "#0a7ea4";
const tintDark = "#ffffff";
const error = "#d44343ff";
const mediumGray = "#45494dff";

export type ThemeMode = "light" | "dark";
export type ThemeModeWithSystem = ThemeMode | "system";

type Palette = {
  text: string;
  background: string;
  tint: string;
  icon: string;
  tabIconDefault: string;
  tabIconSelected: string;
  errorText: string;
  border: string;
  mediumGray: string;
};

export const Colors: Record<ThemeMode, Palette> = {
  light: {
    text: "#11181C",
    background: "#FFFFFF",
    tint: tintLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintLight,
    errorText: error,
    border: "#E5E5EA",
    mediumGray: mediumGray,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintDark,
    errorText: error,
    border: "#2C2C2E",
    mediumGray: mediumGray,
  },
} as const;

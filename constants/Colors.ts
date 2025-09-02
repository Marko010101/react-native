const tintLight = "#0a7ea4";
const tintDark = "#ffffff";
const error = "#d44343ff";
const darkRed = "#6d0101ff";
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
  darkRed: string;
  orange: string;
  green: string;
  blue: string;
};

export const Colors: Record<ThemeMode, Palette> = {
  light: {
    text: "#11181C",
    background: "#FFFFFF",
    icon: "#687076",
    tabIconDefault: "#687076",
    green: "#00a706ff",
    border: "#E5E5EA",
    blue: "#4aa2ffff",
    orange: "#faab17ff",
    tint: tintLight,
    tabIconSelected: tintLight,
    errorText: error,
    mediumGray: mediumGray,
    darkRed: darkRed,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    green: "#4CAF50",
    border: "#2C2C2E",
    blue: "#007AFF",
    orange: "#FFA500",
    tint: tintDark,
    tabIconSelected: tintDark,
    errorText: error,
    mediumGray: mediumGray,
    darkRed: darkRed,
  },
} as const;

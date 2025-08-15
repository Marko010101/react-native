const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";
const errorText = "#d44343ff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    errorText,
    border: "#E5E5EA", // <- new, subtle light grey border
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    errorText,
    border: "#2C2C2E", // <- new, subtle dark grey border
  },
};

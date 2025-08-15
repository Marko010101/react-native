import { Colors } from "@/constants/Colors";
import { useAppTheme } from "@/lib/theme";
import React, { useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export default function CustomButton({
  title,
  onPress,
  disabled = false,
  loading = false,
  style,
  textStyle,
}: CustomButtonProps) {
  const { theme, isDark } = useAppTheme();
  const themeColors = Colors[theme];

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const isInteractive = !disabled && !loading;

  const handlePressIn = () => {
    if (!isInteractive) return;
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
      speed: 50,
      bounciness: 0,
    }).start();
  };

  const handlePressOut = () => {
    if (!isInteractive) return;
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 0,
    }).start();
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={isInteractive ? onPress : undefined}
      disabled={!isInteractive}
      accessibilityRole="button"
      accessibilityState={{ disabled: !isInteractive, busy: loading }}
    >
      {({ pressed }) => {
        const baseBg = themeColors.tint;
        const pressedBg = themeColors.tabIconSelected;
        const bg = pressed && isInteractive ? pressedBg : baseBg;

        return (
          <Animated.View
            style={[
              styles.button,
              {
                backgroundColor: bg,
                transform: [{ scale: scaleAnim }],
                borderColor: isDark ? themeColors.tint : "transparent",
              },
              (disabled || loading) && styles.buttonDisabled,
              loading && styles.buttonLoading,
              style,
            ]}
          >
            {loading ? (
              <ActivityIndicator size="small" color={themeColors.background} />
            ) : (
              <Text
                style={[
                  styles.text,
                  { color: themeColors.background },
                  textStyle,
                ]}
              >
                {title}
              </Text>
            )}
          </Animated.View>
        );
      }}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
    borderWidth: 1,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonLoading: {
    opacity: 0.9,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});

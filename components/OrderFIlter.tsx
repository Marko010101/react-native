import {
  DarkCalendarStyles,
  LightCalendarStyles,
} from "@/constants/CalendarStyles";
import { Colors } from "@/constants/Colors";
import {
  buildHandleRangeChange,
  last7DaysRange,
  normalizeRange,
  todayRange,
  yesterdayRange,
} from "@/helpers/DateHelpers";
import { useAppTheme } from "@/lib/theme";
import React, { useMemo, useState } from "react";
import { Modal, Platform, Pressable, StyleSheet, View } from "react-native";
import DropDownPicker, { ItemType } from "react-native-dropdown-picker";
import DateTimePicker, { useDefaultStyles } from "react-native-ui-datepicker";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import CustomButton from "./ui/CustomButton";

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  operationItems: ItemType<number>[];
  setOperationItems: React.Dispatch<React.SetStateAction<ItemType<number>[]>>;
  operationValue: number[];
  setOperationValue: React.Dispatch<React.SetStateAction<number[]>>;
  statusItems: ItemType<number>[];
  setStatusItems: React.Dispatch<React.SetStateAction<ItemType<number>[]>>;
  statusValue: number[];
  setStatusValue: React.Dispatch<React.SetStateAction<number[]>>;
  warehouseItems: ItemType<number>[];
  warehouseValue: number | null;
  setWarehouseValue: React.Dispatch<React.SetStateAction<number | null>>;
  startDate: Date;
  endDate: Date;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  setEndDate: React.Dispatch<React.SetStateAction<Date>>;
  onApply: (state: {
    operationTypes: number[];
    statusTypes: number[];
    warehouseId: number | null;
    startDate: Date | null;
    endDate: Date | null;
  }) => void;
};

export default function OrderFilter(props: Props) {
  const {
    isModalOpen,
    setIsModalOpen,
    operationItems,
    setOperationItems,
    operationValue,
    setOperationValue,
    statusItems,
    setStatusItems,
    statusValue,
    setStatusValue,
    warehouseItems,
    warehouseValue,
    setWarehouseValue,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    onApply,
  } = props;

  const { theme, isDark } = useAppTheme();

  // override only for iOS light mode

  const [openOperation, setOpenOperation] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [openWarehouse, setOpenWarehouse] = useState(false);

  const styles = useMemo(() => createStyles(theme, isDark), [theme, isDark]);
  const defaultStyles = useDefaultStyles();

  const onBackdropPress = () => {
    if (openOperation) return setOpenOperation(false);
    if (openStatus) return setOpenStatus(false);
    if (openWarehouse) return setOpenWarehouse(false);
    setIsModalOpen(false);
  };

  const onModalSurfacePress = () => {
    if (openOperation) setOpenOperation(false);
    if (openStatus) setOpenStatus(false);
    if (openWarehouse) setOpenWarehouse(false);
  };

  const apply = () => {
    const [a, b] = normalizeRange(startDate, endDate);
    onApply({
      operationTypes: operationValue,
      statusTypes: statusValue,
      warehouseId: warehouseValue ?? null,
      startDate: a,
      endDate: b,
    });
  };
  const clear = () => {
    setOperationValue([]);
    setStatusValue([]);

    setWarehouseValue(null);

    const [a, b] = todayRange();
    setStartDate(a);
    setEndDate(b);
  };

  const handleRangeChange = buildHandleRangeChange(
    startDate,
    endDate,
    setStartDate,
    setEndDate
  );

  const onPresetToday = () => {
    const [a, b] = todayRange();
    setStartDate(a);
    setEndDate(b);
  };
  const onPresetYesterday = () => {
    const [a, b] = yesterdayRange();
    setStartDate(a);
    setEndDate(b);
  };
  const onPresetLast7 = () => {
    const [a, b] = last7DaysRange();
    setStartDate(a);
    setEndDate(b);
  };
  const iosLightCalendarOverride =
    Platform.OS === "ios" && !isDark ? LightCalendarStyles : {};

  const androidDarkCalendarOverride =
    Platform.OS === "android" && isDark ? DarkCalendarStyles : {};

  return (
    <Modal
      visible={isModalOpen}
      transparent
      animationType="slide"
      presentationStyle="overFullScreen"
      statusBarTranslucent
      onRequestClose={() => setIsModalOpen(false)}
    >
      <Pressable style={styles.backdrop} onPress={onBackdropPress}>
        <Pressable style={styles.modalView} onPress={onModalSurfacePress}>
          <ThemedText style={styles.modalText}>Filter Orders</ThemedText>

          {/* QUICK CONTROLS */}

          <View style={{ zIndex: 3000 }}>
            <DropDownPicker
              open={openOperation}
              value={operationValue}
              items={operationItems}
              setOpen={setOpenOperation}
              setValue={setOperationValue}
              setItems={setOperationItems}
              placeholder="აირჩიე ოპერაციის ტიპი"
              listMode="SCROLLVIEW"
              multiple
              mode="BADGE"
              multipleText=""
              badgeDotColors={[]}
              closeOnBackPressed
              onClose={() => setOpenOperation(false)}
              dropDownContainerStyle={{ zIndex: 3001, elevation: 6 }}
              closeAfterSelecting={false}
            />
          </View>

          {/* Status (multi) */}
          <View style={{ zIndex: 2000 }}>
            <DropDownPicker
              open={openStatus}
              value={statusValue}
              items={statusItems}
              setOpen={setOpenStatus}
              setValue={setStatusValue}
              setItems={setStatusItems}
              placeholder="აირჩიე სტატუსი"
              listMode="SCROLLVIEW"
              multiple
              mode="BADGE"
              multipleText=""
              badgeDotColors={[]}
              closeOnBackPressed
              onClose={() => setOpenStatus(false)}
              dropDownContainerStyle={{ zIndex: 2001, elevation: 6 }}
              closeAfterSelecting={false}
            />
          </View>

          <View style={{ zIndex: 1000 }}>
            <DropDownPicker
              open={openWarehouse}
              value={warehouseValue}
              items={warehouseItems}
              setOpen={setOpenWarehouse}
              setValue={setWarehouseValue}
              setItems={() => {}}
              placeholder="აირჩიე უბანი/საწყობი"
              listMode="SCROLLVIEW"
              multiple={false}
              closeOnBackPressed
              onClose={() => setOpenWarehouse(false)}
              dropDownContainerStyle={{ zIndex: 1001, elevation: 6 }}
              showTickIcon
            />
          </View>
          <View style={styles.controlsRow}>
            <CustomButton
              title="Today"
              onPress={onPresetToday}
              style={styles.chip}
            />
            <CustomButton
              title="Yesterday"
              onPress={onPresetYesterday}
              style={styles.chip}
            />
            <CustomButton
              title="Last 7"
              onPress={onPresetLast7}
              style={styles.chip}
            />
          </View>
          <View>
            <DateTimePicker
              mode="range"
              startDate={startDate as any}
              endDate={endDate as any}
              onChange={handleRangeChange}
              styles={{
                ...defaultStyles,
                ...iosLightCalendarOverride,
                ...androidDarkCalendarOverride,
              }}
            />
          </View>
          <ThemedView style={styles.buttonsContainer}>
            <CustomButton
              onPress={clear}
              title="Clear"
              style={styles.clearBtn}
              textStyle={{ color: "#fff" }}
            />
            <ThemedView style={{ flex: 1, backgroundColor: "transparent" }}>
              <CustomButton onPress={apply} title="Apply" />
            </ThemedView>
          </ThemedView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

function createStyles(theme: "light" | "dark", isDark: boolean) {
  return StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.4)",
      justifyContent: "center",
      alignItems: "center",
      padding: 24,
    },
    modalView: {
      width: "100%",
      maxWidth: 560,
      backgroundColor: isDark
        ? Colors[theme].mediumGray
        : Colors[theme].background,
      borderRadius: 16,
      padding: 24,
      gap: 16,
      ...Platform.select({
        ios: {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 4,
        },
        android: { elevation: 5 },
      }),
    },
    modalText: {
      marginBottom: 8,
      fontSize: 18,
      fontWeight: "600",
      textAlign: "center",
      color: Colors[theme].text,
    },
    controlsRow: {
      marginTop: 10,
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
      justifyContent: "center",
    },
    chip: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 999,
    },
    secondary: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 12,
      backgroundColor: Colors[theme].mediumGray,
    },
    buttonsContainer: {
      width: "100%",
      flexDirection: "row",
      backgroundColor: "transparent",
      gap: 12,
    },
    clearBtn: {
      backgroundColor: Colors[theme].darkRed,
      color: "#fff",
      borderWidth: 0,
    },
  });
}

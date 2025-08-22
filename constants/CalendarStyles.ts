export const LightCalendarStyles = {
  active_year: {
    backgroundColor: "#1e68a5ff",
    color: "#FFFFFF",
  },

  selected_year: {
    backgroundColor: "#255b8fff",
    color: "#FFFFFF",
  },

  year: {
    backgroundColor: "#70acd4ff",
    color: "#FFFFFF",
  },

  month_selector: {
    color: "#0c0101ff",
  },
  month: {
    backgroundColor: "#0c0101ff",
    color: "#FFFFFF",
  },
  month_selector_label: {
    color: "black",
  },
  selected_month: {
    backgroundColor: "#0c0101ff",
    color: "#FFFFFF",
  },
  selected_month_label: {
    backgroundColor: "#0c0101ff",
    color: "#FFFFFF",
  },
  range_end_label: {
    color: "#FFFFFF",
  },

  // TEST
  header: { backgroundColor: "transparent" },
  month_label: { color: "#111827", fontWeight: "600" },
  button_next_image: { tintColor: "#374151" },
  button_prev_image: { tintColor: "#374151" },

  // --- Weekday row ---
  weekdays: { backgroundColor: "transparent" },
  weekday_label: { color: "#6B7280", fontWeight: "600" },

  // --- Grid wrappers ---
  months: { backgroundColor: "transparent" },
  days: { backgroundColor: "transparent" },

  day_label: { color: "#111827" },

  today: {
    backgroundColor: "#FFFFFF",
    borderColor: "#2563EB",
    borderWidth: 1,
    borderRadius: 8,
  },
  today_label: { color: "#111827", fontWeight: "600" },

  selected: {
    backgroundColor: "#2563EB",
    color: "#FFFFFF",
    borderRadius: 8,
  },
  selected_label: { color: "#FFFFFF", fontWeight: "600" },

  range_fill: { backgroundColor: "#DBEAFE" },
  range_fill_weekstart: { backgroundColor: "#DBEAFE" },
  range_fill_weekend: { backgroundColor: "#DBEAFE" },
  range_start: {
    // backgroundColor: "#2563EB",
    borderRadius: 8,
  },
  range_end: {
    backgroundColor: "#2563EB",
    borderRadius: 8,
  },
  range_middle: { backgroundColor: "#DBEAFE" },
  range_middle_label: { color: "#111827" },

  outside_label: { color: "#9CA3AF" },
  disabled_label: { color: "#D1D5DB" },
};

export const DarkCalendarStyles = {
  year: {
    backgroundColor: "#f7f7f8ff", // light gray
    color: "#111827",
    borderRadius: 6,
  },
  active_year: {
    backgroundColor: "#2563EB",
    fontWeight: 700, // blue-600
    color: "#FFFFFF",
    borderRadius: 6,
  },
  selected_year: {
    backgroundColor: "#f7f7f8ff", // darker blue
    color: "#111827",
    borderWidth: 1,
    borderColor: "#3939ffff",
    borderRadius: 6,
  },
  year_label: { color: "#111827" },
  selected_year_label: { color: "#000000ff" },
  active_year_label: { color: "#ebebebff", fontWeight: 700 },

  // --- Month view ---
  month_selector: { color: "#111827" },
  month: {
    backgroundColor: "#F3F4F6",
    color: "#111827",
    borderRadius: 6,
  },
  month_label: { color: "#111827", fontWeight: "600" },
  month_selector_label: { color: "#ffffffff" },
  selected_month: {
    backgroundColor: "#2563EB",
    color: "#FFFFFF",
    borderRadius: 6,
  },
  selected_month_label: { color: "#FFFFFF" },

  // --- Header / navigation ---
  header: { backgroundColor: "#e7e7e736", borderRadius: 10 },
  button_next_image: { tintColor: "#ffffffff" }, // gray-700
  button_prev_image: { tintColor: "#ffffffff" },
  years: { color: "#ebebebff" },
  year_selector: { color: "#ebebebff" },
  year_selector_label: { color: "#ebebebff", fontWeight: 600 },
  // --- Weekday row ---
  weekday_label: { color: "#ebebebff", fontWeight: "600" },

  // --- Grid wrappers ---
  months: { backgroundColor: "transparent" },
  days: { backgroundColor: "transparent" },

  // --- Days ---
  day: {
    backgroundColor: "#f3f3f3ff",
    borderRadius: 6,
  },
  day_label: { color: "#060a13ff" },

  today: {
    backgroundColor: "#FFFFFF",
    borderColor: "#2563EB",
    borderWidth: 1,
    borderRadius: 6,
  },
  today_label: { color: "#111827", fontWeight: "600" },

  selected: {
    backgroundColor: "#2865e9ff",
    borderRadius: 6,
  },
  selected_label: { color: "#ffffffff", fontWeight: "600" },

  // --- Ranges ---
  range_fill: { backgroundColor: "transparent" },
  range_fill_weekstart: { backgroundColor: "transparent" },
  range_fill_weekend: { backgroundColor: "transparent" },
  range_start: {
    backgroundColor: "#2563EB",
    borderRadius: 6,
  },
  range_end: {
    backgroundColor: "#2563EB",
    borderRadius: 6,
  },
  range_middle: { backgroundColor: "#DBEAFE" },
  range_middle_label: { color: "#111827" },
  range_end_label: { color: "#FFFFFF" },
};

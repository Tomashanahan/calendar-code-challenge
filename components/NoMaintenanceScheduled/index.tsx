import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Colors, tintColorDark } from "@/constants/Colors";

const NoMaintenanceScheduled = () => {
  return (
    <View style={st.container}>
      <Text style={st.noMaintenanceScheduledText}>No maintenance scheduled</Text>
    </View>
  );
};

const st = StyleSheet.create({
  noMaintenanceScheduledText: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 2,
    color: tintColorDark,
  },
  container: {
    marginLeft: 42,
    backgroundColor: Colors.noMaintenanceSchedule,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 4,
  },
});

export default NoMaintenanceScheduled;

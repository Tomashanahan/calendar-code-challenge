import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { CheckCircleIcon } from "react-native-heroicons/solid";
import { ClockIcon } from "react-native-heroicons/outline";

import { Action } from "@/app/models/ChallengeData";
import { Colors, tintColorBackOpacity } from "@/constants/Colors";
import { getDayDetails } from "@/helpers/getDayDetails";

export interface ScheduleDateProps {
  action: Action;
}

const ScheduleDate = ({ action }: ScheduleDateProps) => {
  const svgHelper = {
    Scheduled: <ClockIcon color={Colors.completed} />,
    Completed: <CheckCircleIcon color={Colors.completed} />,
  };

  return (
    <View>
      {action.scheduledDate ? (
        <View style={styles.container}>
          <Text style={styles.dayName}>{getDayDetails(action.scheduledDate).dayName}</Text>
          <Text style={styles.dayNumber}>{getDayDetails(action.scheduledDate).dayNumber}</Text>
          {svgHelper[action.status]}
        </View>
      ) : (
        <Text style={styles.dayName}>TBD</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    gap: 8,
    alignItems: "center",
    minWidth: 30,
  },
  dayName: {
    color: tintColorBackOpacity,
    fontWeight: "semibold",
    fontSize: 12,
  },
  dayNumber: {
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default ScheduleDate;

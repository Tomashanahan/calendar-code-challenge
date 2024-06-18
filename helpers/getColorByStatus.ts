import { Colors } from "@/constants/Colors";

export const getColorByStatus = (status: string) => {
  switch (status) {
    case "Scheduled":
      return Colors.schedule;
    case "Completed":
      return Colors.completed;
    case "Unscheduled":
      return Colors.unSchedule;
    default:
      return Colors.noMaintenanceSchedule;
  }
};

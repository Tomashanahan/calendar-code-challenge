export const getDayDetails = (dateString: string): { dayNumber: number; dayName: string } => {
  const date = new Date(dateString);

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayNumber = date.getDate();
  const dayName = dayNames[date.getDay()];

  return { dayNumber, dayName };
};

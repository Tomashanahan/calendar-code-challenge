import { ChallengeData } from "@/app/models/ChallengeData";

export const getCustomerCalendar = async (): Promise<ChallengeData> => {
  const response = await fetch("https://xjvq5wtiye.execute-api.us-east-1.amazonaws.com/interview/api/v1/challenge");
  const data = await response.json();
  return data;
};

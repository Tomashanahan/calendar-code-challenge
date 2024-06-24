import { useEffect, useState } from "react";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Path, Svg } from "react-native-svg";

import { monthNumberToName } from "@/helpers/monthNumberToName";
import { getCustomerCalendar } from "@/services/Customer";
import { ChallengeData } from "../models/ChallengeData";
import ScheduleDate from "@/components/ScheduleDate";
import { getColorByStatus } from "@/helpers/getColorByStatus";
import { tintColorDark } from "@/constants/Colors";
import NoMaintenanceScheduled from "@/components/NoMaintenanceScheduled";
import { Link, router } from "expo-router";

export default function Calendar() {
  const [customerCalendarData, setCustomerCalendarData] = useState<ChallengeData>({} as ChallengeData);

  useEffect(() => {
    getCustomerCalendar().then((data) => {
      setCustomerCalendarData(data);
    });
  }, []);

  return (
    <SafeAreaView>
      <ScrollView style={styles.scrollView}>
        {customerCalendarData.calendar?.map((item) => (
          <View style={styles.cardContainer} key={item.month}>
            <Text style={styles.cardTitle} key={item.month}>
              {monthNumberToName(item.month)} {item.year}
            </Text>
            {item.actions.length > 0 ? (
              item.actions?.map((action) => (
                <Pressable
                  style={styles.container}
                  key={action.id}
                  onPress={() => {
                    router.push({
                      pathname: "action/[action]",
                      params: { action: JSON.stringify(action) as string },
                    });
                  }}
                >
                  <View>
                    <ScheduleDate action={action} />
                  </View>
                  <View style={[styles.actionContainer, { backgroundColor: getColorByStatus(action.status) }]}>
                    <View>
                      <Text style={[styles.text, styles.name]}>{action.name}</Text>
                      {action.vendor?.vendorName && (
                        <Text style={[styles.text, styles.vendorName]}>{action.vendor?.vendorName}</Text>
                      )}
                      {action.vendor?.phoneNumber && (
                        <Text style={[styles.text, styles.phoneNumber]}>{action.vendor?.phoneNumber}</Text>
                      )}
                    </View>
                    <View>
                      <View style={styles.streetContainer}>
                        <Svg viewBox="0 0 24 24" fill={tintColorDark} width={10} height={12}>
                          <Path
                            fillRule="evenodd"
                            d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                            clipRule="evenodd"
                          />
                        </Svg>

                        <Text style={[styles.text, styles.street]}>{customerCalendarData.customer.street}</Text>
                      </View>
                      <Text style={[styles.text, styles.status]}>{action.status}</Text>
                    </View>
                  </View>
                </Pressable>
              ))
            ) : (
              <NoMaintenanceScheduled />
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  name: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 2,
  },
  vendorName: {
    fontWeight: "regular",
    fontSize: 12,
  },
  phoneNumber: {
    fontWeight: "bold",
    fontSize: 12,
  },
  street: {
    fontWeight: "regular",
    fontSize: 12,
  },
  status: {
    fontWeight: "regular",
    fontSize: 12,
  },
  text: {
    color: tintColorDark,
  },
  actionContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 14,
    flex: 1,
    borderRadius: 4,
    width: "100%",
  },
  scrollView: { padding: 16 },
  cardContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  cardTitle: {
    marginBottom: 21,
    fontWeight: "bold",
    fontSize: 16,
  },
  container: {
    display: "flex",
    marginTop: 4,
    marginBottom: 4,
    flexDirection: "row",
    gap: 12,
  },
  streetContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    marginTop: 10,
  },
});

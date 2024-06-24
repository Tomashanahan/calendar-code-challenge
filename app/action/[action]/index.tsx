import { Action } from "@/app/models/ChallengeData";
import { Colors, tintColorDark, tintColorGray } from "@/constants/Colors";
import { getDayDetails } from "@/helpers/getDayDetails";
import { monthNumberToName } from "@/helpers/monthNumberToName";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView, Text, View, TextInput, Pressable, StyleSheet } from "react-native";

const CardDetail = () => {
  const { action } = useLocalSearchParams();
  const parsedAction: Action = JSON.parse(action as string);

  const setText = () => {};
  const scheduleDate = new Date(parsedAction.scheduledDate ?? "");
  const monthNumberFromDateString = scheduleDate.getMonth();
  const dayNumber = parsedAction.scheduledDate ? getDayDetails(parsedAction.scheduledDate).dayNumber : "";
  const fullYear = isNaN(scheduleDate.getFullYear()) ? "" : scheduleDate.getFullYear();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.dateAndStatusContainer}>
        <View style={styles.dateContainer}>
          {parsedAction.scheduledDate && (
            <Text style={styles.dateAndStatusContainerTxt}>
              {monthNumberToName(monthNumberFromDateString)} {dayNumber}, {fullYear}
            </Text>
          )}
        </View>
        <Text style={styles.dateAndStatusContainerTxt}>{parsedAction.status}</Text>
      </View>
      <View style={styles.serviceNameContainer}>
        <Text style={styles.titleTxt}>Service Name</Text>
        <TextInput style={styles.textInput} placeholder="Type here" onChangeText={setText} />
      </View>

      {parsedAction.vendor && (
        <>
          <View style={styles.providedByContainer}>
            <Text style={styles.titleTxt}>Provided by</Text>
            <Text style={styles.infoTxt}>{parsedAction.vendor?.vendorName}</Text>
            <Text style={styles.phoneNumber}>{parsedAction.vendor?.phoneNumber}</Text>
          </View>

          <View style={styles.addressContainer}>
            <Text style={styles.titleTxt}>Address</Text>
            <Text style={styles.infoTxt}>{parsedAction.vendor?.streetAddress}</Text>
            <Text style={styles.infoTxt}>
              {parsedAction.vendor?.city} {parsedAction.vendor?.state} {parsedAction.vendor?.zip}
            </Text>
          </View>
        </>
      )}

      <Pressable style={styles.saveChangesBtn}>
        <Text style={styles.btnText}>SAVE CHANGES</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: "white",
  },
  dateContainer: {},
  dateAndStatusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  serviceNameContainer: {
    paddingBottom: 21,
  },
  providedByContainer: {
    paddingBottom: 21,
  },
  textInput: {
    width: "100%",
    paddingVertical: 11,
    paddingHorizontal: 16,
    backgroundColor: Colors.light.textInputBgc,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#E9E9E9",
    marginTop: 7,
    color: "#000",
    fontSize: 14,
    height: 40,
  },
  addressContainer: {
    paddingBottom: 29,
  },
  saveChangesBtn: {
    width: "100%",
    backgroundColor: Colors.completed,
    paddingVertical: 12,
    borderRadius: 50,
  },
  btnText: {
    textAlign: "center",
    color: tintColorDark,
    fontWeight: "bold",
    fontSize: 14,
  },
  titleTxt: {
    fontSize: 14,
    fontWeight: "bold",
    color: tintColorGray,
    marginBottom: 4,
  },
  infoTxt: {
    fontSize: 14,
    fontWeight: "regular",
    color: tintColorGray,
  },
  dateAndStatusContainerTxt: {
    fontSize: 16,
    fontWeight: "bold",
    color: tintColorGray,
  },
  phoneNumber: {
    fontSize: 14,
    color: Colors.completed,
    fontWeight: "regular",
  },
});

export default CardDetail;

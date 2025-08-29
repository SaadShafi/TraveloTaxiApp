import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import TopHeader from "../../components/Topheader";
import { height, width } from "../../utilities";
import { fontFamily } from "../../assets/Fonts";
import { colors } from "../../utilities/colors";


type NotificationItem = {
  id: string;
  message: string;
  otp: string;
  validity: string;
};

type NotificationGroup = {
  title: string;
  data: NotificationItem[];
};

const notifications: NotificationGroup[] = [
  {
    title: "Today",
    data: [
      { id: "1", message: "Hi Alex! Here is your One-Time Password", otp: "52610", validity: "Valid for 10 mins." },
      { id: "2", message: "Hi Alex! Here is your One-Time Password", otp: "52610", validity: "Valid for 10 mins." },
      { id: "3", message: "Hi Alex! Here is your One-Time Password", otp: "52610", validity: "Valid for 10 mins." },
    ],
  },
  {
    title: "Yesterday",
    data: [
      { id: "4", message: "Hi Alex! Here is your One-Time Password", otp: "52610", validity: "Valid for 10 mins." },
      { id: "5", message: "Hi Alex! Here is your One-Time Password", otp: "52610", validity: "Valid for 10 mins." },
    ],
  },
  {
    title: "Wednesday",
    data: [
      { id: "6", message: "Hi Alex! Here is your One-Time Password", otp: "52610", validity: "Valid for 10 mins." },
    ],
  },
];

const NotificationScreen = () => {
  const renderItem = ({ item }: { item: NotificationItem }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.8}>
      <Text style={styles.message}>
        {item.message} <Text style={styles.otp}>{item.otp}</Text>
      </Text>
      <Text style={styles.validity}>{item.validity}</Text>
    </TouchableOpacity>
  );

  const renderSection = ({ item }: { item: NotificationGroup }) => (
    <View>
      <Text style={styles.sectionTitle}>{item.title}</Text>
      <FlatList
        data={item.data}
        keyExtractor={(notif) => notif.id}
        renderItem={renderItem}
        scrollEnabled={false}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TopHeader text="Notification" isBack={true} />

      <FlatList
        data={notifications}
        keyExtractor={(group) => group.title}
        renderItem={renderSection}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: fontFamily.ClashDisplayMedium,
    fontWeight: "600",
    marginTop: 18,
    color: colors.black,
    left: width * 0.06,
  },
  card: {
    backgroundColor: "#F3F3F3",
    borderRadius: 20,
    height: height * 0.09,
    padding: 12,
    top: height * 0.02,
    marginBottom: 12,
    left: width * 0.04,
    width: width * 0.93,
  },
  message: {
    fontSize: 17,
    color: "#000",
  },
  otp: {
    fontWeight: "700",
  },
  validity: {
    marginTop: 4,
    fontSize: 17,
    fontWeight: "700",
    color: "#000",
  },
});

import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import TopHeader from "../../components/Topheader";
import BookingCard from "../../components/BookingCard";

const DriverHome = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Top Header */}
      <TopHeader text="Driver Home" isMenu={true} />

      {/* Booking Cards */}
      <ScrollView contentContainerStyle={styles.container}>
        <BookingCard
          type="Book Now"
          passengerName="Adam James"
          passengerImage="https://randomuser.me/api/portraits/men/1.jpg"
          distance="10 miles"
          fare="$60.00"
          onCancel={() => console.log("Cancel Book Now")}
          onAccept={() => console.log("Accept Book Now")}
          onBid={() => console.log("Bid Now")}
        />

        <BookingCard
          type="Pre-Booking"
          passengerName="Adam James"
          passengerImage="https://randomuser.me/api/portraits/men/1.jpg"
          distance="10 miles"
          fare="$60.00"
          onCancel={() => console.log("Cancel Pre-Booking")}
          onAccept={() => console.log("Accept Pre-Booking")}
          onBid={() => console.log("Bid Now")}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
});

export default DriverHome;


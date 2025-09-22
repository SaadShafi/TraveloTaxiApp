import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { height, width } from "../utilities";
import { colors } from "../utilities/colors";
import { fontFamily } from "../assets/Fonts";
import images from "../assets/Images";

interface BookingCardProps {
  type: "Book Now" | "Pre-Booking";
  passengerName: string;
  passengerImage: string;
  distance: string;
  fare: string;
  onCancel: () => void;
  onAccept: () => void;
  onBid: () => void;
}

const BookingCard: React.FC<BookingCardProps> = ({
  type,
  passengerName,
  passengerImage,
  distance,
  fare,
  onCancel,
  onAccept,
  onBid,
}) => {
  return (
    <View style={styles.card}>

      <View style={styles.header}>
        <Image source={images.User} style={styles.avatar} />
        <View style={styles.typeTag}>
          <Text style={styles.typeText}>{type}</Text>
        </View>
      </View>


      <View style={styles.details}>
        <Text style={styles.label}>Passenger Name :</Text>
        <Text style={styles.value}>{passengerName}</Text>
      </View>


      <View style={styles.details}>
        <Text style={styles.label}>Distance :</Text>
        <Text style={styles.value}>{distance} away</Text>
      </View>


      <View style={styles.details}>
        <Text style={styles.label}>Fare :</Text>
        <TouchableOpacity onPress={onBid} style={styles.bidButton}>
          <Text style={styles.bidText}>Bid Now</Text>
        </TouchableOpacity>
        <Text style={styles.fare}>{fare}</Text>
      </View>


      <View style={styles.actions}>
        <TouchableOpacity onPress={onCancel} style={styles.cancelBtn}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onAccept} style={styles.acceptBtn}>
          <Text style={styles.acceptText}>Accept</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: width * 0.16,
    height: height * 0.07,
    marginRight: 10,
  },
  typeTag: {
    backgroundColor: "#BD070633",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    bottom: height * 0.018,
    left: width * 0.01,

  },
  typeText: {
    fontSize: 16,
    fontFamily:fontFamily.SfProDisplayMedium,
    color: colors.black,
    fontWeight:"500",
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:'space-between',
    bottom: height * 0.03
  },
  label: {
    fontWeight: "600",
    fontSize: 18,
    marginTop: height * 0.002,
    color: colors.black,
    left: width * 0.2
  },
  value: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight: "500",
    color: "#555",
    
  },
  bidButton: {
    borderWidth: 1,
    borderColor: colors.brown,
    backgroundColor: colors.lightBrown,
    borderRadius: 30,
    paddingHorizontal: 8,
    paddingVertical: 2,
    left: width * 0.2,
    height: height * 0.035,
    width: width * 0.18
  },
  bidText: {
    fontSize: 16,
    color: colors.black,
    fontFamily:fontFamily.SfProDisplayRegular,
    alignSelf:'center',
    paddingVertical: height * 0.003
  },
  fare: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: colors.black,
    fontFamily:fontFamily.SfProDisplaySemiBold,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: height * 0.001,
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: "#000",
    paddingVertical: height * 0.016,
    borderRadius: 50,
    alignItems: "center",
    marginRight: 10,
    height: height * 0.06
  },
  cancelText: {
    color: colors.white,
    fontFamily:fontFamily.SfProDisplayRegular,
    fontSize: 20,
    alignContent:'center',
  },
  acceptBtn: {
    flex: 1,
    backgroundColor: "#B00020",
   paddingVertical: height * 0.016,
    borderRadius: 50,
    alignItems: "center",
    marginLeft: 10,
    height: height * 0.06,
  },
  acceptText: {
    fontWeight: "600",
    fontSize: 20,
    color: colors.white,
    fontFamily:fontFamily.SfProDisplayRegular,
  },
});

export default BookingCard;

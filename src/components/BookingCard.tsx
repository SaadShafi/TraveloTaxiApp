import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { fontFamily } from '../assets/Fonts';
import images from '../assets/Images';
import { height, width } from '../utilities';
import { colors } from '../utilities/colors';
import { fontSizes } from '../utilities/fontsizes';

interface BookingCardProps {
  type: 'Book Now' | 'Pre-Booking';
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
    <View style={{ alignItems: 'center', gap: height * 0.05 }}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 10,
    marginVertical: height * 0.01,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    width: width * 0.9,
    height: height * 0.22,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: width * 0.16,
    height: height * 0.07,
    marginRight: 10,
  },
  typeTag: {
    backgroundColor: '#BD070633',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    bottom: height * 0.018,
    left: width * 0.01,
  },
  typeText: {
    fontSize: 16,
    fontFamily: fontFamily.SfProDisplayMedium,
    color: colors.black,
    fontWeight: '500',
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    bottom: height * 0.03,
  },
  label: {
    // fontWeight: "600",
    fontFamily: fontFamily.SfProDisplayRegular,
    fontSize: fontSizes.sm,
    marginTop: height * 0.002,
    color: colors.black,
    left: width * 0.2,
  },
  value: {
    marginLeft: 8,
    fontSize: fontSizes.sm,
    fontFamily: fontFamily.SfProDisplayRegular,
    // fontWeight: '500',
    color: colors.black,
  },
  bidButton: {
    borderWidth: 1,
    borderColor: colors.brown,
    backgroundColor: colors.lightBrown,
    borderRadius: 30,
    left: width * 0.22,
    height: height * 0.029,
    width: width * 0.15,
  },
  bidText: {
    fontSize: fontSizes.xsm,
    color: colors.black,
    fontFamily: fontFamily.SfProDisplayRegular,
    alignSelf: 'center',
    paddingVertical: height * 0.003,
  },
  fare: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.black,
    fontFamily: fontFamily.SfProDisplaySemiBold,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.8,
    alignSelf: 'center',
    bottom: height * 0.01,
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: '#000',
    paddingVertical: height * 0.016,
    borderRadius: 50,
    alignItems: 'center',
    marginRight: 10,
    height: height * 0.055,
  },
  cancelText: {
    color: colors.white,
    fontFamily: fontFamily.SfProDisplayRegular,
    fontSize: fontSizes.sm2,
    alignContent: 'center',
  },
  acceptBtn: {
    flex: 1,
    backgroundColor: '#B00020',
    paddingVertical: height * 0.016,
    borderRadius: 50,
    alignItems: 'center',
    marginLeft: 10,
    height: height * 0.055,
  },
  acceptText: {
    fontSize: fontSizes.sm2,
    color: colors.white,
    fontFamily: fontFamily.SfProDisplayRegular,
  },
});

export default BookingCard;

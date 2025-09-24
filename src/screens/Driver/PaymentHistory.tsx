import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { fontFamily } from '../../assets/Fonts';
import images from '../../assets/Images';
import TopHeader from '../../components/Topheader';
import { height, width } from '../../utilities';
import { colors } from '../../utilities/colors';

type PaymentHistoryItem = {
  id: string;
  passengerName: string;
  distance: string;
  pickup: string;
  dropoff: string;
  fare: string;
  rideType: string;
};

const PaymentHistory = () => {
  const DATA: PaymentHistoryItem[] = [
    {
      id: '1',
      passengerName: 'Adam James',
      distance: '10 Miles Away',
      pickup: 'Brooklyn Bridge Park',
      dropoff: 'Empire State Building',
      fare: '$60.00',
      rideType: 'Book Now',
    },
    {
      id: '2',
      passengerName: 'John Doe',
      distance: '15 Miles Away',
      pickup: 'Times Square',
      dropoff: 'Central Park',
      fare: '$75.00',
      rideType: 'Book Later',
    },
  ];

  const RenderHistoryCard: React.FC<{ item: PaymentHistoryItem }> = ({
    item,
  }) => (
    <View style={styles.mainContainer}>
      <Image source={images.User} style={styles.userImg} />

      {/* Ride Type */}
      <View style={styles.rideContainer}>
        <Text style={styles.bookText}>Ride Type: {item.rideType}</Text>
      </View>

      {/* Passenger Name */}
      <View style={styles.row}>
        <Text style={styles.name}>Passenger Name:</Text>
        <Text style={styles.adam}>{item.passengerName}</Text>
      </View>

      {/* Distance */}
      <View style={styles.row}>
        <Text style={styles.name}>Distance:</Text>
        <Text style={styles.adam}>{item.distance}</Text>
      </View>

      {/* Pickup & Drop */}
      <View style={{ flexDirection: 'row' }}>
        <Image source={images.guide} style={styles.guide} />
        <View style={{ gap: height * 0.01 }}>
          <View style={styles.location}>
            <View style={styles.locationRow}>
              <Image source={images.Location} style={styles.locImg} />
              <Text style={styles.park}>{item.pickup}</Text>
            </View>
          </View>

          <View style={styles.location}>
            <View style={styles.locationRow}>
              <Image source={images.Location} style={styles.locImg} />
              <Text style={styles.park}>{item.dropoff}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Fare */}
      <View style={styles.fareContainer}>
        <Text style={styles.fare}>Fare:</Text>
        <Text style={styles.dollar}>{item.fare}</Text>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <TopHeader text="Payment History" isBack={true} />
      <FlatList
        data={DATA}
        keyExtractor={item => item.id}
        renderItem={RenderHistoryCard}
        contentContainerStyle={{
          paddingVertical: height * 0.01,
          gap: height * 0.02,
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.67,
    left: height * 0.096,
    bottom: height * 0.04,
  },
  mainContainer: {
    borderWidth: 1,
    borderColor: '#D4D4D4',
    backgroundColor: '#F4F4F4',
    height: height * 0.4,
    width: width * 0.92,
    borderRadius: 20,
    alignSelf: 'center',
    top: height * 0.01,
  },
  userImg: {
    left: width * 0.03,
    top: height * 0.02,
  },
  rideContainer: {
    backgroundColor: '#BD070633',
    height: height * 0.03,
    borderRadius: 20,
    width: width * 0.4,
    justifyContent: 'center',
    left: width * 0.2,
    bottom: height * 0.05,
  },
  bookText: {
    fontSize: 17,
    fontFamily: fontFamily.SfProDisplayMedium,
    width: width * 0.6,
    fontWeight: '500',
    alignItems: 'center',
    left: width * 0.02,
  },
  name: {
    fontSize: 18,
    fontFamily: fontFamily.SfProDisplaySemiBold,
    color: colors.black,
  },
  adam: {
    fontSize: 18,
    fontFamily: fontFamily.SfProDisplaySemiBold,
    color: colors.black,
  },
  location: {
    borderWidth: 1,
    borderColor: colors.brown,
    borderRadius: 10,
    height: height * 0.05,
    width: width * 0.75,
    left: width * 0.11,
    backgroundColor: colors.white,
    alignSelf: 'center',
  },
  locationRow: {
    flexDirection: 'row',
    gap: width * 0.02,
    alignItems: 'center',
    left: width * 0.03,
    top: height * 0.01,
  },
  locImg: {
    height: height * 0.027,
    width: width * 0.05,
  },
  park: {
    color: colors.black,
    fontFamily: fontFamily.SfProDisplayMedium,
    fontSize: 20,
  },
  fareContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    height: height * 0.08,
    width: width * 0.85,
    alignSelf: 'center',
    top: height * 0.04,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fare: {
    fontFamily: fontFamily.SfProDisplaySemiBold,
    fontSize: 25,
    fontWeight: '500',
    color: colors.black,
    width: width * 0.15,
    alignSelf: 'center',
    left: width * 0.08,
  },
  dollar: {
    fontFamily: fontFamily.SfProDisplaySemiBold,
    fontSize: 25,
    fontWeight: '800',
    color: colors.black,
    width: width * 0.18,
    alignSelf: 'center',
    right: width * 0.06,
  },
  guide: {
    left: width * 0.06,
    top: height * 0.02,
  },
});

export default PaymentHistory;

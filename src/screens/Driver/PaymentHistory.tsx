import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { fontFamily } from '../../assets/Fonts';
import images from '../../assets/Images';
import TopHeader from '../../components/Topheader';
import { height, width } from '../../utilities';
import { colors } from '../../utilities/colors';
import { fontSizes } from '../../utilities/fontsizes';

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
      passengerName: '#456',
      distance: '10 Miles Away',
      pickup: 'Brooklyn Bridge Park',
      dropoff: 'Empire State Building',
      fare: '$60.00',
      rideType: 'Book Now',
    },
    {
      id: '2',
      passengerName: '#456',
      distance: '15 Miles Away',
      pickup: 'Times Square',
      dropoff: 'Central Park',
      fare: '$75.00',
      rideType: 'Pre Booking',
    },
  ];

  const RenderHistoryCard: React.FC<{ item: PaymentHistoryItem }> = ({
    item,
  }) => (
    <View style={styles.mainContainer}>
      {/* <Image source={images.User} style={styles.userImg} /> */}
      <View style={styles.rideContainer}>
        <Text style={styles.bookText}>Ride Type: {item.rideType}</Text>
      </View>
      <View style={styles.rowMain}>
        <View style={styles.row}>
          <Text style={styles.name}>Ride ID:</Text>
          <Text style={styles.adam}>{item.passengerName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.name}>Distance:</Text>
          <Text style={styles.adam}>{item.distance}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          top: height * 0.03,
          right: width * 0.035,
        }}
      >
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
  rowMain: {
    left: width * 0.12,
    top: height * 0.015,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.67,
  },
  mainContainer: {
    borderWidth: 1,
    borderColor: '#D4D4D4',
    backgroundColor: '#F4F4F4',
    height: height * 0.35,
    width: width * 0.9,
    borderRadius: 20,
    alignSelf: 'center',
    padding: 10,
    gap: height * 0.01,
  },
  rideContainer: {
    backgroundColor: colors.lightBrown,
    height: height * 0.03,
    borderRadius: 20,
    width: width * 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    left: width * 0.02,
    top: height * 0.01,
  },
  bookText: {
    fontSize: fontSizes.sm,
    fontFamily: fontFamily.SfProDisplayMedium,
    color: colors.brown,
  },
  name: {
    fontSize: fontSizes.sm,
    fontFamily: fontFamily.SfProDisplaySemiBold,
    color: colors.black,
  },
  adam: {
    fontSize: fontSizes.sm,
    fontFamily: fontFamily.SfProDisplayMedium,
    color: colors.black,
  },
  location: {
    borderWidth: 1,
    borderColor: colors.brown,
    borderRadius: 10,
    height: height * 0.05,
    width: width * 0.7,
    left: width * 0.11,
    backgroundColor: colors.white,
  },
  locationRow: {
    flexDirection: 'row',
    gap: width * 0.02,
    alignItems: 'center',
    padding: 10,
  },
  locImg: {
    height: height * 0.016,
    width: width * 0.04,
    resizeMode: 'contain',
  },
  park: {
    color: colors.black,
    fontFamily: fontFamily.SfProDisplayMedium,
    fontSize: fontSizes.sm2,
  },
  fareContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    height: height * 0.07,
    width: width * 0.8,
    alignSelf: 'center',
    top: height * 0.03,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: width * 0.08,
  },
  fare: {
    fontFamily: fontFamily.SfProDisplaySemiBold,
    fontSize: fontSizes.md,
    color: colors.black,
  },
  dollar: {
    fontFamily: fontFamily.SfProDisplaySemiBold,
    fontSize: fontSizes.md,
    color: colors.black,
  },
  guide: {
    left: width * 0.06,
    top: height * 0.02,
    width: width * 0.027,
    height: height * 0.079,
    resizeMode: 'contain',
  },
});

export default PaymentHistory;

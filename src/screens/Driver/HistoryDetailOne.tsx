import { Image, StyleSheet, Text, View } from 'react-native';
import { fontFamily } from '../../assets/Fonts';
import images from '../../assets/Images';
import TopHeader from '../../components/Topheader';
import { height, width } from '../../utilities';
import { colors } from '../../utilities/colors';
import { fontSizes } from '../../utilities/fontsizes';

const HistoryDetailOne = () => {
  // const [activeTab, setActiveTab] = useState('Completed');

  return (
    <View style={{ flex: 1 }}>
      <TopHeader text="Details" isBack={true} />

      <View style={styles.mainContainer}>
        <View style={styles.subConatiner}>
          <View>
            <Text style={styles.trackID}>Ride ID</Text>
            <Text style={{ color: colors.darkGray }}>#4564</Text>
          </View>
          <View style={styles.comContainer}>
            <Text style={styles.comText}>Completed</Text>
          </View>
        </View>

        <View style={styles.rideContainer}>
          <Text style={styles.ride}>Ride Type:</Text>
          <Text style={[styles.preBooking, { right: width * 0.04 }]}>
            Pre Booking
          </Text>
        </View>

        <View style={styles.dateContainer}>
          <Text style={styles.ride}>Date & Time:</Text>
          <Text style={[styles.date, { right: width * 0.04 }]}>
            Aug 20,2025 & 5:30 AM
          </Text>
        </View>

        <View style={styles.container}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: width * 0.03,
            }}
          >
            <Image source={images.clock} style={styles.img} />
            <View>
              <Text style={styles.ride}>Duration</Text>
              <Text style={styles.date}>32 mins</Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: width * 0.03,
            }}
          >
            <Image source={images.pointer} style={styles.img} />
            <View>
              <Text style={styles.ride}>Distance</Text>
              <Text style={styles.date}>4.1 km</Text>
            </View>
          </View>
        </View>

        <Image source={images.guide} style={styles.guide} />

        <View style={{ gap: height * 0.01, bottom: height * 0.02 }}>
          <View style={styles.location}>
            <View
              style={{
                flexDirection: 'row',
                gap: width * 0.02,
                alignItems: 'center',
                left: width * 0.03,
                top: height * 0.01,
              }}
            >
              <Image source={images.Location} style={styles.locImg} />
              <Text style={styles.park}>Brooklyn Bridge Park</Text>
            </View>
          </View>

          <View style={styles.location}>
            <View
              style={{
                flexDirection: 'row',
                gap: width * 0.02,
                alignItems: 'center',
                left: width * 0.03,
                top: height * 0.01,
              }}
            >
              <Image source={images.Location} style={styles.locImg} />
              <Text style={styles.park}>Empire State Building</Text>
            </View>
          </View>
        </View>

        <View
          style={{ top: height * 0.02, gap: height * 0.01, left: width * 0.04 }}
        >
          <Text style={styles.ride}>Ratings</Text>
          <Image source={images.ratingYellow} style={styles.starImg} />
        </View>

        <Text style={styles.feed}>Feedback</Text>
        <View style={styles.feedContainer}></View>

        <Text style={styles.pay}>Payments</Text>
        <View style={{ top: height * 0.08, paddingHorizontal: width * 0.05 }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={styles.textOne}>Fare:</Text>
            <Text style={styles.textOne}>$50</Text>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={styles.textOne}>Tip:</Text>
            <Text style={styles.textOne}>$10</Text>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={styles.textOne}>Total:</Text>
            <Text style={styles.textOne}>$60</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  starImg: {
    width: width * 0.3,
    height: height * 0.029,
    resizeMode: 'contain',
  },
  img: {
    width: width * 0.05,
    height: height * 0.028,
    resizeMode: 'contain',
  },
  mainContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    alignSelf: 'center',
    backgroundColor: colors.lightGray,
    height: height * 0.88,
    width: width * 0.9,
    top: height * 0.012,
    padding: 10,
  },
  subConatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.9,
    paddingVertical: width * 0.04,
    paddingHorizontal: height * 0.025,
  },
  comContainer: {
    borderRadius: 20,
    backgroundColor: 'rgba(30, 140, 54, 0.2)',
    height: height * 0.03,
    width: width * 0.23,
    justifyContent: 'center',
    right: width * 0.035,
  },
  comText: {
    color: colors.green,
    fontFamily: fontFamily.SfProDisplayMedium,
    fontWeight: '500',
    fontSize: 16,
    alignSelf: 'center',
  },
  trackID: {
    color: colors.black,
    fontFamily: fontFamily.SfProDisplayMedium,
    fontWeight: '700',
    fontSize: fontSizes.md,
  },
  ride: {
    color: colors.black,
    fontFamily: fontFamily.SfProDisplayMedium,
    fontSize: fontSizes.sm2,
    fontWeight: '700',
  },
  preBooking: {
    color: colors.black,
    fontFamily: fontFamily.SfProDisplayMedium,
    fontSize: fontSizes.sm,
  },
  date: {
    color: colors.black,
    fontFamily: fontFamily.SfProDisplayMedium,
    fontSize: fontSizes.sm,
  },
  rideContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.9,
    paddingHorizontal: width * 0.05,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.9,
    paddingHorizontal: width * 0.05,
    top: height * 0.01,
  },
  container: {
    backgroundColor: colors.white,
    height: height * 0.1,
    width: width * 0.8,
    borderRadius: 20,
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: height * 0.04,
    paddingHorizontal: width * 0.09,
  },
  location: {
    borderWidth: 1,
    borderColor: colors.brown,
    borderRadius: 10,
    height: height * 0.05,
    width: width * 0.72,
    left: width * 0.029,
    backgroundColor: colors.white,
    alignSelf: 'center',
    top: height * 0.01,
  },
  locImg: {
    height: height * 0.02,
    width: width * 0.03,
    resizeMode: 'contain',
  },
  park: {
    color: colors.black,
    fontFamily: fontFamily.SfProDisplayMedium,
    fontSize: fontSizes.sm2,
  },
  guide: {
    top: height * 0.08,
    left: width * 0.04,
    resizeMode: 'contain',
  },
  feedContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    height: height * 0.1,
    width: width * 0.8,
    alignSelf: 'center',
    top: height * 0.05,
  },
  feed: {
    color: colors.black,
    fontFamily: fontFamily.SfProDisplayMedium,
    fontSize: fontSizes.sm2,
    fontWeight: '700',
    top: height * 0.04,
    paddingHorizontal: width * 0.04,
  },
  pay: {
    color: colors.black,
    fontFamily: fontFamily.SfProDisplayMedium,
    fontSize: fontSizes.sm2,
    fontWeight: '700',
    paddingHorizontal: width * 0.05,
    top: height * 0.07,
  },
  textOne: {
    fontFamily: fontFamily.SfProDisplayMedium,
    fontSize: fontSizes.sm2,
    color: colors.black,
  },
});

export default HistoryDetailOne;

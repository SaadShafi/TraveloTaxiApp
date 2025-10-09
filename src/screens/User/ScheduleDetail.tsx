import { useState } from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { fontFamily } from '../../assets/Fonts';
import images from '../../assets/Images';
import CustomButton from '../../components/CustomButton';
import TopHeader from '../../components/Topheader';
import { height, width } from '../../utilities';
import { colors } from '../../utilities/colors';
import { fontSizes } from '../../utilities/fontsizes';

const ScheduleDetail = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedReason, setSelectedReason] = useState<number | null>(null);

  const reasons = [
    'Lorem Ipsum is simply dummy text',
    'Another cancellation reason',
    'Driver delayed',
    'Change in plan',
    'Booked by mistake',
  ];

  return (
    <View style={{ flex: 1 }}>
      <TopHeader text="Booking Details" isBack={true} />

      <View style={styles.mainContainer}>
        <View style={styles.subConatiner}>
          <View>
            <Text style={styles.trackID}>Ride ID</Text>
            <Text style={{ color: colors.black }}>#4564</Text>
          </View>
        </View>

        <View style={styles.rideContainer}>
          <Text style={styles.ride}>Ride Type:</Text>
          <Text style={styles.preBooking}>Pre Booking</Text>
        </View>

        <View style={styles.dateContainer}>
          <Text style={styles.ride}>Date & Time:</Text>
          <Text style={styles.date}>Aug 20,2025 & 5:30 AM</Text>
        </View>

        {/* <View style={styles.container}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: width * 0.03,
              paddingVertical: height * 0.025,
              left: width * 0.09,
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
              left: width * 0.54,
              bottom: height * 0.07,
            }}
          >
            <Image source={images.pointer} style={styles.img} />
            <View>
              <Text style={styles.ride}>Distance</Text>
              <Text style={styles.date}>4.1 km</Text>
            </View>
          </View>
        </View> */}

        <Image source={images.guide} style={styles.guide} />

        <View style={{ gap: height * 0.01 }}>
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
        <View style={styles.EstimatedFareMain}>
          <View style={styles.EstimatedContainer}>
            <View style={styles.estimatedContent}>
              <Text style={styles.estimatedText}>Estimated Fare:</Text>
              <Text style={styles.estimatedText}>$65.00</Text>
            </View>
          </View>
        </View>
        <View style={styles.btnMain}>
          <CustomButton
            text="Cancel Booking"
            textColor={colors.white}
            backgroundColor={colors.black}
            borderRadius={30}
            btnHeight={height * 0.06}
            btnWidth={width * 0.8}
            onPress={() => setModalVisible(true)}
          />
        </View>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeadTextMain}>
              <Text style={styles.cancelText}>Select Cancellation Reasons</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setModalVisible(false)}
              >
                <Image source={images.cancelBtn} style={styles.cancelBtn} />
              </TouchableOpacity>
            </View>
            <View style={styles.reasonsMain}>
              {reasons.map((reason, index) => (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.7}
                  onPress={() => setSelectedReason(index)}
                  style={[
                    styles.reasonsContainer,
                    {
                      backgroundColor:
                        selectedReason === index
                          ? colors.lightBrown
                          : colors.lightGray,
                    },
                  ]}
                >
                  <Text style={styles.reasonText}>{reason}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={{ top: height * 0.02, alignItems: 'center' }}>
              <CustomButton
                btnHeight={height * 0.06}
                btnWidth={width * 0.75}
                backgroundColor={
                  selectedReason !== null ? colors.brown : colors.black
                }
                borderRadius={30}
                text="Submit"
                textColor={colors.white}
                disabled={!selectedReason}
                onPress={() => {
                  if (selectedReason !== null) {
                    // Handle submit logic here
                    setModalVisible(false);
                  }
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  reasonsContainer: {
    width: width * 0.75,
    height: height * 0.052,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 10,
    padding: 10,
    backgroundColor: colors.lightGray,
  },
  reasonText: {
    fontFamily: fontFamily.SfProDisplayRegular,
    fontSize: fontSizes.sm2,
    color: colors.black,
  },
  reasonsMain: {
    alignItems: 'center',
    gap: height * 0.01,
    top: height * 0.01,
  },
  cancelText: {
    fontFamily: fontFamily.ClashDisplayMedium,
    fontSize: fontSizes.sm2,
    color: colors.black,
  },
  cancelBtn: {
    width: width * 0.09,
    height: height * 0.05,
    resizeMode: 'contain',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.61)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: colors.white,
    padding: 30,
    borderRadius: 15,
    width: width * 0.84,
    alignItems: 'center',
  },
  modalHeadTextMain: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.75,
  },
  btnMain: {
    alignItems: 'center',
    top: height * 0.04,
  },
  EstimatedFareMain: {
    alignItems: 'center',
    top: height * 0.004,
  },
  EstimatedContainer: {
    backgroundColor: colors.white,
    width: width * 0.8,
    height: height * 0.075,
    borderRadius: 10,
  },
  estimatedContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.06,
    paddingTop: height * 0.02,
  },
  estimatedText: {
    fontFamily: fontFamily.SfProDisplayMedium,
    fontSize: fontSizes.sm2,
    color: colors.black,
    fontWeight: '800',
  },
  img: {
    width: width * 0.05,
    height: height * 0.03,
    resizeMode: 'contain',
  },
  mainContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    alignSelf: 'center',
    backgroundColor: colors.lightGray,
    height: height * 0.58,
    width: width * 0.9,
    top: height * 0.012,
  },
  subConatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.9,
    paddingVertical: width * 0.08,
    paddingHorizontal: height * 0.02,
  },
  comContainer: {
    borderRadius: 20,
    // backgroundColor: 'rgba(30, 140, 54, 0.2)',
    backgroundColor: colors.lightGreen,
    height: height * 0.03,
    width: width * 0.23,
    justifyContent: 'center',
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
    fontSize: 16,
  },
  ride: {
    color: colors.black,
    fontFamily: fontFamily.SfProDisplayMedium,
    fontSize: 17,
    fontWeight: '700',
  },
  preBooking: {
    color: colors.black,
    fontFamily: fontFamily.SfProDisplayMedium,
    fontSize: 17,
  },
  date: {
    color: colors.black,
    fontFamily: fontFamily.SfProDisplayMedium,
    fontSize: 17,
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
    width: width * 0.85,
    borderRadius: 20,
    alignSelf: 'center',
    top: height * 0.03,
  },
  location: {
    borderWidth: 1,
    borderColor: colors.brown,
    borderRadius: 10,
    height: height * 0.05,
    width: width * 0.75,
    left: width * 0.045,
    backgroundColor: colors.white,
    alignSelf: 'center',
    bottom: height * 0.03,
  },
  locImg: {
    height: height * 0.02,
    width: width * 0.025,
    resizeMode: 'contain',
  },
  park: {
    color: colors.black,
    fontFamily: fontFamily.SfProDisplayMedium,
    fontSize: fontSizes.sm,
  },
  guide: {
    top: height * 0.06,
    left: width * 0.04,
    resizeMode: 'contain',
  },
  feedContainer: {
    backgroundColor: colors.white,
    borderRadius: 20,
    height: height * 0.1,
    width: width * 0.85,
    alignSelf: 'center',
    top: height * 0.05,
  },
  feed: {
    color: colors.black,
    fontFamily: fontFamily.SfProDisplayMedium,
    fontSize: 17,
    fontWeight: '700',
    top: height * 0.05,
    paddingHorizontal: width * 0.05,
  },
  pay: {
    color: colors.black,
    fontFamily: fontFamily.SfProDisplayMedium,
    fontSize: 18,
    fontWeight: '700',
    paddingHorizontal: width * 0.05,
    top: height * 0.07,
  },
  textOne: {
    fontFamily: fontFamily.SfProDisplayMedium,
    fontSize: fontSizes.sm2,
    color: colors.black,
  },
  textSec: {
    fontFamily: fontFamily.SfProDisplayMedium,
    fontSize: fontSizes.sm2,
    color: colors.black,
  },
});

export default ScheduleDetail;

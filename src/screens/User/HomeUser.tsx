import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useRef, useState } from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import DatePicker from 'react-native-date-picker';
import { fontFamily } from '../../assets/Fonts';
import images from '../../assets/Images';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import TopHeader from '../../components/Topheader';
import { StackParamList } from '../../navigation/UserStack';
import { height, width } from '../../utilities';
import { colors } from '../../utilities/colors';
import { fontSizes } from '../../utilities/fontsizes';

type Props = NativeStackScreenProps<StackParamList, 'HomeUser'>;

const HomeUser: React.FC<Props>  = ({ navigation }) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [activeTab, setActiveTab] = useState<'bookNow' | 'preBooking'>(
    'bookNow',
  );
  const [openStartPicker, setOpenStartPicker] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [openTimePicker, setOpenTimePicker] = useState(false);

  const handleDateConfirm = (selectedDate: Date) => {
    setOpenStartPicker(false);
    setStartDate(selectedDate);
  };

  const handleTimeConfirm = (time: Date) => {
    setOpenTimePicker(false);

    const now = new Date();
    // Prevent selecting past time for today
    if (time < now) {
      setSelectedTime(now);
    } else {
      setSelectedTime(time);
    }
  };

  const formatDateForDisplay = (date: Date | null): string => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTimeForDisplay = (date: Date | null): string => {
    if (!date) return '';
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  useEffect(() => {
    actionSheetRef.current?.show();
  }, []);

  const BookNow = () => {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.bookNowMain}>
          <View style={styles.contentContainer}>
            <View style={styles.content}>
              <Image source={images.house} style={styles.img} />
              <View style={styles.textMain}>
                <Text style={styles.textOne}>Home</Text>
                <Text style={styles.textSec}>Location Goes Here</Text>
              </View>
            </View>
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.content}>
              <Image source={images.building} style={styles.img} />
              <View style={styles.textMain}>
                <Text style={styles.textOne}>Add Work</Text>
                <Text style={styles.textSec}>Location Goes Here</Text>
              </View>
            </View>
          </View>
          <CustomButton
            btnHeight={height * 0.07}
            btnWidth={width * 0.8}
            borderColor={colors.black}
            borderRadius={30}
            borderWidth={1}
            backgroundColor={colors.black}
            text="Continue"
            textColor={colors.white}
            onPress={() => navigation.navigate('TripOptions')}
          />
        </View>
      </View>
    );
  };

  const PreBooking = () => {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.PreBookContentMain}>
          <View style={styles.rideTypeMain}>
            <Text style={styles.rideText}>Ride Type: Pre-Booking</Text>
          </View>
          <Text style={styles.dateTimeText}>Select Date & Time</Text>
          <View style={styles.inputMain}>
            <CustomTextInput
              inputWidth={width * 0.8}
              inputHeight={height * 0.07}
              backgroundColor={colors.white}
              borderColor={colors.black}
              borderRadius={30}
              borderWidth={1}
              placeholder="Select Date"
              placeholderTextColor={colors.black}
              editable={false}
              value={formatDateForDisplay(startDate)}
              rightIcon={
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setOpenStartPicker(true)}
                >
                  <Image source={images.calendar} />
                </TouchableOpacity>
              }
            />
            <DatePicker
              modal
              open={openStartPicker}
              date={startDate || new Date()}
              mode="date"
              onConfirm={handleDateConfirm}
              onCancel={() => setOpenStartPicker(false)}
              minimumDate={new Date()}
            />
            <CustomTextInput
              inputWidth={width * 0.8}
              inputHeight={height * 0.07}
              backgroundColor={colors.white}
              borderColor={colors.black}
              borderRadius={30}
              borderWidth={1}
              placeholder="Select Date"
              placeholderTextColor={colors.black}
              editable={false}
              value={formatTimeForDisplay(selectedTime)}
              rightIcon={
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setOpenTimePicker(true)}
                >
                  <Image source={images.clockBlack} />
                </TouchableOpacity>
              }
            />
            <DatePicker
              modal
              mode="time"
              open={openTimePicker}
              date={selectedTime || new Date()}
              onConfirm={time => {
                const now = new Date();
                if (time < now) {
                  setSelectedTime(now); // prevent past time
                } else {
                  setSelectedTime(time);
                }
                setOpenTimePicker(false);
              }}
              onCancel={() => setOpenTimePicker(false)}
            />
          </View>
          <View style={styles.btnMain}>
            <CustomButton
              btnHeight={height * 0.07}
              btnWidth={width * 0.8}
              borderColor={colors.black}
              borderRadius={30}
              borderWidth={1}
              backgroundColor={colors.black}
              text="Continue"
              textColor={colors.white}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <TopHeader isMenu={true} />
      <Pressable onPress={() => actionSheetRef.current?.show()}>
        <View style={styles.headerMain}>
          <View style={styles.headTextMain}>
            <View style={{ flexDirection: 'row', gap: width * 0.01 }}>
              <Text style={styles.greetingText}>Hi</Text>
              <Text style={styles.nameText}>Alex!</Text>
            </View>
            <Image source={images.notification} style={styles.notiImg} />
          </View>
          <View style={styles.locationMain}>
            <CustomTextInput
              placeholder="Groklyn Bridge Park"
              placeholderTextColor={colors.black}
              borderColor={colors.gray}
              borderRadius={30}
              inputWidth={width * 0.65}
              inputHeight={height * 0.04}
              leftIcon={
                <Image
                  source={images.locationImage}
                  style={styles.locationImg}
                />
              }
            />
            <CustomTextInput
              placeholder="Groklyn Bridge Park"
              placeholderTextColor={colors.black}
              borderColor={colors.gray}
              borderRadius={30}
              inputWidth={width * 0.65}
              inputHeight={height * 0.04}
              leftIcon={
                <Image
                  source={images.locationImage}
                  style={styles.locationImg}
                />
              }
            />
          </View>
          <View style={styles.headerBottomMain}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: width * 0.01,
              }}
            >
              <Image source={images.add} />
              <Text>Add Stop</Text>
            </View>
            <View style={styles.reverseMain}>
              <Image source={images.reverse} />
            </View>
          </View>
        </View>
        <ActionSheet
          ref={actionSheetRef}
          containerStyle={styles.actionSheetMain}
          closeOnTouchBackdrop={true}
          defaultOverlayOpacity={0.9}
          bounceOnOpen={true}
        >
          <ImageBackground
            source={images.ActionSheetBg}
            style={styles.ActinSheetBg}
          >
            <View style={styles.gradientBackground}>
              <View style={styles.ActionSheetContentMain}>
                <Text style={styles.selectText}>Select One</Text>

                <View style={styles.tabContainer}>
                  <TouchableOpacity
                    style={[
                      styles.tab,
                      activeTab === 'bookNow' && styles.activeTab,
                    ]}
                    onPress={() => setActiveTab('bookNow')}
                  >
                    <Text
                      style={[
                        styles.tabText,
                        activeTab === 'bookNow' && styles.activeTabText,
                      ]}
                    >
                      Book Now
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.tab,
                      activeTab === 'preBooking' && styles.activeTab,
                    ]}
                    onPress={() => setActiveTab('preBooking')}
                  >
                    <Text
                      style={[
                        styles.tabText,
                        activeTab === 'preBooking' && styles.activeTabText,
                      ]}
                    >
                      Pre-Booking
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.tabContent}>
                  {activeTab === 'bookNow' ? <BookNow /> : <PreBooking />}
                </View>
              </View>
            </View>
          </ImageBackground>
        </ActionSheet>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  headerMain: {
    bottom: height * 0.06,
    width: width * 0.72,
    left: width * 0.2,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: colors.black,
    padding: 10,
    backgroundColor: colors.white,
  },
  greetingText: {
    color: colors.black,
    fontFamily: fontFamily.ClashDisplayMedium,
    fontSize: fontSizes.sm,
  },
  nameText: {
    color: colors.black,
    fontFamily: fontFamily.ClashDisplayBold,
    fontSize: fontSizes.sm,
  },
  signup: {
    color: colors.black,
    fontFamily: fontFamily.ClashDisplayMedium,
    fontSize: fontSizes.lg2,
    top: height * 0.1,
  },
  headTextMain: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.03,
  },
  notiImg: {
    width: width * 0.045,
    height: height * 0.03,
    resizeMode: 'contain',
  },
  locationMain: {
    gap: height * 0.01,
    paddingTop: height * 0.01,
  },
  locationImg: {
    width: width * 0.03,
    height: height * 0.03,
    resizeMode: 'contain',
  },
  headerBottomMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  reverseMain: {
    right: width * 0.06,
    bottom: height * 0.07,
  },
  actionSheetMain: {
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    overflow: 'hidden',
    height: height * 0.49,
    width: width,
  },
  gradientBackground: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 25,
    alignItems: 'center',
  },
  ActinSheetBg: {
    flex: 1,
    position: 'absolute',
    resizeMode: 'contain',
    width: width * 1,
  },
  ActionSheetContentMain: {
    alignItems: 'center',
    padding: 20,
  },
  selectText: {
    fontFamily: fontFamily.ClashDisplayMedium,
    fontSize: fontSizes.md,
    color: colors.black,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: height * 0.02,
    width: width * 0.6,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e8e2e2ff',
    borderRadius: 30,
    marginLeft: width * 0.019,
  },
  activeTab: {
    backgroundColor: colors.lightBrown,
    padding: 10,
    borderRadius: 30,
    height: height * 0.05,
  },
  tabText: {
    fontFamily: fontFamily.ClashDisplayMedium,
    fontSize: fontSizes.sm,
    color: colors.black,
  },
  activeTabText: {
    color: colors.black,
    fontFamily: fontFamily.ClashDisplayMedium,
  },
  tabContent: {
    marginTop: height * 0.03,
    width: '100%',
    alignItems: 'center',
  },
  bookNowMain: {
    alignItems: 'center',
    gap: height * 0.02,
  },
  contentContainer: {
    borderColor: colors.brown,
    borderWidth: 1,
    borderRadius: 10,
    width: width * 0.8,
    height: height * 0.08,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingHorizontal: width * 0.08,
  },
  textMain: {
    marginLeft: width * 0.04,
  },
  img: {
    width: width * 0.06,
    height: height * 0.05,
    resizeMode: 'contain',
  },
  textOne: {
    fontFamily: fontFamily.SFProDisplayMedium,
    fontSize: fontSizes.sm,
    color: colors.black,
  },
  textSec: {
    fontFamily: fontFamily.SfProDisplayRegular,
    fontSize: fontSizes.xsm,
    color: colors.black,
  },
  PreBookContentMain: {
    alignItems: 'center',
    gap: height * 0.01,
  },
  rideTypeMain: {
    backgroundColor: colors.lightBrown,
    padding: 8,
    borderRadius: 30,
    width: width * 0.4,
    alignItems: 'center',
  },
  rideText: {
    fontFamily: fontFamily.SFProDisplayMedium,
    fontSize: fontSizes.xsm,
    color: colors.brown,
  },
  dateTimeText: {
    fontFamily: fontFamily.ClashDisplayMedium,
    fontSize: fontSizes.md,
    color: colors.black,
  },
  inputMain: {
    gap: height * 0.01,
  },
  btnMain: {
    marginBottom: height * 0.09,
  },
});

export default HomeUser;

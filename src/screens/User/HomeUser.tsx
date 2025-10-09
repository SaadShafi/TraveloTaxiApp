import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useRef, useState } from 'react';
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import DatePicker from 'react-native-date-picker';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
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

const HomeUser: React.FC<Props> = ({ navigation }) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const secondSheetRef = useRef<ActionSheetRef>(null);
  const [activeTab, setActiveTab] = useState<'bookNow' | 'preBooking'>(
    'bookNow',
  );
  const mapRef = useRef<MapView>(null);
  const [openStartPicker, setOpenStartPicker] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [openTimePicker, setOpenTimePicker] = useState(false);
  const [region, setRegion] = useState({
    latitude: 40.7029,
    longitude: -73.9922,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });

  const handleDateConfirm = (selectedDate: Date) => {
    setOpenStartPicker(false);
    setStartDate(selectedDate);
  };

  const handleTimeConfirm = (time: Date) => {
    setOpenTimePicker(false);
    const now = new Date();
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
            onPress={() => {
              actionSheetRef.current?.hide();
              setTimeout(() => {
                secondSheetRef.current?.show();
              }, 300);
            }}
          />
        </View>
      </View>
    );
  };

  const notiImagePressed = () => {
    navigation.navigate('notification');
    console.log('notification Button Presed');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
    >
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            style={{ flex: 1 }}
            initialRegion={{
              latitude: 40.7003,
              longitude: -73.9967,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            scrollEnabled
            zoomEnabled
            rotateEnabled
            pitchEnabled
            showsUserLocation={true}
          >
            <Marker
              coordinate={{ latitude: 40.7003, longitude: -73.9967 }}
              title="Brooklyn Bridge Park"
              description="New York"
            />
          </MapView>
        </View>
        <View style={styles.topHeaderContainer} pointerEvents="box-none">
          <TopHeader isMenu={true} />
        </View>
        <View style={styles.headerContainer} pointerEvents="box-none">
          <View style={styles.headerMain}>
            <View style={styles.headTextMain}>
              <View
                style={{
                  flexDirection: 'row',
                  gap: width * 0.01,
                  top: height * 0.01,
                }}
              >
                <Text style={styles.greetingText}>Hi</Text>
                <Text style={styles.nameText}>Alex!</Text>
              </View>
              <View style={styles.notificationContainer}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={notiImagePressed}
                  style={styles.notificationButton}
                >
                  <Image source={images.notification} style={styles.notiImg} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.locationMain}>
              <CustomTextInput
                placeholder="Groklyn Bridge Park"
                placeholderTextColor={colors.black}
                borderColor={colors.gray}
                borderRadius={10}
                inputWidth={width * 0.65}
                inputHeight={height * 0.047}
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
                borderRadius={10}
                inputWidth={width * 0.65}
                inputHeight={height * 0.047}
                leftIcon={
                  <Image
                    source={images.locationImage}
                    style={styles.locationImg}
                  />
                }
              />
            </View>
            <View style={styles.headerBottomMain}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: width * 0.01,
                }}
                activeOpacity={0.7}
              >
                <Image source={images.add} />
                <Text
                  style={{
                    color: colors.black,
                    fontFamily: fontFamily.ClashDisplayMedium,
                    fontSize: fontSizes.sm,
                  }}
                >
                  Add Stop
                </Text>
              </TouchableOpacity>
              <View style={styles.reverseMain}>
                <Image source={images.reverse} />
              </View>
            </View>
          </View>
        </View>
        <ActionSheet
          ref={actionSheetRef}
          containerStyle={{
            ...styles.actionSheetMain,
            pointerEvents: 'box-none',
          }}
          snapPoints={[20, 50, 90]}
          initialSnapIndex={0}
          closeOnTouchBackdrop={false}
          defaultOverlayOpacity={0.1}
          indicatorStyle={{
            backgroundColor: colors.lightBrown,
            width: width * 0.3,
            height: height * 0.006,
            borderRadius: 3,
          }}
          gestureEnabled={true}
          backgroundInteractionEnabled={true}
          overlayColor="transparent"
          enableOverDrag={false}
          closable={false}
          drawUnderStatusBar={true}
          keyboardShouldPersistTaps="handled"
          isModal={false}
          safeAreaInsets={{ top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <ImageBackground
            source={images.ActionSheetBg}
            style={styles.ActinSheetBg}
            pointerEvents="none"
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

        <ActionSheet
          ref={secondSheetRef}
          containerStyle={{
            ...styles.actionSheetSec,
            pointerEvents: 'box-none',
          }}
          snapPoints={[20, 50, 90]}
          initialSnapIndex={0}
          closeOnTouchBackdrop={false}
          defaultOverlayOpacity={0.1}
          indicatorStyle={{
            backgroundColor: colors.lightBrown,
            width: width * 0.3,
            height: height * 0.006,
            borderRadius: 3,
          }}
          gestureEnabled={true}
          backgroundInteractionEnabled={true}
          overlayColor="transparent"
          enableOverDrag={true}
          closable={true}
          drawUnderStatusBar={true}
          keyboardShouldPersistTaps="handled"
          isModal={false}
          safeAreaInsets={{ top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <ImageBackground
            source={images.ActionSheetBg}
            style={styles.ActinSheetBg}
            pointerEvents="none"
          >
            <View style={styles.gradientBackground}>
              <View style={styles.ActionSheetContentMain}>
                <View style={{ flex: 1 }}>
                  <View style={styles.PreBookContentMain}>
                    <View style={styles.rideTypeMain}>
                      <Text style={styles.rideText}>
                        Ride Type: Pre-Booking
                      </Text>
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
                        onPress={() => navigation.navigate('TripOptionsSec')}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ImageBackground>
        </ActionSheet>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  topHeaderContainer: {
    position: 'absolute',
    top: height * 0.04,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  notificationContainer: {
    position: 'absolute',
    bottom: -20,
    left: width * 0.55,
    zIndex: 10,
  },
  notificationButton: {
    padding: 10,
  },
  headerContainer: {
    position: 'absolute',
    top: height * 0.08,
    left: width * 0.2,
    zIndex: 1000,
  },
  headerMain: {
    bottom: height * 0.06,
    width: width * 0.72,
    borderRadius: 20,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
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
    paddingTop: height * 0.025,
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
    bottom: height * 0.079,
  },
  actionSheetMain: {
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    overflow: 'hidden',
    height: height * 0.49,
    width: width,
    position: 'absolute',
  },
  actionSheetSec: {
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    overflow: 'hidden',
    height: height * 0.4,
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
    top: -height * 0.02,
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
    bottom: height * 0.02,
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
    bottom: height * 0.01,
  },
  inputMain: {
    gap: height * 0.014,
  },
  btnMain: {
    top: height * 0.01,
  },
});

export default HomeUser;

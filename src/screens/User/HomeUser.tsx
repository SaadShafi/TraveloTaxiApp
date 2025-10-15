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
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { fontFamily } from '../../assets/Fonts';
import images from '../../assets/Images';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import GooglePlacesAutocompleteNew from '../../components/GooglePlacesAutoComplete';
import TopHeader from '../../components/Topheader';
import { StackParamList } from '../../navigation/UserStack';
import { height, width } from '../../utilities';
import { colors } from '../../utilities/colors';
import { fontSizes } from '../../utilities/fontsizes';

type Props = NativeStackScreenProps<StackParamList, 'HomeUser'>;

const HomeUser: React.FC<Props> = ({ navigation }) => {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [showLabelOptions, setShowLabelOptions] = useState(false);
  const [customLabel, setCustomLabel] = useState('');
  const [showCustomLabelInput, setShowCustomLabelInput] = useState(false);
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const secondSheetRef = useRef<ActionSheetRef>(null);
  const addWorkRef = useRef<ActionSheetRef>(null);
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

  const handleAddWorkPress = () => {
    actionSheetRef.current?.hide();
    addWorkRef.current?.show();
  };

  const BookNow = () => {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.bookNowMain}>
          <TouchableOpacity style={styles.contentContainer} activeOpacity={0.7}>
            <View style={styles.content}>
              <Image source={images.house} style={styles.img} />
              <View style={styles.textMain}>
                <Text style={styles.textOne}>Home</Text>
                <Text style={styles.textSec}>Location Goes Here</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.contentContainer}
            activeOpacity={0.7}
            onPress={handleAddWorkPress}
          >
            <View style={styles.content}>
              <Image source={images.building} style={styles.img} />
              <View style={styles.textMain}>
                <Text style={styles.textOne}>Add Work</Text>
                <Text style={styles.textSec}>Location Goes Here</Text>
              </View>
            </View>
          </TouchableOpacity>
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
            showsUserLocation={false}
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
              {/* <CustomTextInput
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
              /> */}
              <GooglePlacesAutocompleteNew
                onSelect={(placeDetails: any) => {
                  console.log('Selected Place:', placeDetails);
                }}
                placeholder={'Brookly Bridge Park'}
                style={{
                  borderRadius: 10,
                  padding: 10,
                  width: width * 0.7,
                }}
                inputStyle={{
                  borderRadius: 10,
                  height: height * 0.045,
                  color: colors.black,
                }}
                containerStyle={{
                  height: height * 0.04,
                  borderColor: colors.brown,
                  borderRadius: 10,
                  borderWidth: 0.9,
                }}
              />
              {/* <CustomTextInput
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
              /> */}
              <GooglePlacesAutocompleteNew
                onSelect={(placeDetails: any) => {
                  console.log('Selected Place:', placeDetails);
                }}
                placeholder={'Brookly Bridge Park'}
                style={{
                  borderRadius: 10,
                  padding: 10,
                  width: width * 0.7,
                }}
                inputStyle={{
                  borderRadius: 10,
                  height: height * 0.045,
                  color: colors.black,
                  backgrounColor: colors.darkGray,
                }}
                containerStyle={{
                  height: height * 0.04,
                  borderColor: colors.brown,
                  borderRadius: 10,
                  borderWidth: 0.9,
                  backgrounColor: colors.darkGray,
                }}
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

        <ActionSheet
          ref={addWorkRef}
          containerStyle={{
            ...styles.actionSheetThird,
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
                  <View style={styles.WorkTextMain}>
                    <Text style={styles.selectText}>Add Work</Text>
                  </View>
                  <View>
                    <GooglePlacesAutocompleteNew
                      onSelect={(placeDetails: any) => {
                        console.log('Selected Place:', placeDetails);
                        // if (placeDetails?.lat && placeDetails?.lng) {
                        //   setRegion({
                        //     ...region,
                        //     latitude: placeDetails.lat,
                        //     longitude: placeDetails.lng,
                        //   });
                        //   mapRef.current?.animateToRegion({
                        //     latitude: placeDetails.lat,
                        //     longitude: placeDetails.lng,
                        //     latitudeDelta: 0.01,
                        //     longitudeDelta: 0.01,
                        //   });
                        // }
                      }}
                      style={{
                        borderRadius: 30,
                        padding: 10,
                        width: width * 0.9,
                      }}
                      inputStyle={{
                        backgroundColor: colors.white,
                        borderRadius: 30,
                        height: height * 0.06,
                        color: colors.black,
                      }}
                    />
                  </View>
                  <View style={styles.selectOnMap}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: width * 0.02,
                      }}
                    >
                      <Image source={images.pinPoint} />
                      <Text style={styles.SelectOnMapText}>
                        Or Select On Map
                      </Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                      <TouchableOpacity activeOpacity={0.7}>
                        <Text
                          style={styles.SelectOnMapText}
                          onPress={() => setShowLabelOptions(true)}
                        >
                          + Add A Label
                        </Text>
                      </TouchableOpacity>
                      {selectedLabel && (
                        <View
                          style={{
                            backgroundColor: colors.lightBrown,
                            paddingVertical: 6,
                            paddingHorizontal: 16,
                            borderRadius: 20,
                            marginTop: 8,
                          }}
                        >
                          <Text
                            style={{
                              color: colors.white,
                              fontFamily: fontFamily.SfProDisplayRegular,
                              fontSize: fontSizes.xsm,
                            }}
                          >
                            {selectedLabel}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                  {showLabelOptions && (
                    <View style={styles.labelPopup}>
                      <TouchableOpacity
                        style={styles.circleContainer}
                        onPress={() => {
                          setSelectedLabel('Home');
                          setShowLabelOptions(false);
                        }}
                      >
                        <Image
                          source={images.house}
                          style={styles.circleIcon}
                        />
                        <Text style={styles.circleText}>Home</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.circleContainer}
                        onPress={() => {
                          setSelectedLabel('Work');
                          setShowLabelOptions(false);
                        }}
                      >
                        <Image
                          source={images.building}
                          style={styles.circleIcon}
                        />
                        <Text style={styles.circleText}>Work</Text>
                      </TouchableOpacity>

                      {/* <TouchableOpacity
                        style={styles.circleContainer}
                        onPress={() => {
                          setSelectedLabel('Other');
                          setShowLabelOptions(false);
                        }}
                      >
                        <Image source={images.add} style={styles.circleIcon} />
                        <Text style={styles.circleText}>Other</Text>
                      </TouchableOpacity> */}
                      <TouchableOpacity
                        style={styles.circleContainer}
                        onPress={() => {
                          setShowCustomLabelInput(true);
                          setShowLabelOptions(false);
                        }}
                      >
                        <Image source={images.add} style={styles.circleIcon} />
                        <Text style={styles.circleText}>Other</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  {showCustomLabelInput && (
                    <View
                      style={{
                        width: width * 0.8,
                        alignItems: 'center',
                        marginTop: height * 0.02,
                        alignSelf: 'center',
                      }}
                    >
                      <CustomTextInput
                        placeholder="Enter custom label name"
                        placeholderTextColor={colors.gray}
                        inputWidth={width * 0.8}
                        inputHeight={height * 0.06}
                        backgroundColor={colors.white}
                        borderColor={colors.lightBrown}
                        borderWidth={1}
                        borderRadius={25}
                        value={customLabel}
                        onChangeText={text => setCustomLabel(text)}
                        onSubmitEditing={() => {
                          if (customLabel.trim()) {
                            setSelectedLabel(customLabel.trim());
                            setCustomLabel('');
                            setShowCustomLabelInput(false);
                          }
                        }}
                        returnKeyType="done"
                      />
                    </View>
                  )}
                  <View style={styles.border} />
                  <Text style={styles.savedLocText}>Saved Locations</Text>
                  <View style={styles.savedLocMain}>
                    {[1, 2].map((item, index) => (
                      <View key={index} style={styles.savedLocContainer}>
                        <View style={styles.locationContent}>
                          <View>
                            <Text style={styles.locTextOne}>
                              742 Evergreen Terrace
                            </Text>
                            <Text style={styles.locTextSec}>
                              Springfield, IL 62704, United States
                            </Text>
                          </View>

                          <TouchableOpacity
                            onPress={() =>
                              setActiveDropdown(
                                activeDropdown === index ? null : index,
                              )
                            }
                          >
                            <Image source={images.list} />
                          </TouchableOpacity>
                        </View>

                        {activeDropdown === index && (
                          <View style={styles.dropdownMenu}>
                            <TouchableOpacity style={styles.dropdownItem}>
                              <Text style={styles.dropdownText}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.dropdownItem}>
                              <Text
                                style={[styles.dropdownText, { color: 'red' }]}
                              >
                                Delete
                              </Text>
                            </TouchableOpacity>
                          </View>
                        )}
                      </View>
                    ))}
                  </View>
                  <View style={styles.btnMainSec}>
                    <CustomButton
                      btnHeight={height * 0.07}
                      btnWidth={width * 0.85}
                      text="+ Add"
                      textColor={colors.white}
                      backgroundColor={colors.black}
                      borderRadius={30}
                    />
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
    // gap: height * 0.01,
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
    bottom: height * 0.09,
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
  actionSheetThird: {
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    overflow: 'hidden',
    height: height * 0.67,
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
  WorkTextMain: {
    alignItems: 'center',
  },
  selectOnMap: {
    width: width * 0.75,
    flexDirection: 'row',
    marginTop: height * 0.01,
    left: width * 0.08,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  SelectOnMapText: {
    fontFamily: fontFamily.SfProDisplayRegular,
    fontSize: fontSizes.xsm,
    color: colors.black,
    textDecorationLine: 'underline',
  },
  border: {
    borderWidth: 0.6,
    borderColor: colors.gray,
    marginTop: height * 0.03,
    width: width * 0.85,
    left: width * 0.03,
  },
  savedLocText: {
    fontFamily: fontFamily.SfProDisplayRegular,
    fontSize: fontSizes.sm,
    color: colors.black,
    left: width * 0.035,
    marginTop: height * 0.01,
  },
  savedLocMain: {
    marginTop: height * 0.025,
    alignItems: 'center',
    gap: height * 0.02,
  },
  locTextOne: {
    fontFamily: fontFamily.SfProDisplayMedium,
    fontSize: fontSizes.sm,
    color: colors.black,
    fontWeight: 'bold',
  },
  locTextSec: {
    fontFamily: fontFamily.SfProDisplayRegular,
    fontSize: fontSizes.xsm,
    color: colors.black,
    fontWeight: 'light',
  },
  btnMainSec: {
    alignItems: 'center',
    top: height * 0.02,
  },
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  dropdownText: {
    fontSize: 14,
    color: colors.black,
  },
  savedLocContainer: {
    width: width * 0.85,
    borderWidth: 0.7,
    borderColor: colors.lightBrown,
    borderRadius: 10,
    backgroundColor: colors.white,
    padding: 19,
  },
  locationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownMenu: {
    position: 'absolute',
    marginTop: 10,
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gray,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    zIndex: 10,
    width: width * 0.2,
    left: width * 0.55,
    top: height * 0.015,
  },
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2000,
  },
  labelPopup: {
    flexDirection: 'row',
    backgroundColor: 'rgba(215, 215, 215, 0.9)',
    borderRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 25,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: width * 0.85,
    bottom: height * 0.035,
    marginBottom: height * 0.02,
  },
  circleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.white,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  circleIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    tintColor: colors.black,
  },
  circleText: {
    fontSize: fontSizes.xsm,
    color: colors.black,
    fontFamily: fontFamily.SfProDisplayRegular,
    marginTop: 5,
  },
});

export default HomeUser;

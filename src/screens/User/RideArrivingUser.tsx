import { NavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useRef, useState } from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import LinearGradient from 'react-native-linear-gradient';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { fontFamily } from '../../assets/Fonts';
import images from '../../assets/Images';
import CustomButton from '../../components/CustomButton';
import TopHeader from '../../components/Topheader';
import { height, width } from '../../utilities';
import { colors } from '../../utilities/colors';
import { fontSizes } from '../../utilities/fontsizes';

type RootStackParamList = {
  RideArrivingUser: undefined;
  DrawerNavigation: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'RideArrivingUser'>;

const RideArrivingUser = () => {
  // const navigation = useNavigation<NavigationProp<any>>();
  // const arrivingSheetRef = useRef<ActionSheetRef>(null);
  // const secondSheetRef = useRef<ActionSheetRef>(null);
  // const thirdSheetRef = useRef<ActionSheetRef>(null);
  // const fourthSheetRef = useRef<ActionSheetRef>(null);
  // const mapRef = useRef<MapView>(null);
  // const [timeLeft, setTimeLeft] = useState(10); // first sheet countdown
  // const [countdown, setCountdown] = useState(900); // 4:55 in seconds

  // const waitingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  // const countdownTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // useEffect(() => {
  //   arrivingSheetRef.current?.show();

  //   // First ActionSheet auto close after 10s
  //   waitingTimerRef.current = setInterval(() => {
  //     setTimeLeft(prev => {
  //       if (prev <= 1) {
  //         clearInterval(waitingTimerRef.current!);
  //         arrivingSheetRef.current?.hide();
  //         setTimeout(() => {
  //           secondSheetRef.current?.show();
  //           setTimeout(() => {
  //             secondSheetRef.current?.hide();
  //             setTimeout(() => {
  //               thirdSheetRef.current?.show();
  //             }, 500);
  //           }, 5000);
  //         }, 500);
  //         return 0;
  //       }
  //       return prev - 1;
  //     });
  //   }, 1000);

  //   return () => {
  //     if (waitingTimerRef.current) clearInterval(waitingTimerRef.current);
  //     if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
  //   };
  // }, []);

  // const formatTime = (seconds: number) => {
  //   const mins = Math.floor(seconds / 60);
  //   const secs = seconds % 60;
  //   return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  // };

  // const handleBackdropPressOnCompletedSheet = () => {
  //   // Check if the ref exists and the sheet is open before calling the method
  //   if (secondSheetRef.current) {
  //     // Call snapToIndex(0) to move the sheet to the '20%' snap point (index 0)
  //     secondSheetRef.current.snapToIndex(0);

  //     // NOTE: If you want it to snap to the second point (50%), use snapToIndex(1).
  //   }
  // };

  // const handleBackdropPressOnFirstSheet = () => {
  //   if (arrivingSheetRef.current) {
  //     arrivingSheetRef.current.snapToIndex(0);
  //   }
  // };

  // const handleBackdropPressOnSecondSheet = () => {
  //   if (secondSheetRef.current) {
  //     secondSheetRef.current.snapToIndex(0);
  //   }
  // };

  // const handleBackdropPressOnThirdSheet = () => {
  //   if (thirdSheetRef.current) {
  //     thirdSheetRef.current.snapToIndex(0);
  //   }
  // };

  // const handleBackdropPressOnFourthSheet = () => {
  //   if (fourthSheetRef.current) {
  //     fourthSheetRef.current.snapToIndex(0);
  //   }
  // };

  // const handleOkImComingPress = () => {
  //   thirdSheetRef.current?.hide();
  //   setTimeout(() => {
  //     fourthSheetRef.current?.show();
  //     startCountdown(); // start countdown when 4th sheet opens
  //   }, 300); // Reduced timeout for smoother transition
  // };

  // const startCountdown = () => {
  //   if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
  //   setCountdown(900); // reset 4:55
  //   countdownTimerRef.current = setInterval(() => {
  //     setCountdown(prev => {
  //       if (prev <= 1) {
  //         clearInterval(countdownTimerRef.current!);
  //         // Navigate to payment screen when countdown ends
  //         setTimeout(() => {
  //           fourthSheetRef.current?.hide();
  //           setTimeout(() => {
  //             navigation.navigate('PaymentUser');
  //           }, 300);
  //         }, 500);
  //         return 0;
  //       }
  //       return prev - 1;
  //     });
  //   }, 1000);
  // };


  const navigation = useNavigation<NavigationProp<any>>();
  const arrivingSheetRef = useRef<ActionSheetRef>(null);
  const secondSheetRef = useRef<ActionSheetRef>(null);
  const thirdSheetRef = useRef<ActionSheetRef>(null);
  const fourthSheetRef = useRef<ActionSheetRef>(null);
  const mapRef = useRef<MapView>(null);
  const [timeLeft, setTimeLeft] = useState(10); // first sheet countdown
  const [countdown, setCountdown] = useState(900); // 4:55 in seconds

  const waitingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const countdownTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    arrivingSheetRef.current?.show();

    // First ActionSheet auto close after 10s
    waitingTimerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(waitingTimerRef.current!);
          arrivingSheetRef.current?.hide();
          setTimeout(() => {
            secondSheetRef.current?.show();

            // Second sheet auto close after 5s
            setTimeout(() => {
              secondSheetRef.current?.hide();
              setTimeout(() => {
                thirdSheetRef.current?.show();
              }, 500);
            }, 5000);
          }, 500);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (waitingTimerRef.current) clearInterval(waitingTimerRef.current);
      if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
    };
  }, []);

  // Format seconds → mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleBackdropPressOnCompletedSheet = () => {
    // Check if the ref exists and the sheet is open before calling the method
    if (secondSheetRef.current) {
      // Call snapToIndex(0) to move the sheet to the '20%' snap point (index 0)
      secondSheetRef.current.snapToIndex(0);

      // NOTE: If you want it to snap to the second point (50%), use snapToIndex(1).
    }
  };

  const handleBackdropPressOnFirstSheet = () => {
    if (arrivingSheetRef.current) {
      arrivingSheetRef.current.snapToIndex(0);
    }
  };

  const handleBackdropPressOnSecondSheet = () => {
    if (secondSheetRef.current) {
      secondSheetRef.current.snapToIndex(0);
    }
  };

  const handleBackdropPressOnThirdSheet = () => {
    if (thirdSheetRef.current) {
      thirdSheetRef.current.snapToIndex(0);
    }
  };

  const handleBackdropPressOnFourthSheet = () => {
    if (fourthSheetRef.current) {
      fourthSheetRef.current.snapToIndex(0);
    }
  };

  // Function to handle the "Ok! I'm Coming" button press with proper sheet management
  const handleOkImComingPress = () => {
    thirdSheetRef.current?.hide();
    setTimeout(() => {
      fourthSheetRef.current?.show();
      startCountdown(); // start countdown when 4th sheet opens
    }, 300); // Reduced timeout for smoother transition
  };

  const startCountdown = () => {
    if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
    setCountdown(300); // reset 4:55
    countdownTimerRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownTimerRef.current!);
          // Navigate to payment screen when countdown ends
          setTimeout(() => {
            fourthSheetRef.current?.hide();
            setTimeout(() => {
              navigation.navigate('PaymentUser');
            }, 300);
          }, 500);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.topHeaderContainer, { pointerEvents: 'box-none' }]}>
        <TopHeader isMenu={true} />
      </View>

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
          scrollEnabled={false}
          zoomEnabled={false}
          rotateEnabled={false}
          pitchEnabled={false}
          showsUserLocation={false}
        >
          <Marker
            coordinate={{ latitude: 40.7003, longitude: -73.9967 }}
            title="Brooklyn Bridge Park"
            description="New York"
          />
        </MapView>
      </View>
      <ActionSheet
        ref={arrivingSheetRef}
        containerStyle={{
          ...styles.actionSheetOne,
          pointerEvents: 'box-none',
        }}
        snapPoints={[40, 50, 90]}
        initialSnapIndex={1}
        closeOnTouchBackdrop={false}
        onTouchBackdrop={handleBackdropPressOnFirstSheet}
        defaultOverlayOpacity={0.1}
        indicatorStyle={{
          backgroundColor: colors.lightBrown,
          width: width * 0.3,
          height: height * 0.006,
          borderRadius: 3,
        }}
        gestureEnabled={true}
        backgroundInteractionEnabled={false}
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
        >
          <View style={styles.gradientBackground}>
            <View style={styles.ActionSheetContentMain}>
              <Text style={styles.selectText}>Waiting for the OTP</Text>

              <View>
                <Text style={styles.selectDriver}>
                  Your driver is coming in {formatTime(timeLeft)}
                </Text>
              </View>

              <LinearGradient
                colors={['#FFFFFF', '#FFE9E9']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1.1 }}
                style={styles.passengerContainer}
              >
                <View style={styles.textPassenger}>
                  <Text style={styles.name}>Passenger Name:</Text>
                  <Text style={styles.adam}>Adam James</Text>
                </View>

                <View style={styles.textPassenger}>
                  <Text style={styles.distance}>Distance:</Text>
                  <Text style={styles.miles}>10 Miles away</Text>
                </View>

                <View style={styles.textPassenger}>
                  <Text style={styles.plate}>Number Plate:</Text>
                  <Text style={styles.number}>123 756</Text>
                </View>

                <View style={styles.subContainer}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingHorizontal: width * 0.09,
                      alignItems: 'center',
                      height: height * 0.055,
                    }}
                  >
                    <Text style={styles.fare}>Fare:</Text>
                    <Text style={styles.fare}>$55.00</Text>
                  </View>
                </View>
              </LinearGradient>

              <View style={styles.btn}>
                <CustomButton
                  btnHeight={height * 0.07}
                  btnWidth={width * 0.45}
                  borderColor={colors.black}
                  borderRadius={35}
                  borderWidth={1}
                  backgroundColor={colors.black}
                  text="Message"
                  textColor={colors.white}
                  onPress={() => navigation.navigate('Chat')}
                />

                <CustomButton
                  btnHeight={height * 0.07}
                  btnWidth={width * 0.45}
                  borderColor={colors.black}
                  borderRadius={35}
                  borderWidth={1}
                  backgroundColor={colors.brown}
                  text="Call"
                  textColor={colors.white}
                  onPress={() => navigation.navigate('CallMain')}
                />
              </View>
            </View>
          </View>
        </ImageBackground>
      </ActionSheet>

      <ActionSheet
        ref={secondSheetRef}
        containerStyle={{
          ...styles.actionSheetTwo,
          pointerEvents: 'box-none',
        }}
        snapPoints={[40, 50, 90]}
        initialSnapIndex={1}
        closeOnTouchBackdrop={false}
        onTouchBackdrop={handleBackdropPressOnSecondSheet}
        defaultOverlayOpacity={0.1}
        indicatorStyle={{
          backgroundColor: colors.lightBrown,
          width: width * 0.3,
          height: height * 0.006,
          borderRadius: 3,
        }}
        gestureEnabled={true}
        backgroundInteractionEnabled={false}
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
        >
          <View style={styles.gradientBackground}>
            <View style={styles.ActionSheetContentMain}>
              <Text style={styles.selectText}>Waiting for the OTP</Text>

              <View>
                <Text style={styles.selectDriver}>Your driver has Arrived</Text>
              </View>

              <LinearGradient
                colors={['#FFFFFF', '#FFE9E9']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1.1 }}
                style={styles.passengerContainer}
              >
                <View style={styles.textPassenger}>
                  <Text style={styles.name}>Passenger Name:</Text>
                  <Text style={styles.adam}>Adam James</Text>
                </View>

                <View style={styles.textPassenger}>
                  <Text style={styles.distance}>Distance:</Text>
                  <Text style={styles.miles}>10 Miles away</Text>
                </View>

                <View style={styles.textPassenger}>
                  <Text style={styles.plate}>Number Plate:</Text>
                  <Text style={styles.number}>123 756</Text>
                </View>

                <View style={styles.subContainer}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingHorizontal: width * 0.09,
                      alignItems: 'center',
                      height: height * 0.055,
                    }}
                  >
                    <Text style={styles.fare}>Fare:</Text>
                    <Text style={styles.fare}>$55.00</Text>
                  </View>
                </View>
              </LinearGradient>

              <View style={styles.btn}>
                <CustomButton
                  btnHeight={height * 0.07}
                  btnWidth={width * 0.45}
                  borderColor={colors.black}
                  borderRadius={35}
                  borderWidth={1}
                  backgroundColor={colors.black}
                  text="Message"
                  textColor={colors.white}
                  onPress={() => navigation.navigate('Chat')}
                />

                <CustomButton
                  btnHeight={height * 0.07}
                  btnWidth={width * 0.45}
                  borderColor={colors.black}
                  borderRadius={35}
                  borderWidth={1}
                  backgroundColor={colors.brown}
                  text="Call"
                  textColor={colors.white}
                  onPress={() => navigation.navigate('CallMain')}
                />
              </View>
            </View>
          </View>
        </ImageBackground>
      </ActionSheet>

      <ActionSheet
        ref={thirdSheetRef}
        containerStyle={{
          ...styles.actionSheetThree,
          pointerEvents: 'box-none',
        }}
        snapPoints={[40, 50, 90]}
        initialSnapIndex={1}
        closeOnTouchBackdrop={false}
        onTouchBackdrop={handleBackdropPressOnThirdSheet}
        defaultOverlayOpacity={0.1}
        indicatorStyle={{
          backgroundColor: colors.lightBrown,
          width: width * 0.3,
          height: height * 0.006,
          borderRadius: 3,
        }}
        gestureEnabled={true}
        backgroundInteractionEnabled={false}
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
        >
          <View style={styles.gradientBackground}>
            <View style={styles.ActionSheetContentMain}>
              <Text style={styles.selectText}>Waiting for the OTP</Text>

              <View style={styles.otpContainer}>
                <Text style={styles.otpCount}>09356</Text>
              </View>

              <View>
                <Text style={styles.selectDriver}>
                  Driver is waiting for you!
                </Text>
              </View>

              <LinearGradient
                colors={['#FFFFFF', '#FFE9E9']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1.1 }}
                style={styles.passengerContainer}
              >
                <View style={styles.textPassenger}>
                  <Text style={styles.name}>Passenger Name:</Text>
                  <Text style={styles.adam}>Adam James</Text>
                </View>

                <View style={styles.textPassenger}>
                  <Text style={styles.distance}>Distance:</Text>
                  <Text style={styles.miles}>10 Miles away</Text>
                </View>

                <View style={styles.textPassenger}>
                  <Text style={styles.plate}>Number Plate:</Text>
                  <Text style={styles.number}>123 756</Text>
                </View>

                <View style={styles.subContainer}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingHorizontal: width * 0.09,
                      alignItems: 'center',
                      height: height * 0.055,
                    }}
                  >
                    <Text style={styles.fare}>Fare:</Text>
                    <Text style={styles.fare}>$55.00</Text>
                  </View>
                </View>
              </LinearGradient>

              <View style={styles.comContainer}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: width * 0.78,
                    alignSelf: 'center',
                    top: height * 0.01,
                  }}
                >
                  <Text style={styles.late}>Please Don't be LATE!</Text>
                  <Text style={styles.late}>4:55</Text>
                </View>

                <View style={{ top: height * 0.034, alignItems: 'center' }}>
                  <CustomButton
                    btnHeight={height * 0.05}
                    btnWidth={width * 0.78}
                    borderColor={colors.black}
                    borderRadius={35}
                    borderWidth={1}
                    backgroundColor={colors.brown}
                    text="Ok! I'm Coming"
                    textColor={colors.white}
                    // onPress={() => {
                    //   thirdSheetRef.current?.hide();
                    //   setTimeout(() => {
                    //     fourthSheetRef.current?.show();
                    //     startCountdown(); // start countdown when 4th sheet opens
                    //   }, 500);
                    // }}
                    onPress={handleOkImComingPress}
                  />
                </View>
              </View>

              <View style={styles.btn}>
                <CustomButton
                  btnHeight={height * 0.07}
                  btnWidth={width * 0.45}
                  borderColor={colors.black}
                  borderRadius={35}
                  borderWidth={1}
                  backgroundColor={colors.black}
                  text="Message"
                  textColor={colors.white}
                  onPress={() => navigation.navigate('Chat')}
                />

                <CustomButton
                  btnHeight={height * 0.07}
                  btnWidth={width * 0.45}
                  borderColor={colors.black}
                  borderRadius={35}
                  borderWidth={1}
                  backgroundColor={colors.brown}
                  text="Call"
                  textColor={colors.white}
                  onPress={() => navigation.navigate('CallMain')}
                />
              </View>
            </View>
          </View>
        </ImageBackground>
      </ActionSheet>

      <ActionSheet
        ref={fourthSheetRef}
        containerStyle={{
          ...styles.actionSheetFourth,
          pointerEvents: 'box-none',
        }}
        snapPoints={[40, 50, 90]}
        initialSnapIndex={1}
        closeOnTouchBackdrop={false}
        onTouchBackdrop={handleBackdropPressOnFourthSheet}
        defaultOverlayOpacity={0.1}
        indicatorStyle={{
          backgroundColor: colors.lightBrown,
          width: width * 0.3,
          height: height * 0.006,
          borderRadius: 3,
        }}
        gestureEnabled={true}
        backgroundInteractionEnabled={false}
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
        >
          <View style={styles.gradientBackground}>
            <View style={styles.ActionSheetContentMain}>
              <Text style={styles.selectText}>Your Ride Started!</Text>

              <View style={{ flexDirection: 'row' }}>
                <Image source={images.guide} style={styles.guide} />

                <View style={styles.locationMain}>
                  {/* <CustomTextInput
                    placeholder="Groklyn Bridge Park"
                    placeholderTextColor={colors.black}
                    borderColor={colors.brown}
                    borderRadius={10}
                    inputWidth={width * 0.8}
                    inputHeight={height * 0.05}
                    leftIcon={
                      <Image
                        source={images.locationImage}
                        style={styles.locationImg}
                      />
                    }
                    editable={false}
                  /> */}
                  <View style={styles.inputContainer}>
                    <Image
                      source={images.locationImage}
                      style={styles.locationImg}
                    />
                    <TextInput
                      placeholder="Brooklyn Bridge Park"
                      placeholderTextColor={colors.black}
                      style={styles.input}
                      editable={false}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <Image
                      source={images.locationImage}
                      style={styles.locationImg}
                    />
                    <TextInput
                      placeholder="Brooklyn Bridge Park"
                      placeholderTextColor={colors.black}
                      style={styles.input}
                      editable={false}
                    />
                  </View>
                  {/* <CustomTextInput
                    placeholder="Groklyn Bridge Park"
                    placeholderTextColor={colors.black}
                    borderColor={colors.gray}
                    borderRadius={10}
                    inputWidth={width * 0.8}
                    inputHeight={height * 0.05}
                    leftIcon={
                      <Image
                        source={images.locationImage}
                        style={styles.locationImg}
                      />
                    }
                    editable={false}
                  /> */}
                </View>
              </View>

              <LinearGradient
                colors={['#FFFFFF', '#FFE9E9']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1.1 }}
                style={styles.passengerContainer}
              >
                <View style={styles.textPassenger}>
                  <Text style={styles.name}>Passenger Name:</Text>
                  <Text style={styles.adam}>Adam James</Text>
                </View>

                <View style={styles.textPassenger}>
                  <Text style={styles.distance}>Distance:</Text>
                  <Text style={styles.miles}>10 Miles away</Text>
                </View>

                <View style={styles.textPassenger}>
                  <Text style={styles.plate}>Number Plate:</Text>
                  <Text style={styles.number}>123 756</Text>
                </View>

                <View style={styles.subContainer}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingHorizontal: width * 0.09,
                      alignItems: 'center',
                      height: height * 0.055,
                    }}
                  >
                    <Text style={styles.fare}>Fare:</Text>
                    <Text style={styles.fare}>$55.00</Text>
                  </View>
                </View>
              </LinearGradient>

              {/* Add countdown display */}
              <View style={styles.countdownContainer}>
                <Text style={styles.countdownText}>
                  Ride ending in: {formatTime(countdown)}
                </Text>
              </View>

              <View style={styles.btn}>
                <CustomButton
                  btnHeight={height * 0.07}
                  btnWidth={width * 0.45}
                  borderColor={colors.black}
                  borderRadius={35}
                  borderWidth={1}
                  backgroundColor={colors.black}
                  text="Message"
                  textColor={colors.white}
                  onPress={() => navigation.navigate('Chat')}
                />

                <CustomButton
                  btnHeight={height * 0.07}
                  btnWidth={width * 0.45}
                  borderColor={colors.black}
                  borderRadius={35}
                  borderWidth={1}
                  backgroundColor={colors.brown}
                  text="Call"
                  textColor={colors.white}
                  onPress={() => navigation.navigate('CallMain')}
                />
              </View>

              <View style={{ top: height * 0.1 }}>
                <CustomButton
                  btnHeight={height * 0.07}
                  btnWidth={width * 0.9}
                  borderColor={colors.black}
                  borderRadius={35}
                  borderWidth={1}
                  backgroundColor={colors.brown}
                  text="Share Ride "
                  textColor={colors.white}
                  // onPress={() => navigation.navigate('CallMain')}
                />
              </View>
            </View>
          </View>
        </ImageBackground>
      </ActionSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: width * 0.8,
    height: height * 0.05,
    borderWidth: 1,
    borderColor: colors.brown,
    borderRadius: 10,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.04,
  },
  input: {
    paddingVertical: 10,
    paddingLeft: width * 0.03,
    fontFamily: fontFamily.ClashDisplayMedium,
    fontSize: fontSizes.sm,
    width: width * 0.8,
  },
  topHeaderContainer: {
    position: 'absolute',
    // top: height * 0.02,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  countdownContainer: {
    alignItems: 'center',
    // marginVertical: height * 0.01,
    top: height * 0.06,
  },
  countdownText: {
    fontSize: fontSizes.md,
    fontWeight: 'bold',
    color: colors.brown,
  },
  mapImg: {
    flex: 1,
    resizeMode: 'cover',
  },
  comContainer: {
    borderColor: colors.brown,
    borderWidth: 1,
    alignSelf: 'center',
    height: height * 0.12,
    width: width * 0.85,
    borderRadius: 20,
    top: height * 0.06,
    backgroundColor: 'rgba(149, 7, 6, 0.1)',
  },
  passengerContainer: {
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: colors.peach,
    alignSelf: 'center',
    height: height * 0.21,
    width: width * 0.85,
    top: height * 0.04,
  },
  subContainer: {
    borderColor: 'rgba(165, 42, 42, 0.17)',
    borderWidth: 1,
    borderRadius: 10,
    height: height * 0.061,
    width: width * 0.76,
    alignSelf: 'center',
    top: height * 0.03,
    backgroundColor: colors.white,
  },
  locationMain: {
    gap: height * 0.01,
    paddingTop: height * 0.01,
  },
  guide: {
    right: width * 0.03,
    top: height * 0.03,
  },
  locationImg: {
    width: width * 0.03,
    height: height * 0.03,
    resizeMode: 'contain',
  },
  actionSheetOne: {
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    overflow: 'hidden',
    height: height * 0.5,
    width: width,
    bottom: height * 0.04,
  },
  actionSheetTwo: {
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    overflow: 'hidden',
    height: height * 0.5,
    width: width,
    bottom: height * 0.04,
  },
  actionSheetThree: {
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    overflow: 'hidden',
    height: height * 0.7,
    width: width,
    bottom: height * 0.04,
  },
  actionSheetFourth: {
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    overflow: 'hidden',
    height: height * 0.7,
    width: width,
    bottom: height * 0.04,
  },
  actionSheetFour: {
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    overflow: 'hidden',
    height: height * 0.7,
    width: width,
    bottom: height * 0.04,
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
    fontSize: fontSizes.lg2,
    color: colors.black,
  },
  selectDriver: {
    fontFamily: fontFamily.ClashDisplayMedium,
    fontSize: fontSizes.lg,
    color: colors.black,
    top: height * 0.01,
  },
  otpContainer: {
    backgroundColor: colors.white,
    height: height * 0.06,
    width: width * 0.35,
    borderRadius: 10,
    top: height * 0.01,
    marginBottom: height * 0.01,
    justifyContent: 'center',
  },
  otpCount: {
    fontFamily: fontFamily.ClashDisplayMedium,
    fontSize: fontSizes.xl,
    color: colors.black,
    alignSelf: 'center',
  },
  textPassenger: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.05,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: height * 0.01,
    width: width * 0.75,
    top: height * 0.02,
  },
  name: {
    fontFamily: fontFamily.SfProDisplayMedium,
    fontSize: fontSizes.sm,
    color: colors.black,
    fontWeight: '700',
  },
  adam: {
    fontFamily: fontFamily.SfProDisplayRegular,
    fontSize: fontSizes.sm,
    color: colors.black,
    fontWeight: '400',
  },
  distance: {
    fontFamily: fontFamily.SfProDisplayMedium,
    fontSize: fontSizes.sm,
    color: colors.black,
    fontWeight: '700',
  },
  miles: {
    fontFamily: fontFamily.SfProDisplayRegular,
    fontSize: fontSizes.sm,
    color: colors.black,
    fontWeight: '400',
  },
  plate: {
    fontFamily: fontFamily.SfProDisplayMedium,
    fontSize: fontSizes.sm,
    color: colors.black,
    fontWeight: '700',
  },
  number: {
    fontFamily: fontFamily.SfProDisplayRegular,
    fontSize: fontSizes.sm,
    color: colors.black,
    fontWeight: '900',
  },
  fare: {
    fontFamily: fontFamily.SfProDisplayMedium,
    fontSize: fontSizes.md,
    color: colors.black,
    fontWeight: '700',
  },
  btn: {
    top: height * 0.08,
    flexDirection: 'row',
    gap: width * 0.02,
  },
  late: {
    color: colors.black,
    fontSize: fontSizes.sm2,
    fontFamily: fontFamily.SfProDisplayMedium,
  },
  title: {
    fontFamily: fontFamily.ClashDisplayMedium,
    fontSize: fontSizes.lg,
    color: colors.black,
    marginBottom: 20,
  },
});

export default RideArrivingUser;

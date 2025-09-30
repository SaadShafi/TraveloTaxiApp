import { NavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Image,
  ImageBackground,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import LinearGradient from 'react-native-linear-gradient';
import * as Progress from 'react-native-progress';
import { fontFamily } from '../../assets/Fonts';
import images from '../../assets/Images';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import TopHeader from '../../components/Topheader';
import { StackParamList } from '../../navigation/AuthStack';
import { height, width } from '../../utilities';
import { colors } from '../../utilities/colors';
import { fontSizes } from '../../utilities/fontsizes';

type Props = NativeStackScreenProps<StackParamList, 'RideArriving'>;

const RideArriving = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const arrivingSheetRef = useRef<ActionSheetRef>(null);
  const completedSheetRef = useRef<ActionSheetRef>(null);
  const thirdSheetRef = useRef<ActionSheetRef>(null);
  const fourthSheetRef = useRef<ActionSheetRef>(null);
  const [timeLeft, setTimeLeft] = useState(10);
  const [waitingTime, setWaitingTime] = useState(10);
  const waitingTimerRef = useRef<number | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [otpModalVisible, setOtpModalVisible] = useState(false);
  const [otp, setOtp] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleSec, setModalVisibleSec] = useState(false);
  const [modalVisiblethird, setModalVisibleThird] = useState(false);
  const [waitingStartModalVisible, setWaitingStartModalVisible] =
    useState(false);
  const [waitingTimerModalVisible, setWaitingTimerModalVisible] =
    useState(false);
  const waitingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null,
  );
  const [waitingCountdown, setWaitingCountdown] = useState(0);
  const totalTime = 300; // 5 minutes
  const radius = 70;
  const strokeWidth = 5;
  const circumference = 2 * Math.PI * radius;
  const progressAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (waitingTimerModalVisible) {
      progressAnim.setValue(1); // reset full circle
      Animated.timing(progressAnim, {
        toValue: 0,
        duration: waitingCountdown * 1000, // match countdown time
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    }
  }, [waitingTimerModalVisible]);

  const strokeDashoffset = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  const formatCountdown = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    arrivingSheetRef.current?.show();

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          arrivingSheetRef.current?.hide();

          setTimeout(() => {
            completedSheetRef.current?.show();
            Animated.timing(fadeAnim, {
              toValue: 1,
              duration: 600,
              useNativeDriver: true,
            }).start();
          }, 500);

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    return () => {
      if (waitingTimerRef.current) {
        clearInterval(waitingTimerRef.current);
        waitingTimerRef.current = null;
      }
    };
  }, []);

  const handleArrivedPress = () => {
    completedSheetRef.current?.hide();
    setTimeout(() => {
      thirdSheetRef.current?.show();
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();

      // Start waiting countdown
      // Clear any existing waiting timer first
      if (waitingTimerRef.current) {
        clearInterval(waitingTimerRef.current);
        waitingTimerRef.current = null;
      }

      setWaitingTime(295); // reset to 4:55
      const id = setInterval(() => {
        setWaitingTime(prev => {
          if (prev <= 1) {
            if (waitingTimerRef.current) {
              clearInterval(waitingTimerRef.current);
              waitingTimerRef.current = null;
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // store id (setInterval returns a number in RN)
      waitingTimerRef.current = id as unknown as number;
    }, 400);
  };

  const handleBackdropPressOnCompletedSheet = () => {
    // Check if the ref exists and the sheet is open before calling the method
    if (completedSheetRef.current) {
      // Call snapToIndex(0) to move the sheet to the '20%' snap point (index 0)
      completedSheetRef.current.snapToIndex(0);

      // NOTE: If you want it to snap to the second point (50%), use snapToIndex(1).
    }
  };

  const SNAP_POINTS = [20, 50, 90];

  const handleStartWaiting = () => {
    completedSheetRef.current?.hide();
    setTimeout(() => {
      thirdSheetRef.current?.show();
    }, 300);
  };

  const handleStartRide = () => {
    thirdSheetRef.current?.hide();
    setTimeout(() => {
      fourthSheetRef.current?.show();
    }, 300);
  };

  const toggleRideEnd = () => {
    setModalVisibleThird(false);
    navigation.navigate('HomeDriver');
    console.log('Ed ride btn pressed');
  };

  return (
    <ImageBackground source={images.Maptwo} style={styles.mapImg}>
      <View style={{ flex: 1 }}>
        <View style={styles.topHeaderContainer}>
          <TopHeader isMenu={true} isChat={true} />
        </View>

        <ActionSheet
          // ref={arrivingSheetRef}
          // containerStyle={styles.actionSheetMain}
          // snapPoints={SNAP_POINTS}
          // initialSnapIndex={1} // Assuming it opens to '50%'
          // closeOnTouchBackdrop={false} // 🚫 STEP 1: Disable full auto-close
          // onTouchBackdrop={handleBackdropPressOnCompletedSheet} // ✅ STEP 2: Use custom handler
          // defaultOverlayOpacity={0.1}
          // onClose={() => {
          //   requestAnimationFrame(() => {
          //     arrivingSheetRef.current?.show();
          //   });
          // }}
          // gestureEnabled={true}
          // indicatorStyle={{
          //   backgroundColor: colors.lightBrown, // 👈 handle/gesture bar color
          //   width: width * 0.3, // optional (default is smaller)
          //   height: height * 0.006,
          //   borderRadius: 3,
          // }}
          // enableOverDrag={false} // ✅ prevents dragging to close
          // closable={false}
          // onTouchBackdrop={() => {}} // safeguard
          ref={arrivingSheetRef}
          containerStyle={styles.actionSheetMain}
          snapPoints={[20, 50, 90]}
          initialSnapIndex={1}
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
          enableOverDrag={true} // ✅ allow closing by drag
          closable={true} // ✅ allow full close
          onClose={() => {
            // when first sheet closes, open second
            completedSheetRef.current?.show();
          }}
        >
          <ImageBackground
            source={images.ActionSheetBg}
            style={styles.ActinSheetBg}
          >
            <View style={styles.gradientBackground}>
              <View style={styles.ActionSheetContentMain}>
                <Text style={styles.selectText}>
                  Arriving in {formatCountdown(timeLeft)} mins
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: width * 0.03,
                    top: height * 0.02,
                  }}
                >
                  <Image source={images.guide} />
                  <View style={styles.locationMain}>
                    <CustomTextInput
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
                    />
                    <CustomTextInput
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
                    />
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
                    btnWidth={width * 0.8}
                    borderColor={colors.black}
                    borderRadius={30}
                    borderWidth={1}
                    backgroundColor={colors.black}
                    text="Cancel Ride"
                    textColor={colors.white}
                  />
                </View>
              </View>
            </View>
          </ImageBackground>
        </ActionSheet>

        <ActionSheet
          // ref={completedSheetRef}
          // containerStyle={styles.actionSheetMain}
          // snapPoints={SNAP_POINTS}
          // initialSnapIndex={1} // Assuming it opens to '50%'
          // closeOnTouchBackdrop={false} // 🚫 STEP 1: Disable full auto-close
          // onTouchBackdrop={handleBackdropPressOnCompletedSheet} // ✅ STEP 2: Use custom handler
          // defaultOverlayOpacity={0.1}
          // onClose={() => {
          //   requestAnimationFrame(() => {
          //     completedSheetRef.current?.show();
          //   });
          // }}
          // gestureEnabled={true}
          // indicatorStyle={{
          //   backgroundColor: colors.lightBrown, // 👈 handle/gesture bar color
          //   width: width * 0.3, // optional (default is smaller)
          //   height: height * 0.006,
          //   borderRadius: 3,
          // }}
          // enableOverDrag={false} // ✅ prevents dragging to close
          // closable={false}
          // onTouchBackdrop={() => {}} // safeguard
          ref={completedSheetRef}
          containerStyle={styles.actionSheetMain}
          snapPoints={[20, 50, 90]}
          initialSnapIndex={1}
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
          onClose={() => {
            thirdSheetRef.current?.show();
          }}
        >
          <ImageBackground
            source={images.ActionSheetBg}
            style={styles.ActinSheetBg}
          >
            <View style={styles.gradientBackground}>
              <View style={styles.ActionSheetContentMain}>
                <Text style={styles.selectText}>You've Arrived!</Text>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: width * 0.03,
                    top: height * 0.02,
                  }}
                >
                  <Image source={images.guide} />
                  <View style={styles.locationMain}>
                    <CustomTextInput
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
                    />
                    <CustomTextInput
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
                    />
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

                <View style={styles.btnArrived}>
                  <CustomButton
                    btnHeight={height * 0.07}
                    btnWidth={width * 0.45}
                    borderColor={colors.black}
                    borderRadius={50}
                    borderWidth={1}
                    backgroundColor={colors.black}
                    text="Cancel Ride"
                    textColor={colors.white}
                  />
                  <CustomButton
                    btnHeight={height * 0.07}
                    btnWidth={width * 0.45}
                    borderColor={colors.black}
                    borderRadius={50}
                    borderWidth={1}
                    backgroundColor={colors.brown}
                    text="Arrived"
                    textColor={colors.white}
                    onPress={handleStartWaiting} // ✅ open 3rd sheet
                  />
                </View>
              </View>
            </View>
          </ImageBackground>
        </ActionSheet>

        <ActionSheet
          // ref={thirdSheetRef}
          // containerStyle={styles.actionSheetThird}
          // snapPoints={SNAP_POINTS} // Your defined snap points
          // initialSnapIndex={1} // Assuming it opens to '50%'
          // closeOnTouchBackdrop={false} // 🚫 STEP 1: Disable full auto-close
          // // onTouchBackdrop={handleBackdropPressOnCompletedSheet} // ✅ STEP 2: Use custom handler
          // defaultOverlayOpacity={0.1}
          // onClose={() => {
          //   requestAnimationFrame(() => {
          //     thirdSheetRef.current?.show();
          //   });
          // }}
          // gestureEnabled={true}
          // indicatorStyle={{
          //   backgroundColor: colors.lightBrown, // 👈 handle/gesture bar color
          //   width: width * 0.3, // optional (default is smaller)
          //   height: height * 0.006,
          //   borderRadius: 3,
          // }}
          // enableOverDrag={false} // ✅ prevents dragging to close
          // closable={false}
          // onTouchBackdrop={() => {}} // safeguard
          ref={thirdSheetRef}
          containerStyle={styles.actionSheetThird}
          snapPoints={[20, 50, 90]}
          initialSnapIndex={1}
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
          onClose={() => {
            fourthSheetRef.current?.show();
          }}
        >
          <ImageBackground
            source={images.ActionSheetBg}
            style={styles.ActinSheetBg}
          >
            <View style={styles.gradientBackground}>
              <View style={styles.ActionSheetContentMain}>
                <Text style={styles.selectText}>Waiting Time</Text>

                <View style={styles.countDown}>
                  <Text style={styles.selectText}>
                    {formatCountdown(waitingTime)}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: width * 0.03,
                    top: height * 0.02,
                  }}
                >
                  <Image source={images.guide} />
                  <View style={styles.locationMain}>
                    <CustomTextInput
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
                    />
                    <CustomTextInput
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
                    />
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

                <View style={styles.btnArrived}>
                  <CustomButton
                    btnHeight={height * 0.07}
                    btnWidth={width * 0.45}
                    borderColor={colors.black}
                    borderRadius={50}
                    borderWidth={1}
                    backgroundColor={colors.black}
                    text="Cancel Ride"
                    textColor={colors.white}
                  />
                  <CustomButton
                    btnHeight={height * 0.07}
                    btnWidth={width * 0.45}
                    borderColor={colors.black}
                    borderRadius={50}
                    borderWidth={1}
                    backgroundColor={colors.brown}
                    text="Start Ride"
                    textColor={colors.white}
                    onPress={() => setModalVisible(true)} // ✅ show modal
                    // onPress={handleArrivedPress} // ✅ open 3rd sheet
                  />
                </View>
              </View>
            </View>
            <Animated.View
              style={{ opacity: fadeAnim, alignItems: 'center', marginTop: 40 }}
            ></Animated.View>
          </ImageBackground>
        </ActionSheet>

        <ActionSheet
          // ref={fourthSheetRef}
          // containerStyle={styles.actionSheetFourth}
          // snapPoints={SNAP_POINTS} // Your defined snap points
          // initialSnapIndex={1} // Assuming it opens to '50%'
          // closeOnTouchBackdrop={false} // 🚫 STEP 1: Disable full auto-close
          // // onTouchBackdrop={handleBackdropPressOnCompletedSheet}
          // defaultOverlayOpacity={0.1}
          // onClose={() => {
          //   requestAnimationFrame(() => {
          //     fourthSheetRef.current?.show();
          //   });
          // }}
          // gestureEnabled={true}
          // indicatorStyle={{
          //   backgroundColor: colors.lightBrown, // 👈 handle/gesture bar color
          //   width: width * 0.3, // optional (default is smaller)
          //   height: height * 0.006,
          //   borderRadius: 3,
          // }}
          // enableOverDrag={false} // ✅ prevents dragging to close
          // closable={false}
          // onTouchBackdrop={() => {}} // safeguard
          ref={fourthSheetRef}
          containerStyle={styles.actionSheetFourth}
          snapPoints={[20, 50, 90]}
          initialSnapIndex={1}
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
        >
          <ImageBackground
            source={images.ActionSheetBg}
            style={styles.ActinSheetBg}
          >
            <View style={styles.gradientBackground}>
              <View style={styles.ActionSheetContentMain}>
                <Text style={styles.selectText}>Ride Ongoing!</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: width * 0.03,
                    top: height * 0.02,
                  }}
                >
                  <Image source={images.guide} />
                  <View style={styles.locationMain}>
                    <CustomTextInput
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
                    />
                    <CustomTextInput
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
                    />
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

                <View style={{ gap: height * 0.01, marginTop: height * 0.08 }}>
                  <CustomButton
                    btnHeight={height * 0.07}
                    btnWidth={width * 0.8}
                    borderColor={colors.black}
                    borderRadius={30}
                    borderWidth={1}
                    text="Start Waiting"
                    textColor={colors.white}
                    backgroundColor={colors.brown}
                    onPress={() => setWaitingStartModalVisible(true)}
                  />
                  <CustomButton
                    btnHeight={height * 0.07}
                    btnWidth={width * 0.8}
                    borderColor={colors.black}
                    borderRadius={30}
                    borderWidth={1}
                    text="End Ride"
                    textColor={colors.white}
                    backgroundColor={colors.brown}
                    onPress={() => setModalVisibleSec(true)}
                  />
                </View>
              </View>
            </View>
          </ImageBackground>
        </ActionSheet>

        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalText}>
                Amount has been paid by User!
              </Text>
              <Pressable
                style={styles.modalButton}
                onPress={() => {
                  setModalVisible(false);
                  setOtpModalVisible(true);
                }}
              >
                <Text style={styles.modalButtonText}>Confirm</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <Modal
          transparent={true}
          visible={otpModalVisible}
          animationType="fade"
          onRequestClose={() => setOtpModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.otpModalContainer}>
              <Text style={styles.otpTitle}>Enter OTP</Text>
              <Text style={styles.otpTitle}>to start the ride</Text>

              <CustomTextInput
                value={otp}
                onChangeText={setOtp}
                inputWidth={width * 0.7}
                inputHeight={height * 0.065}
                borderColor={colors.ashGray}
                borderWidth={1.5}
                backgroundColor={colors.lightGray}
                borderRadius={10}
                keyboardType="numeric"
                maxLength={5}
                textAlign="center"
              />
              <Pressable
                style={styles.otpmodalButton}
                onPress={() => {
                  setOtpModalVisible(false);

                  // setTimeout(() => {
                  //   fourthSheetRef.current?.show();
                  // }, 300);
                  thirdSheetRef.current?.hide();
                  setTimeout(() => {
                    fourthSheetRef.current?.show();
                  }, 300);
                }}
              >
                <Text style={styles.modalButtonText}>Confirm</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <Modal
          transparent={true}
          visible={waitingStartModalVisible}
          animationType="fade"
          onRequestClose={() => setWaitingStartModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.timerModalContainer}>
              <Text style={styles.modalTitle}>Start Timer</Text>

              {/* Static Circular Preview */}
              <View style={styles.circularTimer}>
                <Text style={styles.timerText}>05:00</Text>
              </View>

              <Pressable
                style={[styles.modalButton, { backgroundColor: colors.black }]}
                onPress={() => {
                  setWaitingStartModalVisible(false);
                  setWaitingTimerModalVisible(true);

                  // reset countdown
                  setWaitingCountdown(300);

                  // start interval
                  if (waitingIntervalRef.current)
                    clearInterval(waitingIntervalRef.current);

                  waitingIntervalRef.current = setInterval(() => {
                    setWaitingCountdown(prev => {
                      if (prev <= 1) {
                        clearInterval(waitingIntervalRef.current!);
                        waitingIntervalRef.current = null;
                        return 0;
                      }
                      return prev - 1;
                    });
                  }, 1000);
                }}
              >
                <Text style={styles.modalButtonText}>Start</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <Modal
          transparent={true}
          visible={waitingTimerModalVisible}
          animationType="fade"
          onRequestClose={() => setWaitingTimerModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.timerModalContainer}>
              <Text style={styles.modalTitle}>End Time</Text>
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Progress.Circle
                  size={160}
                  thickness={10}
                  progress={waitingCountdown / totalTime}
                  showsText={true}
                  color={colors.brown}
                  borderWidth={0}
                  strokeCap="round"
                  animated={false}
                  unfilledColor={colors.gray}
                  formatText={() =>
                    `${Math.floor(waitingCountdown / 60)}:${(
                      waitingCountdown % 60
                    )
                      .toString()
                      .padStart(2, '0')}`
                  }
                />
                {/* <Text style={styles.timerText}>
                  {Math.floor(waitingCountdown / 60)}:
                  {(waitingCountdown % 60).toString().padStart(2, '0')}
                </Text> */}
              </View>

              <Pressable
                style={[styles.modalButton, { backgroundColor: colors.brown }]}
                onPress={() => {
                  setWaitingTimerModalVisible(false);
                  if (waitingIntervalRef.current) {
                    clearInterval(waitingIntervalRef.current);
                    waitingIntervalRef.current = null;
                  }
                }}
              >
                <Text style={styles.modalButtonText}>End</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <Modal
          transparent={true}
          visible={modalVisibleSec}
          animationType="fade"
          onRequestClose={() => setModalVisibleSec(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalText}>You've Arrived</Text>
              <Text style={styles.modalText}>On The Destination</Text>
              <Image source={images.arrived} style={styles.arrivedImg} />
              <CustomButton
                btnHeight={height * 0.07}
                btnWidth={width * 0.7}
                borderColor={colors.black}
                borderRadius={30}
                borderWidth={1}
                backgroundColor={colors.brown}
                text="Get Summary"
                textColor={colors.white}
                onPress={() => {
                  setModalVisibleSec(false);
                  setModalVisibleThird(true);
                }}
              />
            </View>
          </View>
        </Modal>

        <Modal
          transparent={true}
          visible={modalVisiblethird}
          animationType="fade"
          onRequestClose={() => setModalVisibleThird(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContainer, { height: height * 0.55 }]}>
              <Text style={styles.modalText}>Ride Summary</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: width * 0.03,
                  top: height * 0.02,
                }}
              >
                <Image source={images.guide} />
                <View style={styles.locationMain}>
                  <CustomTextInput
                    placeholder="Groklyn Bridge Park"
                    placeholderTextColor={colors.black}
                    borderColor={colors.brown}
                    borderRadius={10}
                    inputWidth={width * 0.7}
                    inputHeight={height * 0.05}
                    leftIcon={
                      <Image
                        source={images.locationImage}
                        style={styles.locationImg}
                      />
                    }
                    editable={false}
                  />
                  <CustomTextInput
                    placeholder="Groklyn Bridge Park"
                    placeholderTextColor={colors.black}
                    borderColor={colors.gray}
                    borderRadius={10}
                    inputWidth={width * 0.7}
                    inputHeight={height * 0.05}
                    leftIcon={
                      <Image
                        source={images.locationImage}
                        style={styles.locationImg}
                      />
                    }
                    editable={false}
                  />
                </View>
              </View>

              <LinearGradient
                colors={['#FFFFFF', '#FFE9E9']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1.1 }}
                style={[
                  styles.passengerContainer,
                  { width: width * 0.7, height: height * 0.18 },
                ]}
              >
                <View style={styles.textPassenger}>
                  <Text style={styles.name}>Passenger Name:</Text>
                  <Text style={styles.adam}>Adam James</Text>
                </View>

                <View style={styles.textPassenger}>
                  <Text style={styles.distance}>Distance:</Text>
                  <Text style={styles.miles}>10 Miles away</Text>
                </View>

                <View style={[styles.subContainer, { width: width * 0.65 }]}>
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

              <View style={{ marginTop: height * 0.065 }}>
                <CustomButton
                  btnHeight={height * 0.07}
                  btnWidth={width * 0.7}
                  borderColor={colors.black}
                  borderRadius={30}
                  borderWidth={1}
                  backgroundColor={colors.brown}
                  text="End Ride"
                  textColor={colors.white}
                  onPress={toggleRideEnd}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  topHeaderContainer: {
    position: 'absolute',
    // top: height * 0.02,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  distressMain: {
    bottom: height * 0.03,
    left: width * 0.6,
    backgroundColor: colors.lightBrown,
    padding: 5,
    borderRadius: 30,
    width: width * 0.15,
    alignItems: 'center',
  },
  distressText: {
    fontFamily: fontFamily.ClashDisplayRegular,
    fontSize: fontSizes.sm2,
    color: colors.brown,
  },
  mapImg: { flex: 1, resizeMode: 'cover' },
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 25,
    width: width * 0.85,
    alignItems: 'center',
  },
  modalText: {
    fontSize: fontSizes.lg,
    fontFamily: fontFamily.ClashDisplayMedium,
    color: colors.black,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: colors.brown,
    height: height * 0.06,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.02,
    width: width * 0.75,
    borderRadius: 30,
  },
  modalButtonText: {
    color: colors.white,
    fontSize: fontSizes.sm2,
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
  actionSheetMain: {
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    overflow: 'hidden',
    height: height * 0.55,
    width: width,
    bottom: height * 0.07,
  },
  actionSheetThird: {
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    overflow: 'hidden',
    height: height * 0.65,
    width: width,
    bottom: height * 0.04,
  },
  actionSheetFourth: {
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    overflow: 'hidden',
    height: height * 0.65,
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
    top: height * 0.06,
  },
  btnArrived: {
    top: height * 0.06,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: width * 0.03,
  },
  countDown: {
    borderColor: colors.brown,
    borderWidth: 1.5,
    borderRadius: 15,
    backgroundColor: colors.white,
    height: height * 0.06,
    width: width * 0.25,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: height * 0.01,
  },
  otpModalContainer: {
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 25,
    width: width * 0.85,
    alignItems: 'center',
  },
  otpTitle: {
    fontSize: fontSizes.lg,
    fontFamily: fontFamily.ClashDisplayMedium,
    color: colors.black,
    textAlign: 'center',
    marginBottom: 10,
  },
  otpmodalButton: {
    backgroundColor: colors.brown,
    height: height * 0.06,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.02,
    width: width * 0.75,
    borderRadius: 30,
  },

  timerModalContainer: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    width: width * 0.85,
  },
  modalTitle: {
    fontSize: fontSizes.lg2,
    fontFamily: fontFamily.ClashDisplayMedium,
    marginBottom: 20,
    color: colors.black,
  },
  circularTimer: {
    borderWidth: 5,
    borderColor: colors.brown,
    borderRadius: 100,
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  timerText: {
    fontSize: fontSizes.lg,
    fontFamily: fontFamily.ClashDisplayMedium,
    color: colors.black,
  },
  arrivedImg: {
    width: width * 0.5,
    height: height * 0.1,
    resizeMode: 'contain',
    marginVertical: height * 0.02,
  },
});

export default RideArriving;


// import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { useEffect, useRef, useState } from 'react';
// import {
//   Image,
//   ImageBackground,
//   Pressable,
//   StyleSheet,
//   Text,
//   View,
//   Animated,
// } from 'react-native';
// import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
// import { fontFamily } from '../../assets/Fonts';
// import images from '../../assets/Images';
// import CustomButton from '../../components/CustomButton';
// import CustomTextInput from '../../components/CustomTextInput';
// import TopHeader from '../../components/Topheader';
// import { StackParamList } from '../../navigation/UserStack';
// import { height, width } from '../../utilities';
// import { colors } from '../../utilities/colors';
// import { fontSizes } from '../../utilities/fontsizes';
// import LinearGradient from 'react-native-linear-gradient';

// type Props = NativeStackScreenProps<StackParamList, 'homeUser'>;

// const RideArriving = () => {
//   const arrivingSheetRef = useRef<ActionSheetRef>(null);
//   const completedSheetRef = useRef<ActionSheetRef>(null);
//   const thirdSheetRef = useRef<ActionSheetRef>(null); // ✅ new ref for third sheet

//   const [timeLeft, setTimeLeft] = useState(295); // 4:55 -> 295 seconds
//   const fadeAnim = useRef(new Animated.Value(0)).current;

//   // Format countdown
//   const formatCountdown = (seconds: number) => {
//     const m = Math.floor(seconds / 60);
//     const s = seconds % 60;
//     return `${m}:${s.toString().padStart(2, '0')}`;
//   };

//   useEffect(() => {
//     arrivingSheetRef.current?.show();

//     const timer = setInterval(() => {
//       setTimeLeft(prev => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           arrivingSheetRef.current?.hide();

//           setTimeout(() => {
//             completedSheetRef.current?.show();
//             Animated.timing(fadeAnim, {
//               toValue: 1,
//               duration: 600,
//               useNativeDriver: true,
//             }).start();
//           }, 500);

//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   // ✅ Open third ActionSheet with fade animation
//   const handleArrivedPress = () => {
//     completedSheetRef.current?.hide();
//     setTimeout(() => {
//       thirdSheetRef.current?.show();
//       fadeAnim.setValue(0);
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 600,
//         useNativeDriver: true,
//       }).start();
//     }, 400);
//   };

//   return (
//     <ImageBackground source={images.Maptwo} style={styles.mapImg}>
//       <View style={{ flex: 1 }}>
//         <TopHeader isMenu={true} />

//         {/* First ActionSheet (Arriving) */}
//         <ActionSheet
//           ref={arrivingSheetRef}
//           containerStyle={styles.actionSheetMain}
//           closeOnTouchBackdrop={false}
//           defaultOverlayOpacity={0.9}
//           bounceOnOpen={true}
//         >
//           <ImageBackground 
//           source={images.ActionSheetBg} 
//           style={styles.ActinSheetBg}>

//             <View style={styles.gradientBackground}>
//               <View style={styles.ActionSheetContentMain}>
//                 <Text style={styles.selectText}>
//                   Arriving in {formatCountdown(timeLeft)} mins
//                 </Text>

//                 <View style={{ flexDirection: 'row', alignItems: 'center', gap: width * 0.03, top: height * 0.02 }}>
//                   <Image source={images.guide} />
//                   <View style={styles.locationMain}>
//                     <CustomTextInput
//                       placeholder="Groklyn Bridge Park"
//                       placeholderTextColor={colors.black}
//                       borderColor={colors.brown}
//                       borderRadius={10}
//                       inputWidth={width * 0.8}
//                       inputHeight={height * 0.05}
//                       leftIcon={<Image source={images.locationImage} style={styles.locationImg} />}
//                     />
//                     <CustomTextInput
//                       placeholder="Groklyn Bridge Park"
//                       placeholderTextColor={colors.black}
//                       borderColor={colors.gray}
//                       borderRadius={10}
//                       inputWidth={width * 0.8}
//                       inputHeight={height * 0.05}
//                       leftIcon={<Image source={images.locationImage} style={styles.locationImg} />}
//                     />
//                   </View>
//                 </View>

//                 <LinearGradient
//                   colors={['#FFFFFF', '#FFE9E9']}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 0, y: 1.1 }}
//                   style={styles.passengerContainer}
//                 >
//                   <View style={styles.textPassenger}>
//                     <Text style={styles.name}>Passenger Name:</Text>
//                     <Text style={styles.adam}>Adam James</Text>
//                   </View>

//                   <View style={styles.textPassenger}>
//                     <Text style={styles.distance}>Distance:</Text>
//                     <Text style={styles.miles}>10 Miles away</Text>
//                   </View>

//                   <View style={styles.textPassenger}>
//                     <Text style={styles.plate}>Number Plate:</Text>
//                     <Text style={styles.number}>123 756</Text>
//                   </View>

//                   <View style={styles.subContainer}>
//                     <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: width * 0.09, alignItems: 'center', height: height * 0.055 }}>
//                       <Text style={styles.fare}>Fare:</Text>
//                       <Text style={styles.fare}>$55.00</Text>
//                     </View>
//                   </View>
//                 </LinearGradient>

//                 <View style={styles.btn}>
//                   <CustomButton
//                     btnHeight={height * 0.07}
//                     btnWidth={width * 0.8}
//                     borderColor={colors.black}
//                     borderRadius={30}
//                     borderWidth={1}
//                     backgroundColor={colors.black}
//                     text="Cancel Ride"
//                     textColor={colors.white}
//                   />
//                 </View>
//               </View>
//             </View>
//           </ImageBackground>
//         </ActionSheet>

//         {/* Second ActionSheet (Arrived) */}
//         <ActionSheet
//           ref={completedSheetRef}
//           containerStyle={styles.actionSheetMain}
//           closeOnTouchBackdrop={true}
//           defaultOverlayOpacity={0.9}
//           bounceOnOpen={true}
//         >
//           <ImageBackground 
//           source={images.ActionSheetBg} 
//           style={styles.ActinSheetBg}>

//             <View style={styles.gradientBackground}>
//               <View style={styles.ActionSheetContentMain}>
//                 <Text style={styles.selectText}>You've Arrived!</Text>

//                 <View style={{ flexDirection: 'row', alignItems: 'center', gap: width * 0.03, top: height * 0.02 }}>
//                   <Image source={images.guide} />
//                   <View style={styles.locationMain}>
//                     <CustomTextInput
//                       placeholder="Groklyn Bridge Park"
//                       placeholderTextColor={colors.black}
//                       borderColor={colors.brown}
//                       borderRadius={10}
//                       inputWidth={width * 0.8}
//                       inputHeight={height * 0.05}
//                       leftIcon={<Image source={images.locationImage} style={styles.locationImg} />}
//                     />
//                     <CustomTextInput
//                       placeholder="Groklyn Bridge Park"
//                       placeholderTextColor={colors.black}
//                       borderColor={colors.gray}
//                       borderRadius={10}
//                       inputWidth={width * 0.8}
//                       inputHeight={height * 0.05}
//                       leftIcon={<Image source={images.locationImage} style={styles.locationImg} />}
//                     />
//                   </View>
//                 </View>

//                 <LinearGradient
//                   colors={['#FFFFFF', '#FFE9E9']}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 0, y: 1.1 }}
//                   style={styles.passengerContainer}
//                 >
//                   <View style={styles.textPassenger}>
//                     <Text style={styles.name}>Passenger Name:</Text>
//                     <Text style={styles.adam}>Adam James</Text>
//                   </View>

//                   <View style={styles.textPassenger}>
//                     <Text style={styles.distance}>Distance:</Text>
//                     <Text style={styles.miles}>10 Miles away</Text>
//                   </View>

//                   <View style={styles.textPassenger}>
//                     <Text style={styles.plate}>Number Plate:</Text>
//                     <Text style={styles.number}>123 756</Text>
//                   </View>

//                   <View style={styles.subContainer}>
//                     <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: width * 0.09, alignItems: 'center', height: height * 0.055 }}>
//                       <Text style={styles.fare}>Fare:</Text>
//                       <Text style={styles.fare}>$55.00</Text>
//                     </View>
//                   </View>
//                 </LinearGradient>

//                 <View style={styles.btnArrived}>
//                   <CustomButton
//                     btnHeight={height * 0.07}
//                     btnWidth={width * 0.45}
//                     borderColor={colors.black}
//                     borderRadius={50}
//                     borderWidth={1}
//                     backgroundColor={colors.black}
//                     text="Cancel Ride"
//                     textColor={colors.white}
//                   />
//                   <CustomButton
//                     btnHeight={height * 0.07}
//                     btnWidth={width * 0.45}
//                     borderColor={colors.black}
//                     borderRadius={50}
//                     borderWidth={1}
//                     backgroundColor={colors.brown}
//                     text="Arrived"
//                     textColor={colors.white}
//                     onPress={handleArrivedPress} // ✅ open 3rd sheet
//                   />
//                 </View>
//               </View>
//             </View>
//           </ImageBackground>
//         </ActionSheet>

//         {/* Third ActionSheet (Final Fade In) */}
//         <ActionSheet
//           ref={thirdSheetRef}
//           containerStyle={styles.actionSheetThird}
//           closeOnTouchBackdrop={true}
//           defaultOverlayOpacity={0.9}
//           bounceOnOpen={true}
//         >
//           <ImageBackground 
//           source={images.ActionSheetBg} 
//           style={styles.ActinSheetBg}
//           >

//             <View style={styles.gradientBackground}>
//               <View style={styles.ActionSheetContentMain}>
//                 <Text style={styles.selectText}>Waiting Time</Text>

//                 <View style={styles.countDown}>
//                   <Text style={styles.selectText}>4:55</Text>
//                 </View>

//                 <View style={{ flexDirection: 'row', alignItems: 'center', gap: width * 0.03, top: height * 0.02 }}>
//                   <Image source={images.guide} />
//                   <View style={styles.locationMain}>
//                     <CustomTextInput
//                       placeholder="Groklyn Bridge Park"
//                       placeholderTextColor={colors.black}
//                       borderColor={colors.brown}
//                       borderRadius={10}
//                       inputWidth={width * 0.8}
//                       inputHeight={height * 0.05}
//                       leftIcon={<Image source={images.locationImage} style={styles.locationImg} />}
//                     />
//                     <CustomTextInput
//                       placeholder="Groklyn Bridge Park"
//                       placeholderTextColor={colors.black}
//                       borderColor={colors.gray}
//                       borderRadius={10}
//                       inputWidth={width * 0.8}
//                       inputHeight={height * 0.05}
//                       leftIcon={<Image source={images.locationImage} style={styles.locationImg} />}
//                     />
//                   </View>
//                 </View>

//                 <LinearGradient
//                   colors={['#FFFFFF', '#FFE9E9']}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 0, y: 1.1 }}
//                   style={styles.passengerContainer}
//                 >
//                   <View style={styles.textPassenger}>
//                     <Text style={styles.name}>Passenger Name:</Text>
//                     <Text style={styles.adam}>Adam James</Text>
//                   </View>

//                   <View style={styles.textPassenger}>
//                     <Text style={styles.distance}>Distance:</Text>
//                     <Text style={styles.miles}>10 Miles away</Text>
//                   </View>

//                   <View style={styles.textPassenger}>
//                     <Text style={styles.plate}>Number Plate:</Text>
//                     <Text style={styles.number}>123 756</Text>
//                   </View>

//                   <View style={styles.subContainer}>
//                     <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: width * 0.09, alignItems: 'center', height: height * 0.055 }}>
//                       <Text style={styles.fare}>Fare:</Text>
//                       <Text style={styles.fare}>$55.00</Text>
//                     </View>
//                   </View>
//                 </LinearGradient>

//                 <View style={styles.btnArrived}>
//                   <CustomButton
//                     btnHeight={height * 0.07}
//                     btnWidth={width * 0.45}
//                     borderColor={colors.black}
//                     borderRadius={50}
//                     borderWidth={1}
//                     backgroundColor={colors.black}
//                     text="Cancel Ride"
//                     textColor={colors.white}
//                   />
//                   <CustomButton
//                     btnHeight={height * 0.07}
//                     btnWidth={width * 0.45}
//                     borderColor={colors.black}
//                     borderRadius={50}
//                     borderWidth={1}
//                     backgroundColor={colors.brown}
//                     text="Start Ride"
//                     textColor={colors.white}
//                     // onPress={handleArrivedPress} // ✅ open 3rd sheet
//                   />
//                 </View>
//               </View>
//             </View>
//             <Animated.View style=
//             {{ opacity: fadeAnim, 
//             alignItems: 'center', 
//             marginTop: 40 
//             }}>
//             </Animated.View>
//           </ImageBackground>
//         </ActionSheet>
//       </View>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   mapImg: { flex: 1, resizeMode: 'cover' },
//   passengerContainer: {
//     borderColor: colors.border,
//     borderWidth: 1,
//     borderRadius: 10,
//     backgroundColor: colors.peach,
//     alignSelf: 'center',
//     height: height * 0.21,
//     width: width * 0.85,
//     top: height * 0.04,
//   },
//   subContainer: {
//     borderColor: 'rgba(165, 42, 42, 0.17)',
//     borderWidth: 1,
//     borderRadius: 10,
//     height: height * 0.061,
//     width: width * 0.76,
//     alignSelf: 'center',
//     top: height * 0.03,
//     backgroundColor: colors.white,
//   },
//   locationMain: { 
//     gap: height * 0.01, 
//     paddingTop: height * 0.01 
//   },
//   locationImg: { 
//     width: width * 0.03, 
//     height: height * 0.03, 
//     resizeMode: 'contain' 
//   },
//   actionSheetMain: {
//     borderTopLeftRadius: 45,
//     borderTopRightRadius: 45,
//     overflow: 'hidden',
//     height: height * 0.55,
//     width: width,
//   },
//   actionSheetThird:{
//     borderTopLeftRadius: 45,
//     borderTopRightRadius: 45,
//     overflow: 'hidden',
//     height: height * 0.65,
//     width: width,
//   },
//   gradientBackground: { 
//     flex: 1, 
//     paddingHorizontal: 20, 
//     paddingVertical: 25, 
//     alignItems: 'center' 
//   },
//   ActinSheetBg: { 
//     flex: 1, 
//     position: 'absolute', 
//     resizeMode: 'contain', 
//     width: width * 1 
//   },
//   ActionSheetContentMain: { 
//     alignItems: 'center', 
//     padding: 20 
//   },
//   selectText: { 
//     fontFamily: fontFamily.ClashDisplayMedium, 
//     fontSize: fontSizes.lg2, 
//     color: colors.black 
//   },
//   textPassenger: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: width * 0.05,
//     alignItems: 'center',
//     alignSelf: 'center',
//     marginTop: height * 0.01,
//     width: width * 0.75,
//     top: height * 0.02,
//   },
//   name: { 
//     fontFamily: fontFamily.SfProDisplayMedium, 
//     fontSize: fontSizes.sm, 
//     color: colors.black, 
//     fontWeight: '700' 
//   },
//   adam: { 
//     fontFamily: fontFamily.SfProDisplayRegular, 
//     fontSize: fontSizes.sm, 
//     color: colors.black, 
//     fontWeight: '400' 
//   },
//   distance: { 
//     fontFamily: fontFamily.SfProDisplayMedium, 
//     fontSize: fontSizes.sm, 
//     color: colors.black, 
//     fontWeight: '700' 
//   },
//   miles: { 
//     fontFamily: fontFamily.SfProDisplayRegular, 
//     fontSize: fontSizes.sm, 
//     color: colors.black, 
//     fontWeight: '400' 
//   },
//   plate: { 
//     fontFamily: fontFamily.SfProDisplayMedium, 
//     fontSize: fontSizes.sm, 
//     color: colors.black, 
//     fontWeight: '700' 
//   },
//   number: { 
//     fontFamily: fontFamily.SfProDisplayRegular, 
//     fontSize: fontSizes.sm, 
//     color: colors.black, 
//     fontWeight: '900' 
//   },
//   fare: { 
//     fontFamily: fontFamily.SfProDisplayMedium, 
//     fontSize: fontSizes.md, 
//     color: colors.black, 
//     fontWeight: '700' 
//   },
//   btn: { 
//     top: height * 0.06 
//   },
//   btnArrived: { 
//     top: height * 0.06, 
//     flexDirection: 'row', 
//     justifyContent: 'space-between', 
//     gap: width * 0.03 
//   },
//   countDown:{
//     borderColor: colors.brown,
//     borderWidth: 1.5,
//     borderRadius: 15,
//     backgroundColor: colors.white,
//     height: height * 0.06,
//     width: width * 0.25,
//     alignItems:'center',
//     justifyContent:'center',
//     marginVertical: height * 0.01,
//   }
// });

// export default RideArriving;










import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useRef, useState } from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
  Animated,
  Modal,
} from 'react-native';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { fontFamily } from '../../assets/Fonts';
import images from '../../assets/Images';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import TopHeader from '../../components/Topheader';
import { StackParamList } from '../../navigation/UserStack';
import { height, width } from '../../utilities';
import { colors } from '../../utilities/colors';
import { fontSizes } from '../../utilities/fontsizes';
import LinearGradient from 'react-native-linear-gradient';

type Props = NativeStackScreenProps<StackParamList, 'homeUser'>;

const RideArriving = () => {
  const arrivingSheetRef = useRef<ActionSheetRef>(null);
  const completedSheetRef = useRef<ActionSheetRef>(null);
  const thirdSheetRef = useRef<ActionSheetRef>(null); // ✅ new ref for third sheet

  const [timeLeft, setTimeLeft] = useState(295); // 4:55 -> 295 seconds
  const [waitingTime, setWaitingTime] = useState(295); // 3rd sheet waiting countdown (4:55)
  const waitingTimerRef = useRef<number | null>(null); // store waiting timer id
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // ✅ Modal state
  const [modalVisible, setModalVisible] = useState(false);

  // Format countdown
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

  // Ensure waiting timer is cleared on unmount
  useEffect(() => {
    return () => {
      if (waitingTimerRef.current) {
        clearInterval(waitingTimerRef.current);
        waitingTimerRef.current = null;
      }
    };
  }, []);

  // ✅ Open third ActionSheet with fade animation
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

  return (
    <ImageBackground source={images.Maptwo} style={styles.mapImg}>
      <View style={{ flex: 1 }}>
        <TopHeader isMenu={true} />

        {/* First ActionSheet (Arriving) */}
        <ActionSheet
          ref={arrivingSheetRef}
          containerStyle={styles.actionSheetMain}
          closeOnTouchBackdrop={false}
          defaultOverlayOpacity={0.9}
          bounceOnOpen={true}
        >
          <ImageBackground 
          source={images.ActionSheetBg} 
          style={styles.ActinSheetBg}>

            <View style={styles.gradientBackground}>
              <View style={styles.ActionSheetContentMain}>
                <Text style={styles.selectText}>
                  Arriving in {formatCountdown(timeLeft)} mins
                </Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: width * 0.03, top: height * 0.02 }}>
                  <Image source={images.guide} />
                  <View style={styles.locationMain}>
                    <CustomTextInput
                      placeholder="Groklyn Bridge Park"
                      placeholderTextColor={colors.black}
                      borderColor={colors.brown}
                      borderRadius={10}
                      inputWidth={width * 0.8}
                      inputHeight={height * 0.05}
                      leftIcon={<Image source={images.locationImage} style={styles.locationImg} />}
                    />
                    <CustomTextInput
                      placeholder="Groklyn Bridge Park"
                      placeholderTextColor={colors.black}
                      borderColor={colors.gray}
                      borderRadius={10}
                      inputWidth={width * 0.8}
                      inputHeight={height * 0.05}
                      leftIcon={<Image source={images.locationImage} style={styles.locationImg} />}
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

                  <View style={styles.textPassenger}>
                    <Text style={styles.plate}>Number Plate:</Text>
                    <Text style={styles.number}>123 756</Text>
                  </View>

                  <View style={styles.subContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: width * 0.09, alignItems: 'center', height: height * 0.055 }}>
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

        {/* Second ActionSheet (Arrived) */}
        <ActionSheet
          ref={completedSheetRef}
          containerStyle={styles.actionSheetMain}
          closeOnTouchBackdrop={true}
          defaultOverlayOpacity={0.9}
          bounceOnOpen={true}
        >
          <ImageBackground 
          source={images.ActionSheetBg} 
          style={styles.ActinSheetBg}>

            <View style={styles.gradientBackground}>
              <View style={styles.ActionSheetContentMain}>
                <Text style={styles.selectText}>You've Arrived!</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: width * 0.03, top: height * 0.02 }}>
                  <Image source={images.guide} />
                  <View style={styles.locationMain}>
                    <CustomTextInput
                      placeholder="Groklyn Bridge Park"
                      placeholderTextColor={colors.black}
                      borderColor={colors.brown}
                      borderRadius={10}
                      inputWidth={width * 0.8}
                      inputHeight={height * 0.05}
                      leftIcon={<Image source={images.locationImage} style={styles.locationImg} />}
                    />
                    <CustomTextInput
                      placeholder="Groklyn Bridge Park"
                      placeholderTextColor={colors.black}
                      borderColor={colors.gray}
                      borderRadius={10}
                      inputWidth={width * 0.8}
                      inputHeight={height * 0.05}
                      leftIcon={<Image source={images.locationImage} style={styles.locationImg} />}
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

                  <View style={styles.textPassenger}>
                    <Text style={styles.plate}>Number Plate:</Text>
                    <Text style={styles.number}>123 756</Text>
                  </View>

                  <View style={styles.subContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: width * 0.09, alignItems: 'center', height: height * 0.055 }}>
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
                    onPress={handleArrivedPress} // ✅ open 3rd sheet
                  />
                </View>
              </View>
            </View>
          </ImageBackground>
        </ActionSheet>

        {/* Third ActionSheet (Final Fade In) */}
        <ActionSheet
          ref={thirdSheetRef}
          containerStyle={styles.actionSheetThird}
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
                <Text style={styles.selectText}>Waiting Time</Text>

                <View style={styles.countDown}>
                  <Text style={styles.selectText}>{formatCountdown(waitingTime)}</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: width * 0.03, top: height * 0.02 }}>
                  <Image source={images.guide} />
                  <View style={styles.locationMain}>
                    <CustomTextInput
                      placeholder="Groklyn Bridge Park"
                      placeholderTextColor={colors.black}
                      borderColor={colors.brown}
                      borderRadius={10}
                      inputWidth={width * 0.8}
                      inputHeight={height * 0.05}
                      leftIcon={<Image source={images.locationImage} style={styles.locationImg} />}
                    />
                    <CustomTextInput
                      placeholder="Groklyn Bridge Park"
                      placeholderTextColor={colors.black}
                      borderColor={colors.gray}
                      borderRadius={10}
                      inputWidth={width * 0.8}
                      inputHeight={height * 0.05}
                      leftIcon={<Image source={images.locationImage} style={styles.locationImg} />}
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

                  <View style={styles.textPassenger}>
                    <Text style={styles.plate}>Number Plate:</Text>
                    <Text style={styles.number}>123 756</Text>
                  </View>

                  <View style={styles.subContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: width * 0.09, alignItems: 'center', height: height * 0.055 }}>
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
            <Animated.View style=
            {{ opacity: fadeAnim, 
            alignItems: 'center', 
            marginTop: 40 
            }}>
            </Animated.View>
          </ImageBackground>
        </ActionSheet>


        {/* ✅ PAYMENT MODAL */}
        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalText}>Amount has been paid by User!</Text>
              <Pressable
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Confirm</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
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
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.25,
    borderRadius: 30,
  },
    modalButtonText: {
    color: colors.white,
    fontSize: fontSizes.sm2,
  },
  locationMain: { 
    gap: height * 0.01, 
    paddingTop: height * 0.01 
  },
  locationImg: { 
    width: width * 0.03, 
    height: height * 0.03, 
    resizeMode: 'contain' 
  },
  actionSheetMain: {
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    overflow: 'hidden',
    height: height * 0.55,
    width: width,
  },
  actionSheetThird:{
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    overflow: 'hidden',
    height: height * 0.65,
    width: width,
  },
  gradientBackground: { 
    flex: 1, 
    paddingHorizontal: 20, 
    paddingVertical: 25, 
    alignItems: 'center' 
  },
  ActinSheetBg: { 
    flex: 1, 
    position: 'absolute', 
    resizeMode: 'contain', 
    width: width * 1 
  },
  ActionSheetContentMain: { 
    alignItems: 'center', 
    padding: 20 
  },
  selectText: { 
    fontFamily: fontFamily.ClashDisplayMedium, 
    fontSize: fontSizes.lg2, 
    color: colors.black 
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
    fontWeight: '700' 
  },
  adam: { 
    fontFamily: fontFamily.SfProDisplayRegular, 
    fontSize: fontSizes.sm, 
    color: colors.black, 
    fontWeight: '400' 
  },
  distance: { 
    fontFamily: fontFamily.SfProDisplayMedium, 
    fontSize: fontSizes.sm, 
    color: colors.black, 
    fontWeight: '700' 
  },
  miles: { 
    fontFamily: fontFamily.SfProDisplayRegular, 
    fontSize: fontSizes.sm, 
    color: colors.black, 
    fontWeight: '400' 
  },
  plate: { 
    fontFamily: fontFamily.SfProDisplayMedium, 
    fontSize: fontSizes.sm, 
    color: colors.black, 
    fontWeight: '700' 
  },
  number: { 
    fontFamily: fontFamily.SfProDisplayRegular, 
    fontSize: fontSizes.sm, 
    color: colors.black, 
    fontWeight: '900' 
  },
  fare: { 
    fontFamily: fontFamily.SfProDisplayMedium, 
    fontSize: fontSizes.md, 
    color: colors.black, 
    fontWeight: '700' 
  },
  btn: { 
    top: height * 0.06 
  },
  btnArrived: { 
    top: height * 0.06, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    gap: width * 0.03 
  },
  countDown:{
    borderColor: colors.brown,
    borderWidth: 1.5,
    borderRadius: 15,
    backgroundColor: colors.white,
    height: height * 0.06,
    width: width * 0.25,
    alignItems:'center',
    justifyContent:'center',
    marginVertical: height * 0.01,
  }
});

export default RideArriving;

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useRef, useState } from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { fontFamily } from '../../assets/Fonts';
import images from '../../assets/Images';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import TopHeader from '../../components/Topheader';
import { StackParamList } from '../../navigation/AuthStack';
import { height, width } from '../../utilities';
import { colors } from '../../utilities/colors';
import { fontSizes } from '../../utilities/fontsizes';
import LinearGradient from 'react-native-linear-gradient';

type Props = NativeStackScreenProps<StackParamList, 'RideArriving'>;

const RideArrivingUser = () => {
  const arrivingSheetRef = useRef<ActionSheetRef>(null);
  const completedSheetRef = useRef<ActionSheetRef>(null);
  const thirdSheetRef = useRef<ActionSheetRef>(null);
  const fourthSheetRef = useRef<ActionSheetRef>(null);

  const [timeLeft, setTimeLeft] = useState(10);
  const [waitingTime, setWaitingTime] = useState(295);
  const waitingTimerRef = useRef<number | null>(null);

  // ✅ Show arriving sheet when component mounts
  useEffect(() => {
    arrivingSheetRef.current?.show();

    return () => {
      if (waitingTimerRef.current) {
        clearInterval(waitingTimerRef.current);
        waitingTimerRef.current = null;
      }
    };
  }, []);

  return (
    <ImageBackground source={images.Maptwo} style={styles.mapImg}>
      <View style={{ flex: 1 }}>
        <TopHeader isMenu={true} />

        <ActionSheet
          ref={arrivingSheetRef}
          containerStyle={styles.actionSheetMain}
          closeOnTouchBackdrop={false}
          defaultOverlayOpacity={0.9}
          bounceOnOpen={true}
        >
          <ImageBackground
            source={images.ActionSheetBg}
            style={styles.ActinSheetBg}
          >
            <View style={styles.gradientBackground}>
              <View style={styles.ActionSheetContentMain}>
                <Text style={styles.selectText}>Waiting for the OTP</Text>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: width * 0.03,
                    top: height * 0.02,
                  }}
                >
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
                  />
                </View>
              </View>
            </View>
          </ImageBackground>
        </ActionSheet>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  mapImg: { 
    flex: 1, 
    resizeMode: 'cover' 
  },
  passengerContainer: {
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: colors.peach,
    alignSelf: 'center',
    height: height * 0.21,
    width: width * 0.85,
    top: height * 0.05,
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
  locationImg: {
    width: width * 0.03,
    height: height * 0.03,
    resizeMode: 'contain',
  },
  actionSheetMain: {
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    overflow: 'hidden',
    height: height * 0.5,
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
    top: height * 0.1,
    flexDirection:'row',
    gap: width * 0.02,
  },
});

export default RideArrivingUser;

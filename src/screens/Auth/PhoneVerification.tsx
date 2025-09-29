import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { OtpInput } from 'react-native-otp-entry';
import { fontFamily } from '../../assets/Fonts';
import CustomButton from '../../components/CustomButton';
import TopHeader from '../../components/Topheader';
import type { StackParamList } from '../../navigation/AuthStack';
import { height, width } from '../../utilities';
import { colors } from '../../utilities/colors';
import { fontSizes } from '../../utilities/fontsizes';

type Props = NativeStackScreenProps<StackParamList, 'PhoneVerification'>;

const PhoneVerification: React.FC<Props> = ({ navigation }) => {
  const [otp, setOtp] = useState('');

  const isOtpValid = otp.length === 5;

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={{ flex: 1 }}>
        <TopHeader
          text="Phone Verification"
          isBack={true}
          navigation={navigation}
        />
        <View style={styles.otpContainer}>
          <Text style={styles.otpText}>Enter Your OTP</Text>
          <OtpInput
            numberOfDigits={5}
            focusColor={colors.brown}
            autoFocus={false}
            hideStick={true}
            blurOnFilled={true}
            disabled={false}
            type="numeric"
            secureTextEntry={false}
            focusStickBlinkingDuration={500}
            onFocus={() => console.log('Focused')}
            onBlur={() => console.log('Blurred')}
            onTextChange={setOtp}
            //   onFilled={handleSubmit}
            textInputProps={{
              accessibilityLabel: 'One-Time Password',
            }}
            theme={{
              containerStyle: styles.container,
              pinCodeContainerStyle: styles.pinCodeContainer,
              pinCodeTextStyle: styles.pinCodeText,
              focusedPinCodeContainerStyle: styles.activePinCodeContainer,
              filledPinCodeContainerStyle: styles.activePinCodeContainer,
            }}
          />
          <View style={styles.recieveMain}>
            <Text style={styles.recieveTextOne}>Didn't recieve the code?</Text>
            <TouchableOpacity activeOpacity={0.6}>
              <Text style={styles.recieveTextTwo}>Resend Again</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.btnMain}>
            <CustomButton
              btnHeight={height * 0.06}
              btnWidth={width * 0.81}
              text="Verify"
              backgroundColor={isOtpValid ? colors.brown : colors.black}
              textColor={isOtpValid ? colors.white : colors.white}
              borderRadius={30}
              disabled={!isOtpValid}
              onPress={() => navigation.navigate('SetPassword')}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  otpContainer: {
    marginTop: height * 0.09,
    gap: height * 0.014,
    alignItems: 'center',
    paddingHorizontal: width * 0.07,
  },
  otpText: {
    fontFamily: fontFamily.SfProDisplayRegular,
    fontSize: fontSizes.md,
    bottom: height * 0.01,
    color: colors.black,
  },
  container: {
    alignItems: 'center',
  },
  pinCodeContainer: {
    backgroundColor: colors.white,
    borderRadius: 30,
    padding: 10,
    marginBottom: height * 0.02,
    width: width * 0.13,
    height: width * 0.13,
    borderColor: colors.gray,
    borderWidth: 1,
  },
  activePinCodeContainer: {
    borderColor: colors.brown,
    backgroundColor: colors.lightBrown,
    borderWidth: 1,
    borderRadius: 7,
  },
  pinCodeText: {
    color: colors.black,
    fontSize: fontSizes.lg,
  },
  recieveMain: {
    flexDirection: 'row',
    gap: width * 0.013,
    marginTop: height * 0.02,
  },
  recieveTextOne: {
    fontFamily: fontFamily.SfProDisplayBold,
    fontSize: fontSizes.sm2,
    color: colors.black,
  },
  recieveTextTwo: {
    fontFamily: fontFamily.SfProDisplayBold,
    fontSize: fontSizes.sm2,
    textDecorationLine: 'underline',
    color: colors.black,
  },
  btnMain: {
    marginTop: height * 0.02,
    alignSelf: 'center',
  },
});

export default PhoneVerification;

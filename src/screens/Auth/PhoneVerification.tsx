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
import Toast from 'react-native-toast-message';
import { apiHelper } from '../../services';
import { useDispatch } from 'react-redux';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { setToken, setUser, setUserEmail } from '../../redux/slice/roleSlice';

type Props = NativeStackScreenProps<StackParamList, 'PhoneVerification'>;

const PhoneVerification = ({ route }) => {
  const navigation = useNavigation<NavigationProp<any>>()
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const Email = route.params.email
  console.log("Email from the params in the phone Verification screen!",Email)

  const isOtpValid = otp.length === 5;

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };


  const handleSubmitOtp = async (text: any) => {
    setLoading(true);
    const body = {
      email: Email,
      otp: otp,
    };

    const { response, error } = await apiHelper(
      'POST',
      'auth/verify-otp',
      {},
      body,
    );
    console.log('Response from Otp Api: ', response?.data.response.data);
    console.log('Body from Otp Api: ', body);
    setLoading(false);

    if (response?.data.response.data) {
      dispatch(setToken(response.data.response.data.access_token));
      console.log(
        'Token to set in redux from OTP:',
        response.data.response.data.access_token,
      );
      dispatch(setUser(response.data.response.data.user));
      dispatch(setUserEmail(response.data.response.data.user.email));
      console.log(
        'Email from response: ',
        response.data.response.data.user.email,
      );
      navigation.navigate('SetPassword');

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: response.data.message,
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'error',
        text2: 'invalidCode',
      });
    }
    setOtp('');
  };

  const handelResendOtp = async () => {
    const body = {
      email: Email,
    };
    console.log('Email in the resend Otp Screen', Email);
    const { response, error } = await apiHelper(
      'POST',
      'auth/resend-otp',
      {},
      body,
    );
    if (response) {
      console.log('Response from the resend Otp Email', response.data.data);
      Toast.show({
        type: 'success',
        text1: 'success',
        text2: response.data.message,
      });
    } else {
      console.log('Error:', error);
      Toast.show({
        type: 'error',
        text1: 'error',
        text2: 'errorCode',
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={{ flex: 1 }}>
        <TopHeader
          text="Phone Verification"
          isBack={true}
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
            <TouchableOpacity activeOpacity={0.6} onPress={handelResendOtp}>
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
              // onPress={() => navigation.navigate('SetPassword')}
              onPress={handleSubmitOtp}
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

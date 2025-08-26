import { StyleSheet, Text, View } from 'react-native';
import { OtpInput } from 'react-native-otp-entry';
import { fontFamily } from '../../assets/Fonts';
import CustomButton from '../../components/CustomButton';
import TopHeader from '../../components/Topheader';
import { height, width } from '../../utilities';
import { colors } from '../../utilities/colors';
import { fontSizes } from '../../utilities/fontsizes';

const OtpVerification = () => {
  return (
    <View style={{ flex: 1 }}>
      <TopHeader text="Otp Verificationnn" isBack={true} />
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
          onTextChange={text => console.log(text)}
          //   onFilled={handleSubmit}
          textInputProps={{
            accessibilityLabel: 'One-Time Password',
          }}
          theme={{
            containerStyle: styles.container,
            pinCodeContainerStyle: styles.pinCodeContainer,
            pinCodeTextStyle: styles.pinCodeText,
            focusedPinCodeContainerStyle: styles.activePinCodeContainer,
          }}
        />
        <View style={styles.recieveMain}>
          <Text style={styles.recieveTextOne}>Didn't recieve the code?</Text>
          <Text style={styles.recieveTextTwo}>Resend Again</Text>
        </View>
        <View style={styles.btnMain}>
          <CustomButton
            btnHeight={height * 0.06}
            btnWidth={width * 0.81}
            text="Verify"
            backgroundColor={colors.gray}
            textColor={colors.black}
            borderRadius={30}
          />
        </View>
      </View>
    </View>
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
  },
  container: {
    alignItems: 'center',
  },
  pinCodeContainer: {
    backgroundColor: colors.lightBrown,
    borderRadius: 30,
    padding: 10,
    marginBottom: height * 0.02,
    width: width * 0.13,
    height: width * 0.13,
    borderColor: colors.brown,
    borderWidth: 1,
  },
  activePinCodeContainer: {
    borderColor: colors.brown,
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
  },
  recieveTextTwo: {
    fontFamily: fontFamily.SfProDisplayBold,
    fontSize: fontSizes.sm2,
    textDecorationLine: 'underline',
  },
  btnMain: {
    marginTop: height * 0.02,
    alignSelf: 'center',
  },
});

export default OtpVerification;

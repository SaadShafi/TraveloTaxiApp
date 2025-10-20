import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  Image,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { fontFamily } from '../../assets/Fonts';
import images from '../../assets/Images';
import CustomButton from '../../components/CustomButton';
import CustomSelect from '../../components/CustomSelect';
import CustomTextInput from '../../components/CustomTextInput';
import TopHeader from '../../components/Topheader';
import type { StackParamList } from '../../navigation/AuthStack';
import { height, width } from '../../utilities';
import { colors } from '../../utilities/colors';
import { fontSizes } from '../../utilities/fontsizes';
import Toast from 'react-native-toast-message';
import { apiHelper } from '../../services';
import { useSelector } from 'react-redux';

type Props = NativeStackScreenProps<StackParamList, 'SignUpEmail'>;

const SignUpEmail: React.FC<Props> = ({ navigation }) => {
  const role = useSelector((state: any) => state.role.selectedRole);
  const [name, setName] = useState('');
  const [isNameFocused, setIsNameFocused] = useState(false);

  const [phone, setPhone] = useState('');
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);

  const [email, setEmail] = useState('');
  const [isEmailFocused, setIsEmailFocused] = useState(false);

  const [gender, setGender] = useState('');
  const [agree, setAgree] = useState(false);

  const [password, setPassword] = useState('');
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const [loading, setLoading] = useState(false);
  const genderOptions = [
    { name: 'Select Gender', id: '' },
    { name: 'male', id: 'male' },
    { name: 'female', id: 'female' },
  ];

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const isNameValid = name.trim().length >= 4;
  const isPhoneValid = phone.trim().length > 7;
  const isEmailValid = email.includes('@');
  const isGenderValid = gender !== '';
  const isPasswordValid = password.trim().length >= 6;
  const isFormValid =
    isNameValid && isPhoneValid && isEmailValid && isGenderValid && isPasswordValid && agree;


  const handleSubmit = async () => {
    setLoading(true);

    try {
      const body = {
        email: email,
        gender: gender,
        password: password,
        role: role,
      };

      const { response, error } = await apiHelper(
        "POST",
        "auth/signup",
        {},
        body
      );
      console.log("Body sent to signUp Api: ", body);
      console.log("Response from signUp Api: ", response);
      if (response) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: response.data.message,
        });
        navigation.navigate("OtpVerification")
      } else {
        Toast.show({
          type: "error",
          text1: "Login Failed",
          text2: "Something went wrong",
        });
      }
    } catch (err) {
      console.error("Unexpected Error", err);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "An unexpected error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <TopHeader isBack={true} />
        <View style={styles.headerMain}>
          <Text style={styles.signup}>Sign Up With Your</Text>
          <Text style={styles.signup}>Email Or Phone Number</Text>
        </View>
        <View style={styles.inputMain}>
          <CustomTextInput
            placeholder="*Enter Your Name."
            placeholderTextColor={colors.black}
            borderColor={colors.brown}
            borderRadius={30}
            inputWidth={width * 0.85}
            inputHeight={height * 0.06}
            value={name}
            onChangeText={setName}
            backgroundColor={colors.gray}
          />
          <View
            style={[
              styles.phoneRow,
              {
                borderColor:
                  isPhoneFocused || phone ? colors.brown : colors.gray,
                backgroundColor:
                  isPhoneFocused || phone ? colors.lightBrown : colors.gray,
              },
            ]}
          >
            <Image source={images.UK} style={styles.flag} />
            <Image source={images.line} style={styles.lineImg} />
            <TextInput
              style={styles.phoneInput}
              placeholder="+1"
              placeholderTextColor={colors.black}
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              onFocus={() => setIsPhoneFocused(true)}
              onBlur={() => setIsPhoneFocused(false)}
            />
          </View>

          <CustomTextInput
            placeholder="*Enter Your Email."
            placeholderTextColor={colors.black}
            borderColor={isEmailFocused || email ? colors.brown : colors.gray}
            borderRadius={30}
            inputWidth={width * 0.85}
            inputHeight={height * 0.06}
            value={email}
            onChangeText={setEmail}
            backgroundColor={colors.gray}
          />
          <CustomTextInput
            placeholder="*Enter your Password"
            placeholderTextColor={colors.black}
            borderColor={isPasswordFocused || password ? colors.brown : colors.gray}
            borderRadius={30}
            inputWidth={width * 0.85}
            inputHeight={height * 0.06}
            value={password}
            onChangeText={setPassword}
            isPassword={true}
          />
          <CustomSelect
            inputWidth={width * 0.85}
            inputHeight={height * 0.06}
            selectElements={genderOptions}
            borderColor={gender ? colors.brown : colors.gray}
            borderWidth={1}
            inputColor={gender ? colors.lightBrown : colors.gray}
            borderRadius={30}
            onChangeText={value => setGender(value)}
            setSelectedElement={setGender}
            defaultValue=""
          />
          <View style={styles.checkBoxMain}>
            <View style={styles.checkboxContainer}>
              <BouncyCheckbox
                size={24}
                fillColor={colors.brown}
                unfillColor={colors.white}
                isChecked={agree}
                disableBuiltInState
                iconStyle={{
                  borderColor: colors.brown,
                  borderWidth: 2,
                  borderRadius: 8,
                }}
                innerIconStyle={{
                  borderRadius: 8,
                }}
                onPress={() => setAgree(!agree)}
              />
            </View>
            <View style={styles.checkBoxTextMain}>
              <View style={{ flexDirection: 'row', gap: height * 0.01 }}>
                <Text style={styles.signIn}>
                  By signing up, you agree to the
                </Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate('TermsCondition')}
                >
                  <Text style={styles.text}>Terms & Conditions</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', gap: height * 0.01 }}>
                <Text style={styles.signIn}>and</Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate('PrivacyPolicy')}
                >
                  <Text style={styles.text}>Privacy Policy</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.btnMain}>
            <CustomButton
              btnHeight={height * 0.06}
              btnWidth={width * 0.85}
              text="Create An Account"
              backgroundColor={isFormValid ? colors.brown : colors.gray}
              textColor={isFormValid ? colors.white : colors.black}
              borderRadius={30}
              disabled={!isFormValid}
              // onPress={() => navigation.navigate('OtpVerification')}
              onPress={handleSubmit}
            />
          </View>
          <View>
            <View style={{ paddingVertical: height * 0.03 }}>
              <Image source={images.orLine} style={styles.orLine} />
            </View>

            <View style={{ gap: height * 0.01 }}>
              <TouchableOpacity style={styles.belowBtn} activeOpacity={0.7}>
                <Image source={images.googleIcon} style={styles.googleIcon} />
                <Text style={styles.belowSignInText}>Sign Up with Gmail</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.belowBtn} activeOpacity={0.7}>
                <Image source={images.appleIcon} style={styles.googleIcon} />
                <Text style={styles.belowSignInText}>Sign Up with Apple</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.bottomMain}>
            <Text style={styles.bottomTextOne}>Already have an Account?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignIn')}
              activeOpacity={0.7}
            >
              <Text style={styles.bottomTextTwo}>SignIn</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  headerMain: {
    alignItems: 'center',
    bottom: height * 0.15,
  },
  container: {
    flex: 1,
  },
  signup: {
    color: colors.black,
    fontFamily: fontFamily.ClashDisplayMedium,
    fontSize: fontSizes.lg2,
    top: height * 0.1,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 12,
    width: width * 0.85,
    height: height * 0.06,
  },
  flag: {
    width: width * 0.05,
    height: height * 0.015,
    marginRight: 8,
    borderRadius: 2,
  },
  code: {
    fontSize: fontSizes.xm2,
    color: colors.black,
    marginRight: 6,
  },
  phoneInput: {
    flex: 1,
    fontSize: fontSizes.xm2,
    color: colors.black,
  },
  checkBoxMain: {
    flexDirection: 'row',
    width: width * 0.85,
    right: width * 0.02,
  },
  checkboxContainer: {
    flexDirection: 'row',
  },
  checkBoxTextMain: {
    // flexDirection: 'row',
    gap: width * 0.01,
  },
  checkboxText: {
    fontSize: fontSizes.xm2,
    color: colors.black,
    textDecorationLine: 'none',
  },
  linkText: {
    fontFamily: fontFamily.ClashDisplayMedium,
  },
  btnMain: {
    marginTop: height * 0.038,
    alignSelf: 'center',
  },
  orLine: {
    width: width * 0.85,
    resizeMode: 'contain',
  },
  belowBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gray,
    borderRadius: 30,
    height: height * 0.06,
    gap: width * 0.02,
  },
  googleIcon: {
    width: width * 0.09,
    resizeMode: 'contain',
  },
  belowSignInText: {
    fontFamily: fontFamily.SfProDisplayRegular,
    fontSize: fontSizes.sm2,
    color: colors.brown,
  },
  bottomMain: {
    flexDirection: 'row',
    top: height * 0.06,
    gap: height * 0.01,
  },
  bottomTextOne: {
    fontFamily: fontFamily.SfProDisplayRegular,
    fontSize: fontSizes.sm,
    color: colors.black,
  },
  bottomTextTwo: {
    fontFamily: fontFamily.SfProDisplayBold,
    fontSize: fontSizes.sm,
    color: colors.black,
    textDecorationLine: 'underline',
  },
  inputMain: {
    alignItems: 'center',
    gap: height * 0.02,
  },
  lineImg: {
    height: height * 0.024,
    width: width * 0.01,
    resizeMode: 'contain',
  },
  text: {
    fontFamily: fontFamily.ClshDisplayMedium,
    color: colors.black,
    textDecorationLine: 'underline',
    fontSize: fontSizes.xsm,
  },
  signIn: {
    fontFamily: fontFamily.ClshDisplayRegular,
    color: colors.darkGray,
  },
});

export default SignUpEmail;

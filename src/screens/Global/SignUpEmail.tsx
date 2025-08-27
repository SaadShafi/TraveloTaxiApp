
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";  // ✅ Import
import { colors } from '../../utilities/colors';
import { fontFamily } from '../../assets/Fonts';
import { fontSizes } from '../../utilities/fontsizes';
import images from '../../assets/Images';
import { width, height } from '../../utilities';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import CustomSelect from '../../components/CustomSelect';

const SignUpEmail = () => {
  const [gender, setGender] = useState<string>("");
  const [agree, setAgree] = useState(false); // ✅ checkbox state

  const genderOptions = [
    { name: "Select Gender", id: "" },
    { name: "Male", id: "male" },
    { name: "Female", id: "female" },
    { name: "Other", id: "other" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.signup}>Sign Up With Your</Text>
      <Text style={styles.signup}>Email Or Phone Number</Text>

      {/* Name Field */}
      <View style={styles.emailContainer}>
        <CustomTextInput
          placeholder="*Enter Your Name."
          placeholderTextColor={colors.black}
          borderColor={colors.brown}
          borderRadius={30}
          inputWidth={width * 0.85}
          inputHeight={height * 0.06}
        />
      </View>

      {/* Phone Field */}
      <View style={styles.phoneContainer}>
        <View style={styles.phoneRow}>
          <Image source={images.UK} style={styles.flag} />
          <Text style={styles.code}>+1</Text>
          <TextInput
            style={styles.phoneInput}
            placeholder="Enter phone number"
            placeholderTextColor={colors.black}
            keyboardType="phone-pad"
          />
        </View>
      </View>

      {/* Email Field */}
      <View style={{ top: height * 0.17 }}>
        <CustomTextInput
          placeholder="*Enter Your Email."
          placeholderTextColor={colors.black}
          borderColor={colors.brown}
          borderRadius={30}
          inputWidth={width * 0.85}
          inputHeight={height * 0.06}
        />
      </View>

      {/* Gender Dropdown */}
      <View style={styles.genderContainer}>
        <CustomSelect
          inputWidth={width * 0.85}
          inputHeight={height * 0.06}
          selectElements={genderOptions}
          borderColor={colors.brown}
          borderWidth={1}
          inputColor={colors.white}
          borderRadius={30}
          onChangeText={(value) => setGender(value)}
          setSelectedElement={setGender}
          defaultValue=""
        />
      </View>

      {/* ✅ Checkbox with Terms */}
            <View style={styles.checkboxContainer}>
        <BouncyCheckbox
          size={24}
          fillColor={colors.brown}
          unfillColor="#FFFFFF"
          isChecked={agree}
          disableBuiltInState
          iconStyle={{
            borderColor: colors.brown,
            borderWidth: 2,
            borderRadius: 8, // Rounded square like your image
          }}
          innerIconStyle={{
            borderRadius: 8,
          }}
          text="By signing up, you agree to the Terms & Conditions and Privacy Policy"
          textStyle={styles.checkboxText} // ✅ styles applied here
          onPress={() => setAgree(!agree)}
        />
      </View>
      <View style={styles.btnMain}>
         <CustomButton
          btnHeight={height * 0.06}
          btnWidth={width * 0.85}
          text="Create An Account"
          backgroundColor={colors.gray}
          textColor={colors.black}
          borderRadius={30}
        />
      </View>
      <View>
        <View style={{ paddingVertical: height * 0.03 }}>
          <Image source={images.orLine} style={styles.orLine} />
        </View>

       <View style={{gap:height * 0.01}}>
         <TouchableOpacity style={styles.belowBtn}>
          <Image source={images.googleIcon} style={styles.googleIcon} />
          <Text style={styles.belowSignInText}>Sign Up with Gmail</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.belowBtn}>
          <Image source={images.appleIcon} style={styles.googleIcon} />
          <Text style={styles.belowSignInText}>Sign Up with Apple</Text>
        </TouchableOpacity>
       </View>

      </View>
      <View style={styles.bottomMain}>
        <Text style={styles.bottomTextOne}>Already have an Account?</Text>
        <Text style={styles.bottomTextTwo}>SignIn</Text>
      </View>
      </View>


  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  signup: {
    color: colors.black,
    fontFamily: fontFamily.ClashDisplayMedium,
    fontSize: fontSizes.lg2,
    top: height * 0.1,
  },
  emailContainer: {
    top: height * 0.13,
    fontFamily: fontFamily.ClashDisplayRegular,
  },
  phoneContainer: {
    top: height * 0.15,
  },
  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: colors.brown,
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
  genderContainer: {
    top: height * 0.19,
  },
 checkboxContainer: {
  flexDirection: "row",
  alignItems: "center",
  width: width * 0.82,
  marginTop: height * 0.21,
},
checkboxText: {
  fontSize: fontSizes.xm2,
  color: colors.black,
  // fontFamily: fontFamily.ClashDisplayRegular,
  textDecorationLine: "none", // removes underline from BouncyCheckbox
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
  },
   bottomMain: {
    flexDirection: 'row',
    top: height * 0.06,
  },
  bottomTextOne: {
    fontFamily: fontFamily.SfProDisplayRegular,
    fontSize: fontSizes.sm,
  },
  bottomTextTwo: {
    fontFamily: fontFamily.SfProDisplayBold,
    fontSize: fontSizes.sm,
    color: colors.black,
  },
});

export default SignUpEmail;

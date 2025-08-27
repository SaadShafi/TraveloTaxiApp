import { useState } from 'react';
import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { fontFamily } from '../../assets/Fonts';
import images from '../../assets/Images';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import { height, width } from '../../utilities';
import { colors } from '../../utilities/colors';
import { fontSizes } from '../../utilities/fontsizes';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const isFormValid = email.includes('@') && password.length > 5;

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <View style={styles.imgMain}>
          <Image source={images.logo} style={styles.logo} />
          <Text style={styles.signInText}>Sign In Using Email or Phone</Text>
        </View>
        <View style={styles.inputMain}>
          <CustomTextInput
            placeholder="*Enter your Email/Phone"
            placeholderTextColor={colors.black}
            borderColor={colors.gray}
            borderRadius={30}
            inputWidth={width * 0.85}
            inputHeight={height * 0.06}
            value={email}
            onChangeText={setEmail}
          />
          <CustomTextInput
            placeholder="*Enter your Password"
            placeholderTextColor={colors.black}
            borderColor={colors.gray}
            borderRadius={30}
            inputWidth={width * 0.85}
            inputHeight={height * 0.06}
            value={password}
            onChangeText={setPassword}
            isPassword={true}
          />
          <CustomButton
            btnHeight={height * 0.06}
            btnWidth={width * 0.85}
            text="SignIn"
            backgroundColor={isFormValid ? colors.brown : colors.black}
            textColor={colors.white}
            borderRadius={30}
            disabled={!isFormValid}
          />
          <View style={{ paddingVertical: height * 0.03 }}>
            <Image source={images.orLine} style={styles.orLine} />
          </View>
          <TouchableOpacity style={styles.belowBtn}>
            <Image source={images.googleIcon} style={styles.googleIcon} />
            <Text style={styles.belowSignInText}>Sign Up with Gmail</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.belowBtn}>
            <Image source={images.appleIcon} style={styles.googleIcon} />
            <Text style={styles.belowSignInText}>Sign Up with Apple</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomMain}>
          <Text style={styles.bottomTextOne}>Already have an Account?</Text>
          <Text style={styles.bottomTextTwo}>SignIn</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  imgMain: {
    alignItems: 'center',
  },
  logo: {
    width: width * 0.4,
    height: height * 0.3,
    resizeMode: 'contain',
  },
  signInText: {
    fontFamily: fontFamily.ClashDisplayMedium,
    fontSize: fontSizes.lg,
  },
  inputMain: {
    gap: height * 0.01,
    marginTop: height * 0.02,
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
    gap: width * 0.01,
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
    top: height * 0.16,
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

export default SignIn;

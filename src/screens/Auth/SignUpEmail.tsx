import { NavigationProp, useNavigation } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Keyboard,
  NativeModules,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { fontFamily } from '../../assets/Fonts';
import images from '../../assets/Images';
import CustomButton from '../../components/CustomButton';
import CustomSelect from '../../components/CustomSelect';
import CustomTextInput from '../../components/CustomTextInput';
import TopHeader from '../../components/Topheader';
import type { StackParamList } from '../../navigation/AuthStack';
import { setCountrySelect, setUser, setUserEmail } from '../../redux/slice/roleSlice';
import { RootState } from '../../redux/store';
import { apiHelper } from '../../services';
import { height, width } from '../../utilities';
import { colors } from '../../utilities/colors';
import {
  countries,
  defaultCountry,
  type Country,
} from '../../utilities/countries';
import { fontSizes } from '../../utilities/fontsizes';
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth"
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '724928842281-u3ihlb6eb4i9oo50k3rpnsb5lqjkh3dm.apps.googleusercontent.com', // ✅ CORRECT ONE
  offlineAccess: true,
});


const SignUpEmail = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const role = useSelector((state: any) => state.role.selectedRole);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [isNameFocused, setIsNameFocused] = useState(false);

  const [phone, setPhone] = useState('');
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);

  const [email, setEmail] = useState('');
  const [isEmailFocused, setIsEmailFocused] = useState(false);

  const [gender, setGender] = useState('');
  const [agree, setAgree] = useState(false);

  const [selectedCountry, setSelectedCountry] =
    useState<Country>(defaultCountry);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const reduxSelectedCountry = useSelector(
    (state: RootState) => state.role.countrySelect || defaultCountry,
  );
  const [password, setPassword] = useState('');
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [userMock, setUserMock] = useState<FirebaseAuthTypes.User | null>(null)

  const genderOptions = [
    { name: 'Select Gender', id: '' },
    { name: 'male', id: 'male' },
    { name: 'female', id: 'female' },
  ];

  const dismissKeyboard = () => {
    Keyboard.dismiss();
    setShowCountryDropdown(false);
  };

  const handleCountrySelect = (country: Country) => {
    // Dispatch action to update Redux store
    dispatch(setCountrySelect(country));
    setShowCountryDropdown(false);
  };

  const PhoneInputWithCountry = useMemo(
    () => (
      <View style={styles.phoneInputContainer}>
        <View
          style={[
            styles.phoneRow,
            {
              borderColor: isPhoneFocused || phone ? colors.brown : colors.gray,
              backgroundColor:
                isPhoneFocused || phone ? colors.lightBrown : colors.gray,
            },
          ]}
        >
          <Image source={reduxSelectedCountry.flag} style={styles.flag} />
          <TouchableOpacity
            style={styles.countrySelector}
            onPress={() => setShowCountryDropdown(!showCountryDropdown)}
          >
            <Image source={images.arrowDropDown} style={styles.icon} />
          </TouchableOpacity>
          <Image source={images.line} style={styles.lineImg} />
          <Text style={styles.countryCodeText}>
            {reduxSelectedCountry.dialCode}
          </Text>
          <TextInput
            style={styles.phoneInput}
            placeholder="Phone Number"
            placeholderTextColor={colors.black}
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
            onFocus={() => {
              setIsPhoneFocused(true);
              setShowCountryDropdown(false);
            }}
            onBlur={() => setIsPhoneFocused(false)}
          />
        </View>
        {showCountryDropdown && (
          <View style={styles.countryDropdown}>
            {countries.map(country => (
              <TouchableOpacity
                key={country.code}
                style={styles.countryOption}
                onPress={() => handleCountrySelect(country)}
              >
                <Image source={country.flag} style={styles.dropdownFlag} />
                <Text style={styles.countryText}>{country.name}</Text>
                <Text style={styles.dialCodeText}>{country.dialCode}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    ),
    [phone, isPhoneFocused, reduxSelectedCountry, showCountryDropdown],
  );

  const isNameValid = name.trim().length >= 4;
  const isPhoneValid = phone.trim().length > 7;
  const isEmailValid = email.includes('@');
  const isGenderValid = gender !== '';
  const isPasswordValid = password.trim().length >= 6;
  const isFormValid =
    isNameValid &&
    isPhoneValid &&
    isEmailValid &&
    isGenderValid &&
    isPasswordValid &&
    agree;

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const body = {
        full_name: name,
        email: email,
        gender: gender,
        password: password,
        phone_number: phone,
        role: role,
      };

      const { response, error } = await apiHelper(
        'POST',
        'auth/signup',
        {},
        body,
      );
      console.log('Body sent to signUp Api: ', body);
      console.log('Response from signUp Api: ', response?.data);
      if (response) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: response.data.message,
        });
        navigation.navigate('OtpVerification', {
          email: email,
        });
        // setEmail(email)
        setUserEmail(email)
      } else {
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: 'Something went wrong',
        });
      }
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'An unexpected error occurred',
      });
    } finally {
      setLoading(false);
    }
  };

  const GoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      console.log('=== MINIMAL GOOGLE SIGN-IN ATTEMPT ===');

      GoogleSignin.configure({
        webClientId: '724928842281-u3ihlb6eb4i9oo50k3rpnsb5lqjkh3dm.apps.googleusercontent.com', // ✅ CORRECT WEB CLIENT ID
        offlineAccess: true,
      });

      console.log('Checking Play Services...');
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      console.log('Play Services OK');

      console.log('Attempting sign in...');
      const userInfo = await GoogleSignin.signIn();
      console.log('Sign in response received:', userInfo);

      // ✅ Handle both structures (old/new versions of react-native-google-signin)
      const idToken = userInfo.idToken || userInfo.data?.idToken;

      if (idToken) {
        console.log('ID Token received, proceeding to Firebase...');

        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        const userCredential = await auth().signInWithCredential(googleCredential);
        const user = userCredential.user;
          // Pre-fill name and email fields
        if (user.displayName) setName(user.displayName);
        if (user.email) setEmail(user.email);

        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          phoneNumber: user.phoneNumber,
          role: role,
        };

        dispatch(setUser(userData));

        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Google Sign-In successful!',
        });

        // navigation.navigate('CreateProfile');
      } else {
        console.log('No ID token found in userInfo:', userInfo);
        throw new Error('Authentication failed - missing ID token');
      }

    } catch (error: any) {
      console.log('=== MINIMAL SIGN-IN ERROR ===');
      console.log('Error code:', error.code);
      console.log('Error message:', error.message);
      console.log('Full error:', JSON.stringify(error, null, 2));

      let errorMessage = 'Sign-in failed';

      if (error.code === 'DEVELOPER_ERROR') {
        errorMessage = 'App configuration error. Check:\n• SHA-1 fingerprint\n• Package name\n• OAuth client configuration';
      } else if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        errorMessage = 'Sign-in cancelled';
      } else if (error.code === statusCodes.IN_PROGRESS) {
        errorMessage = 'Sign-in already in progress';
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        errorMessage = 'Google Play Services not available';
      } else {
        errorMessage = error.message || 'Unknown error occurred';
      }

      Toast.show({
        type: 'error',
        text1: 'Google Sign-In Failed',
        text2: errorMessage,
      });
    } finally {
      setGoogleLoading(false);
    }
  };

  const debugGoogleConfiguration = async () => {
    try {
      console.log('=== GOOGLE SIGN-IN DEBUG INFO ===');

      // Check if configured
      console.log('GoogleSignin configured status:', GoogleSignin.configured);

      // Check if signed in
      const isSignedIn = await GoogleSignin.isSignedIn();
      console.log('Is currently signed in:', isSignedIn);

      // Try to get current user
      const currentUser = await GoogleSignin.getCurrentUser();
      console.log('Current user info:', currentUser);

      // Check Play Services
      const playServicesAvailable = await GoogleSignin.hasPlayServices();
      console.log('Play Services available:', playServicesAvailable);

      console.log('=== DEBUG COMPLETE ===');

    } catch (error) {
      console.log('Debug error:', error);
    }
  };

  useEffect(() => {
    debugGoogleConfiguration();
  }, []);

  return (
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
        <CustomTextInput
          placeholder="*Enter Your Password"
          placeholderTextColor={colors.black}
          borderColor={colors.brown}
          borderRadius={30}
          inputWidth={width * 0.85}
          inputHeight={height * 0.06}
          value={password}
          onChangeText={setPassword}
          backgroundColor={colors.gray}
          isPassword={true}
        />
        {PhoneInputWithCountry}

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
              <Text style={styles.signIn}>By signing up, you agree to the</Text>
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
            onPress={handleSubmit}
            // onPress={() => navigation.navigate('OtpVerification')}
          />
        </View>
        <View>
          <View
            style={{
              paddingVertical: height * 0.017,
              marginTop: -height * 0.01,
            }}
          >
            <Image source={images.orLine} style={styles.orLine} />
          </View>

          <View style={{ gap: height * 0.01 }}>
            <TouchableOpacity
              style={styles.belowBtn}
              activeOpacity={0.7}
              onPress={GoogleSignIn}
              disabled={googleLoading}
            >
              {googleLoading ? (
                <ActivityIndicator size="small" color={colors.brown} />
              ) : (
                <>
                  <Image source={images.googleIcon} style={styles.googleIcon} />
                  <Text style={styles.belowSignInText}>Sign Up with Google</Text>
                </>
              )}
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
      {loading && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size="large" color={colors.brown} />
        </View>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  phoneInputContainer: {
    width: width * 0.85,
    position: 'relative',
    zIndex: 999,
  },
  countrySelector: {
    padding: 8,
  },
  flag: {
    width: width * 0.06,
    height: height * 0.03,
    borderRadius: 20,
  },
  countryDropdown: {
    position: 'absolute',
    top: height * 0.07,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    zIndex: 9999,
    elevation: 10,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    maxHeight: height * 0.2,
  },
  countryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  dropdownFlag: {
    width: width * 0.05,
    height: height * 0.025,
    marginRight: 10,
    borderRadius: 2,
  },
  countryText: {
    flex: 1,
    fontSize: fontSizes.sm,
    color: colors.black,
    fontFamily: fontFamily.ClashDisplayMedium,
  },
  dialCodeText: {
    fontSize: fontSizes.sm,
    color: colors.darkGray,
    fontFamily: fontFamily.ClashDisplayMedium,
  },
  countryCodeText: {
    fontSize: fontSizes.sm2,
    color: colors.black,
    marginHorizontal: 8,
    fontFamily: fontFamily.ClashDisplayMedium,
  },
  phoneInput: {
    flex: 1,
    fontSize: fontSizes.xm2,
    color: colors.black,
    fontFamily: fontFamily.ClashDisplayMedium,
  },
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
    width: '100%',
    height: height * 0.06,
  },
  code: {
    fontSize: fontSizes.xm2,
    color: colors.black,
    marginRight: 6,
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
    marginTop: height * 0.01,
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
    top: Platform.OS === 'ios' ? height * 0.03 : height * 0.06,
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
    bottom: height * 0.02,
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
  icon: {
    width: width * 0.03,
    height: width * 0.03,
    resizeMode: 'contain',
    marginRight: width * 0.02,
  },
  loaderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)', // semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
});

export default SignUpEmail;
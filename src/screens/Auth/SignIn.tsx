import { CommonActions, NavigationProp, useNavigation } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fontFamily } from '../../assets/Fonts';
import images from '../../assets/Images';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import type { StackParamList } from '../../navigation/AuthStack';
import {
  setFullName,
  setLogin,
  setToken,
  setUser,
  setUserEmail,
} from '../../redux/slice/roleSlice';
import { RootState } from '../../redux/store';
import { height, width } from '../../utilities';
import { colors } from '../../utilities/colors';
import { fontSizes } from '../../utilities/fontsizes';
import Toast from 'react-native-toast-message';
import { apiHelper } from '../../services';
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth"
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '724928842281-u3ihlb6eb4i9oo50k3rpnsb5lqjkh3dm.apps.googleusercontent.com', // ✅ CORRECT ONE
  offlineAccess: true,
});

type Props = NativeStackScreenProps<StackParamList, 'SignIn'>;

const SignIn: React.FC<Props> = () => {
  const navigation = useNavigation<NavigationProp<any>>()
  const selectedRole = useSelector(
    (state: RootState) => state.role.selectedRole,
  );
  const User = useSelector((state: RootState) => state.role.user);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  const isProfileComplete = (firebaseUser: FirebaseAuthTypes.User) => {
    return !!(firebaseUser.displayName && firebaseUser.email && firebaseUser.phoneNumber);
  };

  const isFormValid = email.includes('@');

  useEffect(() => {
    console.log('Selected Role:', selectedRole);
  }, [selectedRole]);

  const handleSignIn = () => {
    const mockUser = {
      email: email,
      fullName: 'Test User',
      role: selectedRole || 'user',
    };
    dispatch(setLogin());
    dispatch(setUser(mockUser));
    dispatch(setUserEmail(email));
    dispatch(setFullName(mockUser.fullName));

    console.log('Mock login successful');
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'AuthStack' }],
      }),
    );
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const body = {
        email: email,
        password: password,
        role: selectedRole,
      };
      const { response, error } = await apiHelper(
        'POST',
        'auth/login',
        {},
        body,
      );
      console.log('Response from SignIn Api: ', response?.data.response.data);
      if (response?.data.response.data) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: response.data.message,
        });
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'AuthStack' }],
          }),
        );
        dispatch(setLogin());
        dispatch(setUserEmail(email));
        dispatch(setUser(response?.data.response.data.user));
        console.log(
          'User Data from API Response:',
          response?.data.response.data.user,
        );
        dispatch(setToken(response.data.response.data.access_token))
        console.log("dispatching Token from the SIgnIn Screen", response.data.response.data.access_token)
      }
      else {
        console.log("Error Message", error)
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error
        })
      }
    } catch (error) {
      console.log("Error", error)
      Toast.show({
        type: 'error',
        text1: 'Success',
        text2: error?.message,
      });
    } finally {
      setLoading(false);
    }
  };

  // const GoogleSignIn = async () => {
  // setGoogleLoading(true);
  // try {
  //   // Check Play Services
  //   await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

  //   // Sign in with Google
  //   const { idToken } = await GoogleSignin.signIn();
  //   const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  //   const userCredential = await auth().signInWithCredential(googleCredential);

  //   const firebaseUser = userCredential.user;

  //   // Build user object
  //   const userData = {
  //     uid: firebaseUser.uid,
  //     email: firebaseUser.email || '',
  //     displayName: firebaseUser.displayName || 'Google User',
  //     phoneNumber: firebaseUser.phoneNumber || '',
  //     photoURL: firebaseUser.photoURL || '',
  //     role: selectedRole || 'user',
  //     isGoogleUser: true,
  //   };

  //   // Save to Redux
  //   dispatch(setUser(userData));
  //   dispatch(setLogin());
  //   dispatch(setUserEmail(userData.email));
  //   dispatch(setFullName(userData.displayName));

  //   // Check profile completeness
  //   const profileComplete = isProfileComplete(firebaseUser);

  //   if (profileComplete) {
  //     // ✅ Profile complete → navigate to Home
  //     navigation.dispatch(
  //       CommonActions.reset({
  //         index: 0,
  //         routes: [{ name: 'Home' }],
  //       })
  //     );
  //   } else {
  //     // ❌ Profile incomplete → navigate to CreateProfile / SignUpEmail pre-filled
  //     navigation.navigate('CreateProfile', { googleUser: userData });
  //   }

  //   Toast.show({
  //     type: 'success',
  //     text1: 'Google Sign-In Successful',
  //   });
  // } catch (error: any) {
  //   console.log('Google Sign-In Error:', error);
  //   Toast.show({
  //     type: 'error',
  //     text1: 'Google Sign-In Failed',
  //     text2: error.message || 'Unexpected error occurred',
  //   });
  // } finally {
  //   setGoogleLoading(false);
  // }
  // };

  const GoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

      // Sign in with Google
      const userInfo = await GoogleSignin.signIn();

      // Firebase user is already signed in
      const firebaseUser = auth().currentUser;

      if (!firebaseUser) throw new Error("Firebase user not found");

      // Build user object for Redux
      const userData = {
        uid: firebaseUser.uid,
        email: firebaseUser.email || '',
        displayName: firebaseUser.displayName || 'Google User',
        phoneNumber: firebaseUser.phoneNumber || '',
        photoURL: firebaseUser.photoURL || '',
        role: selectedRole || 'user',
        isGoogleUser: true,
      };

      // Save user in Redux
      dispatch(setUser(userData));
      dispatch(setLogin());
      dispatch(setUserEmail(userData.email));
      dispatch(setFullName(userData.displayName));

      // Check if profile is complete (phoneNumber can be used as required)
      const profileComplete = !!(firebaseUser.displayName && firebaseUser.email && firebaseUser.phoneNumber);

      if (profileComplete) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          })
        );
      } else {
        // Navigate to CreateProfile to fill missing fields
        navigation.navigate('CreateProfile', { googleUser: userData });
      }

      Toast.show({
        type: 'success',
        text1: 'Google Sign-In Successful',
      });
    } catch (error: any) {
      console.log('Google Sign-In Error:', error);
      Toast.show({
        type: 'error',
        text1: 'Google Sign-In Failed',
        text2: error.message || 'Unexpected error occurred',
      });
    } finally {
      setGoogleLoading(false);
    }
  };

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
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.forgotPassMain}
            onPress={() =>
              navigation.navigate('ForgotPassword', { email: User?.email })
            }
          >
            <Text style={styles.forgotPass}>Forget Password?</Text>
          </TouchableOpacity>
          <CustomButton
            btnHeight={height * 0.06}
            btnWidth={width * 0.85}
            text="SignIn"
            backgroundColor={isFormValid ? colors.brown : colors.black}
            textColor={colors.white}
            borderRadius={30}
            disabled={!isFormValid}
            onPress={handleSubmit}
          />
          <View style={{ paddingVertical: height * 0.03 }}>
            <Image source={images.orLine} style={styles.orLine} />
          </View>
          <TouchableOpacity
            style={styles.belowBtn}
            onPress={GoogleSignIn}
            disabled={googleLoading}
          >
            {googleLoading ? (
              <ActivityIndicator size="small" color={colors.brown} />
            ) : (
              <>
                <Image source={images.googleIcon} style={styles.googleIcon} />
                <Text style={styles.belowSignInText}>Sign In with Google</Text>
              </>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.belowBtn}>
            <Image source={images.appleIcon} style={styles.googleIcon} />
            <Text style={styles.belowSignInText}>Sign Up with Apple</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomMain}>
          <Text style={styles.bottomTextOne}>Don't have an Account?</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('SignUpEmail')}
          >
            <Text style={styles.bottomTextTwo}>SignUp</Text>
          </TouchableOpacity>
        </View>
        {loading && (
          <View style={styles.loaderOverlay}>
            <ActivityIndicator size="large" color={colors.brown} />
          </View>
        )}
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
    color: colors.black,
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
    color: colors.brown,
  },
  bottomMain: {
    flexDirection: 'row',
    top: height * 0.14,
    gap: width * 0.01,
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
  forgotPassMain: {
    alignSelf: 'flex-end',
    width: width * 0.28,
    cursor: 'pointer',
  },
  forgotPass: {
    fontFamily: fontFamily.SfProDisplayRegular,
    fontSize: fontSizes.xsm,
    color: colors.black,
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

export default SignIn;

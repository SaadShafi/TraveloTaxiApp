import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Congratulation from '../screens/Auth/Congratulation';
import CreateProfile from '../screens/Auth/CreateProfile';
import ForgotPassword from '../screens/Auth/ForgotPasswrd';
import OtpVerification from '../screens/Auth/OtpVerification';
import PhoneVerification from '../screens/Auth/PhoneVerification';
import SetPassword from '../screens/Auth/SetPass';
import SignIn from '../screens/Auth/SignIn';
import SignUpEmail from '../screens/Auth/SignUpEmail';
import WelcomeFirst from '../screens/Auth/WelcomeFirst';
import WelcomeFourth from '../screens/Auth/WelcomeFourth';
import WelcomeSec from '../screens/Auth/WelcomeSec';
import AboutUs from '../screens/Global/AboutUs';
import ChangePassWord from '../screens/Global/changePassword';
import ContactUs from '../screens/Global/ContactUs';
import PrivacyPolicy from '../screens/Global/PrivacyPolicy';
import Setting from '../screens/Global/Setting';

export type StackParamList = {
  WelcomeFirst: undefined;
  WelcomeSec: undefined;
  WelcomeFourth: undefined;
  SignIn: undefined;
  SignUpEmail: undefined;
  OtpVerification: undefined;
  SetPassword: undefined;
  Congratulation: undefined;
  CreateProfile: undefined;
  PaymentUser: undefined;
  Setting: undefined;
  ChangePass: undefined;
  AboutUs: undefined;
  PrivacyPolicy: undefined;
  ContactUs: undefined;
  ForgotPassword: undefined;
  PhoneVerification: undefined;
  HomeUser: undefined;
  HomeDriver: undefined;
  RideDetails: undefined;
  RideArriving: undefined;
  TripOptions: undefined;
  FindingDriver: undefined;
  DriverOfferings: undefined;
  BankDetails: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="WelcomeFirst"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUpEmail" component={SignUpEmail} />
      <Stack.Screen name="OtpVerification" component={OtpVerification} />
      <Stack.Screen name="SetPassword" component={SetPassword} />
      <Stack.Screen name="WelcomeFirst" component={WelcomeFirst} />
      <Stack.Screen name="WelcomeSec" component={WelcomeSec} />
      <Stack.Screen name="WelcomeFourth" component={WelcomeFourth} />
      <Stack.Screen name="Congratulation" component={Congratulation} />
      <Stack.Screen name="CreateProfile" component={CreateProfile} />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="ChangePass" component={ChangePassWord} />
      <Stack.Screen name="AboutUs" component={AboutUs} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="ContactUs" component={ContactUs} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="PhoneVerification" component={PhoneVerification} />
    </Stack.Navigator>
  );
};

export default AuthStack;

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Congratulation from '../screens/Auth/Congratulation';
import CreateProfile from '../screens/Auth/CreateProfile';
import EditProfile from '../screens/Auth/EditProfile';
import ForgotPassword from '../screens/Auth/ForgotPasswrd';
import OtpVerification from '../screens/Auth/OtpVerification';
import PhoneVerification from '../screens/Auth/PhoneVerification';
import Profile from '../screens/Auth/Profile';
import SetPassword from '../screens/Auth/SetPass';
import SignIn from '../screens/Auth/SignIn';
import SignUpEmail from '../screens/Auth/SignUpEmail';
import WelcomeFirst from '../screens/Auth/WelcomeFirst';
import WelcomeFourth from '../screens/Auth/WelcomeFourth';
import WelcomeSec from '../screens/Auth/WelcomeSec';
import BankDetails from '../screens/Driver/BankDetails';
import AboutUs from '../screens/Global/AboutUs';
import CallMain from '../screens/Global/CallMain';
import ChangePassWord from '../screens/Global/changePassword';
import ChatMain from '../screens/Global/Chat';
import ContactUs from '../screens/Global/ContactUs';
import DeleteAccount from '../screens/Global/DeleteAccount';
import NotificationScreen from '../screens/Global/Notification';
import PrivacyPolicy from '../screens/Global/PrivacyPolicy';
import Setting from '../screens/Global/Setting';
import TermsCondition from '../screens/Global/TermsConditions';
import RideArrivingUser from '../screens/User/RideArrivingUser';
import BankDetailsAuth from '../screens/Auth/BankDetailAuth';

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
  DeleteAccount: undefined;
  notification: undefined;
  Chat: undefined;
  CallMain: undefined;
  RideArrivingUser: undefined;
  TermsCondition: undefined;
  EditProfile: undefined;
  Profile: undefined;
  BankDetailsAuth: undefined;
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
      <Stack.Screen name="BankDetails" component={BankDetails} />
      <Stack.Screen name="BankDetailsAuth" component={BankDetailsAuth} />
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
      <Stack.Screen name="DeleteAccount" component={DeleteAccount} />
      <Stack.Screen name="notification" component={NotificationScreen} />
      <Stack.Screen name="Chat" component={ChatMain} />
      <Stack.Screen name="CallMain" component={CallMain} />
      <Stack.Screen name="RideArrivingUser" component={RideArrivingUser} />
      <Stack.Screen name="TermsCondition" component={TermsCondition} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

export default AuthStack;

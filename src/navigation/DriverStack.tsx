import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import CreateProfile from '../screens/Auth/CreateProfile';
import EditProfile from '../screens/Auth/EditProfile';
import Profile from '../screens/Auth/Profile';
import SignIn from '../screens/Auth/SignIn';
import WelcomeFirst from '../screens/Auth/WelcomeFirst';
import WelcomeFourth from '../screens/Auth/WelcomeFourth';
import WelcomeSec from '../screens/Auth/WelcomeSec';
import BankDetails from '../screens/Driver/BankDetails';
import HelpAndSupport from '../screens/Driver/HelpAndSupport';
import History from '../screens/Driver/History';
import HistoryDetailOne from '../screens/Driver/HistoryDetailOne';
import HistoryDetailSec from '../screens/Driver/HistoryDetailSec';
import HomeDriver from '../screens/Driver/HomeDriver';
import PaymentHistory from '../screens/Driver/PaymentHistory';
import RideArriving from '../screens/Driver/RideArriving';
import RideDetails from '../screens/Driver/RideDetails';
import Wallet from '../screens/Driver/Wallet';
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

export type StackParamList = {
  HomeDriver: undefined;
  BankDetails: undefined;
  History: undefined;
  HistoryDetailOne: undefined;
  HistoryDetailSec: undefined;
  PaymentHistory: undefined;
  RideDetails: undefined;
  Wallet: undefined;
  RideArriving: undefined;
  Settings: undefined;
  ChangePass: undefined;
  PrivacyPolicy: undefined;
  AboutUs: undefined;
  ContactUs: undefined;
  DeleteAccount: undefined;
  HelpSupport: undefined;
  notification: undefined;
  Chat: undefined;
  CallMain: undefined;
  TermsCondition: undefined;
  WelcomeFirst: undefined;
  WelcomeSec: undefined;
  WelcomeFourth: undefined;
  CreateProfile: undefined;
  SignIn: undefined;
  SignUpEmail: undefined;
  OtpVerification: undefined;
  SetPassword: undefined;
  EditProfile: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

const DriverStack: React.FC = () => {
  return (
    <Stack.Navigator
      id="driver-stack"
      initialRouteName="HomeDriver"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="HomeDriver" component={HomeDriver} />
      <Stack.Screen name="BankDetails" component={BankDetails} />
      <Stack.Screen name="WelcomeFirst" component={WelcomeFirst} />
      <Stack.Screen name="WelcomeSec" component={WelcomeSec} />
      <Stack.Screen name="WelcomeFourth" component={WelcomeFourth} />
      <Stack.Screen name="CreateProfile" component={CreateProfile} />
      <Stack.Screen name="History" component={History} />
      <Stack.Screen name="HistoryDetailOne" component={HistoryDetailOne} />
      <Stack.Screen name="HistoryDetailSec" component={HistoryDetailSec} />
      <Stack.Screen name="PaymentHistory" component={PaymentHistory} />
      <Stack.Screen name="RideDetails" component={RideDetails} />
      <Stack.Screen name="Wallet" component={Wallet} />
      <Stack.Screen name="RideArriving" component={RideArriving} />
      <Stack.Screen name="Settings" component={Setting} />
      <Stack.Screen name="ChangePass" component={ChangePassWord} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="AboutUs" component={AboutUs} />
      <Stack.Screen name="ContactUs" component={ContactUs} />
      <Stack.Screen name="DeleteAccount" component={DeleteAccount} />
      <Stack.Screen name="HelpSupport" component={HelpAndSupport} />
      <Stack.Screen name="notification" component={NotificationScreen} />
      <Stack.Screen name="Chat" component={ChatMain} />
      <Stack.Screen name="CallMain" component={CallMain} />
      <Stack.Screen name="TermsCondition" component={TermsCondition} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  );
};

export default DriverStack;

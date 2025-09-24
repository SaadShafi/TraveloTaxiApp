import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HelpAndSupport from '../screens/Driver/HelpAndSupport';
import History from '../screens/Driver/History';
import AboutUs from '../screens/Global/AboutUs';
import ChangePassWord from '../screens/Global/changePassword';
import ContactUs from '../screens/Global/ContactUs';
import DeleteAccount from '../screens/Global/DeleteAccount';
import NotificationScreen from '../screens/Global/Notification';
import PrivacyPolicy from '../screens/Global/PrivacyPolicy';
import Setting from '../screens/Global/Setting';
import AddPaymentMethod from '../screens/User/AddPaymentUser';
import DriverOfferings from '../screens/User/DriverOfferings';
import FindingDriver from '../screens/User/FindingDriver';
import HistoryDetailUserOne from '../screens/User/HistoryDetailUserOne';
import HistoryDetailUserSec from '../screens/User/HistoryDetailUserSec';
import HomeUser from '../screens/User/HomeUser';
import PaymentUser from '../screens/User/payment';
import Schedule from '../screens/User/Schedule';
import ScheduleDetail from '../screens/User/ScheduleDetail';
import TripOptions from '../screens/User/TripOptions';
import WalletUser from '../screens/User/WalletUser';
import WalletUserSec from '../screens/User/WalletUserSec';
import RideArrivingUser from '../screens/User/RideArrivingUser';

export type StackParamList = {
  HomeUser: undefined;
  AddPaymentMethod: undefined;
  PaymentUser: undefined;
  Schedule: undefined;
  WalletUser: undefined;
  WalletUserSec: undefined;
  TripOptions: undefined;
  FindingDriver: undefined;
  DriverOfferings: undefined;
  ScheduleDetail: undefined;
  History: undefined;
  HistoryDetailUserOne: undefined;
  HistoryDetailUserSec: undefined;
  Settings: undefined;
  ChangePass: undefined;
  PrivacyPolicy: undefined;
  AboutUs: undefined;
  ContactUs: undefined;
  DeleteAccount: undefined;
  HelpSupport: undefined;
  notification: undefined;
  RideArrivingUser:undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

const UserStack: React.FC = () => {
  return (
    <Stack.Navigator
      id="user-stack"
      initialRouteName="HomeUser"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="HomeUser" component={HomeUser} />
      <Stack.Screen name="AddPaymentMethod" component={AddPaymentMethod} />
      <Stack.Screen name="PaymentUser" component={PaymentUser} />
      <Stack.Screen name="Schedule" component={Schedule} />
      <Stack.Screen name="WalletUser" component={WalletUser} />
      <Stack.Screen name="WalletUserSec" component={WalletUserSec} />
      <Stack.Screen name="TripOptions" component={TripOptions} />
      <Stack.Screen name="FindingDriver" component={FindingDriver} />
      <Stack.Screen name="DriverOfferings" component={DriverOfferings} />
      <Stack.Screen name="ScheduleDetail" component={ScheduleDetail} />
      <Stack.Screen name="History" component={History} />
      <Stack.Screen name="notification" component={NotificationScreen} />
      <Stack.Screen name="Settings" component={Setting} />
      <Stack.Screen
        name="HistoryDetailUserOne"
        component={HistoryDetailUserOne}
      />
      <Stack.Screen
        name="HistoryDetailUserSec"
        component={HistoryDetailUserSec}
      />
      <Stack.Screen name="ChangePass" component={ChangePassWord} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="AboutUs" component={AboutUs} />
      <Stack.Screen name="ContactUs" component={ContactUs} />
      <Stack.Screen name="DeleteAccount" component={DeleteAccount} />
      <Stack.Screen name="HelpSupport" component={HelpAndSupport} />
      <Stack.Screen name="RideArrivingUser" component={RideArrivingUser} />
    </Stack.Navigator>
  );
};

export default UserStack;

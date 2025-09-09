import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import BankDetails from '../screens/Driver/BankDetails';
import History from '../screens/Driver/History';
import HistoryDetailOne from '../screens/Driver/HistoryDetailOne';
import HomeDriver from '../screens/Driver/HomeDriver';
import PaymentHistory from '../screens/Driver/PaymentHistory';
import RideDetails from '../screens/Driver/RideDetails';
import Wallet from '../screens/Driver/Wallet';

export type StackParamList = {
  homeDriver: undefined;
  bankDetails: undefined;
  history: undefined;
  historyDetailOne: undefined;
  paymentHistory: undefined;
  rideDetails: undefined;
  wallet: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

const DriverStack: React.FC = () => {
  return (
    <Stack.Navigator
      id="driver-stack"
      initialRouteName="homeDriver"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="homeDriver" component={HomeDriver} />
      <Stack.Screen name="bankDetails" component={BankDetails} />
      <Stack.Screen name="history" component={History} />
      <Stack.Screen name="historyDetailOne" component={HistoryDetailOne} />
      <Stack.Screen name="paymentHistory" component={PaymentHistory} />
      <Stack.Screen name="rideDetails" component={RideDetails} />
      <Stack.Screen name="wallet" component={Wallet} />
    </Stack.Navigator>
  );
};

export default DriverStack;

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import BankDetails from '../screens/Driver/BankDetails';
import History from '../screens/Driver/History';
import HistoryDetailOne from '../screens/Driver/HistoryDetailOne';
import HomeDriver from '../screens/Driver/HomeDriver';
import PaymentHistory from '../screens/Driver/PaymentHistory';
import RideArriving from '../screens/Driver/RideArriving';
import RideDetails from '../screens/Driver/RideDetails';
import Wallet from '../screens/Driver/Wallet';

export type StackParamList = {
  HomeDriver: undefined;
  BankDetails: undefined;
  History: undefined;
  HistoryDetailOne: undefined;
  PaymentHistory: undefined;
  RideDetails: undefined;
  Wallet: undefined;
  RideArriving: undefined;
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
      <Stack.Screen name="History" component={History} />
      <Stack.Screen name="HistoryDetailOne" component={HistoryDetailOne} />
      <Stack.Screen name="PaymentHistory" component={PaymentHistory} />
      <Stack.Screen name="RideDetails" component={RideDetails} />
      <Stack.Screen name="Wallet" component={Wallet} />
      <Stack.Screen name="RideArriving" component={RideArriving} />
    </Stack.Navigator>
  );
};

export default DriverStack;

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AddPaymentMethod from '../screens/User/AddPaymentUser';
import HomeUser from '../screens/User/HomeUser';
import PaymentUser from '../screens/User/payment';
import Schedule from '../screens/User/Schedule';
import WalletUser from '../screens/User/WalletUser';
import WalletUserSec from '../screens/User/WalletUserSec';

export type StackParamList = {
  homeUser: undefined;
  addPaymentMethod: undefined;
  paymentUser: undefined;
  schedule: undefined;
  walletUser: undefined;
  walletUserSec: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

const UserStack: React.FC = () => {
  return (
    <Stack.Navigator
      id="user-stack"
      initialRouteName="homeUser"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="homeUser" component={HomeUser} />
      <Stack.Screen name="addPaymentMethod" component={AddPaymentMethod} />
      <Stack.Screen name="paymentUser" component={PaymentUser} />
      <Stack.Screen name="schedule" component={Schedule} />
      <Stack.Screen name="walletUser" component={WalletUser} />
      <Stack.Screen name="walletUserSec" component={WalletUserSec} />
    </Stack.Navigator>
  );
};

export default UserStack;

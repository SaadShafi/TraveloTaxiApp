import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Congratulation from '../screens/Global/Congratulation';
import CreateProfile from '../screens/Global/CreateProfile';
import OtpVerification from '../screens/Global/OtpVerification';
import SetPassword from '../screens/Global/SetPass';
import SignIn from '../screens/Global/SignIn';
import SignUpEmail from '../screens/Global/SignUpEmail';
import WelcomeFirst from '../screens/Global/WelcomeFirst';
import WelcomeFourth from '../screens/Global/WelcomeFourth';
import WelcomeSec from '../screens/Global/WelcomeSec';
import PaymentUser from '../screens/User/payment';

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
      <Stack.Screen name="PaymentUser" component={PaymentUser} />
    </Stack.Navigator>
  );
};

export default AuthStack;

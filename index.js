/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import ChatMain from './src/screens/Global/Chat';
import DriverHome from './src/screens/Driver/Home'
import RideDetails from './src/screens/Driver/RideDetails.tsx'
import PaymentHistory from './src/screens/Driver/PaymentHistory.tsx'

AppRegistry.registerComponent(appName, () => PaymentHistory);

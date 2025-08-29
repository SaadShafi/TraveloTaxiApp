/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import RideDetails from './src/screens/Driver/RideDetails';
import BankDetails from './src/screens/Driver/BankDetails';
import NotificationScreen from './src/screens/Global/Notification'
AppRegistry.registerComponent(appName, () => NotificationScreen);

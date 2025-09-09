/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import AddPaymentMethod from './src/screens/User/AddPaymentUser';
import BookingDetails from './src/screens/User/BookingDetails'
import HelpAndSupport from './src/screens/Driver/HelpAndSupport'
import HomeUser from './src/screens/User/HomeUser';

AppRegistry.registerComponent(appName, () => HomeUser);

/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import HomeUser from './src/screens/User/HomeUser';
import RideArriving from './src/screens/Driver/RideArriving';

AppRegistry.registerComponent(appName, () => App);

/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import OtpVerification from './src/screens/Global/OtpVerification';
import SignIn from './src/screens/Global/SignIn';
import SignUpEmail from './src/screens/Global/SignUpEmail';
import Congratulation from './src/screens/Global/Congratulation';
import CreateProfile from './src/screens/Global/CreateProfile';

AppRegistry.registerComponent(appName, () =>CreateProfile);

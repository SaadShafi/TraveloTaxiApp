/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import WelcomeFirst from './src/screens/Global/WelcomeFirst.tsx';
import WelcomeFourth from './src/screens/Global/WelcomeFourth.tsx';
import SignUpEmail from './src/screens/Global/SignUpEmail.tsx';

AppRegistry.registerComponent(appName, () => SignUpEmail);

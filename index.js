/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import WelcomeFirst from './src/screens/Global/WelcomeFirst.tsx';

AppRegistry.registerComponent(appName, () => WelcomeFirst);

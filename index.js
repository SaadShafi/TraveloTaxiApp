/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import SignIn from './src/screens/Global/SignIn.tsx';

AppRegistry.registerComponent(appName, () => SignIn);

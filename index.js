/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import WelcomeFourth from "./src/screens/Global/WelcomeFourth.tsx"


AppRegistry.registerComponent(appName, () => WelcomeFourth);

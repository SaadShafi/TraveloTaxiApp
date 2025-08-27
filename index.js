/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import SignUpEmail from './src/screens/Global/SignUpEmail';
import WelcomeFirst from './src/screens/Global/WelcomeFirst';
import WelcomeSec from './src/screens/Global/WelcomeSec';
import WelcomeFourth from './src/screens/Global/WelcomeFourth';
import SignIn from './src/screens/Global/SignIn';
// import CreateProfile from './src/screens/Global/CreateProfile';
import Congratulation from './src/screens/Global/Congratulation';
import setPassword from './src/screens/Global/SetPass';
import App from './App';

AppRegistry.registerComponent(appName, () => App);

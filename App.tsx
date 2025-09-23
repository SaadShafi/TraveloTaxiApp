import { NavigationContainer } from '@react-navigation/native';
import {
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import 'react-native-gesture-handler';
import 'react-native-reanimated';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { Text } from 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { Provider, useSelector } from 'react-redux';
import AuthStack from './src/navigation/AuthStack';
import Drawer from './src/navigation/Drawer';
import { store } from './src/redux/store';
import { colors } from './src/utilities/colors';

const Stack = createNativeStackNavigator();

// function AppNavigator() {
//   const isLoggedIn = useSelector((state: any) => state.role.isLogin);
//   const selectedRole = useSelector((state: any) => state.role.selectedRole);

//   // Use explicit return with NO extra spaces
//   if (isLoggedIn && selectedRole) {
//     return (
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="MainApp" component={Drawer} />
//       </Stack.Navigator>
//     );
//   }

//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Auth" component={AuthStack} />
//     </Stack.Navigator>
//   );
// }

function AppNavigator() {
  const isLoggedIn = useSelector((state: any) => state.role.isLogin);
  const selectedRole = useSelector((state: any) => state.role.selectedRole);

  // Return the component directly, no navigator wrapper
  if (isLoggedIn && selectedRole) {
    return <Drawer />;
  }

  return <AuthStack />;
}

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <NavigationContainer>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          {/* <AuthStack /> */}
          <AppNavigator />
          <Toast
            config={{
              custom_otp: ({ text1, text2 }) => (
                <View style={styles.toastContainer}>
                  <Text style={styles.text1}>
                    Hi <Text style={styles.bold}>Alex!</Text> Here is your
                    One-Time Password <Text style={styles.bold}>52610</Text>
                  </Text>
                  <Text style={styles.text2}>
                    <Text style={styles.bold}>Valid for 10 mins.</Text>
                  </Text>
                </View>
              ),
            }}
          />
        </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toastContainer: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.brown,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginHorizontal: 20,
    marginTop: 10,
    shadowColor: colors.black,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  text1: {
    fontSize: 15,
    color: colors.black,
  },
  text2: {
    fontSize: 14,
    color: colors.black,
    marginTop: 4,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default App;

import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthStack from './src/navigation/AuthStack';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
      <NavigationContainer>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <AuthStack />
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
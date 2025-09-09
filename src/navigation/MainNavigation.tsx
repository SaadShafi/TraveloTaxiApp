import { NavigationContainer } from '@react-navigation/native';
import Drawer from '../navigation/Drawer';
import { navigationRef } from '../utilities';

const MainNavigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Drawer />
    </NavigationContainer>
  );
};

export default MainNavigation;

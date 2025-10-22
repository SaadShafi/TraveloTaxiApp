import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  CommonActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { use, useState } from 'react';
import {
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fontFamily } from '../assets/Fonts';
import images from '../assets/Images';
import CustomButton from '../components/CustomButton';
import { logout } from '../redux/slice/authSlice';
import { removeUser } from '../redux/slice/roleSlice';
import { RootState } from '../redux/store';
import { height, width } from '../utilities';
import { colors } from '../utilities/colors';
import { fontSizes } from '../utilities/fontsizes';
import DriverStack from './DriverStack';
import UserStack from './UserStack';

const CustomDrawerContent = (props: any) => {
  const selectedRole = useSelector(
    (state: RootState) => state.role.selectedRole,
  );
  const User = useSelector((state: RootState) => state.role.user);
  console.log('User from Redux in Drawer:', User);
  console.log("Email in Drawer:", User?.email);
  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleLogout = () => {
    // Reset both auth and role states
    dispatch(removeUser());
    dispatch(logout());

    // Close any modals
    setModalOpen(false);

    // Navigate back to auth stack
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'AuthStack' }],
      }),
    );

    console.log('User logged out successfully');
  };

  const handleHomeNavigation = () => {
    if (selectedRole === 'user') {
      navigation.navigate('UserApp', { screen: 'HomeUser' });
    } else if (selectedRole === 'driver') {
      navigation.navigate('DriverApp', { screen: 'HomeDriver' });
    }
    props.navigation.closeDrawer();
  };

  const handleNavigation = (routeName: string) => {
    if (selectedRole === 'user') {
      navigation.navigate('UserApp', { screen: routeName });
    } else if (selectedRole === 'driver') {
      navigation.navigate('DriverApp', { screen: routeName });
    }
    props.navigation.closeDrawer();
  };

  const UserDrawerList = [
    {
      title: 'Home',
      icon: images.homeIcon,
      screen: 'HomeUser',
    },
    {
      title: 'Booking History',
      icon: images.historyIcon,
      screen: 'History',
    },
    {
      title: 'Schedule',
      icon: images.scheduleIcon,
      screen: 'Schedule',
    },
    {
      title: 'Wallet',
      icon: images.walletIcon,
      screen: 'WalletUser',
    },
    {
      title: 'Settings',
      icon: images.settingsIcon,
      screen: 'Settings',
    },
    {
      title: 'Help & Support',
      icon: images.helpSupportIcon,
      screen: 'HelpSupport',
    },
    {
      title: 'Logout',
      icon: images.logoutIcon,
      screen: 'Logout',
      onPress: () => toggleModal(),
    },
  ];

  const DriverDrawerList = [
    {
      title: 'Home',
      icon: images.homeIcon,
      screen: 'HomeDriver',
    },
    {
      title: 'Wallet',
      icon: images.walletIcon,
      screen: 'Wallet',
    },
    {
      title: 'Booking History',
      icon: images.historyIcon,
      screen: 'History',
    },
    {
      title: 'Payment History',
      icon: images.historyIcon,
      screen: 'PaymentHistory',
    },
    {
      title: 'Settings',
      icon: images.settingsIcon,
      screen: 'Settings',
    },
    {
      title: 'Help & Support',
      icon: images.helpSupportIcon,
      screen: 'HelpSupport',
    },
    {
      title: 'Logout',
      icon: images.logoutIcon,
      screen: 'Logout',
      onPress: () => toggleModal(),
    },
  ];

  const handleRoleModeNavigation = () => {
    // dispatch(removeUser());
    // dispatch(logout());
    navigation.navigate('RoleSwitch');
  };

  const truncateEmail = (email: string, maxLength: number = 17) => {
    if (!email) return "info@yourmail.com";
    if (email.length <= maxLength) return email;
    return email.substring(0, maxLength) + '...';
  };


  return (
    <View style={styles.gradientContainer}>
      <View style={styles.gradientTop} />
      <View style={styles.gradientMiddle}>
        <Image source={images.drawerBg} style={styles.drawerBgImg} />
      </View>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => props.navigation.closeDrawer()}
        >
          <Image source={images.drawerBack} style={styles.drawerBackIcon} />
          <Text style={styles.closeButtonText}> Close</Text>
        </TouchableOpacity>
        <View style={styles.profileSection}>
          <TouchableOpacity
            style={{ right: width * 0.04 }}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Profile')}
          >
            <Image source={images.drawerProf} style={styles.profileImage} />
          </TouchableOpacity>
          <View style={styles.profileTextContainer}>
            <Text style={styles.profileName}>Name</Text>
            <Text style={styles.profileEmail}> {truncateEmail(User?.email)}</Text>
          </View>
        </View>
        <View style={styles.menuContainer}>
          {selectedRole === 'user' &&
            UserDrawerList.map((data, index) => (
              <View style={styles.menuItemMain} key={index}>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                    if (data.onPress) {
                      data.onPress();
                    } else {
                      handleNavigation(data.screen);
                    }
                  }}
                  activeOpacity={0.5}
                >
                  <Image source={data.icon} style={styles.menuIcon} />
                  <Text style={styles.menuText}>{data.title}</Text>
                </TouchableOpacity>
              </View>
            ))}

          {selectedRole === 'driver' &&
            DriverDrawerList.map((data, index) => (
              <View style={styles.menuItemMain} key={index}>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                    if (data.onPress) {
                      data.onPress();
                    } else {
                      handleNavigation(data.screen);
                    }
                  }}
                  activeOpacity={0.5}
                >
                  <Image source={data.icon} style={styles.menuIcon} />
                  <Text style={styles.menuText}>{data.title}</Text>
                </TouchableOpacity>
              </View>
            ))}
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalOpen}
          onRequestClose={() => setModalOpen(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Logout</Text>
              <Text style={styles.modalMessage}>
                Are you sure you want to logout?
              </Text>
              <View style={styles.modalButtons}>
                <CustomButton
                  text="Cancel"
                  textColor={colors.black}
                  btnHeight={height * 0.05}
                  btnWidth={width * 0.33}
                  backgroundColor={colors.gray}
                  borderRadius={10}
                  onPress={toggleModal}
                />
                <CustomButton
                  text="Logout"
                  textColor={colors.white}
                  btnHeight={height * 0.05}
                  btnWidth={width * 0.33}
                  backgroundColor={colors.brown}
                  borderRadius={10}
                  onPress={handleLogout}
                />
              </View>
            </View>
          </View>
        </Modal>
        {selectedRole === 'user' && (
          <View style={styles.driverModeContainer}>
            <TouchableOpacity
              style={styles.driverModeButton}
              onPress={handleRoleModeNavigation}
            >
              <Text style={styles.driverModeText}>Driver Mode</Text>
            </TouchableOpacity>
          </View>
        )}
        {selectedRole === 'driver' && (
          <View style={styles.driverModeContainer}>
            <TouchableOpacity
              style={styles.driverModeButton}
              onPress={handleRoleModeNavigation}
            >
              <Text style={styles.driverModeText}>User Mode</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
};

const Drawer = () => {
  const Drawer = createDrawerNavigator();
  const selectedRole = useSelector(
    (state: RootState) => state.role.selectedRole,
  );

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
        overlayColor: 'rgba(0,0,0,0.5)',
        drawerStyle: {
          flex: 1,
          width: '70%',
          backgroundColor: colors.transparent,
        },
      }}
    >
      {selectedRole === 'user' && (
        <Drawer.Screen
          name="UserApp"
          component={UserStack}
          options={{ swipeEnabled: false }}
        />
      )}
      {selectedRole === 'driver' && (
        <Drawer.Screen
          name="DriverApp"
          component={DriverStack}
          options={{ swipeEnabled: false }}
        />
      )}
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    position: 'relative',
    backgroundColor: colors.white,
  },
  gradientTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.125,
    backgroundColor: colors.brown,
  },
  gradientMiddle: {
    position: 'absolute',
    top: height * 0.12,
    height: height * 0.09,
    right: -width * 0.001,
  },
  drawerBgImg: {
    width: width * 0.9,
    height: height * 0.9,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  drawerBackIcon: {
    width: width * 0.04,
    height: height * 0.04,
    resizeMode: 'contain',
  },
  closeButton: {
    paddingTop: height * 0.03,
    paddingBottom: height * 0.02,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width * 0.19,
  },
  closeButtonText: {
    color: colors.white,
    fontSize: fontSizes.md,
    fontFamily: fontFamily.ClashDisplayMedium,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  profileImage: {
    width: width * 0.25,
    height: height * 0.085,
    resizeMode: 'contain',
  },
  profileTextContainer: {
    right: width * 0.03,
  },
  profileName: {
    fontSize: fontSizes.sm2,
    fontFamily: fontFamily.ClashDisplayMedium,
    color: colors.black,
  },
  profileEmail: {
    fontSize: fontSizes.sm,
    fontFamily: fontFamily.ClashDisplayRegular,
    color: colors.black,
  },
  menuContainer: {
    flex: 1,
    paddingTop: height * 0.03,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  menuItemMain: {
    height: height * 0.06,
    width: width * 0.68,
    right: width * 0.03,
    justifyContent: 'center',
    borderBottomWidth: 0.9,
    borderBottomColor: '#EFEFEF',
  },
  menuIcon: {
    marginRight: 15,
    width: width * 0.09,
    resizeMode: 'contain',
    textAlign: 'center',
  },
  menuText: {
    fontSize: fontSizes.sm2,
    fontFamily: fontFamily.ClashDisplayMedium,
    color: colors.black,
  },
  logoutSection: {
    paddingVertical: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  logoutIcon: {
    fontSize: 20,
    marginRight: 15,
    color: colors.brown,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: fontFamily.JakartaRegular,
    color: colors.shadeBlack,
  },
  driverModeContainer: {
    paddingBottom: 30,
    paddingHorizontal: 10,
  },
  driverModeButton: {
    backgroundColor: colors.shadeBlack,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  driverModeText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: fontFamily.JakartaMedium,
  },

  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.61)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 15,
    width: width * 0.8,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: fontSizes.lg2,
    fontFamily: fontFamily.ClashDisplayMedium,
    color: colors.black,
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: fontSizes.md,
    fontFamily: fontFamily.ClashDisplayRegular,
    color: colors.darkGray,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: height * 0.02,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: colors.gray,
  },
  logoutConfirmButton: {
    backgroundColor: colors.brown,
  },
  cancelButtonText: {
    color: colors.black,
    fontFamily: fontFamily.JakartaMedium,
    fontSize: fontSizes.md,
  },
  logoutConfirmText: {
    color: colors.white,
    fontFamily: fontFamily.JakartaMedium,
    fontSize: fontSizes.md,
  },
});

export default Drawer;

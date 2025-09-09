import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  CommonActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { useState } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fontFamily } from '../assets/Fonts';
import images from '../assets/Images';
import { RootState } from '../redux/store';
import { colors } from '../utilities/colors';
import DriverStack from './DriverStack';
import UserStack from './UserStack';

type Props = {
  navigation: NavigationProp<any>;
  selectedRole: number;
  toggleModal: () => void;
};

const CustomDrawerContent = (props: any) => {
  const selectedRole = useSelector(
    (state: RootState) => state.role.selectedRole,
  );
  const navigation = useNavigation<NavigationProp<any>>();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalToggle, setModalToggle] = useState(false);
  const Email = useSelector((state: any) => state.role.userEmail);
  const FullName = useSelector((state: any) => state.role.fullName);
  const profilePic = useSelector((state: any) => state.role.profilePic);
  const user = useSelector((state: any) => state.role.user);
  const dispatch = useDispatch();

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleCancelPress = () => {
    setModalOpen(false);
  };

  const handleLogout = () => {
    setModalOpen(false);
    navigation.navigate('roleSelector');
  };

  const handleHomeNavigation = () => {
    if (selectedRole === 'user') {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'homeUser' }],
        }),
      );
      setTimeout(() => {
        props.navigation.closeDrawer();
      }, 100);
    } else if (selectedRole === 'freelancer') {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'homeFreelancer' }],
        }),
      );
      setTimeout(() => {
        props.navigation.closeDrawer();
      }, 100);
    }
  };

  //   const logoutAcc = async (props) => {
  //     try {
  //       const { response, error } = await apiHelper(
  //         "POST",
  //         "auth/logout",
  //         {},
  //         {}
  //       );

  //       if (response) {
  //         Toast.show({
  //           text1: "Success",
  //           text2: response.data.message || "User Logged Out Successfully",
  //           type: "success",
  //         });

  //         console.log("Response Logout:", response);

  //         dispatch(removeUser());
  //         navigation.dispatch(
  //           CommonActions.reset({
  //             index: 0,
  //             routes: [{ name: "roleSelector" }],
  //           })
  //         );
  //         // props.navigation.closeDrawer()
  //         if (props?.navigation?.closeDrawer) {
  //           props.navigation.closeDrawer();
  //         }
  //       } else {
  //         Toast.show({
  //           type: "error",
  //           text1: "Error",
  //           text2: response?.data?.data?.message || "Failed to Logout",
  //         });
  //       }
  //     } catch (err) {
  //       Toast.show({
  //         text1: "Error",
  //         text2: typeof err === "string" ? err : "Failed to logout",
  //         type: "error",
  //       });
  //     } finally {
  //       setModalOpen(false);
  //     }
  //   };

  const UserDrawerList = [
    { title: 'Home', icon: '🏠' },
    { title: 'History', icon: '🕐' },
    { title: 'Schedule', icon: '📅' },
    { title: 'Wallet', icon: '💳' },
    { title: 'Family Tree', icon: '👥' },
    { title: 'Settings', icon: '⚙️' },
    { title: 'Help & Support', icon: '❓' },
  ];
  const FreelancerDrawerList = [
    { title: 'Home', icon: '🏠' },
    { title: 'History', icon: '🕐' },
    { title: 'Schedule', icon: '📅' },
    { title: 'Wallet', icon: '💳' },
    { title: 'Family Tree', icon: '👥' },
    { title: 'Settings', icon: '⚙️' },
    { title: 'Help & Support', icon: '❓' },
  ];

  return (
    <View style={styles.gradientContainer}>
      <View style={styles.gradientTop} />
      <View style={styles.gradientMiddle} />
      <View style={styles.gradientBottom} />

      <SafeAreaView style={styles.container}>
        <View style={styles.closeButtonContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => props.navigation.closeDrawer()}
          >
            <Text style={styles.closeButtonText}>← Close</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image source={images.User} style={styles.profileImage} />
          </View>
          <View style={styles.profileTextContainer}>
            <Text style={styles.profileName}>Name</Text>
            <Text style={styles.profileEmail}>info@yourmail.com</Text>
          </View>
        </View>

        <View style={styles.menuContainer}>
          {(selectedRole === 'user'
            ? UserDrawerList
            : FreelancerDrawerList
          ).map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => {
                let routeName = '';
                switch (item.title) {
                  case 'Home':
                    handleHomeNavigation();
                    return;
                  case 'History':
                    routeName = 'history';
                    break;
                  case 'Schedule':
                    routeName = 'schedule';
                    break;
                  case 'Wallet':
                    routeName = 'wallet';
                    break;
                  case 'Family Tree':
                    routeName = 'familyTree';
                    break;
                  case 'Settings':
                    routeName = 'settings';
                    break;
                  case 'Help & Support':
                    routeName = 'helpSupport';
                    break;
                  default:
                    routeName =
                      selectedRole === 'user' ? 'UserStack' : 'DriverStack';
                }
                navigation.navigate(routeName);
                props.navigation.closeDrawer();
              }}
            >
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text style={styles.menuText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.logoutSection}>
          <TouchableOpacity style={styles.logoutButton} onPress={toggleModal}>
            <Text style={styles.logoutIcon}>↗</Text>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.driverModeContainer}>
          <TouchableOpacity style={styles.driverModeButton}>
            <Text style={styles.driverModeText}>Driver Mode</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const Drawer = () => {
  const Drawer = createDrawerNavigator();
  const { selectedRole } = useSelector((state: any) => state.role);

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
          name="UserStack"
          component={UserStack}
          options={{
            swipeEnabled: false,
          }}
        />
      )}
      {selectedRole === 'freelancer' && (
        <Drawer.Screen
          name="DriverStack"
          component={DriverStack}
          options={{
            swipeEnabled: false,
          }}
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
  },
  gradientTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '30%',
    backgroundColor: colors.brown,
    borderTopRightRadius: 20,
  },
  gradientMiddle: {
    position: 'absolute',
    top: '30%',
    left: 0,
    right: 0,
    height: '40%',
    backgroundColor: colors.lightBrown,
  },
  gradientBottom: {
    position: 'absolute',
    top: '70%',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.white,
    borderBottomRightRadius: 20,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  closeButtonContainer: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  closeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeButtonText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: fontFamily.JakartaMedium,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  profileImageContainer: {
    marginRight: 15,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  profileTextContainer: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontFamily: fontFamily.JakartaMedium,
    color: colors.shadeBlack,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    fontFamily: fontFamily.JakartaRegular,
    color: colors.darkGray,
  },
  menuContainer: {
    flex: 1,
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 15,
    width: 25,
    textAlign: 'center',
  },
  menuText: {
    fontSize: 16,
    fontFamily: fontFamily.JakartaRegular,
    color: colors.shadeBlack,
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
});

export default Drawer;

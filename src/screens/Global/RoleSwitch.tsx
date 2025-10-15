import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fontFamily } from '../../assets/Fonts';
import images from '../../assets/Images';
import CustomButton from '../../components/CustomButton';
import TopHeader from '../../components/Topheader';
import { logout } from '../../redux/slice/authSlice';
import { removeUser } from '../../redux/slice/roleSlice';
import { RootState } from '../../redux/store';
import { height, width } from '../../utilities';
import { colors } from '../../utilities/colors';
import { fontSizes } from '../../utilities/fontsizes';

const RoleSwitch = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const selectedRole = useSelector(
    (state: RootState) => state.role.selectedRole,
  );
  const dispatch = useDispatch();

  const handleNav = () => {
    dispatch(removeUser());
    dispatch(logout());
  };
  return (
    <View style={{ flex: 1 }}>
      {selectedRole === 'user' && (
        <TopHeader text="Go to Driver Mode" isBack={true} />
      )}
      {selectedRole === 'driver' && (
        <TopHeader text="Go to User Mode" isBack={true} />
      )}

      <View style={styles.container}>
        <Image source={images.logo} style={styles.logo} />
        <View style={styles.contentMain}>
          <Text style={styles.RideText}>Ride With Us</Text>
          <View style={styles.paraMain}>
            <Text style={styles.paraText}>
              Saffe & Reliable Journeys, Affordable &
            </Text>
            <Text style={styles.paraText}>Transparent Pricing</Text>
          </View>
          <View style={styles.btnMain}>
            <CustomButton
              btnHeight={height * 0.06}
              btnWidth={width * 0.85}
              text="Already have an account?"
              textColor={colors.white}
              backgroundColor={colors.brown}
              borderRadius={30}
            />
            <CustomButton
              btnHeight={height * 0.06}
              btnWidth={width * 0.85}
              text="Sign Up"
              textColor={colors.white}
              backgroundColor={colors.black}
              borderRadius={30}
              onPress={handleNav}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  logo: {
    width: width * 0.4,
    height: height * 0.15,
    resizeMode: 'contain',
  },
  contentMain: {
    alignItems: 'center',
    top: height * 0.15,
  },
  RideText: {
    fontFamily: fontFamily.ClashDisplayMedium,
    fontSize: fontSizes.md,
    color: colors.black,
  },
  paraMain: {
    alignItems: 'center',
    top: height * 0.025,
  },
  paraText: {
    fontFamily: fontFamily.ClashDisplayRegular,
    fontSize: fontSizes.sm2,
    color: colors.black,
  },
  btnMain: {
    gap: height * 0.01,
    top: height * 0.4,
  },
});

export default RoleSwitch;

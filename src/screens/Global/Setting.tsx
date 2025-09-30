import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import {
  Image,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { fontFamily } from '../../assets/Fonts';
import images from '../../assets/Images';
import TopHeader from '../../components/Topheader';
import { StackParamList } from '../../navigation/AuthStack';
import { RootState } from '../../redux/store';
import { height, width } from '../../utilities';
import { colors } from '../../utilities/colors';
import { fontSizes } from '../../utilities/fontsizes';

type Props = NativeStackScreenProps<StackParamList, 'Setting'>;

const Setting: React.FC<Props> = ({ navigation }) => {
  const selectedRole = useSelector(
    (state: RootState) => state.role.selectedRole,
  );
  const [isEnabled, setIsEnabled] = useState(false);
  const [isEnabledSec, setIsEnabledSec] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const toggleSwitchSec = () =>
    setIsEnabledSec(previousState => !previousState);
  return (
    <View style={{ flex: 1 }}>
      <TopHeader text="Settings" isBack={true} />
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.contentText}>Notification</Text>
          <Switch
            trackColor={{ false: '#6f6c6cff', true: '#1E8C36' }}
            thumbColor={isEnabled ? colors.white : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        {/* <View style={styles.content}>
          <Text style={styles.contentText}>Pet ON/OFF Toggle</Text>
          <Switch
            trackColor={{ false: '#6f6c6cff', true: '#1E8C36' }}
            thumbColor={isEnabledSec ? colors.white : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitchSec}
            value={isEnabledSec}
          />
        </View> */}
        {selectedRole === 'driver' && (
          <View style={styles.content}>
            <Text style={styles.contentText}>Pet ON/OFF Toggle</Text>
            <Switch
              trackColor={{ false: '#6f6c6cff', true: '#1E8C36' }}
              thumbColor={isEnabledSec ? colors.white : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitchSec}
              value={isEnabledSec}
            />
          </View>
        )}
        <TouchableOpacity
          style={styles.content}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('ChangePass')}
        >
          <Text style={styles.contentText}>Change Password</Text>
          <Image source={images.greaterIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.content}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('PrivacyPolicy')}
        >
          <Text style={styles.contentText}>Privacy Policy</Text>
          <Image source={images.greaterIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.content}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('TermsCondition')}
        >
          <Text style={styles.contentText}>Terms And Condition</Text>
          <Image source={images.greaterIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.content}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('AboutUs')}
        >
          <Text style={styles.contentText}>About Us</Text>
          <Image source={images.greaterIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.content}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('ContactUs')}
        >
          <Text style={styles.contentText}>Contact Us</Text>
          <Image source={images.greaterIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.content}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('DeleteAccount')}
        >
          <Text style={styles.contentText}>Delete Account</Text>
          <Image source={images.greaterIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: height * 0.02,
    top: height * 0.01,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.gray,
    borderRadius: 30,
    width: width * 0.85,
    height: height * 0.065,
    paddingHorizontal: width * 0.07,
    alignItems: 'center',
  },
  contentText: {
    fontFamily: fontFamily.SfProDisplayRegular,
    fontSize: fontSizes.sm2,
    color: colors.black,
  },
});

export default Setting;

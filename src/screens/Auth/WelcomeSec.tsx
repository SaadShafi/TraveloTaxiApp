import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { fontFamily } from '../../assets/Fonts';
import images from '../../assets/Images';
import CustomButton from '../../components/CustomButton';
import type { StackParamList } from '../../navigation/AuthStack';
import { setRole } from '../../redux/slice/roleSlice';
import { height, width } from '../../utilities';
import { colors } from '../../utilities/colors';
import { fontSizes } from '../../utilities/fontsizes';

type Props = NativeStackScreenProps<StackParamList, 'WelcomeSec'>;

const WelcomeSec: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(true);
  const [modalVisibleSec, setModalVisibleSec] = useState(false);

  const handleUseLocation = () => {
    setModalVisible(false);
  };

  const handleSkip = () => {
    setModalVisible(false);
    setModalVisibleSec(true);
  };

  const handleNavigation = () => {
    setModalVisibleSec(false);
    navigation.navigate('WelcomeFourth');
  };

  const handleRoleSelect = (role: string) => {
    dispatch(setRole(role));
    setModalVisibleSec(false);
    navigation.navigate('WelcomeFourth');
    console.log('Role Selection:', role);
  };

  return (
    <View style={{ flex: 1 }}>
      <Modal
        animationType="fade"
        transparent={true}
        // visible={modalVisibleSec}
        visible={true}
        onRequestClose={() => setModalVisibleSec(true)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.contentMain}>
              <Text style={styles.selectText}>Select One</Text>
              <View style={styles.btnMain}>
                <TouchableOpacity
                  style={styles.btn}
                  activeOpacity={0.7}
                  onPress={() => handleRoleSelect('user')}
                >
                  <Image source={images.logoCustomer} style={styles.btnImage} />
                  <Text style={styles.btnText}>Travelo Customer</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btn}
                  activeOpacity={0.7}
                  onPress={() => handleRoleSelect('driver')}
                >
                  <Image source={images.logoDriver} style={styles.btnImage} />
                  <Text style={styles.btnText}>Travelo Driver</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  bgImg: {
    flex: 1,
    width: width * 1,
    height: height * 1,
  },
  logoMain: {
    alignItems: 'center',
    top: height * 0.36,
    right: width * 0.05,
  },
  logo: {
    width: width * 0.8,
    height: height * 0.19,
  },
  vectorimg: {
    width: width * 1,
    height: height * 0.5,
  },
  vectormain: {
    alignItems: 'center',
    bottom: height * 0.02,
  },
  sliderContainer: {
    marginTop: height * 0.04,
    width: width * 0.88,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 252, 252, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 16,
    width: width * 0.83,
    alignItems: 'center',
    borderWidth: 0.9,
    borderColor: colors.black,
  },
  modalTitleOne: {
    fontFamily: fontFamily.ClashDisplaySemiBold,
    fontSize: fontSizes.lg2,
    textAlign: 'center',
    color: colors.brown,
  },
  modalTitleTwo: {
    fontFamily: fontFamily.ClashDisplaySemiBold,
    fontSize: fontSizes.lg2,
    textAlign: 'center',
    color: colors.brown,
  },
  modalDescriptionMain: {
    padding: 20,
  },
  modalDescription: {
    fontFamily: fontFamily.SfProDisplayRegular,
    textAlign: 'center',
    color: colors.darkGray,
    lineHeight: height * 0.03,
  },
  skipButton: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
  },
  skipButtonText: {
    color: colors.brown,
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 16,
  },
  contentMain: {
    alignItems: 'center',
    padding: 30,
  },
  selectText: {
    fontFamily: fontFamily.ClashDisplayRegular,
    fontSize: fontSizes.lg2,
    color: colors.black,
  },
  btnMain: {
    gap: height * 0.02,
    top: height * 0.014,
    paddingVertical: height * 0.02,
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 50,
    borderColor: colors.darkGray,
    backgroundColor: colors.lightGray,
    alignItems: 'center',
    width: width * 0.7,
    height: height * 0.09,
    paddingHorizontal: width * 0.09,
  },
  btnText: {
    fontFamily: fontFamily.ClashDisplayMedium,
    fontSize: fontSizes.sm2,
    color: colors.black,
  },
  btnImage: {
    width: width * 0.15,
    height: height * 0.1,
    resizeMode: 'contain',
  },
});

export default WelcomeSec;




// <Modal
//         animationType="fade"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <Image source={images.secIcon} />

//             <View>
//               <Text style={styles.modalTitleOne}>Enable</Text>
//               <Text style={styles.modalTitleTwo}>Your Location</Text>
//             </View>
//             <View style={styles.modalDescriptionMain}>
//               <Text style={styles.modalDescription}>
//                 Lorem ipsum dolor sit amet, consectetur
//               </Text>
//               <Text style={styles.modalDescription}>
//                 adipiscing elit, sed do eiusmod.
//               </Text>
//             </View>

//             <CustomButton
//               btnHeight={height * 0.06}
//               btnWidth={width * 0.7}
//               text="Use My Location"
//               backgroundColor={colors.brown}
//               textColor={colors.white}
//               borderRadius={30}
//               onPress={handleSkip}
//             />

//             <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
//               <Text style={styles.skipButtonText}>Skip For Now</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
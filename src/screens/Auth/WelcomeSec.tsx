import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import {
  Image,
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { fontFamily } from '../../assets/Fonts';
import images from '../../assets/Images';
import CustomButton from '../../components/CustomButton';
import type { StackParamList } from '../../navigation/AuthStack';
import { height, width } from '../../utilities';
import { colors } from '../../utilities/colors';
import { fontSizes } from '../../utilities/fontsizes';

type Props = NativeStackScreenProps<StackParamList, 'WelcomeSec'>;

const WelcomeSec: React.FC<Props> = ({ navigation }) => {
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
  return (
    <ImageBackground source={images.simpleBg} style={styles.bgImg}>
      <View style={styles.logoMain}>
        <Image source={images.logo} style={styles.logo} />
      </View>
      <View style={styles.vectormain}>
        <Image source={images.Vector} style={styles.vectorimg} />
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Image source={images.secIcon} />

            <View>
              <Text style={styles.modalTitleOne}>Enable</Text>
              <Text style={styles.modalTitleTwo}>Your Location</Text>
            </View>
            <View style={styles.modalDescriptionMain}>
              <Text style={styles.modalDescription}>
                Lorem ipsum dolor sit amet, consectetur
              </Text>
              <Text style={styles.modalDescription}>
                adipiscing elit, sed do eiusmod.
              </Text>
            </View>

            <CustomButton
              btnHeight={height * 0.06}
              btnWidth={width * 0.7}
              text="Use My Location"
              backgroundColor={colors.brown}
              textColor={colors.white}
              borderRadius={30}
            />

            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
              <Text style={styles.skipButtonText}>Skip For Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibleSec}
        onRequestClose={() => setModalVisibleSec(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.contentMain}>
              <Text style={styles.selectText}>Select One</Text>
              <View style={styles.btnMain}>
                <CustomButton
                  btnHeight={height * 0.06}
                  btnWidth={width * 0.7}
                  text="User"
                  backgroundColor={colors.brown}
                  textColor={colors.white}
                  borderRadius={30}
                  onPress={handleNavigation}
                />
                <CustomButton
                  btnHeight={height * 0.06}
                  btnWidth={width * 0.7}
                  text="Driver"
                  backgroundColor={colors.brown}
                  textColor={colors.white}
                  borderRadius={30}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </ImageBackground>
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
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: colors.black,
    borderRadius: 16,
    width: width * 0.83,
    alignItems: 'center',
    borderWidth: 0.3,
    borderColor: colors.gray,
  },
  modalTitleOne: {
    fontFamily: fontFamily.ClashDisplaySemiBold,
    fontSize: fontSizes.lg2,
    textAlign: 'center',
    color: colors.white,
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
    color: colors.white,
    lineHeight: height * 0.03,
  },
  skipButton: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
  },
  skipButtonText: {
    color: '#666',
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
    color: colors.white,
  },
  btnMain: {
    gap: height * 0.02,
    top: height * 0.014,
  },
});

export default WelcomeSec;

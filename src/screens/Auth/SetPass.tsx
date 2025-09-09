import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { fontFamily } from '../../assets/Fonts';
import images from '../../assets/Images';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import TopHeader from '../../components/Topheader';
import type { StackParamList } from '../../navigation/AuthStack';
import { height, width } from '../../utilities';
import { colors } from '../../utilities/colors';
import { fontSizes } from '../../utilities/fontsizes';

type Props = NativeStackScreenProps<StackParamList, 'SetPassword'>;

const setPassword: React.FC<Props> = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const isFormValid = password.length > 0 && rePassword.length > 0;

  const toggleModal = () => {
    setModalVisible(true);
  };
  const toggleHome = () => {
    setModalVisible(false);
    navigation.navigate('CreateProfile');
  };
  const bgPress = () => {
    setModalVisible(false);
  };
  return (
    <TouchableWithoutFeedback onPress={bgPress}>
      <View style={{ flex: 1 }}>
        <TopHeader text="SetPassword" isBack={true} navigation={navigation} />
        <View style={styles.inputMain}>
          <Text style={styles.setPass}>Set Your Passwordbbb</Text>
          <CustomTextInput
            placeholder="*Enter your Password"
            placeholderTextColor={colors.black}
            borderColor={colors.gray}
            borderRadius={30}
            inputWidth={width * 0.85}
            inputHeight={height * 0.06}
            isPassword={true}
            value={password}
            onChangeText={setPassword}
            backgroundColor={colors.gray}
          />
          <CustomTextInput
            placeholder="*Re-Enter your Password"
            placeholderTextColor={colors.black}
            borderColor={colors.gray}
            borderRadius={30}
            inputWidth={width * 0.85}
            inputHeight={height * 0.06}
            isPassword={true}
            value={rePassword}
            onChangeText={setRePassword}
            backgroundColor={colors.gray}
          />
          <View style={styles.infoMain}>
            <Text style={styles.infoTextOne}>*Atleast</Text>
            <Text style={styles.infoTextTwo}>1 number and</Text>
            <Text style={styles.infoTextThree}>and</Text>
            <Text style={styles.infoTextFour}> 1 Special Character</Text>
          </View>
        </View>

        <View style={styles.btnMain}>
          <CustomButton
            btnHeight={height * 0.06}
            btnWidth={width * 0.81}
            text="Confirm"
            backgroundColor={isFormValid ? colors.brown : colors.black}
            textColor={colors.white}
            borderRadius={30}
            onPress={toggleModal}
            disabled={!isFormValid}
          />
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Image source={images.check} />
              <View style={{ padding: 15, alignItems: 'center' }}>
                <Text style={styles.modalText}>Password Changed</Text>
                <Text style={styles.modalText}>Successfully!</Text>
              </View>

              <CustomButton
                btnHeight={height * 0.06}
                btnWidth={width * 0.7}
                text="Back Home"
                backgroundColor={colors.brown}
                textColor={colors.white}
                borderRadius={30}
                onPress={toggleHome}
              />
            </View>
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  inputMain: {
    alignItems: 'center',
    top: height * 0.05,
    gap: height * 0.02,
  },
  setPass: {
    fontFamily: fontFamily.SfProDisplayRegular,
    fontSize: fontSizes.sm,
  },
  btnMain: {
    marginTop: height * 0.08,
    alignSelf: 'center',
  },
  infoMain: {
    flexDirection: 'row',
    right: width * 0.08,
  },
  infoTextOne: {
    fontFamily: fontFamily.SfProDisplayRegular,
    fontSize: fontSizes.xsm,
  },
  infoTextTwo: {
    fontFamily: fontFamily.SfProDisplayMedium,
    fontSize: fontSizes.xsm,
  },
  infoTextThree: {
    fontFamily: fontFamily.SfProDisplayRegular,
    fontSize: fontSizes.xsm,
  },
  infoTextFour: {
    fontFamily: fontFamily.SfProDisplayMedium,
    fontSize: fontSizes.xsm,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 16,
    width: width * 0.83,
    alignItems: 'center',
    borderWidth: 0.3,
    borderColor: colors.gray,
    padding: 20,
  },
  modalText: {
    fontFamily: fontFamily.SfProDisplayBold,
    fontSize: fontSizes.md,
  },
});

export default setPassword;

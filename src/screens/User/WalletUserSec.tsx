import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  Image,
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { fontFamily } from '../../assets/Fonts';
import images from '../../assets/Images';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import TopHeader from '../../components/Topheader';
import { height, width } from '../../utilities';
import { colors } from '../../utilities/colors';
import { fontSizes } from '../../utilities/fontsizes';

const WalletUserSec = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [amount, setAmount] = useState<string | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleHomeNavigation = () => {
    setModalVisible(false);
    navigation.navigate('HomeUser');
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={{ flex: 1 }}>
        <TopHeader text="Wallet" isBack={true} />
        <View style={styles.container}>
          <CustomTextInput
            placeholder="Enter Amount"
            placeholderTextColor={colors.black}
            borderColor={colors.darkGray}
            backgroundColor={colors.white}
            borderRadius={30}
            inputWidth={width * 0.85}
            inputHeight={height * 0.06}
            value={amount}
            onChangeText={setAmount}
          />
          <View style={styles.belowContent}>
            <Text style={styles.tipsText}>Select Payment Method</Text>
            <View style={{ gap: height * 0.01 }}>
              <TouchableOpacity
                style={[
                  styles.methodMain,
                  selectedMethod === 'visa' && {
                    borderColor: colors.brown,
                    backgroundColor: colors.lightBrown,
                  },
                ]}
                activeOpacity={0.6}
                onPress={() => setSelectedMethod('visa')}
              >
                <Image source={images.visa} />
                <View style={styles.methodTextMain}>
                  <Text style={styles.cardText}>**** **** **** 8970</Text>
                  <Text style={styles.cardText}>Expires: 12/26</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.methodMain,
                  selectedMethod === 'mastercard' && {
                    borderColor: colors.brown,
                    backgroundColor: colors.lightBrown,
                  },
                ]}
                activeOpacity={0.7}
                onPress={() => setSelectedMethod('mastercard')}
              >
                <Image source={images.masterCard} />
                <View style={styles.methodTextMain}>
                  <Text style={styles.cardText}>**** **** **** 8970</Text>
                  <Text style={styles.cardText}>Expires: 12/26</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addMoneyMain}
                activeOpacity={0.7}
                onPress={() => navigation.navigate('AddPaymentMethod')}
              >
                <Text style={styles.addMoneyText}>+ Add Payment Mothod</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.btnMain}>
            <CustomButton
              btnWidth={width * 0.9}
              btnHeight={height * 0.07}
              backgroundColor={selectedMethod ? colors.brown : colors.black}
              text="Continue"
              textColor={colors.white}
              borderRadius={30}
              disabled={!selectedMethod}
              onPress={() => setModalVisible(true)}
            />
          </View>
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Image source={images.cash} style={styles.cashImg} />
              <Text style={styles.successText}>Add Success</Text>
              <View
                style={{
                  alignItems: 'center',
                  paddingVertical: height * 0.015,
                }}
              >
                <Text style={styles.paraText}>Your Money has been Added</Text>
                <Text style={styles.paraText}>Successfully</Text>
              </View>
              <View style={{ paddingVertical: height * 0.013 }}>
                <CustomButton
                  btnHeight={height * 0.055}
                  btnWidth={width * 0.7}
                  text="Back Home"
                  backgroundColor={colors.brown}
                  textColor={colors.white}
                  borderRadius={30}
                  onPress={handleHomeNavigation}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  belowContent: {
    top: height * 0.04,
  },
  payText: {
    fontFamily: fontFamily.ClashDisplayMedium,
    fontSize: fontSizes.md,
    right: width * 0.16,
  },
  tipsText: {
    fontFamily: fontFamily.ClashDisplayMedium,
    fontSize: fontSizes.md,
    color: colors.black,
  },
  tipsMain: {
    alignItems: 'center',
    gap: width * 0.03,
    width: width * 0.15,
    top: height * 0.03,
  },
  methodMain: {
    width: width * 0.85,
    height: height * 0.08,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.darkGray,
    backgroundColor: colors.lightGray,
    marginTop: height * 0.01,
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
    flexDirection: 'row',
  },
  methodTextMain: {
    left: width * 0.075,
  },
  cardText: {
    fontFamily: fontFamily.ClashDisplayMedium,
    fontSize: fontSizes.sm,
    color: colors.black,
  },
  addMoneyMain: {
    borderWidth: 1,
    borderColor: colors.brown,
    borderRadius: 30,
    backgroundColor: colors.lightBrown,
    width: width * 0.85,
    height: height * 0.07,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addMoneyText: {
    fontFamily: fontFamily.SfProDisplayRegular,
    color: colors.black,
    fontSize: fontSizes.sm2,
  },
  btnMain: {
    top: height * 0.48,
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
  cashImg: {
    width: width * 0.3,
    height: height * 0.1,
    resizeMode: 'contain',
  },
  successText: {
    fontFamily: fontFamily.ClashDisplayMedium,
    color: colors.black,
    fontSize: fontSizes.md,
  },
  paraText: {
    fontFamily: fontFamily.ClashDisplayRegular,
    color: colors.black,
    fontSize: fontSizes.sm,
  },
});

export default WalletUserSec;

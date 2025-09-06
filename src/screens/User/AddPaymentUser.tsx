import { useState } from 'react';
import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { fontFamily } from '../../assets/Fonts';
import images from '../../assets/Images';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import TopHeader from '../../components/Topheader';
import { height, width } from '../../utilities';
import { colors } from '../../utilities/colors';
import { fontSizes } from '../../utilities/fontsizes';

const AddPaymentMethod = () => {
  const [name, setName] = useState<string | null>(null);
  const [number, setNumber] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [cvc, setCvc] = useState<string | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [agree, setAgree] = useState(false);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const isFormValid = name.length > 4 && number.length;

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={{ flex: 1 }}>
        <TopHeader text="Add Payment Method" isBack={true} />
        <View style={styles.container}>
          <View style={styles.inputMain}>
            <CustomTextInput
              placeholder="Account Holder Name"
              placeholderTextColor={colors.black}
              borderColor={colors.darkGray}
              backgroundColor={colors.white}
              borderRadius={30}
              inputWidth={width * 0.85}
              inputHeight={height * 0.06}
              value={name}
              onChangeText={setName}
              keyboardType="default"
            />
            <CustomTextInput
              placeholder="Card Number"
              placeholderTextColor={colors.black}
              borderColor={colors.darkGray}
              backgroundColor={colors.white}
              borderRadius={30}
              inputWidth={width * 0.85}
              inputHeight={height * 0.06}
              value={number}
              onChangeText={setNumber}
              keyboardType="number-pad"
            />
            <View style={styles.rowInput}>
              <CustomTextInput
                placeholder="Exp Date"
                placeholderTextColor={colors.black}
                borderColor={colors.darkGray}
                backgroundColor={colors.white}
                borderRadius={30}
                inputWidth={width * 0.41}
                inputHeight={height * 0.06}
                value={date}
                onChangeText={setDate}
                keyboardType="number-pad"
              />
              <CustomTextInput
                placeholder="CVC"
                placeholderTextColor={colors.black}
                borderColor={colors.darkGray}
                backgroundColor={colors.white}
                borderRadius={30}
                inputWidth={width * 0.41}
                inputHeight={height * 0.06}
                value={cvc}
                onChangeText={setCvc}
                keyboardType="number-pad"
                maxLength={3}
              />
            </View>
          </View>
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
              <View style={styles.checkboxContainer}>
                <BouncyCheckbox
                  size={24}
                  fillColor={colors.brown}
                  unfillColor={colors.white}
                  isChecked={agree}
                  disableBuiltInState
                  iconStyle={{
                    borderColor: colors.brown,
                    borderWidth: 2,
                    borderRadius: 8,
                  }}
                  innerIconStyle={{
                    borderRadius: 8,
                  }}
                  text="Save this card for future payments"
                  textStyle={styles.checkboxText}
                  onPress={() => setAgree(!agree)}
                />
              </View>
            </View>
          </View>
          <View style={styles.btnMain}>
            <CustomButton
              btnHeight={height * 0.06}
              btnWidth={width * 0.85}
              text="Save Payment Method"
              backgroundColor={isFormValid ? colors.brown : colors.black}
              textColor={isFormValid ? colors.white : colors.white}
              borderRadius={30}
              disabled={!isFormValid}
            />
            <CustomButton
              btnHeight={height * 0.06}
              btnWidth={width * 0.85}
              text="Cancel"
              backgroundColor={colors.black}
              textColor={colors.white}
              borderRadius={30}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  inputMain: {
    alignItems: 'center',
    gap: height * 0.01,
  },
  rowInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.85,
  },
  tipsText: {
    fontFamily: fontFamily.ClashDisplayMedium,
    fontSize: fontSizes.md,
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
  belowContent: {
    top: height * 0.03,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.82,
    top: height * 0.01,
  },
  checkboxText: {
    fontSize: fontSizes.xm2,
    color: colors.black,
    textDecorationLine: 'none',
  },
  btnMain: {
    gap: height * 0.01,
    top: height * 0.2,
  },
});

export default AddPaymentMethod;

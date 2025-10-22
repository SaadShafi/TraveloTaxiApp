import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { fontFamily } from '../../assets/Fonts';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import TopHeader from '../../components/Topheader';
import { StackParamList } from '../../navigation/AuthStack';
import { height, width } from '../../utilities';
import { colors } from '../../utilities/colors';
import { fontSizes } from '../../utilities/fontsizes';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { apiHelper } from '../../services';
import Toast from 'react-native-toast-message';

type Props = NativeStackScreenProps<StackParamList, 'ForgotPassword'>;

const ForgotPassword = ({ route }) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const Email = route.params.email;
  console.log("Email passed to ForgotPassword screen:", Email);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const isEmail = email.includes('@');
  const isPhone = /^[0-9]+$/.test(email); // only digits allowed
  const isFormValid = isEmail || isPhone;

  const handleForgeotPass = async () => {
    setLoading(true);

    try {
      const body = {
        email: Email,
      }
      const { response, error } = await apiHelper("POST", "auth/forgot-password", {}, body);
      console.log("Forgot Password Response:", response);

      if (response) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Password Reset Successfully',
        });
        navigation.navigate('PhoneVerification', { email: Email });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Something went wrong. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={{ flex: 1 }}>
        <TopHeader
          text="Forgot Password"
          isBack={true}
          navigation={navigation}
        />
        <View style={styles.container}>
          <Text style={styles.textMain}>
            Please enter your email / phone number to get OTP
          </Text>
          <CustomTextInput
            placeholder="*Enter your Email/Phone"
            placeholderTextColor={colors.black}
            borderColor={colors.gray}
            borderRadius={30}
            inputWidth={width * 0.85}
            inputHeight={height * 0.06}
            value={email}
            onChangeText={setEmail}
            backgroundColor={colors.white}
          />
          <View style={styles.btnMain}>
            <CustomButton
              btnHeight={height * 0.06}
              btnWidth={width * 0.85}
              text="Continue"
              backgroundColor={isFormValid ? colors.brown : colors.black}
              textColor={colors.white}
              borderRadius={30}
              disabled={!isFormValid}
              onPress={() => navigation.navigate('PhoneVerification')}
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
    gap: height * 0.019,
    top: height * 0.03,
  },
  textMain: {
    fontFamily: fontFamily.SfProDisplayRegular,
    fontSize: fontSizes.sm,
    color: colors.black,
  },
  btnMain: {
    top: height * 0.7,
  },
});

export default ForgotPassword;

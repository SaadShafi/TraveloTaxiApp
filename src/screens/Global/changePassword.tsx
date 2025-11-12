import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import TopHeader from '../../components/Topheader';
import { StackParamList } from '../../navigation/AuthStack';
import { height, width } from '../../utilities';
import { colors } from '../../utilities/colors';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Toast from 'react-native-toast-message';
import { apiHelper } from '../../services';

type Props = NativeStackScreenProps<StackParamList, 'ChangePass'>;

const ChangePassWord = () => {
  const navigation = useNavigation<NavigationProp<any>>()
  const [oldPass, setOldPass] = useState('');
  const [password, setPassword] = useState('');
  const [rePass, setRePass] = useState('');
  const [loading, setLoading] = useState(false)
  const User = useSelector((state: RootState) => state.role.user)
  console.log("USer from redux in the Change Password Screen!",User)

  const isFormValid =
    oldPass.trim().length > 0 &&
    password.trim().length > 0 &&
    rePass.trim().length > 0 &&
    password === rePass;

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const resetPassword = async () => {
    setLoading(true);

    try {
      const body = {
        old_password: oldPass,
        new_password: password
      }
      const { response, error } = await apiHelper("PUT", "user/change-password", {}, body);
      console.log("Change Password Response:", response);
      if (response) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Password Changed Successfully',
        });
        navigation.goBack();
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to change password',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={{ flex: 1 }}>
        <TopHeader
          text="Change Password"
          isBack={true}
        />
        <View style={styles.container}>
          <View style={styles.inputMain}>
            <CustomTextInput
              placeholder="*Old Password"
              placeholderTextColor={colors.black}
              borderColor={colors.gray}
              borderRadius={30}
              inputWidth={width * 0.85}
              inputHeight={height * 0.06}
              value={oldPass}
              onChangeText={setOldPass}
              isPassword={true}
            />
            <CustomTextInput
              placeholder="*New Password"
              placeholderTextColor={colors.black}
              borderColor={colors.gray}
              borderRadius={30}
              inputWidth={width * 0.85}
              inputHeight={height * 0.06}
              value={password}
              onChangeText={setPassword}
              isPassword={true}
            />
            <CustomTextInput
              placeholder="*Re-Enter your Password"
              placeholderTextColor={colors.black}
              borderColor={colors.gray}
              borderRadius={30}
              inputWidth={width * 0.85}
              inputHeight={height * 0.06}
              value={rePass}
              onChangeText={setRePass}
              isPassword={true}
            />
            <View style={{ marginTop: height * 0.02 }}>
              <CustomButton
                btnHeight={height * 0.06}
                btnWidth={width * 0.85}
                text="Save"
                backgroundColor={isFormValid ? colors.brown : colors.black}
                textColor={colors.white}
                borderRadius={30}
                disabled={!isFormValid}
                // onPress={() => navigation.goBack()}
                onPress={resetPassword}
              />
            </View>
          </View>
        </View>
        {loading && (
            <View style={styles.loaderOverlay}>
                <ActivityIndicator size="large" color={colors.brown} />
            </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: height * 0.02,
  },
  inputMain: {
    gap: height * 0.01,
    marginTop: height * 0.02,
  },
    loaderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)', // semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
});

export default ChangePassWord;

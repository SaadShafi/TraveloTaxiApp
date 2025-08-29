import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import {
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

type Props = NativeStackScreenProps<StackParamList, 'ChangePass'>;

const ChangePassWord: React.FC<Props> = ({ navigation }) => {
  const [oldPass, setOldPass] = useState('');
  const [password, setPassword] = useState('');
  const [rePass, setRePass] = useState('');

  const isFormValid =
    oldPass.trim().length > 0 &&
    password.trim().length > 0 &&
    rePass.trim().length > 0 &&
    password === rePass;

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={{ flex: 1 }}>
        <TopHeader
          text="Change Password"
          isBack={true}
          navigation={navigation}
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
                // onPress={() => navigation.navigate('')}
              />
            </View>
          </View>
        </View>
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
});

export default ChangePassWord;

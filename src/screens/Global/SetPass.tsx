import { StyleSheet, Text, View } from 'react-native';
import { fontFamily } from '../../assets/Fonts';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import TopHeader from '../../components/Topheader';
import { height, width } from '../../utilities';
import { colors } from '../../utilities/colors';
import { fontSizes } from '../../utilities/fontsizes';

const setPassword = () => {
  return (
    <View style={{ flex: 1 }}>
      <TopHeader text="SetPassword" isBack={true} />
      <View style={styles.inputMain}>
        <Text style={styles.setPass}>Set Your Password</Text>
        <CustomTextInput
          placeholder="*Enter your Password"
          placeholderTextColor={colors.black}
          borderColor={colors.gray}
          borderRadius={30}
          inputWidth={width * 0.85}
          inputHeight={height * 0.06}
          isPassword={true}
        />
        <CustomTextInput
          placeholder="*Re-Enter your Password"
          placeholderTextColor={colors.black}
          borderColor={colors.gray}
          borderRadius={30}
          inputWidth={width * 0.85}
          inputHeight={height * 0.06}
          isPassword={true}
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
          text="Register"
          backgroundColor={colors.gray}
          textColor={colors.black}
          borderRadius={30}
        />
      </View>
    </View>
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
  },
  infoTextTwo: {
    fontFamily: fontFamily.SfProDisplayMedium,
  },
  infoTextThree: {
    fontFamily: fontFamily.SfProDisplayRegular,
  },
  infoTextFour: {
    fontFamily: fontFamily.SfProDisplayMedium,
  },
});

export default setPassword;

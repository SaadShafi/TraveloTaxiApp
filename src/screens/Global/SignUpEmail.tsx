import react from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { colors } from '../../utilities/colors';
import { fontFamily } from '../../assets/Fonts';
import { fontSizes } from '../../utilities/fontsizes';
import images from '../../assets/Images';
import { width } from '../../utilities';
import { height } from '../../utilities';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';

const SignUpEmail = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.signup}>Sign Up With Your</Text>
      <Text style={styles.signup}>Email Or Phone Number</Text>

      {/* Name Field */}
      <View style={styles.emailContainer}>
        <CustomTextInput
          placeholder="Enter Your Name..."
          placeholderTextColor={colors.black}
          borderColor={colors.brown}
          borderRadius={30}
          inputWidth={width * 0.85}
          inputHeight={height * 0.06}
        />
      </View>

      {/* Phone Field with England Flag + Code */}
      <View style={styles.phoneContainer}>
        <View style={styles.phoneRow}>
          {/* England Flag */}
          <Image
            source={{ uri: "https://flagcdn.com/w20/gb.png" }} // UK flag image
            style={styles.flag}
          />

          {/* Country Code */}
          <Text style={styles.code}>+44</Text>

          {/* Phone Number Input */}
          <CustomTextInput
            placeholder="Enter Your Phone Number..."
            placeholderTextColor={colors.black}
            borderColor={colors.brown}
            borderRadius={30}
            inputWidth={width * 0.6}   // reduced width to fit beside flag & code
            inputHeight={height * 0.06}
            keyboardType="phone-pad"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  signup: {
    color: colors.black,
    fontFamily: fontFamily.ClashDisplayMedium,
    fontSize: fontSizes.lg2,
    top: height * 0.1,
  },
  emailContainer: {
    top: height * 0.13,
  },
  phoneContainer: {
    top: height * 0.15,
  },
  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: colors.brown,
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 10,
    width: width * 0.85,
    height: height * 0.06,
  },
  flag: {
    width: width * 0.055,
    height: height * 0.02,
    marginRight: 8,
  },
  code: {
    fontSize: fontSizes.sm2,
    color: colors.black,
    marginRight: width * 0.02,
    fontFamily: fontFamily.ClashDisplayMedium,
  },
});

export default SignUpEmail;

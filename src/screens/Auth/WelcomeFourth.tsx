import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { fontFamily } from '../../assets/Fonts';
import CustomButton from '../../components/CustomButton';
import type { StackParamList } from '../../navigation/AuthStack';
import { height, width } from '../../utilities';
import { colors } from '../../utilities/colors';
import { fontSizes } from '../../utilities/fontsizes';

type Props = NativeStackScreenProps<StackParamList, 'WelcomeFourth'>;

const WelcomeFourth: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: colors.lightGray }}>
      {/* <ImageBackground source={images.background} style={styles.bgImg}> */}
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome</Text>
        <View style={styles.paraMain}>
          <Text style={styles.paraText}>
            Lorem ipsum dolor sit amet, consectetur
          </Text>
          <Text style={styles.paraText}>adipiscing elit, sed do eiusmod.</Text>
        </View>
        <View style={styles.btnMain}>
          <CustomButton
            text="Create An Account"
            btnWidth={width * 0.85}
            btnHeight={height * 0.067}
            backgroundColor={colors.brown}
            textColor={colors.white}
            borderRadius={30}
            onPress={() => navigation.navigate('SignUpEmail')}
          />
          <CustomButton
            text="Sign In"
            btnWidth={width * 0.85}
            btnHeight={height * 0.067}
            backgroundColor={colors.gray}
            textColor={colors.black}
            borderRadius={30}
            onPress={() => navigation.navigate('SignIn')}
          />
        </View>
      </View>
      {/* </ImageBackground> */}
    </View>
  );
};
const styles = StyleSheet.create({
  bgImg: {
    flex: 1,
    width: width * 1,
    height: height * 1,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.7,
  },
  welcome: {
    fontFamily: fontFamily.ClashDisplayMedium,
    color: colors.black,
    fontSize: fontSizes.lg2,
  },
  paraMain: {
    marginTop: height * 0.01,
    alignItems: 'center',
    gap: height * 0.005,
  },
  paraText: {
    fontFamily: fontFamily.ClashDisplayLight,
    color: colors.darkGray,
    fontSize: fontSizes.sm2,
  },
  btnMain: {
    marginTop: height * 0.04,
    gap: height * 0.02,
  },
});

export default WelcomeFourth;

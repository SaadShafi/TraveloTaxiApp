import { NavigationProp, useNavigation } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View } from 'react-native';
import { fontFamily } from '../../assets/Fonts';
import images from '../../assets/Images';
import CustomButton from '../../components/CustomButton';
import TopHeader from '../../components/Topheader';
import type { StackParamList } from '../../navigation/AuthStack';
import { height, width } from '../../utilities';
import { colors } from '../../utilities/colors';
import { fontSizes } from '../../utilities/fontsizes';

type Props = NativeStackScreenProps<StackParamList, 'FindingDriver'>;

const FindingDriverSec: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <TopHeader text="Finding Driver" />
      <View
        style={{
          alignItems: 'center',
          top: height * 0.3,
        }}
      >
        <View style={{ alignItems: 'center', gap: height * 0.02 }}>
          <Image source={images.success} style={styles.successImg} />
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.text}>Booking Done</Text>
            <Text style={styles.text}>Successfully</Text>
          </View>
        </View>
        <View style={styles.btnMain}>
          <Image source={images.logoSec} style={styles.logo} />
          <View>
            <CustomButton
              btnHeight={height * 0.07}
              btnWidth={width * 0.85}
              borderColor={colors.black}
              borderRadius={30}
              borderWidth={1}
              backgroundColor={colors.black}
              text="Return Home"
              textColor={colors.white}
              onPress={() => navigation.navigate('HomeUser')}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: width * 0.5,
    height: height * 0.2,
    resizeMode: 'contain',
    top: height * 0.02,
  },
  successImg: {
    width: width * 0.3,
    height: height * 0.1,
    resizeMode: 'contain',
  },
  btnMain: {
    top: height * 0.13,
    alignItems: 'center',
  },
  text: {
    fontFamily: fontFamily.ClashDisplayMedium,
    fontSize: fontSizes.lg2,
    color: colors.black,
  },
});

export default FindingDriverSec;

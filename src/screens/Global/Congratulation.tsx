import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { fontFamily } from '../../assets/Fonts';
import images from '../../assets/Images';
import CustomButton from '../../components/CustomButton';
import TopHeader from '../../components/Topheader';
import type { StackParamList } from '../../navigation/AuthStack';
import { height, width } from '../../utilities';
import { colors } from '../../utilities/colors';

type Props = NativeStackScreenProps<StackParamList, 'Congratulation'>;

const Congratulation: React.FC<Props> = ({ navigation }) => {
  return (
    <ImageBackground source={images.Shade} style={{ flex: 1 }}>
      <TopHeader isBack={true} navigation={navigation} />
      <Image source={images.success} style={styles.success} />
      <Text style={styles.saved}>Profile Saved</Text>
      <Text style={styles.successfully}>Succesfully</Text>

      <View style={{ top: height * 0.63, alignItems: 'center' }}>
        <CustomButton
          btnHeight={height * 0.07}
          btnWidth={width * 0.85}
          text="Continue To Sign In"
          backgroundColor={colors.brown}
          textColor={colors.white}
          borderRadius={30}
          onPress={() => navigation.navigate('SignIn')}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  success: {
    alignSelf: 'center',
    top: height * 0.26,
  },
  saved: {
    alignSelf: 'center',
    top: height * 0.3,
    fontFamily: fontFamily.ClashDisplayMedium,
    fontSize: 25,
  },
  successfully: {
    alignSelf: 'center',
    top: height * 0.3,
    fontFamily: fontFamily.ClashDisplayMedium,
    fontSize: 25,
  },
});

export default Congratulation;

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { fontFamily } from '../../assets/Fonts';
import TopHeader from '../../components/Topheader';
import { StackParamList } from '../../navigation/AuthStack';
import { height, width } from '../../utilities';
import { colors } from '../../utilities/colors';
import { fontSizes } from '../../utilities/fontsizes';

type Props = NativeStackScreenProps<StackParamList, 'TermsCondition'>;

const TermsCondition: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <TopHeader text="Terms and Conditions" isBack={true} />
      <View style={styles.container}>
        <Text style={styles.aboutText}>Terms and Conditions</Text>
        <View style={{ top: height * 0.02, gap: height * 0.03 }}>
          <Text style={styles.paraText}>
            Professional Rideshare Platform. Here we will provide you only
            interesting content, which you will like very much. We're dedicated
            to providing you the best of Rideshare, with a focus on
            dependability and Earning.
          </Text>
          <Text style={styles.paraText}>
            We're working to turn our passion for Rideshare into a booming
            online website. We hope you enjoy our Rideshare as much as we enjoy
            offering them to you. I will keep posting more important posts on my
            Website for all of you. Please give your support and love.
          </Text>
          <Text style={styles.paraText}>
            Professional Rideshare Platform. Here we will provide you only
            interesting content, which you will like very much. We're dedicated
            to providing you the best of Rideshare, with a focus on
            dependability and Earning.
          </Text>
          <Text style={styles.paraText}>
            We're working to turn our passion for Rideshare into a booming
            online website. We hope you enjoy our Rideshare as much as we enjoy
            offering them to you. I will keep posting more important posts on my
            Website for all of you. Please give your support and love.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    paddingHorizontal: width * 0.06,
    top: height * 0.03,
  },
  aboutText: {
    fontFamily: fontFamily.ClashDisplayMedium,
    fontSize: fontSizes.md,
    color: colors.black,
  },
  paraText: {
    fontFamily: fontFamily.ClashDisplayMedium,
    fontSize: fontSizes.sm,
    textAlign: 'justify',
    color: colors.darkGray,
    lineHeight: height * 0.023,
  },
});

export default TermsCondition;

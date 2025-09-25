import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { fontFamily } from '../../assets/Fonts';
import TopHeader from '../../components/Topheader';
import { StackParamList } from '../../navigation/AuthStack';
import { height, width } from '../../utilities';
import { colors } from '../../utilities/colors';
import { fontSizes } from '../../utilities/fontsizes';

type Props = NativeStackScreenProps<StackParamList, 'PrivacyPolicy'>;

const PrivacyPolicy: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <TopHeader text="Privacy Policy" isBack={true} />
      <View style={styles.container}>
        <Text style={styles.aboutText}>Privacy Policy</Text>
        <View style={{ top: height * 0.02, gap: height * 0.03 }}>
          <Text style={styles.paraText}>
            At Rideshare, accessible from rideshare.com, one of our main
            priorities is the privacy of our visitors. This Privacy Policy
            document contains types of information that is collected and
            recorded by rideshare and how we use it. If you have additional
            questions or require more information about our Privacy Policy, do
            not hesitate to contact us.
          </Text>
          <Text style={styles.paraText}>
            This Privacy Policy applies only to our online activities and is
            valid for visitors to our website with regards to the information
            that they shared and/or collect in rideshare. This policy is not
            applicable to any information collected offline or via channels
            other than this website. Our Privacy Policy was created with the
            help of the Free Privacy Policy Generator.
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

export default PrivacyPolicy;

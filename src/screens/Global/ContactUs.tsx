import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View } from 'react-native';
import { fontFamily } from '../../assets/Fonts';
import images from '../../assets/Images';
import TopHeader from '../../components/Topheader';
import { StackParamList } from '../../navigation/AuthStack';
import { height, width } from '../../utilities';
import { colors } from '../../utilities/colors';
import { fontSizes } from '../../utilities/fontsizes';

type Props = NativeStackScreenProps<StackParamList, 'ContactUs'>;

const ContactUs: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: colors.lightGray }}>
      <TopHeader text="Contact Us" isBack={true} />

      <View style={styles.container}>
        <View style={styles.textMain}>
          <Text style={styles.text}>
            You can get in touch with us through below platforms.
          </Text>
          <Text style={styles.text}>
            Our team will reach out to you as soon as possible.
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Customer Support</Text>

          <View style={styles.infoMain}>
            <View style={styles.row}>
              <Image source={images.email} style={styles.icon} />
              <View>
                <Text style={styles.label}>Email Address</Text>
                <Text style={styles.value}>info@travelo.com</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.card}>
          <Text style={[styles.cardTitle, { marginBottom: height * 0.01 }]}>
            Follow us on Social Media
          </Text>

          <View style={[styles.row, { left: width * 0.03 }]}>
            <Image source={images.facebook} style={styles.icon} />
            <View>
              <Text style={styles.label}>Facebook</Text>
              <Text style={styles.value}>+1 (355) 123-6789</Text>
            </View>
          </View>

          <View style={[styles.row, { left: width * 0.03 }]}>
            <Image source={images.instagram} style={styles.icon} />
            <View>
              <Text style={styles.label}>Instagram</Text>
              <Text style={styles.value}>info@travelo.com</Text>
            </View>
          </View>

          <View style={[styles.row, { left: width * 0.03 }]}>
            <Image source={images.twitter} style={styles.icon} />
            <View>
              <Text style={styles.label}>Twitter</Text>
              <Text style={styles.value}>info@travelo.com</Text>
            </View>
          </View>
        </View>
        <View style={styles.imgMain}>
          <Image source={images.logo} style={styles.logoImg} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imgMain: {
    alignItems: 'center',
  },
  logoImg: {
    width: width * 0.45,
    height: height * 0.45,
    resizeMode: 'contain',
  },
  container: {
    alignItems: 'center',
    gap: height * 0.025,
    marginTop: height * 0.02,
  },
  textMain: {
    width: width * 0.9,
  },
  text: {
    fontFamily: fontFamily.SfProDisplayRegular,
    fontSize: fontSizes.sm,
    color: colors.black,
  },
  card: {
    width: width * 0.9,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 15,
  },
  cardTitle: {
    fontFamily: fontFamily.ClashDisplayMedium,
    fontSize: fontSizes.md,
    color: colors.black,
    left: width * 0.04,
  },
  infoMain: {
    paddingHorizontal: width * 0.03,
    top: height * 0.01,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: width * 0.04,
  },
  icon: {
    width: width * 0.12,
    height: height * 0.08,
    resizeMode: 'contain',
  },
  label: {
    fontFamily: fontFamily.SfProDisplayRegular,
    fontSize: fontSizes.sm,
    color: colors.darkGray,
  },
  value: {
    fontFamily: fontFamily.SfProDisplayMedium,
    fontSize: fontSizes.sm,
    color: colors.black,
  },
});

export default ContactUs;

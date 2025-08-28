import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { fontFamily } from '../../assets/Fonts';
import TopHeader from '../../components/Topheader';
import type { StackParamList } from '../../navigation/AuthStack';
import { width } from '../../utilities';
import { colors } from '../../utilities/colors';
import { fontSizes } from '../../utilities/fontsizes';

type Props = NativeStackScreenProps<StackParamList, 'PaymentUser'>;

interface tipsProp {
  price: string;
  Image: any;
}

const PaymentUser: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <TopHeader text="Payment" isMenu={true} navigation={navigation} />
      <View style={styles.containerMain}>
        <View style={styles.containerOne}>
          <Text style={styles.tipsText}>Give Some Tips to Adam James</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerMain: {
    alignItems: 'center',
  },
  containerOne: {
    backgroundColor: colors.gray,
    borderRadius: 10,
    width: width * 0.85,
    padding: 10,
    alignItems: 'center',
  },
  tipsText: {
    fontFamily: fontFamily.ClashDisplayMedium,
    fontSize: fontSizes.md,
  },
});

export default PaymentUser;

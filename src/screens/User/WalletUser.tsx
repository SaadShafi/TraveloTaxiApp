import { useNavigation } from '@react-navigation/native';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { fontFamily } from '../../assets/Fonts';
import images from '../../assets/Images';
import TopHeader from '../../components/Topheader';
import { height, width } from '../../utilities';
import { colors } from '../../utilities/colors';
import { fontSizes } from '../../utilities/fontsizes';

interface transProp {
  image?: any;
  name?: string;
  date?: string;
  price?: string;
}

const WalletUser = () => {
  const navigation = useNavigation<any>();
  const transactionData = [
    {
      image: images.card,
      name: 'Edward',
      date: 'Today at 09:20 am',
      price: '$230.00',
    },
    {
      image: images.card,
      name: 'Edward',
      date: 'Today at 09:20 am',
      price: '$230.00',
    },
    {
      image: images.card,
      name: 'Edward',
      date: 'Today at 09:20 am',
      price: '$230.00',
    },
    {
      image: images.card,
      name: 'Edward',
      date: 'Today at 09:20 am',
      price: '$230.00',
    },
    {
      image: images.card,
      name: 'Edward',
      date: 'Today at 09:20 am',
      price: '$230.00',
    },
    {
      image: images.card,
      name: 'Edward',
      date: 'Today at 09:20 am',
      price: '$230.00',
    },
    {
      image: images.card,
      name: 'Edward',
      date: 'Today at 09:20 am',
      price: '$230.00',
    },
    {
      image: images.card,
      name: 'Edward',
      date: 'Today at 09:20 am',
      price: '$230.00',
    },
  ];

  const TransactionBox = ({ item }: { item: transProp }) => {
    return (
      <View style={styles.transContainer}>
        <View style={styles.contentMain}>
          <Image source={images.card} style={styles.cardImg} />
          <View style={styles.nameMain}>
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
            <View>
              <Text style={styles.price}>{item.price}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <TopHeader text="Wallet" isBack={true} />
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.addMoneyMain}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('WalletUserSec')}
        >
          <Text style={styles.addMoneyText}>+ Add Money</Text>
        </TouchableOpacity>
        <View style={styles.balanceContainer}>
          <View style={styles.containerOne}>
            <View
              style={{
                flexDirection: 'column',
                gap: height * 0.01,
                alignItems: 'center',
              }}
            >
              <Text style={styles.amount}>$300</Text>
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.text}>Available</Text>
                <Text style={styles.text}>Balance</Text>
              </View>
            </View>
          </View>
          <View style={styles.containerSec}>
            <View
              style={{
                flexDirection: 'column',
                gap: height * 0.01,
                alignItems: 'center',
              }}
            >
              <Text style={styles.amount}>$300</Text>
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.text}>Total</Text>
                <Text style={styles.text}>Expend</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.transactionsMain}>
          <Text style={styles.transaction}>Transactins</Text>
          {/* <Text style={styles.seeAll}>See All</Text> */}
        </View>
        <FlatList
          data={transactionData}
          renderItem={TransactionBox}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{
            gap: height * 0.02,
            paddingBottom: height * 0.02,
          }}
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  name: {
    fontFamily: fontFamily.SfProDisplayMedium,
    fontSize: fontSizes.sm2,
    fontWeight: 'bold',
    color: colors.black,
  },
  date: {
    fontFamily: fontFamily.SfProDisplayMedium,
    fontSize: fontSizes.sm,
    fontWeight: 'regular',
    color: colors.darkGray,
  },
  price: {
    fontFamily: fontFamily.SfProDisplayMedium,
    fontSize: fontSizes.sm2,
    fontWeight: 'bold',
    color: colors.brown,
  },
  container: {
    alignItems: 'center',
    gap: height * 0.02,
    flex: 1,
  },
  addMoneyMain: {
    borderWidth: 2,
    borderColor: colors.brown,
    borderRadius: 30,
    borderStyle: 'dashed',
    backgroundColor: colors.lightBrown,
    width: width * 0.8,
    height: height * 0.07,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addMoneyText: {
    fontFamily: fontFamily.SfProDisplayRegular,
    color: colors.black,
    fontSize: fontSizes.sm2,
  },
  balanceContainer: {
    width: width * 0.85,
    height: height * 0.17,
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: colors.white,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.03,
  },
  containerOne: {
    width: width * 0.37,
    height: height * 0.14,
    borderColor: colors.brown,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: colors.lightBrown,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerSec: {
    width: width * 0.37,
    height: height * 0.14,
    borderColor: colors.yellow,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: colors.lightYellow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amount: {
    fontFamily: fontFamily.ClashDisplayMedium,
    fontSize: fontSizes.lg,
    color: colors.brown,
  },
  text: {
    fontFamily: fontFamily.SfProDisplayMedium,
    fontSize: fontSizes.sm2,
    color: colors.brown,
  },
  transactionsMain: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.8,
  },
  transaction: {
    fontFamily: fontFamily.ClashDisplayMedium,
    fontSize: fontSizes.md,
    color: colors.black,
  },
  seeAll: {
    fontFamily: fontFamily.SfProDisplayMedium,
    fontSize: fontSizes.sm,
    textDecorationLine: 'underline',
  },
  transContainer: {
    alignItems: 'center',
    gap: width * 0.05,
  },
  contentMain: {
    backgroundColor: colors.lightGray,
    borderColor: colors.gray,
    borderWidth: 1,
    width: width * 0.85,
    height: height * 0.1,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.04,
  },
  cardImg: {
    width: width * 0.12,
    height: height * 0.1,
    resizeMode: 'contain',
  },
  nameMain: {
    width: width * 0.65,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: width * 0.03,
  },
});

export default WalletUser;

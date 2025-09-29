import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
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
import CustomButton from '../../components/CustomButton';
import TopHeader from '../../components/Topheader';
import type { StackParamList } from '../../navigation/AuthStack';
import { height, width } from '../../utilities';
import { colors } from '../../utilities/colors';
import { fontSizes } from '../../utilities/fontsizes';

type Props = NativeStackScreenProps<StackParamList, 'PaymentUser'>;

interface tipsProp {
  price: string;
  Image?: any;
}

const PaymentUser: React.FC<Props> = ({ navigation }) => {
  // const [tips, setTips] = useState<tipsProp>();
  // const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [tip, setTip] = useState<number>(5); // default $5 tip
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  // const tipsData = [
  //   {
  //     price: '$5',
  //   },
  //   {
  //     price: '$10',
  //   },
  //   {
  //     price: '$15',
  //   },
  //   {
  //     price: '$20',
  //   },
  // ];
  // const tipsFields = ({ item }: { item: tipsProp }) => {
  //   return (
  //     <View style={styles.tipsMain}>
  //       <View style={styles.tipsContainer}>
  //         <Text style={styles.priceText}>{item.price}</Text>
  //       </View>
  //     </View>
  //   );
  // };

  const tipsData = [
    { id: '5', price: 5 },
    { id: '10', price: 10 },
    { id: '15', price: 15 },
    { id: '20', price: 20 },
  ];

  const tipsFields = ({ item }: { item: { id: string; price: number } }) => {
    return (
      <TouchableOpacity
        onPress={() => setTip(item.price)}
        style={[
          styles.tipsContainer,
          tip === item.price && {
            borderColor: colors.brown,
            backgroundColor: colors.lightBrown,
          },
        ]}
      >
        <Text style={styles.priceText}>${item.price}</Text>
      </TouchableOpacity>
    );
  };

  return (
    // <View style={{ flex: 1 }}>
    //   <TopHeader text="Payment" isMenu={true} />
    //   <View style={styles.containerMain}>
    //     <View style={styles.containerOne}>
    //       <Text style={styles.tipsText}>Give Some Tips to Adam James</Text>
    //       <FlatList
    //         data={tipsData}
    //         renderItem={tipsFields}
    //         keyExtractor={item => item.id}
    //         horizontal
    //       />
    //       <View style={styles.billContainer}>
    //         <Text style={styles.billText}>Your Bill</Text>
    //         <View style={styles.billList}>
    //           <View
    //             style={{
    //               flexDirection: 'row',
    //               justifyContent: 'space-between',
    //             }}
    //           >
    //             <Text style={styles.billListText}>Fare:</Text>
    //             <Text style={styles.billListText}>$55.00</Text>
    //           </View>
    //           <View style={styles.border} />
    //           <View
    //             style={{
    //               flexDirection: 'row',
    //               justifyContent: 'space-between',
    //             }}
    //           >
    //             <Text style={styles.billListText}>Add Shop:</Text>
    //             <Text style={styles.billListText}>$25.00</Text>
    //           </View>
    //           <View style={styles.border} />
    //           <View
    //             style={{
    //               flexDirection: 'row',
    //               justifyContent: 'space-between',
    //             }}
    //           >
    //             <Text style={styles.billListText}>Tip:</Text>
    //             <Text style={styles.billListText}>$5.00</Text>
    //           </View>
    //           <View style={styles.totalContainer}>
    //             <Text style={styles.total}>Total:</Text>
    //             <Text style={styles.total}>$85.00</Text>
    //           </View>
    //         </View>
    //       </View>
    //     </View>
    //     <View style={styles.containerSec}>
    //       <Text style={styles.tipsText}>Selected Payment Method</Text>
    //       <TouchableOpacity
    //         style={[
    //           styles.methodMain,
    //           selectedMethod === 'visa' && {
    //             borderColor: colors.brown,
    //             backgroundColor: colors.lightBrown,
    //           },
    //         ]}
    //         activeOpacity={0.6}
    //         onPress={() => setSelectedMethod('visa')}
    //       >
    //         <Image source={images.visa} />
    //         <View style={styles.methodTextMain}>
    //           <Text style={styles.cardText}>**** **** **** 8970</Text>
    //           <Text style={styles.cardText}>Expires: 12/26</Text>
    //         </View>
    //       </TouchableOpacity>
    //       <TouchableOpacity
    //         style={[
    //           styles.methodMain,
    //           selectedMethod === 'mastercard' && {
    //             borderColor: colors.brown,
    //             backgroundColor: colors.lightBrown,
    //           },
    //         ]}
    //         activeOpacity={0.7}
    //         onPress={() => setSelectedMethod('mastercard')}
    //       >
    //         <Image source={images.masterCard} />
    //         <View style={styles.methodTextMain}>
    //           <Text style={styles.cardText}>**** **** **** 8970</Text>
    //           <Text style={styles.cardText}>Expires: 12/26</Text>
    //         </View>
    //       </TouchableOpacity>
    //     </View>
    //     <CustomButton
    //       btnWidth={width * 0.9}
    //       btnHeight={height * 0.07}
    //       backgroundColor={selectedMethod ? colors.brown : colors.black}
    //       text="Continue"
    //       textColor={colors.white}
    //       borderRadius={30}
    //       disabled={!selectedMethod}
    //       onPress={() => navigation.navigate('Setting')}
    //     />
    //   </View>
    // </View>

    <View style={{ flex: 1 }}>
      <TopHeader text="Payment" isMenu={true} />
      <View style={styles.containerMain}>
        <View style={styles.containerOne}>
          <Text style={styles.tipsText}>Give Some Tips to Adam James</Text>

          {/* FlatList for tips + custom "+" button */}
          <FlatList
            data={tipsData}
            renderItem={tipsFields}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            ListFooterComponent={
              <TouchableOpacity
                style={styles.plusButton}
                onPress={() => setTip(prev => prev + 5)}
              >
                <Text style={styles.plusText}>+</Text>
              </TouchableOpacity>
            }
          />

          {/* Bill Section */}
          <View style={styles.billContainer}>
            <Text style={styles.billText}>Your Bill</Text>
            <View style={styles.billList}>
              <View style={styles.billRow}>
                <Text style={styles.billListText}>Fare:</Text>
                <Text style={styles.billListText}>$55.00</Text>
              </View>
              <View style={styles.border} />
              <View style={styles.billRow}>
                <Text style={styles.billListText}>Add Stop:</Text>
                <Text style={styles.billListText}>$25.00</Text>
              </View>
              <View style={styles.border} />
              <View style={styles.billRow}>
                <Text style={styles.billListText}>Tip:</Text>
                <Text style={styles.billListText}>
                  {/* ${tip.toFixed(2)} */}${(55 + 25 + (tip ?? 0)).toFixed(2)}
                </Text>
              </View>
              <View style={styles.totalContainer}>
                <Text style={styles.total}>Total:</Text>
                <Text style={styles.total}>${(55 + 25 + tip).toFixed(2)}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Payment Methods */}
        <View style={styles.containerSec}>
          <Text style={styles.tipsText}>Selected Payment Method</Text>
          {/* Visa */}
          <TouchableOpacity
            style={[
              styles.methodMain,
              selectedMethod === 'visa' && {
                borderColor: colors.brown,
                backgroundColor: colors.lightBrown,
              },
            ]}
            activeOpacity={0.6}
            onPress={() => setSelectedMethod('visa')}
          >
            <Image source={images.visa} />
            <View style={styles.methodTextMain}>
              <Text style={styles.cardText}>**** **** **** 8970</Text>
              <Text style={styles.cardText}>Expires: 12/26</Text>
            </View>
          </TouchableOpacity>

          {/* Cash */}
          <TouchableOpacity
            style={[
              styles.methodMain,
              selectedMethod === 'cash' && {
                borderColor: colors.brown,
                backgroundColor: colors.lightBrown,
              },
            ]}
            activeOpacity={0.7}
            onPress={() => setSelectedMethod('cash')}
          >
            <Image source={images.cashIcon} />
            <Text style={styles.cardText}>Cash</Text>
          </TouchableOpacity>
        </View>

        <CustomButton
          btnWidth={width * 0.9}
          btnHeight={height * 0.07}
          backgroundColor={selectedMethod ? colors.brown : colors.black}
          text="Continue"
          textColor={colors.white}
          borderRadius={30}
          disabled={!selectedMethod}
          onPress={() => navigation.navigate('Setting')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  plusButton: {
    width: width * 0.14,
    height: height * 0.061,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 30,
    backgroundColor: colors.whiteShade,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: width * 0.03,
  },
  plusText: {
    fontFamily: fontFamily.ClashDisplayMedium,
    fontSize: fontSizes.md,
    color: colors.black,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerMain: {
    alignItems: 'center',
    gap: height * 0.02,
  },
  containerOne: {
    backgroundColor: colors.gray,
    borderRadius: 10,
    width: width * 0.9,
    height: height * 0.47,
    padding: 20,
    alignItems: 'center',
  },
  containerSec: {
    backgroundColor: colors.gray,
    borderRadius: 10,
    width: width * 0.9,
    height: height * 0.27,
    padding: 15,
    alignItems: 'center',
  },
  tipsText: {
    fontFamily: fontFamily.ClashDisplayMedium,
    fontSize: fontSizes.md,
    color: colors.black,
  },
  tipsMain: {
    alignItems: 'center',
    gap: width * 0.03,
    width: width * 0.15,
    top: height * 0.03,
  },
  tipsContainer: {
    width: width * 0.14,
    height: height * 0.061,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 30,
    backgroundColor: colors.whiteShade,
    padding: 15,
  },
  priceText: {
    fontFamily: fontFamily.SfProDisplayRegular,
    color: colors.black,
    fontSize: fontSizes.sm2,
  },
  billContainer: {
    backgroundColor: colors.white,
    width: width * 0.79,
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
    paddingHorizontal: height * 0.04,
  },
  billText: {
    fontFamily: fontFamily.ClashDisplayMedium,
    fontSize: fontSizes.md,
    color: colors.black,
  },
  billList: {
    width: width * 0.7,
    top: height * 0.01,
    gap: height * 0.01,
    padding: 15,
  },
  billListText: {
    fontFamily: fontFamily.ClashDisplayMedium,
    fontSize: fontSizes.sm2,
    color: colors.black,
  },
  border: {
    borderWidth: 0.5,
    borderColor: colors.gray,
  },
  totalContainer: {
    borderColor: colors.brown,
    backgroundColor: colors.lightBrown,
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: height * 0.01,
  },
  total: {
    fontFamily: fontFamily.ClashDisplayMedium,
    color: colors.shadeBlack,
    fontSize: fontSizes.md,
  },
  methodMain: {
    width: width * 0.75,
    height: height * 0.08,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.darkGray,
    backgroundColor: colors.lightGray,
    marginTop: height * 0.01,
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
    flexDirection: 'row',
    top: height * 0.02,
  },
  methodTextMain: {
    left: width * 0.075,
  },
  cardText: {
    fontFamily: fontFamily.ClashDisplayMedium,
    fontSize: fontSizes.sm,
    color: colors.black,
  },
});

export default PaymentUser;

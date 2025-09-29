import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import { fontFamily } from '../../assets/Fonts';
import images from '../../assets/Images';
import CustomButton from '../../components/CustomButton';
import CustomMultiInput from '../../components/CustomMultiInput';
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
  const [rating, setRating] = useState(0);
  const [tip, setTip] = useState<number>(5);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenSec, setModalOpenSec] = useState(false);
  const [modalOpenThird, setModalOpenThird] = useState(false);

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

  const handleFeedbackPress = () => {
    setModalOpen(false);
    setModalOpenSec(true);
  };

  const handleFeedbackSubmit = () => {
    setModalOpenSec(false);
    setModalOpenThird(true);
  };

  const handleHomeNavigation = () => {
    setModalOpenThird(false);
    navigation.navigate('HomeUser');
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
                  {/* ${tip.toFixed(2)}${(55 + 25 + (tip ?? 0)).toFixed(2)} */}
                  $85.00
                </Text>
              </View>
              <View style={styles.totalContainer}>
                <Text style={styles.total}>Total:</Text>
                <Text style={styles.total}>$85.00</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.containerSec}>
          <Text style={styles.tipsText}>Selected Payment Method</Text>
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
            <Image source={images.cash} style={styles.cashIcon} />
            <View style={styles.methodTextMain}>
              <Text style={styles.cardText}>Cash</Text>
            </View>
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
          // onPress={() => navigation.navigate('Setting')}
          onPress={() => setModalOpen(true)}
        />
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalOpen}
        onRequestClose={() => setModalOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.cancelMain}>
              <Image source={images.checked} style={styles.checked} />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setModalOpen(false)}
                style={{ left: width * 0.2 }}
              >
                <Image source={images.cancelBtn} style={styles.cancelBtn} />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalTitle}>Payment Successful</Text>
            <View style={styles.modalParaMain}>
              <Text style={styles.modalParaText}>
                Your money has been successfully sent
              </Text>
              <View style={{ flexDirection: 'row', gap: width * 0.015 }}>
                <Text style={styles.modalParaText}>to</Text>
                <Text style={styles.modalParaTextSec}>Adam James</Text>
              </View>
            </View>
            <View style={styles.totalContainerSec}>
              <Text style={styles.total}>Total:</Text>
              <Text style={styles.total}>$85.00</Text>
            </View>
            <View style={styles.borderMain} />
            <View style={{ alignItems: 'center', top: height * 0.02 }}>
              <Text style={styles.modalTextSec}>How was your Ride</Text>
              <View style={styles.modalParaMain}>
                <Text style={styles.modalParaText}>
                  Your feedback will help us improve to
                </Text>
                <Text style={styles.modalParaText}>
                  make Driving experience better
                </Text>
              </View>
            </View>
            <View
              style={{ paddingVertical: height * 0.039, top: height * 0.025 }}
            >
              <CustomButton
                btnHeight={height * 0.06}
                btnWidth={width * 0.7}
                text="Please Feedback"
                textColor={colors.white}
                borderRadius={30}
                backgroundColor={colors.brown}
                onPress={handleFeedbackPress}
              />
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalOpenSec}
        onRequestClose={() => setModalOpenSec(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.cancelMain}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setModalOpen(false)}
                style={{ left: width * 0.32 }}
              >
                <Image source={images.cancelBtn} style={styles.cancelBtn} />
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'center', gap: height * 0.01 }}>
              <Text style={styles.modalTitle}>Ratings</Text>
              <StarRating rating={rating} onChange={setRating} />
              <Text style={styles.modalTitle}>Comments</Text>
              <CustomMultiInput
                inputHeight={height * 0.15}
                inputWidth={width * 0.7}
                placeholder="Type Here"
                placeholderTextColor={colors.black}
                backgroundColor={colors.gray}
                borderColor={colors.darkGray}
                borderRadius={10}
                borderWidth={1}
              />
              <View
                style={{ paddingVertical: height * 0.03, top: height * 0.01 }}
              >
                <CustomButton
                  btnHeight={height * 0.06}
                  btnWidth={width * 0.7}
                  text="Submit"
                  textColor={colors.white}
                  borderRadius={30}
                  backgroundColor={colors.brown}
                  onPress={handleFeedbackSubmit}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalOpenThird}
        onRequestClose={() => setModalOpenThird(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Image source={images.smile} style={styles.smileImg} />
            <Text style={styles.modalTitleSec}>Thankyou so Much</Text>
            <Text style={styles.modalTitleSec}>For your valuable feedback</Text>
            <View
              style={{ paddingVertical: height * 0.03, top: height * 0.01 }}
            >
              <CustomButton
                text="Back Home"
                textColor={colors.white}
                backgroundColor={colors.brown}
                borderRadius={30}
                btnHeight={height * 0.06}
                btnWidth={width * 0.7}
                onPress={handleHomeNavigation}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  smileImg: {
    height: height * 0.15,
    width: width * 0.2,
    resizeMode: 'contain',
  },
  cancelMain: {
    flexDirection: 'row',
  },
  cancelBtn: {
    width: width * 0.09,
    height: height * 0.05,
    resizeMode: 'contain',
  },
  modalTextSec: {
    fontFamily: fontFamily.SfProDisplayMedium,
    fontSize: fontSizes.md,
    color: colors.black,
    fontWeight: 'bold',
  },
  borderMain: {
    borderWidth: 0.7,
    borderColor: colors.darkGray,
    borderStyle: 'dashed',
    width: width * 0.8,
  },
  totalContainerSec: {
    borderColor: colors.brown,
    backgroundColor: colors.lightBrown,
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.5,
    marginVertical: height * 0.03,
  },
  modalParaTextSec: {
    fontFamily: fontFamily.SfProDisplayBold,
    fontSize: fontSizes.sm,
    color: colors.black,
    fontWeight: 'bold',
  },
  modalParaText: {
    fontFamily: fontFamily.SfProDisplayBold,
    fontSize: fontSizes.sm,
    color: colors.black,
  },
  modalParaMain: {
    alignItems: 'center',
    top: height * 0.01,
  },
  checked: {
    width: width * 0.2,
    height: height * 0.08,
    resizeMode: 'contain',
    left: width * 0.04,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.61)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 15,
    width: width * 0.8,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: fontSizes.lg2,
    fontFamily: fontFamily.ClashDisplayMedium,
    color: colors.black,
    marginVertical: height * 0.015,
  },
  modalTitleSec: {
    fontSize: fontSizes.lg,
    fontFamily: fontFamily.ClashDisplayMedium,
    color: colors.black,
  },
  cashIcon: {
    width: width * 0.1,
    resizeMode: 'contain',
  },
  plusButton: {
    top: height * 0.03,
    width: width * 0.14,
    height: height * 0.065,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 30,
    backgroundColor: colors.whiteShade,
    justifyContent: 'center',
    alignItems: 'center',
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
    width: width * 0.18,
    top: height * 0.03,
  },
  tipsContainer: {
    width: width * 0.14,
    height: height * 0.064,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 40,
    backgroundColor: colors.whiteShade,
    padding: 15,
    top: height * 0.03,
    gap: width * 0.9,
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

// import { FlatList, StyleSheet, View } from 'react-native';
// import images from '../../assets/Images';
// import TopHeader from '../../components/Topheader';
// import { height } from '../../utilities';

// interface DriverProps {
//   name: string;
//   price: string;
//   carType: string;
//   carModel: string;
//   ratingImage: any;
// }

// const DriverOfferings = () => {
//   const DriverOfferingData = [
//     {
//       name: 'Aqeel',
//       price: '$16.00',
//       carType: 'Tesla Model 3',
//       carModel: 'MWY10X9',
//       rating: images.rating,
//     },
//     {
//       name: 'Aqeel',
//       price: '$16.00',
//       carType: 'Tesla Model 3',
//       carModel: 'MWY10X9',
//       rating: images.rating,
//     },
//     {
//       name: 'Aqeel',
//       price: '$16.00',
//       carType: 'Tesla Model 3',
//       carModel: 'MWY10X9',
//       rating: images.rating,
//     },
//     {
//       name: 'Aqeel',
//       price: '$16.00',
//       carType: 'Tesla Model 3',
//       carModel: 'MWY10X9',
//       rating: images.rating,
//     },
//     {
//       name: 'Aqeel',
//       price: '$16.00',
//       carType: 'Tesla Model 3',
//       carModel: 'MWY10X9',
//       rating: images.rating,
//     },
//     {
//       name: 'Aqeel',
//       price: '$16.00',
//       carType: 'Tesla Model 3',
//       carModel: 'MWY10X9',
//       rating: images.rating,
//     },
//   ];

//   const DrriverOffering = ({ item }: { item: DriverProps }) => {
//     return (
//       <View style={{ flex: 1 }}>
//         <View></View>
//       </View>
//     );
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <TopHeader text="Driver Offerings" isBack={true} />
//       <FlatList
//         data={DriverOfferingData}
//         renderItem={DrriverOffering}
//         keyExtractor={(item, index) => index.toString()}
//         contentContainerStyle={{
//           gap: height * 0.02,
//         }}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({});

// export default DriverOfferings;












import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
} from 'react-native';
import images from '../../assets/Images';
import TopHeader from '../../components/Topheader';
import { height, width } from '../../utilities';
import { colors } from '../../utilities/colors';
import { useState } from 'react';
import { fontFamily } from '../../assets/Fonts';
import { fontSizes } from '../../utilities/fontsizes';
import CustomButton from '../../components/CustomButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../../navigation/AuthStack';

interface DriverProps {
  name: string;
  price: string;
  carType: string;
  carModel: string;
  rating: any;
}
type Props = NativeStackScreenProps<StackParamList, 'FindingDriver'>;

const DriverOfferings: React.FC<Props> = ({ navigation }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // 👉 Modal states
  const [showBidModal, setShowBidModal] = useState(false);
  const [bidAmount, setBidAmount] = useState('$55.00');

  const DriverOfferingData = [
    {
      name: 'Aqeel',
      price: '$16.00',
      carType: 'Tesla Model 3',
      carModel: 'MWY1 0X9',
      rating: images.rating,
    },
    {
      name: 'Aqeel',
      price: '$16.00',
      carType: 'Tesla Model 3',
      carModel: 'MWY1 0X9',
      rating: images.rating,
    },
    {
      name: 'Aqeel',
      price: '$16.00',
      carType: 'Tesla Model 3',
      carModel: 'MWY1 0X9',
      rating: images.rating,
    },
    {
      name: 'Aqeel',
      price: '$16.00',
      carType: 'Tesla Model 3',
      carModel: 'MWY1 0X9',
      rating: images.rating,
    },
  ];

  const DrriverOffering = ({ item, index }: { item: DriverProps; index: number }) => {
    const isSelected = selectedIndex === index;
    return (
      <TouchableOpacity
        style={[styles.card, isSelected && styles.selectedCard]}
        onPress={() => setSelectedIndex(index)}
      >
        <View>
          <View style={{ flexDirection: 'row', gap: 6 }}>
            <Text style={[styles.name, isSelected && styles.selectedText]}>{item.name}</Text>
            <Text style={[styles.price, isSelected && styles.selectedText]}>{item.price}</Text>
          </View>
          <Text style={[styles.carType, isSelected && styles.selectedText]}>{item.carType}</Text>
        </View>

        <View style={styles.rightSection}>
          <Image
            source={item.rating}
            style={[styles.rating, isSelected && { tintColor: colors.white }]} 
          />
          <Text style={[styles.carModel, isSelected && styles.selectedText]}>{item.carModel}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <TopHeader text="Driver Offerings" isBack={true} />

      <FlatList
        data={DriverOfferingData}
        renderItem={({ item, index }) => <DrriverOffering item={item} index={index} />}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{
          padding: width * 0.04,
          gap: height * 0.015,
        }}
      />

      <Image source={images.travelologo} style={styles.logo} />
      <View>
        <View
          style={{
            flexDirection: 'row',
            gap: width * 0.01,
            alignSelf: 'center',
            bottom: height * 0.04,
          }}
        >
          <CustomButton
            btnHeight={height * 0.07}
            btnWidth={width * 0.46}
            borderRadius={35}
            backgroundColor={colors.black}
            text="Bid Now"
            textColor={colors.white}
            onPress={() => setShowBidModal(true)} // 👉 open modal
          />

          <CustomButton
            btnHeight={height * 0.07}
            btnWidth={width * 0.46}
            borderRadius={35}
            backgroundColor={colors.brown}
            text="Book Ride"
            textColor={colors.white}
            onPress={() => navigation.navigate('RideArrivingUser')}
          />
        </View>
      </View>

      {/* 👉 Bid Modal */}
      <Modal
        transparent
        visible={showBidModal}
        animationType="fade"
        onRequestClose={() => setShowBidModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Bidding</Text>

            <View style={styles.inputBox}>
              <TextInput
                style={styles.inputText}
                value={bidAmount}
                onChangeText={setBidAmount}
                keyboardType="numeric"
              />
            </View>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => setShowBidModal(false)}
            >
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width * 0.85,
    alignSelf: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    padding: width * 0.04,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  selectedCard: {
    backgroundColor: '#9B0A0A',
    borderWidth: 1,
    borderColor: '#9B0A0A',
  },
  logo: {
    width: width * 0.45,
    height: height * 0.25,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  name: {
    fontSize: fontSizes.sm2,
    fontWeight: '700',
    fontFamily: fontFamily.SfProDisplayMedium,
    color: colors.black,
  },
  price: {
    fontSize: fontSizes.md,
    fontWeight: '700',
    fontFamily: fontFamily.SfProDisplayMedium,
    color: colors.black,
    marginLeft: 6,
  },
  carType: {
    fontSize: fontSizes.sm,
    color: colors.black,
    marginTop: 2,
  },
  carModel: {
    fontSize: fontSizes.sm,
    color: colors.black,
    marginTop: 4,
    textAlign: 'right',
  },
  rating: {
    width: width * 0.21,
    height: height * 0.015,
    resizeMode: 'contain',
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  selectedText: {
    color: colors.white,
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: width * 0.05,
  },
  bidButton: {
    flex: 1,
    backgroundColor: '#000',
    borderRadius: 30,
    paddingVertical: 12,
    marginRight: 8,
    alignItems: 'center',
  },
  bookButton: {
    flex: 1,
    backgroundColor: colors.brown,
    borderRadius: 30,
    paddingVertical: 12,
    marginLeft: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  // 👉 Added modal styles only
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: width * 0.8,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: width * 0.06,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: fontSizes.md,
    fontWeight: '700',
    fontFamily: fontFamily.SfProDisplayMedium,
    color: colors.black,
    marginBottom: height * 0.02,
  },
  inputBox: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 30,
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.04,
    marginBottom: height * 0.025,
    alignItems: 'center',
  },
  inputText: {
    fontSize: fontSizes.md,
    color: colors.black,
    textAlign: 'center',
    width: '100%',
  },
  submitButton: {
    backgroundColor: colors.brown,
    borderRadius: 30,
    paddingVertical: height * 0.018,
    paddingHorizontal: width * 0.25,
    alignItems: 'center',
  },
  submitText: {
    color: colors.white,
    fontSize: fontSizes.sm2,
    fontWeight: '600',
  },
});

export default DriverOfferings;

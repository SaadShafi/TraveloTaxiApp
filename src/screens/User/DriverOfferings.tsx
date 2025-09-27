import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  FlatList,
  Image,
  ImageSourcePropType,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { fontFamily } from '../../assets/Fonts';
import images from '../../assets/Images';
import CustomButton from '../../components/CustomButton';
import TopHeader from '../../components/Topheader';
import { height, width } from '../../utilities';
import { colors } from '../../utilities/colors';
import { fontSizes } from '../../utilities/fontsizes';

interface DriverProps {
  name: string;
  price: string;
  carType: string;
  carModel: string;
  ratingImage: ImageSourcePropType;
}

const DriverOfferings = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showBidModal, setShowBidModal] = useState(false);
  const [bidAmount, setBidAmount] = useState('$55.00');
  const navigation = useNavigation<NavigationProp<any>>();

  const DriverOfferingData: DriverProps[] = [
    {
      name: 'Aqeel',
      price: '$16.00',
      carType: 'Tesla Model 3',
      carModel: 'MWY10X9',
      ratingImage: images.rating,
    },
    {
      name: 'Aqeel',
      price: '$16.00',
      carType: 'Tesla Model 3',
      carModel: 'MWY10X9',
      ratingImage: images.rating,
    },
    {
      name: 'Aqeel',
      price: '$16.00',
      carType: 'Tesla Model 3',
      carModel: 'MWY10X9',
      ratingImage: images.rating,
    },
    {
      name: 'Aqeel',
      price: '$16.00',
      carType: 'Tesla Model 3',
      carModel: 'MWY10X9',
      ratingImage: images.rating,
    },
    {
      name: 'Aqeel',
      price: '$16.00',
      carType: 'Tesla Model 3',
      carModel: 'MWY10X9',
      ratingImage: images.rating,
    },
    {
      name: 'Aqeel',
      price: '$16.00',
      carType: 'Tesla Model 3',
      carModel: 'MWY10X9',
      ratingImage: images.rating,
    },
    {
      name: 'Aqeel',
      price: '$16.00',
      carType: 'Tesla Model 3',
      carModel: 'MWY10X9',
      ratingImage: images.rating,
    },
    {
      name: 'Aqeel',
      price: '$16.00',
      carType: 'Tesla Model 3',
      carModel: 'MWY10X9',
      ratingImage: images.rating,
    },
    {
      name: 'Aqeel',
      price: '$16.00',
      carType: 'Tesla Model 3',
      carModel: 'MWY10X9',
      ratingImage: images.rating,
    },
  ];

  const DrriverOffering = ({
    item,
    index,
  }: {
    item: DriverProps;
    index: number;
  }) => {
    const isSelected = selectedIndex === index;

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setSelectedIndex(index)}
        style={styles.container}
      >
        <View
          style={[
            styles.contentMain,
            { backgroundColor: isSelected ? colors.brown : colors.white },
          ]}
        >
          <View style={styles.nameRateContainer}>
            <View style={styles.nameMain}>
              <Text
                style={[
                  styles.name,
                  { color: isSelected ? colors.white : colors.black },
                ]}
              >
                {item.name}
              </Text>
              <Text
                style={[
                  styles.price,
                  { color: isSelected ? colors.white : colors.black },
                ]}
              >
                {item.price}
              </Text>
            </View>
            <Image
              source={isSelected ? images.ratingWhite : item.ratingImage}
              style={styles.ratingImg}
            />
          </View>
          <View style={styles.carDetailsMain}>
            <Text
              style={[
                styles.carType,
                { color: isSelected ? colors.white : colors.black },
              ]}
            >
              {item.carType}
            </Text>
            <Text
              style={[
                styles.carModel,
                { color: isSelected ? colors.white : colors.black },
              ]}
            >
              {item.carModel}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <TopHeader text="Driver Offerings" isBack={true} />
      <FlatList
        data={DriverOfferingData}
        renderItem={({ item, index }) => (
          <DrriverOffering item={item} index={index} />
        )}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{
          gap: height * 0.02,
          // paddingVertical: height * 0.02,
        }}
      />

      <Image source={images.logo} style={styles.logo} />
      {/* <View> */}
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
      {/* </View> */}

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
  logo: {
    width: width * 0.45,
    height: height * 0.2,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  container: {
    alignItems: 'center',
  },
  contentMain: {
    borderWidth: 1,
    borderColor: colors.darkGray,
    width: width * 0.85,
    height: height * 0.08,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameRateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.75,
  },
  nameMain: {
    flexDirection: 'row',
    gap: width * 0.03,
  },
  carDetailsMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.75,
  },
  name: {
    fontFamily: fontFamily.SFProDisplaySemiBold,
    fontSize: fontSizes.sm2,
  },
  price: {
    fontFamily: fontFamily.SFProDisplayMedium,
    fontSize: fontSizes.sm2,
  },
  carType: {
    fontFamily: fontFamily.SFProDisplayMedium,
    fontSize: fontSizes.xsm,
  },
  carModel: {
    fontFamily: fontFamily.SFProDisplayMedium,
    fontSize: fontSizes.xsm,
  },
  ratingImg: {
    width: width * 0.19,
    resizeMode: 'contain',
  },
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

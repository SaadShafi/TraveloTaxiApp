import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { fontFamily } from '../../assets/Fonts';
import images from '../../assets/Images';
import CustomButton from '../../components/CustomButton';
import CustomMultiInput from '../../components/CustomMultiInput';
import CustomSelect from '../../components/CustomSelect';
import CustomTextInput from '../../components/CustomTextInput';
import TopHeader from '../../components/Topheader';
import type { StackParamList } from '../../navigation/AuthStack';
import { height, width } from '../../utilities';
import { colors } from '../../utilities/colors';
import { fontSizes } from '../../utilities/fontsizes';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { defaultCountry } from '../../utilities/countries';

type Props = NativeStackScreenProps<StackParamList, 'TripOptions'>;

const TripOptions: React.FC<Props> = ({ navigation }) => {
  const [passengers, setPassengers] = useState(1);
  const [isEnabled, setIsEnabled] = useState(false);
  const [showCaution, setShowCaution] = useState(false);
  const [payment, setPayment] = useState('');
  const [showBidField, setShowBidField] = useState(false);
  const [selectedBookingType, setSelectedBookingType] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const reduxSelectedCountry = useSelector(
    (state: RootState) => state.role.countrySelect || defaultCountry,
  );
  console.log("Selected COuntry!", reduxSelectedCountry)

  const handleBidPress = () => {
    setShowBidField(true);
    setSelectedBookingType('bid');
  };

  const handleAutoAcceptPress = () => {
    setShowBidField(false);
    setSelectedBookingType('auto');
  };

  const decreasePassengers = () => {
    if (passengers > 1) {
      setPassengers(passengers - 1);
    }
  };

  const increasePassengers = () => {
    setPassengers(passengers + 1);
  };

  const handleVehicleSelect = (vehicleType: string) => {
    setSelectedVehicle(vehicleType);
  };

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const paymentMethod = [
    { name: 'Select Payment Method', id: '' },
    { name: 'Card', id: 'Card' },
    { name: 'Cash', id: 'Cash' },
  ];

  return (
    <View style={{ flex: 1 }}>
      <TopHeader text="Trip Options" />
      <ScrollView
        contentContainerStyle={{ paddingBottom: height * 0.08 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.passengerCountMain}>
          <Text style={styles.label}>How Many Passengers?</Text>
          <View style={styles.passengerCount}>
            <TouchableOpacity onPress={decreasePassengers}>
              <Text style={styles.btn}>-</Text>
            </TouchableOpacity>

            <Text style={styles.count}>
              {passengers.toString().padStart(2, '0')}
            </Text>

            <TouchableOpacity onPress={increasePassengers}>
              <Text style={styles.btn}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inputMain}>
          <View style={styles.petMain}>
            <Text style={styles.petText}>Taking Pet With</Text>
            <Switch
              trackColor={{ false: '#6f6c6cff', true: '#1E8C36' }}
              thumbColor={isEnabled ? colors.white : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          {reduxSelectedCountry?.name?.toLowerCase() === 'pakistan' && (
          <TouchableOpacity onPress={() => handleVehicleSelect('bike')}>
            <View
              style={[
                styles.vehicleMain,
                selectedVehicle === 'bike' && styles.selectedVehicle,
              ]}
            >
              <Image source={images.bike} style={styles.vehicleImg} />
              <View style={styles.vehicleDetails}>
                <Text
                  style={[
                    styles.vehicleType,
                    selectedVehicle === 'bike' && styles.selectedVehicleText,
                  ]}
                >
                  Bike
                </Text>
                <Text
                  style={[
                    styles.vehiclePrice,
                    selectedVehicle === 'bike' && styles.selectedVehicleText,
                  ]}
                >
                  $10.87
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => handleVehicleSelect('car')}>
            <View
              style={[
                styles.vehicleMain,
                selectedVehicle === 'car' && styles.selectedVehicle,
              ]}
            >
              <Image source={images.car} style={styles.vehicleImg} />
              <View style={styles.vehicleDetails}>
                <Text
                  style={[
                    styles.vehicleType,
                    selectedVehicle === 'car' && styles.selectedVehicleText,
                  ]}
                >
                  4 Seater
                </Text>
                <Text
                  style={[
                    styles.vehiclePrice,
                    selectedVehicle === 'car' && styles.selectedVehicleText,
                  ]}
                >
                  $10.87
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleVehicleSelect('suv')}>
            <View
              style={[
                styles.vehicleMain,
                selectedVehicle === 'suv' && styles.selectedVehicle,
              ]}
            >
              <Image source={images.suv} style={styles.vehicleImg} />
              <View style={styles.vehicleDetails}>
                <Text
                  style={[
                    styles.vehicleType,
                    selectedVehicle === 'suv' && styles.selectedVehicleText,
                  ]}
                >
                  5+ Seater
                </Text>
                <Text
                  style={[
                    styles.vehiclePrice,
                    selectedVehicle === 'suv' && styles.selectedVehicleText,
                  ]}
                >
                  $10.87
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          {showBidField && (
            <View style={styles.bidMain}>
              <CustomTextInput
                placeholder="GBP $15.0- GBP $15.0-Tap here to Bid"
                placeholderTextColor={colors.black}
                inputWidth={width * 0.85}
                inputHeight={height * 0.065}
                borderRadius={30}
                keyboardType="number-pad"
                rightIcon={
                  <TouchableOpacity
                    onPress={() => setShowCaution(!showCaution)}
                  >
                    <Image
                      source={images.caution}
                      style={[
                        styles.caution,
                        selectedBookingType === 'bid' && styles.selectedCaution,
                      ]}
                    />
                  </TouchableOpacity>
                }
              />
            </View>
          )}

          {showCaution && (
            <View style={styles.warningBox}>
              <Text style={styles.warningText}>
                ⚠️ Please be cautious while bidding!
              </Text>
            </View>
          )}
          <View style={styles.cautionBlackMain}>
            <Text style={{ color: colors.black }}>
              This includes an other additional charges
            </Text>
            <Image source={images.cautionBlack} />
          </View>
          <CustomMultiInput
            inputHeight={height * 0.16}
            inputWidth={width * 0.85}
            placeholder="Type Here"
            placeholderTextColor={colors.black}
            backgroundColor={colors.gray}
            borderColor={colors.darkGray}
            borderRadius={10}
            borderWidth={1}
          />
        </View>
        <Text style={styles.bookingTypeText}>
          Please choose type of Booking
        </Text>
        <View style={styles.bidBtnMain}>
          <CustomButton
            btnHeight={height * 0.05}
            btnWidth={width * 0.37}
            borderColor={
              selectedBookingType === 'bid' ? colors.brown : colors.darkGray
            }
            borderRadius={30}
            borderWidth={1}
            backgroundColor={
              selectedBookingType === 'bid' ? colors.brown : colors.gray
            }
            text="Bid For Ride"
            textColor={
              selectedBookingType === 'bid' ? colors.white : colors.black
            }
            onPress={handleBidPress}
          />
          <CustomButton
            btnHeight={height * 0.05}
            btnWidth={width * 0.37}
            borderColor={
              selectedBookingType === 'auto' ? colors.brown : colors.black
            }
            borderRadius={30}
            borderWidth={1}
            backgroundColor={
              selectedBookingType === 'auto' ? colors.brown : colors.black
            }
            text="Auto Accept"
            textColor={colors.white}
            onPress={handleAutoAcceptPress}
          />
        </View>
        <View style={styles.questionContainer}>
          <Text style={{ color: colors.black }}>What is This?</Text>
          <Text style={{ color: colors.black }}>What is This?</Text>
        </View>
        <View style={{ alignItems: 'center', top: height * 0.05 }}>
          <CustomSelect
            inputWidth={width * 0.85}
            inputHeight={height * 0.06}
            selectElements={paymentMethod}
            borderColor={payment ? colors.brown : colors.gray}
            borderWidth={1}
            inputColor={payment ? colors.lightBrown : colors.gray}
            borderRadius={30}
            onChangeText={value => setPayment(value)}
            setSelectedElement={setPayment}
            defaultValue=""
          />
        </View>
        <View style={styles.btnMain}>
          <CustomButton
            btnHeight={height * 0.07}
            btnWidth={width * 0.85}
            borderColor={colors.black}
            borderRadius={30}
            borderWidth={1}
            backgroundColor={colors.black}
            text="Continue"
            textColor={colors.white}
            onPress={() => navigation.navigate('FindingDriver')}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  selectedVehicle: {
    borderColor: colors.brown,
    backgroundColor: colors.lightBrown,
  },
  selectedVehicleText: {
    color: colors.black,
  },
  bidText: {
    color: colors.black,
  },
  selectedBidText: {
    color: colors.black,
  },
  selectedCaution: {
    tintColor: '#ffbf00ff',
  },
  passengerCountMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.95,
    alignItems: 'center',
    paddingHorizontal: width * 0.04,
    left: width * 0.025,
  },
  passengerCount: {
    flexDirection: 'row',
    gap: width * 0.03,
    backgroundColor: colors.gray,
    borderRadius: 30,
    padding: 5,
    borderWidth: 1,
    borderColor: colors.darkGray,
  },
  btn: {
    fontSize: fontSizes.lg,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    color: colors.black,
  },
  count: {
    fontSize: fontSizes.md,
    color: colors.black,
    fontWeight: '600',
  },
  label: {
    fontSize: fontSizes.sm2,
    color: colors.black,
    fontFamily: fontFamily.ClashDisplayMedium,
    // fontWeight: '500',
  },
  inputMain: {
    alignItems: 'center',
    marginTop: height * 0.02,
    gap: height * 0.015,
  },
  petMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: colors.darkGray,
    borderWidth: 1,
    borderRadius: 30,
    backgroundColor: colors.gray,
    width: width * 0.85,
    height: height * 0.05,
    paddingHorizontal: width * 0.03,
  },
  petText: {
    fontFamily: fontFamily.SFProDisplayMedium,
    fontSize: fontSizes.sm,
    color: colors.black,
  },
  vehicleMain: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.darkGray,
    borderWidth: 1,
    borderRadius: 30,
    backgroundColor: colors.gray,
    width: width * 0.85,
    height: height * 0.07,
    paddingHorizontal: width * 0.08,
  },
  vehicleImg: {
    width: width * 0.15,
    height: height * 0.3,
    resizeMode: 'contain',
  },
  vehicleDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.48,
    left: width * 0.05,
  },
  vehicleType: {
    fontFamily: fontFamily.SFProDisplayMedium,
    fontSize: fontSizes.sm2,
    color: colors.black,
  },
  vehiclePrice: {
    fontFamily: fontFamily.SFProDisplayMedium,
    fontSize: fontSizes.sm2,
    color: colors.black,
  },
  cautionMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: colors.darkGray,
    borderWidth: 1,
    borderRadius: 30,
    backgroundColor: colors.gray,
    width: width * 0.85,
    height: height * 0.05,
    paddingHorizontal: width * 0.03,
    alignItems: 'center',
  },
  bidMain: {
    flexDirection: 'row',
  },
  caution: {
    width: width * 0.04,
    height: height * 0.04,
    resizeMode: 'contain',
  },
  warningBox: {
    padding: 10,
    backgroundColor: '#fff3cd',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#ffeeba',
    width: width * 0.85,
  },
  warningText: {
    color: '#856404',
    fontSize: fontSizes.sm,
    fontFamily: fontFamily.SFProDisplayMedium,
  },
  cautionBlackMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.95,
    alignItems: 'center',
    paddingHorizontal: width * 0.04,
  },
  bookingTypeText: {
    fontFamily: fontFamily.SFProDisplayMedium,
    fontSize: fontSizes.sm,
    color: colors.black,
    left: width * 0.08,
    top: height * 0.02,
  },
  bidBtnMain: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.07,
    top: height * 0.03,
  },
  questionContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.14,
    top: height * 0.04,
  },
  btnMain: {
    alignItems: 'center',
    top: height * 0.07,
  },
});

export default TripOptions;

import { isCancel, pick, types } from '@react-native-documents/picker';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { useSelector } from 'react-redux';
import { fontFamily } from '../../assets/Fonts';
import images from '../../assets/Images';
import CustomProfileImgModal from '../../components/CustomProfileImage';
import CustomTextInput from '../../components/CustomTextInput';
import TopHeader from '../../components/Topheader';
import { RootState } from '../../redux/store';
import { height, width } from '../../utilities';
import { colors } from '../../utilities/colors';
import { fontSizes } from '../../utilities/fontsizes';

const Profile = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [modalOpen, setModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const selectedRole = useSelector(
    (state: RootState) => state.role.selectedRole,
  );
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const [gender, setGender] = useState('');
  const [city, setCity] = useState('');
  const [rideType, setRideType] = useState('');
  const [card, setCard] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [openStartPicker, setOpenStartPicker] = useState(false);
  const [drivingLicense, setDrivingLicense] = useState(null);
  const [privateHireLicense, setPrivateHireLicense] = useState(null);
  const [logBook, setLogBook] = useState(null);
  const [vehicleLicense, setVehicleLicense] = useState(null);
  const [insurance, setInsurance] = useState(null);
  const [mot, setMot] = useState(null);
  const [hireAgreement, setHireAgreement] = useState(null);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const uploadFromGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setProfileImage(image.path);
      toggleModal();
    });
  };

  const uploadFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setProfileImage(image.path);
      toggleModal();
    });
  };

  const isFormValid =
    name.length > 4 &&
    email.includes('@') &&
    phone.length > 7 &&
    street.length > 5;

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const genderOptions = [
    { name: 'Select Gender', id: '' },
    { name: 'Male', id: 'male' },
    { name: 'Female', id: 'female' },
    { name: 'Other', id: 'other' },
  ];

  const cityOptions = [
    { name: 'Select City', id: '' },
    { name: 'Texas', id: 'texas' },
    { name: 'Misissippi', id: 'misissippi' },
    { name: 'New York', id: 'new york' },
    { name: 'Other', id: 'other' },
  ];

  const rideOptions = [
    { name: 'Select Ride Type', id: '' },
    { name: 'Bike', id: 'bike' },
    { name: 'Car', id: 'car' },
    { name: 'SUV', id: 'suv' },
  ];

  const toggleModalSec = () => {
    setModalVisible(false);
    navigation.navigate('BankDetails');
  };

  const formatDateForDisplay = (date: Date | null): string => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handlePickDocument = async (setter: (file: any) => void) => {
    try {
      const results = await pick({
        type: [types.allFiles],
        allowMultiSelection: false,
        keepLocalCopy: true,
      });

      if (results && results.length > 0) {
        const file = results[0];
        setter({
          name: file.name,
          uri: file.uri,
          type: file.type,
          size: file.size,
        });
      }
    } catch (err: any) {
      if (!isCancel(err)) console.error('Document pick error:', err);
    }
  };

  const handleDateConfirm = (selectedDate: Date) => {
    setOpenStartPicker(false);
    setStartDate(selectedDate);
  };

  const renderUploadField = (
    label: string,
    file: any,
    setter: (file: any) => void,
    fieldKey: string,
  ) => (
    <>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Choose File</Text>
        </TouchableOpacity>

        {!file && <Text style={styles.title}>Dummy File Selected</Text>}

        {file && (
          <View style={styles.preview}>
            <Text style={styles.fileLabel}>Selected File:</Text>
            <Text style={styles.fileName}>{file.name}</Text>
            <Text style={styles.fileUri}>{file.uri}</Text>
            {file.type && <Text style={styles.fileUri}>Type: {file.type}</Text>}
            {file.size && (
              <Text style={styles.fileUri}>Size: {file.size} bytes</Text>
            )}
          </View>
        )}
      </View>
      <TextInput
        placeholder="12-12-2029"
        placeholderTextColor={colors.darkGray}
        style={styles.AddExpiryDate}
        keyboardType="phone-pad"
        editable={false}
      />
    </>
  );

  const UserFields = () => {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <View style={styles.imgMain}>
          <Image source={images.profGradient} style={styles.gradient} />
          {/* <TouchableOpacity onPress={toggleModal} activeOpacity={0.7}> */}
          <View style={styles.profileImageWrapper}>
            {/* {profileImage ? (
                <Image
                  source={{ uri: profileImage }}
                  style={styles.profileImage}
                />
              ) : ( */}
            <View style={styles.profMain}>
              <Image source={images.mask} style={styles.profile} />
              <TouchableOpacity
                style={styles.cameraMain}
                activeOpacity={0.7}
                onPress={() => navigation.navigate('EditProfile')}
              >
                <Image source={images.pencil} style={styles.camera} />
              </TouchableOpacity>
            </View>
            {/* )} */}
          </View>
          {/* </TouchableOpacity> */}
        </View>
        <View style={styles.inputMain}>
          <CustomTextInput
            placeholder="Travelo Taxi User"
            placeholderTextColor={colors.black}
            borderColor={colors.brown}
            borderRadius={30}
            inputWidth={width * 0.85}
            inputHeight={height * 0.06}
            value={name}
            onChangeText={setName}
            backgroundColor={colors.gray}
            editable={false}
          />

          <View
            style={[
              styles.phoneRow,
              {
                borderColor:
                  isPhoneFocused || phone ? colors.brown : colors.gray,
                backgroundColor:
                  isPhoneFocused || phone ? colors.lightBrown : colors.gray,
              },
            ]}
          >
            <Image source={images.UK} style={styles.flag} />
            <Image source={images.line} style={styles.lineImg} />
            <TextInput
              style={styles.phoneInput}
              placeholder="+1-1232-122312"
              placeholderTextColor={colors.black}
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              onFocus={() => setIsPhoneFocused(true)}
              onBlur={() => setIsPhoneFocused(false)}
              editable={false}
            />
          </View>
          <CustomTextInput
            placeholder="info@traveloTaxiUser.com"
            placeholderTextColor={colors.black}
            borderColor={colors.brown}
            borderRadius={30}
            inputWidth={width * 0.85}
            inputHeight={height * 0.06}
            value={email}
            onChangeText={setEmail}
            backgroundColor={colors.gray}
            editable={false}
          />
          <CustomTextInput
            placeholder="Demo Dummy Address"
            placeholderTextColor={colors.black}
            borderColor={colors.brown}
            borderRadius={30}
            inputWidth={width * 0.85}
            inputHeight={height * 0.06}
            value={street}
            onChangeText={setStreet}
            backgroundColor={colors.gray}
            editable={false}
          />
          <CustomTextInput
            placeholder="Demo Dummy City"
            placeholderTextColor={colors.black}
            borderColor={colors.brown}
            borderRadius={30}
            inputWidth={width * 0.85}
            inputHeight={height * 0.06}
            value={city}
            onChangeText={setCity}
            backgroundColor={colors.gray}
            editable={false}
          />
          <CustomTextInput
            placeholder="Male"
            placeholderTextColor={colors.black}
            borderColor={colors.brown}
            borderRadius={30}
            inputWidth={width * 0.85}
            inputHeight={height * 0.06}
            value={gender}
            onChangeText={setGender}
            backgroundColor={colors.gray}
            editable={false}
          />
        </View>
        {/* <View style={styles.btnMain}>
          <CustomButton
            btnHeight={height * 0.065}
            btnWidth={width * 0.4}
            text="Cancel"
            backgroundColor={colors.black}
            textColor={colors.white}
            borderRadius={30}
          />
          <CustomButton
            btnHeight={height * 0.065}
            btnWidth={width * 0.4}
            text="Save"
            backgroundColor={isFormValid ? colors.brown : colors.gray}
            textColor={colors.white}
            borderRadius={30}
            disabled={!isFormValid}
            onPress={() => navigation.navigate('Congratulation')}
          />
        </View> */}
        <CustomProfileImgModal
          modalOpen={modalOpen}
          toggleModal={toggleModal}
          camera={uploadFromCamera}
          gallery={uploadFromGallery}
        />
      </View>
    );
  };

  const DriverFields = () => {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <ScrollView
          contentContainerStyle={{
            alignItems: 'center',
          }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.imgMain}>
            <Image source={images.profGradient} style={styles.gradient} />
            <View style={styles.profMain}>
              <Image source={images.mask} style={styles.profile} />
              <TouchableOpacity
                style={styles.cameraMain}
                activeOpacity={0.7}
                onPress={() => navigation.navigate('EditProfile')}
              >
                <Image source={images.pencil} style={styles.camera} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.inputMain}>
            <CustomTextInput
              placeholder="Travelo Taxi Driver"
              placeholderTextColor={colors.black}
              borderColor={colors.brown}
              borderRadius={30}
              inputWidth={width * 0.85}
              inputHeight={height * 0.06}
              value={name}
              onChangeText={setName}
              backgroundColor={colors.gray}
              editable={false}
            />

            <View
              style={[
                styles.phoneRow,
                {
                  borderColor:
                    isPhoneFocused || phone ? colors.brown : colors.gray,
                  backgroundColor:
                    isPhoneFocused || phone ? colors.lightBrown : colors.gray,
                },
              ]}
            >
              <Image source={images.UK} style={styles.flag} />
              <Image source={images.line} style={styles.lineImg} />
              <TextInput
                style={styles.phoneInput}
                placeholder="+1-123-3123123"
                placeholderTextColor={colors.black}
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
                onFocus={() => setIsPhoneFocused(true)}
                onBlur={() => setIsPhoneFocused(false)}
                editable={false}
              />
            </View>
            <CustomTextInput
              placeholder="info@travelotaxiDriver.com"
              placeholderTextColor={colors.black}
              borderColor={colors.brown}
              borderRadius={30}
              inputWidth={width * 0.85}
              inputHeight={height * 0.06}
              value={email}
              onChangeText={setEmail}
              backgroundColor={colors.gray}
              editable={false}
            />
            <CustomTextInput
              placeholder="Demo Dummy Address"
              placeholderTextColor={colors.black}
              borderColor={colors.brown}
              borderRadius={30}
              inputWidth={width * 0.85}
              inputHeight={height * 0.06}
              value={street}
              onChangeText={setStreet}
              editable={false}
              backgroundColor={colors.gray}
            />
            <CustomTextInput
              placeholder="Demo Dummy City"
              placeholderTextColor={colors.black}
              borderColor={colors.brown}
              borderRadius={30}
              inputWidth={width * 0.85}
              inputHeight={height * 0.06}
              value={city}
              onChangeText={setCity}
              editable={false}
              backgroundColor={colors.gray}
            />
            <CustomTextInput
              placeholder="Male"
              placeholderTextColor={colors.black}
              borderColor={colors.brown}
              borderRadius={30}
              inputWidth={width * 0.85}
              inputHeight={height * 0.06}
              value={gender}
              onChangeText={setGender}
              editable={false}
              backgroundColor={colors.gray}
            />
            <CustomTextInput
              placeholder="12-12-1990"
              placeholderTextColor={colors.black}
              borderColor={colors.brown}
              borderRadius={30}
              inputWidth={width * 0.85}
              inputHeight={height * 0.06}
              backgroundColor={colors.gray}
              editable={false}
              value={formatDateForDisplay(startDate)}
              rightIcon={<Image source={images.calendar} />}
            />
            <CustomTextInput
              placeholder="Bike"
              placeholderTextColor={colors.black}
              borderColor={colors.brown}
              borderRadius={30}
              inputWidth={width * 0.85}
              inputHeight={height * 0.06}
              value={rideType}
              onChangeText={setRideType}
              editable={false}
              backgroundColor={colors.gray}
            />
            <CustomTextInput
              placeholder="32132-213123-123123"
              placeholderTextColor={colors.black}
              borderColor={colors.brown}
              borderRadius={30}
              inputWidth={width * 0.85}
              inputHeight={height * 0.06}
              value={card}
              onChangeText={setCard}
              backgroundColor={colors.gray}
              editable={false}
            />
            <View>
              <Text style={styles.documentUploadText}>Document Uploads:</Text>
              {renderUploadField(
                'Driving License:*',
                drivingLicense,
                setDrivingLicense,
                'drivingLicense',
              )}
              {renderUploadField(
                'Private Hire Driver License:*',
                privateHireLicense,
                setPrivateHireLicense,
                'privateHireLicense',
              )}
              {renderUploadField(
                'LogBook V5:*',
                logBook,
                setLogBook,
                'logBook',
              )}
              {renderUploadField(
                'Private Hire Vehicle License:*',
                vehicleLicense,
                setVehicleLicense,
                'vehicleLicense',
              )}
              {renderUploadField(
                'Insurance:*',
                insurance,
                setInsurance,
                'insurance',
              )}
              {renderUploadField('MOT:*', mot, setMot, 'mot')}
              {renderUploadField(
                'Hire Agreement (if Applicable):',
                hireAgreement,
                setHireAgreement,
                'hireAgreement',
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <TopHeader text="Profile" isBack={true} />
      {selectedRole === 'user' && <UserFields />}
      {selectedRole === 'driver' && <DriverFields />}
    </View>
  );
};

const styles = StyleSheet.create({
  profileImageWrapper: {
    width: width * 0.4,
    // height: width * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: height * 0.6,
  },
  profileImage: {
    width: width * 0.32,
    height: width * 0.32,
    resizeMode: 'cover',
  },
  defaultProfileImage: {
    // height: width * 0.4,
    bottom: height * 0.09,
    resizeMode: 'contain',
  },
  gradient: {
    height: height * 0.6,
    width: width * 0.8,
    resizeMode: 'contain',
    bottom: height * 0.07,
  },
  imgMain: {
    bottom: height * 0.09,
    alignItems: 'center',
  },
  profMain: {
    position: 'absolute',
    top: height * 0.12,
  },
  profile: {
    width: width * 0.9,
    height: height * 0.16,
    resizeMode: 'contain',
  },
  cameraMain: {
    position: 'absolute',
    left: width * 0.54,
    top: height * 0.1,
  },
  camera: {
    width: width * 0.09,
    height: height * 0.085,
    resizeMode: 'contain',
  },
  inputMain: {
    alignItems: 'center',
    bottom: height * 0.35,
    gap: height * 0.02,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 12,
    width: width * 0.85,
    height: height * 0.06,
  },
  flag: {
    width: width * 0.05,
    height: height * 0.015,
    marginRight: 8,
    borderRadius: 2,
  },
  phoneInput: {
    flex: 1,
    fontSize: fontSizes.xm2,
    color: colors.black,
  },
  lineImg: {
    height: height * 0.024,
    width: width * 0.01,
    resizeMode: 'contain',
  },
  btnMain: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    bottom: height * 0.3,
    // paddingHorizontal: width * 0.05,
    width: width * 0.85,
  },
  preview: {
    marginTop: height * 0.02,
    alignItems: 'center',
  },
  fileLabel: {
    // fontWeight: '600',
    fontSize: fontSizes.sm2,
  },
  fileName: {
    marginTop: height * 0.01,
    fontSize: fontSizes.sm,
    color: colors.darkGray,
  },
  fileUri: {
    marginTop: 4,
    fontSize: 12,
    color: colors.gray,
  },
  label: {
    fontFamily: fontFamily.ClashDisplayMedium,
    fontSize: fontSizes.sm2,
    color: colors.black,
    marginTop: height * 0.025,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 252, 252, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 16,
    width: width * 0.83,
    height: height * 0.34,
    alignItems: 'center',
    borderWidth: 0.9,
    borderColor: colors.black,
    padding: 20,
    gap: height * 0.02,
  },
  modalText: {
    fontFamily: fontFamily.ClashDisplayMedium,
    fontSize: fontSizes.md,
    color: colors.black,
  },
  paraMain: {
    alignItems: 'center',
    top: height * 0.02,
    marginBottom: height * 0.02,
  },
  container: {
    backgroundColor: colors.white,
    height: height * 0.065,
    width: width * 0.85,
    borderRadius: 30,
    marginTop: height * 0.02,
    borderColor: colors.darkGray,
    borderWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: width * 0.05,
    alignItems: 'center',
    gap: width * 0.03,
  },
  title: {
    fontFamily: fontFamily.ClashDisplayMedium,
    fontSize: fontSizes.sm,
    color: colors.black,
  },
  button: {
    backgroundColor: colors.gray,
    height: height * 0.04,
    width: width * 0.27,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: colors.darkGray,
  },
  buttonText: {
    color: colors.black,
    fontSize: fontSizes.sm,
  },
  documentUploadText: {
    fontFamily: fontFamily.ClashDisplayMedium,
    fontSize: fontSizes.lg,
    color: colors.black,
  },
  AddExpiryDate: {
    borderBottomWidth: 1,
    borderColor: colors.darkGray,
    marginTop: height * 0.01,
    fontSize: fontSizes.sm,
    color: colors.black,
  },
});

export default Profile;

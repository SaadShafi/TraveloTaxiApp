import { isCancel, pick, types } from '@react-native-documents/picker';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import { useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Keyboard,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { fontFamily } from '../../assets/Fonts';
import images from '../../assets/Images';
import CustomTextInput from '../../components/CustomTextInput';
import TopHeader from '../../components/Topheader';
import { setCountrySelect, setUser } from '../../redux/slice/roleSlice';
import { RootState } from '../../redux/store';
import { apiHelper } from '../../services';
import { getBaseURL } from '../../services/index';
import { height, width } from '../../utilities';
import { colors } from '../../utilities/colors';
import { defaultCountry, type Country } from '../../utilities/countries';
import { fontSizes } from '../../utilities/fontsizes';


const Profile = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [modalOpen, setModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const dispatch = useDispatch();
  const selectedRole = useSelector(
    (state: RootState) => state.role.selectedRole,
  );
  const reduxSelectedCountry = useSelector(
    (state: RootState) => state.role.countrySelect || defaultCountry,
  );
  const User = useSelector((state: RootState) => state.role.user);
  console.log("User from the Profile Screen!", User)
  const token = useSelector((state: RootState) => state.role.token);
  console.log("Token from the redux in the Profile Screen!", token)
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState('');
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
  const [drivingLicense, setDrivingLicense] = useState<any[]>([]);
  const [privateHireLicense, setPrivateHireLicense] = useState<any[]>([]);
  const [logBook, setLogBook] = useState<any[]>([]);
  const [vehicleLicense, setVehicleLicense] = useState<any[]>([]);
  const [insurance, setInsurance] = useState<any[]>([]);
  const [mot, setMot] = useState<any[]>([]);
  const [hireAgreement, setHireAgreement] = useState<any[]>([]);
  const [transportOperatorsLicense, setTransportOperatorsLicense] = useState<
    any[]
  >([]);
  const [drivingLicenseFront, setDrivingLicenseFront] = useState<any[]>([]);
  const [drivingLicenseBack, setDrivingLicenseBack] = useState<any[]>([]);
  const [bankStatement, setBankStatement] = useState<any[]>([]);
  const [driversTagLicense, setDriversTagLicense] = useState<any[]>([]);
  const [idCardFront, setIdCardFront] = useState<any[]>([]);
  const [idCardBack, setIdCardBack] = useState<any[]>([]);
  const [vatCertificate, setVatCertificate] = useState<any[]>([]);
  const [idCardFrontPK, setIdCardFrontPK] = useState<any[]>([]);
  const [idCardBackPK, setIdCardBackPK] = useState<any[]>([]);
  const [vehicleRegistrationPaper, setVehicleRegistrationPaper] = useState<
    any[]
  >([]);
  const [drivingLicensePaperFront, setDrivingLicensePaperFront] = useState<
    any[]
  >([]);
  const [drivingLicensePaperBack, setDrivingLicensePaperBack] = useState<any[]>(
    [],
  );
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [expiryDates, setExpiryDates] = useState<{ [key: string]: string }>({});

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

  const handlePickDocument = async (
    setter: (files: any[]) => void,
    currentFiles: any[] = [],
  ) => {
    try {
      const results = await pick({
        type: [types.allFiles, types.images, types.zip],
        allowMultiSelection: true,
        keepLocalCopy: true,
      });

      if (results && results.length > 0) {
        const newFiles = results.map(file => ({
          name: file.name,
          uri: file.uri,
          type: file.type,
          size: file.size,
          isImage: file.type?.startsWith('image/') || false,
        }));

        const allFiles = [...currentFiles, ...newFiles];
        setter(allFiles);
      }
    } catch (err: any) {
      if (!isCancel(err)) console.error('Document pick error:', err);
    }
  };

  const handleDateConfirm = (selectedDate: Date) => {
    setOpenStartPicker(false);
    setStartDate(selectedDate);
  };

  const handleCountrySelect = useCallback(
    (country: Country) => {
      dispatch(setCountrySelect(country));
      setShowCountryDropdown(false);
    },
    [dispatch],
  );

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handlePickImage = async (
    setter: (files: any[]) => void,
    currentFiles: any[] = [],
  ) => {
    try {
      ImagePicker.openPicker({
        multiple: true,
        mediaType: 'photo',
        includeBase64: false,
      })
        .then(images => {
          const newFiles = Array.isArray(images) ? images : [images];
          const formattedFiles = newFiles.map(image => ({
            name: image.filename || `image_${Date.now()}.jpg`,
            uri: image.path,
            type: 'image/jpeg',
            size: image.size,
            isImage: true,
            width: image.width,
            height: image.height,
          }));

          const allFiles = [...currentFiles, ...formattedFiles];
          setter(allFiles);
        })
        .catch(error => {
          if (error.code !== 'E_PICKER_CANCELLED') {
            console.error('Image picker error:', error);
          }
        });
    } catch (err: any) {
      console.error('Image pick error:', err);
    }
  };

  const removeFile = useCallback(
    (files: any[], setter: (files: any[]) => void, index: number) => {
      const newFiles = files.filter((_, i) => i !== index);
      setter(newFiles);
    },
    [],
  );

  const renderUploadField = (label: string, files: any[]) => (
    <View style={{ marginVertical: 8 }}>
      <Text style={styles.label}>{label}</Text>
      {files && files.length > 0 ? (
        files.map((file, index) => (
          <View key={index} style={styles.fileItem}>
            {file.isImage && (
              <Image
                source={{ uri: file.uri }}
                style={styles.fileThumbnail}
                resizeMode="cover"
              />
            )}
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text style={styles.fileName}>{file.name}</Text>
              <Text style={styles.fileSize}>{formatFileSize(file.size)}</Text>
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.noFileText}>No files uploaded</Text>
      )}
    </View>
  );

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const { response, error } = await apiHelper(
        'GET',
        'user/profile',
        {},
        null,
      );
      console.log('Fetch Profile Api Response!', response?.data.response.data);
      if (response?.data.response.data) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: response.data.message,
        });
        setProfile(response.data.response.data);
        console.log('Profile State Update Result', response.data.response.data);
        dispatch(setUser(response.data.response.data));
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Success',
        text2: error?.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProfile();
    }, []),
  );

  const renderUKDocuments = () => (
    <>
      {renderUploadField('Driving License', drivingLicense)}
      {renderUploadField('Private Hire Driver License', privateHireLicense)}
      {renderUploadField('LogBook V5', logBook)}
      {renderUploadField('Private Hire Vehicle License', vehicleLicense)}
      {renderUploadField('Insurance', insurance)}
      {renderUploadField('MOT', mot)}
      {renderUploadField('Hire Agreement', hireAgreement)}
    </>
  );

  const renderMaltaDocuments = () => (
    <>
      {renderUploadField('Transport Operators License', transportOperatorsLicense)}
      {renderUploadField('Driving License Front', drivingLicenseFront)}
      {renderUploadField('Driving License Back', drivingLicenseBack)}
      {renderUploadField('Bank Statement', bankStatement)}
      {renderUploadField('Drivers Tag License', driversTagLicense)}
      {renderUploadField('ID Card Front', idCardFront)}
      {renderUploadField('ID Card Back', idCardBack)}
      {renderUploadField('VAT Certificate', vatCertificate)}
    </>
  );

  const renderPakistanDocuments = () => (
    <>
      {renderUploadField('ID Card Front', idCardFrontPK)}
      {renderUploadField('ID Card Back', idCardBackPK)}
      {renderUploadField('Vehicle Registration Paper', vehicleRegistrationPaper)}
      {renderUploadField('Driving License Paper Front', drivingLicensePaperFront)}
      {renderUploadField('Driving License Paper Back', drivingLicensePaperBack)}
    </>
  );

  const renderCountrySpecificDocuments = () => {
    const countryName = reduxSelectedCountry.name.toLowerCase();

    if (countryName.includes('malta')) {
      return renderMaltaDocuments();
    } else if (countryName.includes('pakistan')) {
      return renderPakistanDocuments();
    } else {
      return renderUKDocuments();
    }
  };

  const PhoneInputWithCountry = useMemo(() => {
    return (
      <View
        style={[
          styles.phoneRow,
          {
            borderColor: isPhoneFocused || phone ? colors.brown : colors.gray,
            backgroundColor:
              colors.lightBrown,
          },
        ]}
      >
        <Image source={reduxSelectedCountry.flag} style={styles.flag} />

        <Image source={images.line} style={styles.lineImg} />
        <Text style={styles.countryCodeText}>
          {reduxSelectedCountry.dialCode}
        </Text>
        <TextInput
          style={styles.phoneInput}
          placeholder="Phone Number"
          placeholderTextColor={colors.black}
          keyboardType="phone-pad"
          value={profile?.phone_number}
          // onChangeText={setPhone}
          // onFocus={() => {
          //   setIsPhoneFocused(true);
          //   setShowCountryDropdown(false);
          // }}
          // onBlur={() => setIsPhoneFocused(false)}
          editable={false}
        />
      </View>
    );
  }, [
    phone,
    isPhoneFocused,
    reduxSelectedCountry,
    showCountryDropdown,
    handleCountrySelect,
  ]);


  const getProfileImageUrl = (url?: string) => {
    if (!url) return null;

    const baseURL = 'https://api.traveloservices.com';

    // If URL contains localhost or starts with /, fix it
    if (url.includes('localhost') || url.startsWith('/')) {
      const cleanUrl = url.replace('http://localhost:3000', '').replace(/^\/+/, '');
      return `${baseURL}/${cleanUrl}`;
    }

    // Otherwise, return URL as-is
    return url;
  };

  const UserFields = () => {
    const [imageError, setImageError] = useState(false);

    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <View style={styles.imgMain}>
          <Image source={images.profGradient} style={styles.gradient} />
          <View style={styles.profileImageWrapper}>
            <View style={styles.profMain}>
              {/* <Image source={images.mask} style={styles.profile} /> */}
              <Image
                source={
                  profile?.profile_picture_url || profile?.profile_picture
                    ? { uri: getProfileImageUrl(profile?.profile_picture_url || profile?.profile_picture) }
                    : images.mask
                }
                style={styles.profile}
              />
              <TouchableOpacity
                style={styles.cameraMain}
                activeOpacity={0.7}
                onPress={() => navigation.navigate('EditProfile')}
              >
                <Image source={images.pencil} style={styles.camera} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.inputMain}>
          <CustomTextInput
            placeholder="Travelo Taxi User"
            placeholderTextColor={colors.black}
            borderColor={colors.brown}
            borderRadius={30}
            inputWidth={width * 0.85}
            inputHeight={height * 0.06}
            value={profile?.full_name || name}
            onChangeText={setName}
            backgroundColor={colors.gray}
            editable={false}
          />
          {PhoneInputWithCountry}
          <CustomTextInput
            placeholder="info@traveloTaxiUser.com"
            placeholderTextColor={colors.black}
            borderColor={colors.brown}
            borderRadius={30}
            inputWidth={width * 0.85}
            inputHeight={height * 0.06}
            value={profile?.email || email}
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
            value={profile?.address || street}
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
            value={profile?.city || city}
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
            value={profile?.gender || gender}
            onChangeText={setGender}
            backgroundColor={colors.gray}
            editable={false}
          />
        </View>
      </View>
    );
  };

  const DriverFields = () => {
    const [imageError, setImageError] = useState(false);

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
              {/* <Image source={images.mask} style={styles.profile} /> */}
              <Image
                source={
                  !imageError && (profile?.profile_picture_url || profile?.profile_picture)
                    ? { uri: getProfileImageUrl(profile?.profile_picture_url || profile?.profile_picture) }
                    : images.mask
                }
                onError={() => setImageError(true)}
                style={styles.profile}
              />
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
              value={profile?.full_name || name}
              onChangeText={setName}
              backgroundColor={colors.gray}
              editable={false}
            />
            {PhoneInputWithCountry}
            <CustomTextInput
              placeholder="info@travelotaxiDriver.com"
              placeholderTextColor={colors.black}
              borderColor={colors.brown}
              borderRadius={30}
              inputWidth={width * 0.85}
              inputHeight={height * 0.06}
              value={profile?.email || email}
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
              value={profile?.address || street}
              onChangeText={setStreet}
              editable={false}
              backgroundColor={colors.gray}
            />
            <CustomTextInput
              placeholder="City"
              placeholderTextColor={colors.black}
              borderColor={colors.brown}
              borderRadius={30}
              inputWidth={width * 0.85}
              inputHeight={height * 0.06}
              value={profile?.city || gender}
              onChangeText={setCity}
              editable={false}
              backgroundColor={colors.gray}
            />
            <CustomTextInput
              placeholder="Select Gender"
              placeholderTextColor={colors.black}
              borderColor={colors.brown}
              borderRadius={30}
              inputWidth={width * 0.85}
              inputHeight={height * 0.06}
              value={profile?.gender || gender}
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
              {renderCountrySpecificDocuments()}
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
      {loading && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size="large" color={colors.brown} />
        </View>
      )}
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
    bottom: Platform.OS === 'ios' ? height * 0.35 : height * 0.35,
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
  lineImg: {
    height: height * 0.024,
    width: width * 0.01,
    resizeMode: 'contain',
    padding: 8,
  },
  btnMain: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    bottom: height * 0.3,
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
  loaderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)', // semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  countrySelector: {
    padding: 8,
  },
  flag: {
    width: width * 0.06,
    height: height * 0.03,
    borderRadius: 20,
  },
  countryDropdown: {
    position: 'absolute',
    top: height * 0.06,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    zIndex: 1000,
    elevation: 5,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  countryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  dropdownFlag: {
    width: width * 0.05,
    height: height * 0.025,
    marginRight: 10,
    borderRadius: 2,
  },
  countryText: {
    flex: 1,
    fontSize: fontSizes.sm,
    color: colors.black,
    fontFamily: fontFamily.ClashDisplayMedium,
  },
  dialCodeText: {
    fontSize: fontSizes.sm,
    color: colors.darkGray,
    fontFamily: fontFamily.ClashDisplayMedium,
  },
  countryCodeText: {
    fontSize: fontSizes.sm2,
    color: colors.black,
    marginHorizontal: 8,
    fontFamily: fontFamily.ClashDisplayMedium,
  },
  phoneInput: {
    flex: 1,
    fontSize: fontSizes.xm2,
    color: colors.black,
    fontFamily: fontFamily.ClashDisplayMedium,
  },
  uploadOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.85,
    marginTop: height * 0.01,
  },
  uploadButton: {
    height: height * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderStyle: 'dashed',
    borderWidth: 2,
    flex: 0.48,
  },
  docButton: {
    backgroundColor: '#E3F2FD',
    borderColor: '#2196F3',
  },
  imageButton: {
    backgroundColor: '#E8F5E8',
    borderColor: '#4CAF50',
  },
  uploadButtonText: {
    color: colors.black,
    fontSize: fontSizes.sm,
    fontFamily: fontFamily.ClashDisplayMedium,
  },
  singleFileContainer: {
    backgroundColor: colors.white,
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.gray,
  },
  fileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  fileThumbnail: {
    width: 40,
    height: 40,
    borderRadius: 4,
    marginRight: 10,
  },
  fileInfo: {
    flex: 1,
    marginRight: 10,
  },
  fileType: {
    fontFamily: fontFamily.ClashDisplayMedium,
    fontSize: fontSizes.xs,
    color: colors.darkGray,
    marginTop: 2,
  },
  removeButton: {
    backgroundColor: '#F44336',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: colors.white,
    fontSize: fontSizes.sm,
    fontWeight: 'bold',
  },
  imagePreviewContainer: {
    marginVertical: 8,
    alignItems: 'center',
  },
  imagePreview: {
    width: width * 0.7,
    height: height * 0.15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gray,
  },
  fileExpiryDate: {
    borderBottomWidth: 1,
    borderColor: colors.darkGray,
    marginTop: 6,
    fontSize: fontSizes.sm,
    color: colors.black,
    paddingVertical: 4,
  },
  selectedFileContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedFileText: {
    fontFamily: fontFamily.ClashDisplayMedium,
    fontSize: fontSizes.sm,
    color: colors.black,
    marginRight: 8,
  },
  fileNameSec: {
    fontFamily: fontFamily.ClashDisplayMedium,
    fontSize: fontSizes.sm,
    color: colors.brown,
    flex: 1,
  },
  fileDetailsContainer: {
    backgroundColor: colors.lightGray,
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    width: width * 0.85,
  },
  fileDetailText: {
    fontFamily: fontFamily.ClashDisplayMedium,
    fontSize: fontSizes.sm,
    color: colors.black,
    marginBottom: 4,
  },
  fileStatusContainer: {
    width: width * 0.85,
    marginTop: height * 0.01,
    alignItems: 'center',
  },
});


export default Profile;
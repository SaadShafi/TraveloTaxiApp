import DateTimePicker from '@react-native-community/datetimepicker';
import { isCancel, pick, types } from '@react-native-documents/picker';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Keyboard,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { fontFamily } from '../../assets/Fonts';
import images from '../../assets/Images';
import CustomButton from '../../components/CustomButton';
import CustomProfileImgModal from '../../components/CustomProfileImage';
import CustomSelect from '../../components/CustomSelect';
import CustomTextInput from '../../components/CustomTextInput';
import TopHeader from '../../components/Topheader';
import type { StackParamList } from '../../navigation/AuthStack';
import {
  setCountrySelect,
  setToken,
  setUser,
} from '../../redux/slice/roleSlice';
import { RootState } from '../../redux/store';
import { apiHelper } from '../../services';
import { height, width } from '../../utilities';
import { colors } from '../../utilities/colors';
import { defaultCountry, type Country } from '../../utilities/countries';
import { fontSizes } from '../../utilities/fontsizes';

const CreateProfile = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch = useDispatch();
  const reduxSelectedCountry = useSelector(
    (state: RootState) => state.role.countrySelect || defaultCountry,
  );
  const [openStartPicker, setOpenStartPicker] = useState(false);
  const selectedRole = useSelector(
    (state: RootState) => state.role.selectedRole,
  );
  const User = useSelector((state: RootState) => state.role.user);
  console.log('User from Redux in CreateProfile Screen:', User);
  const [loading, setLoading] = useState(false);
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
  const [modalOpen, setModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
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
  const [jobsPlusEngagementLetter, setJobsPlusEngagementLetter] = useState<any[]>([]);
  const [policeConduct, setPoliceConduct] = useState<any[]>([]);
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
  const [showCityModal, setShowCityModal] = useState(false);
  const [citySearch, setCitySearch] = useState('');
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [tempSelectedDate, setTempSelectedDate] = useState<Date>(new Date());
  const [openExpiryDatePicker, setOpenExpiryDatePicker] = useState(false);
  const [currentDateField, setCurrentDateField] = useState<string | null>(null);
  const [expiryDates, setExpiryDates] = useState<{ [key: string]: string }>({});

    const isFormValid =
  (name || User?.full_name) &&
  (email || User?.email) &&
  (phone || User?.phone_number) &&
  (street || User?.street) &&
  (gender || User?.gender) &&
  (city || User?.city);
    const isFormValidSec = name && email && phone && street && gender && city && card && rideType;

  useEffect(() => {
    console.log('Selected Role in CreateProfile:', selectedRole);
    console.log('Selected Country:', reduxSelectedCountry.name);
  }, [selectedRole, reduxSelectedCountry]);

  useEffect(() => {
  if (User) {
    setName(User.full_name || '');
    setEmail(User.email || '');
    setPhone(User.phone_number || '');
    setGender(User.gender || '');
    setCity(User.city || '');      // if available
    setStreet(User.address || ''); // if available
  }
}, [User]);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const genderOptions = [
    { name: 'Select Gender', id: '' },
    { name: 'male', id: 'male' },
    { name: 'female', id: 'female' },
    { name: 'Other', id: 'other' },
  ];

  const fullCitiesByCountry: { [key: string]: { name: string; id: string }[] } = {
    uk: [
      { name: 'London', id: 'london' },
      { name: 'Manchester', id: 'manchester' },
      { name: 'Birmingham', id: 'birmingham' },
      { name: 'Leeds', id: 'leeds' },
      { name: 'Glasgow', id: 'glasgow' },
      { name: 'Liverpool', id: 'liverpool' },
      { name: 'Bristol', id: 'bristol' },
      { name: 'Sheffield', id: 'sheffield' },
      { name: 'Edinburgh', id: 'edinburgh' },
      { name: 'Cardiff', id: 'cardiff' },
      { name: 'Coventry', id: 'coventry' },
      { name: 'Leicester', id: 'leicester' },
      { name: 'Nottingham', id: 'nottingham' },
      { name: 'Newcastle', id: 'newcastle' },
      { name: 'Brighton', id: 'brighton' },
      { name: 'Portsmouth', id: 'portsmouth' },
      { name: 'Southampton', id: 'southampton' },
      { name: 'Norwich', id: 'norwich' },
      { name: 'Aberdeen', id: 'aberdeen' },
      { name: 'York', id: 'york' },
      { name: 'Cambridge', id: 'cambridge' },
      { name: 'Oxford', id: 'oxford' },
      { name: 'Bath', id: 'bath' },
      { name: 'Exeter', id: 'exeter' },
      { name: 'Plymouth', id: 'plymouth' },
      { name: 'Derby', id: 'derby' },
      { name: 'Wolverhampton', id: 'wolverhampton' },
      { name: 'Swansea', id: 'swansea' },
      { name: 'Dundee', id: 'dundee' },
      { name: 'Middlesbrough', id: 'middlesbrough' }
    ],
    malta: [
      { name: 'Valletta', id: 'valletta' },
      { name: 'Mdina', id: 'mdina' },
      { name: 'Sliema', id: 'sliema' },
      { name: 'St. Julian\'s', id: 'stjulians' },
      { name: 'Birgu', id: 'birgu' },
      { name: 'Senglea', id: 'senglea' },
      { name: 'Cospicua', id: 'cospicua' },
      { name: 'Rabat', id: 'rabat' },
      { name: 'Mosta', id: 'mosta' },
      { name: 'Qormi', id: 'qormi' },
      { name: 'Zebbug', id: 'zebbug' },
      { name: 'Siggiewi', id: 'siggiewi' },
      { name: 'Zurrieq', id: 'zurrieq' },
      { name: 'Tarxien', id: 'tarxien' },
      { name: 'Paola', id: 'paola' },
      { name: 'Naxxar', id: 'naxxar' },
      { name: 'Marsa', id: 'marsa' },
      { name: 'Hamrun', id: 'hamrun' },
      { name: 'Gzira', id: 'gzira' },
      { name: 'Birkirkara', id: 'birkirkara' },
      { name: 'Attard', id: 'attard' },
      { name: 'Balzan', id: 'balzan' },
      { name: 'Lija', id: 'lija' },
      { name: 'Marsaxlokk', id: 'marsaxlokk' },
      { name: 'Mellieha', id: 'mellieha' },
      { name: 'Mgarr', id: 'mgarr' },
      { name: 'Mqabba', id: 'mqabba' },
      { name: 'Msida', id: 'msida' },
      { name: 'Mtarfa', id: 'mtarfa' },
      { name: 'Pembroke', id: 'pembroke' }
    ],
    pakistan: [
      { name: 'Karachi', id: 'karachi' },
      { name: 'Lahore', id: 'lahore' },
      { name: 'Islamabad', id: 'islamabad' },
      { name: 'Faisalabad', id: 'faisalabad' },
      { name: 'Rawalpindi', id: 'rawalpindi' },
      { name: 'Multan', id: 'multan' },
      { name: 'Gujranwala', id: 'gujranwala' },
      { name: 'Peshawar', id: 'peshawar' },
      { name: 'Quetta', id: 'quetta' },
      { name: 'Sargodha', id: 'sargodha' },
      { name: 'Sialkot', id: 'sialkot' },
      { name: 'Bahawalpur', id: 'bahawalpur' },
      { name: 'Sukkur', id: 'sukkur' },
      { name: 'Jhang', id: 'jhang' },
      { name: 'Larkana', id: 'larkana' },
      { name: 'Gujrat', id: 'gujrat' },
      { name: 'Mardan', id: 'mardan' },
      { name: 'Kasur', id: 'kasur' },
      { name: 'Dera Ghazi Khan', id: 'deraghazikhan' },
      { name: 'Sahiwal', id: 'sahiwal' },
      { name: 'Nawabshah', id: 'nawabshah' },
      { name: 'Mirpur Khas', id: 'mirpurkhas' },
      { name: 'Okara', id: 'okara' },
      { name: 'Mingora', id: 'mingora' },
      { name: 'Chiniot', id: 'chiniot' },
      { name: 'Kamoke', id: 'kamoke' },
      { name: 'Hyderabad', id: 'hyderabad' },
      { name: 'Abbottabad', id: 'abbottabad' },
      { name: 'Wah Cantonment', id: 'wahcantonment' },
      { name: 'Rahim Yar Khan', id: 'rahimyarkhan' }
    ],
  };

  const popularCitiesByCountry: { [key: string]: { name: string; id: string }[] } = {
    uk: [
      { name: 'Select City', id: '' },
      { name: 'London', id: 'london' },
      { name: 'Manchester', id: 'manchester' },
      { name: 'Birmingham', id: 'birmingham' },
      { name: 'Other', id: 'other' },
    ],
    malta: [
      { name: 'Select City', id: '' },
      { name: 'Valletta', id: 'valletta' },
      { name: 'Mdina', id: 'mdina' },
      { name: 'Sliema', id: 'sliema' },
      { name: 'Other', id: 'other' },
    ],
    pakistan: [
      { name: 'Select City', id: '' },
      { name: 'Karachi', id: 'karachi' },
      { name: 'Lahore', id: 'lahore' },
      { name: 'Islamabad', id: 'islamabad' },
      { name: 'Other', id: 'other' },
    ],
  };

  const cityOptions = useMemo(() => {
    const countryName = reduxSelectedCountry.name.toLowerCase();
    let popularCities = [{ name: 'Select City', id: '' }];

    if (countryName.includes('united kingdom') || countryName.includes('uk')) {
      popularCities = popularCitiesByCountry.uk;
    } else if (countryName.includes('malta')) {
      popularCities = popularCitiesByCountry.malta;
    } else if (countryName.includes('pakistan')) {
      popularCities = popularCitiesByCountry.pakistan;
    }

    return popularCities;
  }, [reduxSelectedCountry]);

  const handleCityChange = (value: string) => {
    if (value === 'other') {
      setShowCityModal(true); // Open modal with full city list
    } else {
      setCity(value);
    }
  };

  const rideOptions = useMemo(() => {
    const countryName = reduxSelectedCountry.name.toLowerCase();

    const options = [{ name: 'Select Ride Type', id: '' }];

    if (selectedRole === 'driver' && countryName.includes('pakistan')) {
      options.push({ name: 'Bike', id: 'bike' });
    }

    // Common options for all drivers
    options.push({ name: 'Car', id: 'car' }, { name: 'SUV', id: 'suv' });

    return options;
  }, [selectedRole, reduxSelectedCountry]);

  const handleExpiryDatePress = (fieldKey: string, index: number) => {
    setCurrentDateField(`${fieldKey}_${index}`);
    setOpenExpiryDatePicker(true);
  };

  const handleExpiryDateConfirm = (event: any, selectedDate?: Date) => {
    setOpenExpiryDatePicker(false);
    if (selectedDate && currentDateField) {
      setExpiryDates(prev => ({
        ...prev,
        [currentDateField]: selectedDate.toISOString(), // Store as ISO string
      }));
    }
  };

  const handleDateConfirm = (event: any, selectedDate?: Date) => {
    setOpenStartPicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  const formatDateForDisplay = (date: Date | null): string => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

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

        // ✅ CHANGE THIS LINE - use functional update
        setter(prevFiles => [...prevFiles, ...newFiles]);
      }
    } catch (err: any) {
      if (!isCancel(err)) console.error('Document pick error:', err);
    }
  };

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

          // ✅ CHANGE THIS LINE - use functional update
          setter(prevFiles => [...prevFiles, ...formattedFiles]);
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
    (setter: (files: any[]) => void, index: number) => {
      // ✅ Use functional update to ensure we're working with latest state
      setter(prevFiles => prevFiles.filter((_, i) => i !== index));
    },
    [],
  );

  const handleCountrySelect = useCallback(
    (country: Country) => {
      dispatch(setCountrySelect(country));
      setShowCountryDropdown(false);
    },
    [dispatch],
  );

  const toggleModalSec = () => {
    setModalVisible(false);
    // handleCreateProfile();
    navigation.navigate('BankDetailsAuth');
  };

  const renderUploadField = (
    label: string,
    files: any[],
    setter: (files: any[]) => void,
    fieldKey: string,
  ) => (
    <>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.uploadOptionsContainer}>
        <TouchableOpacity
          style={[styles.uploadButton, styles.docButton]}
          onPress={() => handlePickDocument(setter, files)}
        >
          <Text style={styles.uploadButtonText}>Choose Files</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.uploadButton, styles.imageButton]}
          onPress={() => handlePickImage(setter, files)}
        >
          <Text style={styles.uploadButtonText}>Choose Images</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.fileStatusContainer}>
        {!files || files.length === 0 ? (
          <Text style={styles.title}>No Files Selected</Text>
        ) : (
          <View style={styles.selectedFileContainer}>
            <Text style={styles.selectedFileText}>
              {files.length} file{files.length > 1 ? 's' : ''} selected
            </Text>
          </View>
        )}
      </View>

      {files && files.length > 0 && (
        <View style={styles.fileDetailsContainer}>
          {files.map((file, index) => (
            <View key={index} style={styles.singleFileContainer}>
              <View style={styles.fileHeader}>
                {file.isImage && (
                  <Image
                    source={{ uri: file.uri }}
                    style={styles.fileThumbnail}
                    resizeMode="cover"
                  />
                )}

                <View style={styles.fileInfo}>
                  <Text style={styles.fileName} numberOfLines={1}>
                    {file.name}
                  </Text>
                  <Text style={styles.fileType}>
                    {file.isImage ? 'Image' : 'Document'} •{' '}
                    {formatFileSize(file.size)}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => removeFile(setter, index)}
                  style={styles.removeButton}
                >
                  <Text style={styles.removeButtonText}>×</Text>
                </TouchableOpacity>
              </View>

              {file.isImage && (
                <TouchableOpacity
                  style={styles.imagePreviewContainer}
                  onPress={() => {
                    console.log('Show full image:', file.uri);
                  }}
                >
                  <Image
                    source={{ uri: file.uri }}
                    style={styles.imagePreview}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              )}

              <Text style={styles.fileDetailText}>Type: {file.type}</Text>
              <Text style={styles.fileDetailText}>
                Size: {formatFileSize(file.size)}
              </Text>
              <CustomTextInput
                placeholder={`*Add Expiry Date for ${file.name}`}
                placeholderTextColor={colors.black}
                borderColor={colors.brown}
                borderRadius={30}
                inputWidth={width * 0.75}
                inputHeight={height * 0.055}
                backgroundColor={colors.gray}
                editable={false}
                value={
                  expiryDates[`${fieldKey}_${index}`]
                    ? formatDateForDisplay(new Date(expiryDates[`${fieldKey}_${index}`])) 
                    : ''
                }
                rightIcon={
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => handleExpiryDatePress(fieldKey, index)}
                  >
                    <Image source={images.calendar} style={styles.calendarIconSec} />
                  </TouchableOpacity>
                }
              />
            </View>
          ))}
        </View>
      )}
    </>
  );
  
  const renderUKDocuments = () => (
    <>
      {renderUploadField(
        'Driving License:*(Front & Back)',
        drivingLicense,
        setDrivingLicense,
        'drivingLicense',
      )}
      {renderUploadField(
        'Private Hire Driver License:*(Front & Back)',
        privateHireLicense,
        setPrivateHireLicense,
        'privateHireLicense',
      )}
      {renderUploadField('LogBook V5:*', logBook, setLogBook, 'logBook')}
      {renderUploadField(
        'Private Hire Vehicle License:*(Front & Back)',
        vehicleLicense,
        setVehicleLicense,
        'vehicleLicense',
      )}
      {renderUploadField('Insurance:*', insurance, setInsurance, 'insurance')}
      {renderUploadField('MOT:*', mot, setMot, 'mot')}
      {renderUploadField(
        'Hire Agreement (if Applicable):',
        hireAgreement,
        setHireAgreement,
        'hireAgreement',
      )}
    </>
  );

  const renderMaltaDocuments = () => (
    <>
      {renderUploadField(
        'Transport Operators License:*',
        transportOperatorsLicense,
        setTransportOperatorsLicense,
        'transportOperatorsLicense',
      )}
      {renderUploadField(
        'Driving License:*(Front & Back)',
        drivingLicenseFront,
        setDrivingLicenseFront,
        'drivingLicenseFront',
      )}
      {renderUploadField(
        'Bank Statement:*',
        bankStatement,
        setBankStatement,
        'bankStatement',
      )}
      {renderUploadField(
        'Drivers Tag License:*',
        driversTagLicense,
        setDriversTagLicense,
        'driversTagLicense',
      )}
      {renderUploadField(
        'ID Card:*(Front & Back)',
        idCardFront,
        setIdCardFront,
        'idCardFront',
      )}
      {renderUploadField(
        'VAT Certificate:',
        vatCertificate,
        setVatCertificate,
        'vatCertificate',
      )}
      {renderUploadField(
        'Police Conduct:*',
        policeConduct,
        setPoliceConduct,
        'policeConduct',
      )}
      {renderUploadField(
        'Jobsplus Engagement Letter:*',
        jobsPlusEngagementLetter,
        setJobsPlusEngagementLetter,
        'jobsPlusEngagementLetter',
      )}
    </>
  );

  const renderPakistanDocuments = () => (
    <>
      {renderUploadField(
        'ID Card:*(Front & Back)',
        idCardFrontPK,
        setIdCardFrontPK,
        'idCardFrontPK',
      )}
      {/* {renderUploadField(
        'ID Card Back:*',
        idCardBackPK,
        setIdCardBackPK,
        'idCardBackPK',
      )} */}
      {renderUploadField(
        'Vehicle Registration Paper:*',
        vehicleRegistrationPaper,
        setVehicleRegistrationPaper,
        'vehicleRegistrationPaper',
      )}
      {renderUploadField(
        'Driving License Paper:*(Front & Back)',
        drivingLicensePaperFront,
        setDrivingLicensePaperFront,
        'drivingLicensePaperFront',
      )}
      {/* {renderUploadField(
        'Driving License Paper Back:*',
        drivingLicensePaperBack,
        setDrivingLicensePaperBack,
        'drivingLicensePaperBack',
      )} */}
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
          value={User?.phone_number || phone}
          onChangeText={setPhone}
          onFocus={() => {
            setIsPhoneFocused(true);
            setShowCountryDropdown(false);
          }}
          onBlur={() => setIsPhoneFocused(false)}
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

  const handleCreateProfile = async () => {
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append('full_name', User?.full_name || name);
      formData.append('phone_number', phone);
      formData.append('email', User?.email || email);
      formData.append('address', street);
      formData.append('city', city);
      formData.append('gender', gender);
      if (profileImage) {
        const fileName = profileImage.split('/').pop() || 'photo.jpg';
        const fileType = fileName.split('.').pop();

        formData.append('profile_picture', {
          uri: profileImage,
          type: `image/${fileType}`,
          name: fileName,
        });
      }

      const { response, error } = await apiHelper(
        'PUT',
        'user/profile/update',
        { 'Content-Type': 'multipart/form-data' },
        formData,
      );

      console.log('FormData sent in Create Profile:', formData);
      console.log('Response from Create Profile:', response?.data);

      if (response?.data) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Profile updated successfully!',
        });
        dispatch(setUser(response.data.response.data.user));
        dispatch(setToken(response.data.response.data.access_token));
        console.log(
          'Dispatching User inn the Create Profile Screen!',
          response.data.response.data.user,
        );
        // navigation.navigate('Congratulation');
        if (selectedRole === 'user') {
          navigation.navigate('Congratulation');
        } else if (selectedRole === 'driver') {
          navigation.navigate('BankDetailsAuth');
        }
      }
    } catch (err) {
      console.log('Create profile error:', err);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Profile update failed',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDriverContinue = () => {
    handleCreateProfile();
    setModalVisible(true);
  };

  const UserScreens = useMemo(() => {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <View style={styles.imgMain}>
          <Image source={images.profGradient} style={styles.gradient} />
          <TouchableOpacity onPress={toggleModal} activeOpacity={0.7}>
            <View style={styles.profileImageWrapper}>
              {profileImage ? (
                <View style={styles.roundedProfile}>
                  <Image
                    source={{ uri: profileImage }}
                    style={styles.profileImage}
                  />
                </View>
              ) : (
                <View style={styles.profMain}>
                  <Image source={images.profile} style={styles.profile} />
                  <View style={styles.cameraMain}>
                    <Image source={images.camera} style={styles.camera} />
                  </View>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.inputMain}>
          <CustomTextInput
            placeholder="*Enter Your Name..."
            placeholderTextColor={colors.black}
            borderColor={colors.brown}
            borderRadius={30}
            inputWidth={width * 0.85}
            inputHeight={height * 0.06}
            // value={User?.full_name || name}
            value={name}
            onChangeText={setName}
            backgroundColor={colors.gray}
          />
          {PhoneInputWithCountry}
          <CustomTextInput
            placeholder="*Enter Your Email..."
            placeholderTextColor={colors.black}
            borderColor={colors.brown}
            borderRadius={30}
            inputWidth={width * 0.85}
            inputHeight={height * 0.06}
            // value={User?.email || email}
            value={email}
            onChangeText={setEmail}
            backgroundColor={colors.gray}
          />
          <CustomTextInput
            placeholder="*Address/Post-Code"
            placeholderTextColor={colors.black}
            borderColor={colors.brown}
            borderRadius={30}
            inputWidth={width * 0.85}
            inputHeight={height * 0.06}
            value={street}
            onChangeText={setStreet}
            backgroundColor={colors.gray}
          />
          <CustomSelect
            inputWidth={width * 0.85}
            inputHeight={height * 0.06}
            selectElements={cityOptions}
            borderColor={city ? colors.brown : colors.gray}
            borderWidth={1}
            inputColor={city ? colors.lightBrown : colors.gray}
            borderRadius={30}
            onChangeText={handleCityChange} 
            setSelectedElement={setCity}
            defaultValue={city || ''}
          />
          <CustomSelect
            inputWidth={width * 0.85}
            inputHeight={height * 0.06}
            selectElements={genderOptions}
            borderColor={gender ? colors.brown : colors.gray}
            borderWidth={1}
            inputColor={gender ? colors.lightBrown : colors.gray}
            borderRadius={30}
            onChangeText={value => setGender(value)}
            setSelectedElement={setGender}
            // preselectedValue={User?.gender || gender} 
            preselectedValue={gender} 
            placeholder="Select Gender"
          />
        </View>
        <View style={styles.btnMainSec}>
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
            // backgroundColor={colors.brown}
            backgroundColor={isFormValid ? colors.brown : colors.gray}
            textColor={colors.white}
            borderRadius={30}
            disabled={!isFormValid}
            onPress={handleCreateProfile}
          />
        </View>
        <CustomProfileImgModal
          modalOpen={modalOpen}
          toggleModal={toggleModal}
          camera={uploadFromCamera}
          gallery={uploadFromGallery}
        />
        {loading && (
          <View style={styles.loaderOverlay}>
            <ActivityIndicator size="large" color={colors.brown} />
          </View>
        )}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showCityModal}
          onRequestClose={() => setShowCityModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TextInput
                placeholder="Search city..."
                value={citySearch}
                onChangeText={setCitySearch}
                style={styles.searchInput}
              />
              <ScrollView>
                {(fullCitiesByCountry[reduxSelectedCountry.name.toLowerCase()] || [])
                  .filter(cityObj => cityObj.name.toLowerCase().includes(citySearch.toLowerCase()))
                  .map(cityObj => (
                    <TouchableOpacity
                      key={cityObj.id}
                      onPress={() => {
                        setCity(cityObj.name);
                        setShowCityModal(false);
                        setCitySearch('');
                      }}
                      style={styles.cityOption}
                    >
                      <Text>{cityObj.name}</Text>
                    </TouchableOpacity>
                  ))}
              </ScrollView>
              <CustomButton
                text="Close"
                backgroundColor={colors.black}
                textColor={colors.white}
                onPress={() => setShowCityModal(false)}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }, [
    name,
    email,
    phone,
    street,
    gender,
    city,
    isPhoneFocused,
    isFormValid,
    profileImage,
    modalOpen,
    User,
    PhoneInputWithCountry,
    navigation,
  ]);

  const DriverScreens = useMemo(() => {
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
            <TouchableOpacity onPress={toggleModal} activeOpacity={0.7}>
              <View style={styles.profileImageWrapper}>
                {profileImage ? (
                  <View style={styles.roundedProfile}>
                    <Image
                      source={{ uri: profileImage }}
                      style={styles.profileImage}
                    />
                  </View>
                ) : (
                  <View style={styles.profMain}>
                    <Image source={images.profile} style={styles.profile} />
                    <View style={styles.cameraMain}>
                      <Image source={images.camera} style={styles.camera} />
                    </View>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.inputMain}>
            <CustomTextInput
              placeholder="*Enter Your Name..."
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
            {PhoneInputWithCountry}
            <CustomTextInput
              placeholder="*Enter Your Email..."
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
              placeholder="*Address/Post-Code"
              placeholderTextColor={colors.black}
              borderColor={colors.brown}
              borderRadius={30}
              inputWidth={width * 0.85}
              inputHeight={height * 0.06}
              value={street}
              onChangeText={setStreet}
              backgroundColor={colors.gray}
            />
            <CustomSelect
              inputWidth={width * 0.85}
              inputHeight={height * 0.06}
              selectElements={cityOptions}
              borderColor={city ? colors.brown : colors.gray}
              borderWidth={1}
              inputColor={city ? colors.lightBrown : colors.gray}
              borderRadius={30}
              onChangeText={value => setCity(value)}
              setSelectedElement={setCity}
              defaultValue=""
            />
            <CustomSelect
              inputWidth={width * 0.85}
              inputHeight={height * 0.06}
              selectElements={genderOptions}
              borderColor={gender ? colors.brown : colors.gray}
              borderWidth={1}
              inputColor={gender ? colors.lightBrown : colors.gray}
              borderRadius={30}
              onChangeText={value => setGender(value)}
              setSelectedElement={setGender}
              preselectedValue={gender}
              placeholder="Select Gender"
            />
            <CustomTextInput
              placeholder="*Date Of Birth"
              placeholderTextColor={colors.black}
              borderColor={colors.brown}
              borderRadius={30}
              inputWidth={width * 0.85}
              inputHeight={height * 0.06}
              backgroundColor={colors.gray}
              editable={false}
              value={formatDateForDisplay(startDate)}
              rightIcon={
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setOpenStartPicker(true)}
                >
                  <Image source={images.calendar} />
                </TouchableOpacity>
              }
            />
            {openStartPicker && (
              <DateTimePicker
                value={startDate || new Date()}
                mode="date"
                display="spinner"
                onChange={handleDateConfirm}
              />
            )}
            <CustomSelect
              inputWidth={width * 0.85}
              inputHeight={height * 0.06}
              selectElements={rideOptions}
              borderColor={rideType ? colors.brown : colors.gray}
              borderWidth={1}
              inputColor={rideType ? colors.lightBrown : colors.gray}
              borderRadius={30}
              onChangeText={value => setRideType(value)}
              setSelectedElement={setRideType}
              defaultValue=""
            />
            <CustomTextInput
              placeholder="*ID Card Number"
              placeholderTextColor={colors.black}
              borderColor={colors.brown}
              borderRadius={30}
              inputWidth={width * 0.85}
              inputHeight={height * 0.06}
              value={card}
              onChangeText={setCard}
              backgroundColor={colors.gray}
            />
            <View style={styles.DocumentUpload}>
              <Text style={styles.documentUploadText}>Document Uploads:</Text>
              {renderCountrySpecificDocuments()}
            </View>
          </View>
          <View style={styles.btnMain}>
            <CustomButton
              btnHeight={height * 0.075}
              btnWidth={width * 0.85}
              text="Continue"
              backgroundColor={isFormValidSec ? colors.brown : colors.gray}
              textColor={colors.white}
              borderRadius={30}
              disabled={!isFormValidSec}
              onPress={handleDriverContinue}
            />
          </View>
        </ScrollView>
        <CustomProfileImgModal
          modalOpen={modalOpen}
          toggleModal={toggleModal}
          camera={uploadFromCamera}
          gallery={uploadFromGallery}
        />
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Admin Approval</Text>
              <Image source={images.approve} />
              <View style={styles.paraMain}>
                <Text style={styles.modalText}>Your Request Has Been</Text>
                <Text style={styles.modalText}>Accepted! </Text>
              </View>
              <CustomButton
                text="Confirm"
                textColor={colors.white}
                backgroundColor={colors.brown}
                btnHeight={height * 0.06}
                btnWidth={width * 0.75}
                borderRadius={30}
                onPress={toggleModalSec}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }, [
    name,
    email,
    phone,
    street,
    gender,
    city,
    card,
    rideType,
    startDate,
    openStartPicker,
    isPhoneFocused,
    isFormValidSec,
    profileImage,
    modalOpen,
    modalVisible,
    reduxSelectedCountry,
    PhoneInputWithCountry,
  ]);

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        <TopHeader text="Profile" isBack={true} />
        {selectedRole === 'user' && UserScreens}
        {selectedRole === 'driver' && DriverScreens}

        {openExpiryDatePicker && (
          <DateTimePicker
            value={
              expiryDates[currentDateField || '']
                ? new Date(expiryDates[currentDateField || ''])
                : new Date()
            }
            mode="date"
            display="spinner"
            onChange={handleExpiryDateConfirm}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  datePickerModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  datePickerContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    margin: 20,
    width: width * 0.9,
    alignItems: 'center',
  },
  datePickerTitle: {
    fontSize: fontSizes.lg,
    fontFamily: fontFamily.ClashDisplayMedium,
    color: colors.black,
    marginBottom: 15,
  },
  datePicker: {
    width: '100%',
    height: 200,
  },
  datePickerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  datePickerButton: {
    flex: 0.48,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: colors.gray,
  },
  confirmButton: {
    backgroundColor: colors.brown,
  },
  cancelButtonText: {
    color: colors.black,
    fontSize: fontSizes.sm,
    fontFamily: fontFamily.ClashDisplayMedium,
  },
  confirmButtonText: {
    color: colors.white,
    fontSize: fontSizes.sm,
    fontFamily: fontFamily.ClashDisplayMedium,
  },
  searchInput: {
    width: '100%',
    height: 45,
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: colors.lightGray,
    color: colors.black,
  },
  cityOption: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomColor: colors.gray,
    borderBottomWidth: 0.5,
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
  expiryDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.01,
  },
  calendarIcon: {
    position: 'absolute',
    right: 15,
    top: '50%',
    marginTop: -height * 0.015,
  },
  calendarIconSec: {
    width: width * 0.05,
    resizeMode: "contain"
  },
  calendarImage: {
    width: width * 0.06,
    height: height * 0.03,
    resizeMode: 'contain',
  },
  profileImageWrapper: {
    width: width * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: height * 0.6,
  },
  roundedProfile: {
    top: height * 0.09,
    position: 'absolute',
    borderRadius: width * 0.3,
    borderWidth: 1,
  },
  profileImage: {
    width: width * 0.32,
    height: width * 0.32,
    resizeMode: 'cover',
    borderRadius: 70,
  },
  defaultProfileImage: {
    bottom: height * 0.09,
    resizeMode: 'contain',
  },
  imgMain: {
    bottom: height * 0.09,
    alignItems: 'center',
  },
  profMain: {
    position: 'absolute',
    top: height * 0.1,
  },
  profile: {
    width: width * 0.99,
    height: height * 0.17,
    resizeMode: 'contain',
  },
  cameraMain: {
    position: 'absolute',
    left: width * 0.58,
    top: height * 0.099,
  },
  camera: {
    width: width * 0.09,
    height: height * 0.09,
    resizeMode: 'contain',
  },
  inputMain: {
    alignItems: 'center',
    marginTop: -height * 0.3,
    bottom: height * 0.09,
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
  gradient: {
    height: height * 0.6,
    width: width * 0.8,
    resizeMode: 'contain',
    bottom: height * 0.07,
  },
  btnMain: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    bottom: height * 0.03,
    width: width * 0.85,
  },
  btnMainSec: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    bottom: height * 0.01,
    width: width * 0.85,
  },
  DocumentUpload: {},
  documentUploadText: {
    fontFamily: fontFamily.ClashDisplayMedium,
    fontSize: fontSizes.lg,
    color: colors.black,
  },
  container: {
    backgroundColor: colors.white,
    height: height * 0.065,
    width: width * 0.85,
    borderRadius: 30,
    marginTop: height * 0.025,
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
  preview: {
    marginTop: height * 0.02,
    alignItems: 'center',
  },
  fileLabel: {
    fontSize: fontSizes.sm2,
    color: colors.black,
  },
  fileName: {
    marginTop: height * 0.01,
    fontSize: fontSizes.sm,
    color: colors.black,
  },
  fileUri: {
    marginTop: 4,
    fontSize: 12,
    color: colors.black,
  },
  AddExpiryDate: {
    borderBottomWidth: 1,
    borderColor: colors.darkGray,
    marginTop: height * 0.02,
    fontSize: fontSizes.sm,
    color: colors.black,
  },
  label: {
    fontFamily: fontFamily.ClashDisplayMedium,
    fontSize: fontSizes.sm2,
    color: colors.black,
    marginTop: height * 0.025,
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
  loaderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },

  expiryDateContainer: {
    marginTop: 10,
    marginBottom: 12,
  },
  dateFieldTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: colors.gray,
  },
  expiryDateText: {
    fontFamily: fontFamily.Jakarta,
    color: colors.black,
    flex: 1,
  },
});

export default CreateProfile;
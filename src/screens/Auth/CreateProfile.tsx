import { isCancel, pick, types } from '@react-native-documents/picker';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useMemo, useState } from 'react';
import {
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
import DatePicker from 'react-native-date-picker';
import ImagePicker from 'react-native-image-crop-picker';
import { useSelector } from 'react-redux';
import { fontFamily } from '../../assets/Fonts';
import images from '../../assets/Images';
import CustomButton from '../../components/CustomButton';
import CustomProfileImgModal from '../../components/CustomProfileImage';
import CustomSelect from '../../components/CustomSelect';
import CustomTextInput from '../../components/CustomTextInput';
import TopHeader from '../../components/Topheader';
import type { StackParamList } from '../../navigation/AuthStack';
import { RootState } from '../../redux/store';
import { height, width } from '../../utilities';
import { colors } from '../../utilities/colors';
import { fontSizes } from '../../utilities/fontsizes';

type Props = NativeStackScreenProps<StackParamList, 'CreateProfile'>;

const CreateProfile: React.FC<Props> = ({ navigation }) => {
  const [openStartPicker, setOpenStartPicker] = useState(false);
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
  const [modalOpen, setModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  // const [document, setDocument] = useState<{
  //   name: string;
  //   uri: string;
  //   type?: string;
  //   size?: number;
  // } | null>(null);
  const [drivingLicense, setDrivingLicense] = useState(null);
  const [privateHireLicense, setPrivateHireLicense] = useState(null);
  const [logBook, setLogBook] = useState(null);
  const [vehicleLicense, setVehicleLicense] = useState(null);
  const [insurance, setInsurance] = useState(null);
  const [mot, setMot] = useState(null);
  const [hireAgreement, setHireAgreement] = useState(null);
  // const [expiryDates, setExpiryDates] = useState<{ [key: string]: string }>({});
  // const [openPicker, setOpenPicker] = useState<null | string>(null);
  // Instead of boolean
  const [openPicker, setOpenPicker] = useState<string | null>(null);

  // Store expiry dates as ISO strings
  const [expiryDates, setExpiryDates] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    console.log('Selected Role in CreateProfile:', selectedRole);
  }, [selectedRole]);

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

  const handleDateConfirm = (selectedDate: Date) => {
    setOpenStartPicker(false);
    setStartDate(selectedDate);
  };

  const formatDateForDisplay = (date: Date | null): string => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const isFormValid =
    name.length > 4 &&
    email.includes('@') &&
    phone.length > 7 &&
    street.length > 5;

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

  // const handlePickDocument = async () => {
  //   try {
  //     // pick returns an array of files (even if one)
  //     const results = await pick({
  //       // types of files allowed
  //       type: [types.allFiles],
  //       // optionally: allowMultiple selection
  //       allowMultiSelection: false,
  //       // optionally: keep a local copy if needed
  //       keepLocalCopy: true,
  //     });

  //     if (results && results.length > 0) {
  //       const file = results[0];
  //       setDocument({
  //         name: file.name,
  //         uri: file.uri,
  //         type: file.type, // may or may not be defined
  //         size: file.size, // size in bytes, if available
  //       });
  //     }
  //   } catch (err: any) {
  //     if (isCancel(err)) {
  //       console.log('User cancelled document picker');
  //     } else {
  //       console.error('Document pick error:', err);
  //     }
  //   }
  // };

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

  const formatDate = (date: Date) => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const toggleModalSec = () => {
    setModalVisible(false);
    navigation.navigate('BankDetails');
  };

  const UserScreens = useMemo(() => {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <View style={styles.imgMain}>
          <Image source={images.profGradient} style={styles.gradient} />
          {/* <TouchableOpacity style={styles.profMain} activeOpacity={0.7}>
            <Image source={images.profile} style={styles.profile} />
            <View style={styles.cameraMain}>
              <Image source={images.camera} style={styles.camera} />
            </View>
          </TouchableOpacity> */}
          <TouchableOpacity onPress={toggleModal} activeOpacity={0.7}>
            <View style={styles.profileImageWrapper}>
              {profileImage ? (
                <Image
                  source={{ uri: profileImage }}
                  style={styles.profileImage}
                />
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
              placeholder="+1"
              placeholderTextColor={colors.black}
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              onFocus={() => setIsPhoneFocused(true)}
              onBlur={() => setIsPhoneFocused(false)}
            />
          </View>
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
          />
          <CustomTextInput
            placeholder="*Street"
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
            defaultValue=""
          />
        </View>
        <View style={styles.btnMain}>
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
        </View>
        <CustomProfileImgModal
          modalOpen={modalOpen}
          toggleModal={toggleModal}
          camera={uploadFromCamera}
          gallery={uploadFromGallery}
        />
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
  ]);

  // const renderUploadField = (
  //   label: string,
  //   file: any,
  //   setter: (file: any) => void,
  //   fieldKey: string,
  // ) => (
  //   <>
  //     <Text style={styles.label}>{label}</Text>
  //     <View style={styles.container}>
  //       <TouchableOpacity
  //         style={styles.button}
  //         onPress={() => handlePickDocument(setter)}
  //       >
  //         <Text style={styles.buttonText}>Choose File</Text>
  //       </TouchableOpacity>

  //       {!file && <Text style={styles.title}>No File Selected</Text>}

  //       {file && (
  //         <View style={styles.preview}>
  //           <Text style={styles.fileLabel}>Selected File:</Text>
  //           <Text style={styles.fileName}>{file.name}</Text>
  //           <Text style={styles.fileUri}>{file.uri}</Text>
  //           {file.type && <Text style={styles.fileUri}>Type: {file.type}</Text>}
  //           {file.size && (
  //             <Text style={styles.fileUri}>Size: {file.size} bytes</Text>
  //           )}
  //         </View>
  //       )}
  //     </View>
  //     <TouchableOpacity onPress={() => setOpenPicker(fieldKey)}>
  //       <TextInput
  //         placeholder="*Add Expiry Date"
  //         placeholderTextColor={colors.darkGray}
  //         style={styles.AddExpiryDate}
  //         value={expiryDates[fieldKey] || ''}
  //         editable={false}
  //       />
  //     </TouchableOpacity>
  //     <DatePicker
  //       modal
  //       mode="date"
  //       open={openPicker === fieldKey}
  //       date={new Date()}
  //       onConfirm={date => {
  //         setOpenPicker(null);
  //         setExpiryDates(prev => ({ ...prev, [fieldKey]: formatDate(date) }));
  //       }}
  //       onCancel={() => setOpenPicker(null)}
  //     />
  //   </>
  // );

  // const renderUploadField = (
  //   label: string,
  //   file: any,
  //   setter: (file: any) => void,
  //   fieldKey: string,
  // ) => (
  //   <>
  //     <Text style={styles.label}>{label}</Text>
  //     <View style={styles.container}>
  //       <TouchableOpacity
  //         style={styles.button}
  //         onPress={() => handlePickDocument(setter)}
  //       >
  //         <Text style={styles.buttonText}>Choose File</Text>
  //       </TouchableOpacity>

  //       {!file && <Text style={styles.title}>No File Selected</Text>}

  //       {file && (
  //         <View style={styles.preview}>
  //           <Text style={styles.fileLabel}>Selected File:</Text>
  //           <Text style={styles.fileName}>{file.name}</Text>
  //           <Text style={styles.fileUri}>{file.uri}</Text>
  //           {file.type && <Text style={styles.fileUri}>Type: {file.type}</Text>}
  //           {file.size && (
  //             <Text style={styles.fileUri}>Size: {file.size} bytes</Text>
  //           )}
  //         </View>
  //       )}
  //     </View>

  //     {/* Expiry date field */}
  //     <TouchableOpacity onPress={() => setOpenPicker(fieldKey)}>
  //       <TextInput
  //         placeholder="*Add Expiry Date"
  //         placeholderTextColor={colors.darkGray}
  //         style={styles.AddExpiryDate}
  //         value={
  //           expiryDates[fieldKey]
  //             ? formatDate(new Date(expiryDates[fieldKey]))
  //             : ''
  //         }
  //         editable={false}
  //       />
  //     </TouchableOpacity>

  //     <DatePicker
  //       modal
  //       open={openPicker === fieldKey}
  //       date={
  //         expiryDates[fieldKey] ? new Date(expiryDates[fieldKey]) : new Date()
  //       }
  //       mode="date"
  //       onConfirm={date => {
  //         setOpenPicker(null);
  //         setExpiryDates(prev => ({
  //           ...prev,
  //           [fieldKey]: date.toISOString(),
  //         }));
  //       }}
  //       onCancel={() => setOpenPicker(null)}
  //     />
  //   </>
  // );

  const renderUploadField = (
    label: string,
    file: any,
    setter: (file: any) => void,
    fieldKey: string,
  ) => (
    <>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handlePickDocument(setter)}
        >
          <Text style={styles.buttonText}>Choose File</Text>
        </TouchableOpacity>

        {!file && <Text style={styles.title}>No File Selected</Text>}

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

      {/* Expiry date field - FIXED: Properly set the field key when opening */}
      {/* <View style={styles.expiryDateContainer}> */}
      <TextInput
        placeholder="*Add Expiry Date"
        placeholderTextColor={colors.darkGray}
        style={styles.AddExpiryDate}
        // value={
        //   expiryDates[fieldKey]
        //     ? formatDateForDisplay(new Date(expiryDates[fieldKey]))
        //     : ''
        // }
        // editable={false}
      />
      {/* <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setOpenPicker(fieldKey)}
          style={styles.calendarIcon}
        >
          <Image source={images.calendar} />
        </TouchableOpacity> */}
      {/* </View> */}

      {/* <DatePicker
        modal
        open={openPicker === fieldKey}
        date={
          expiryDates[fieldKey] ? new Date(expiryDates[fieldKey]) : new Date()
        }
        mode="date"
        onConfirm={date => {
          setOpenPicker(null);
          setExpiryDates(prev => ({
            ...prev,
            [fieldKey]: date.toISOString(),
          }));
        }}
        onCancel={() => setOpenPicker(null)}
      /> */}
    </>
  );

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
            <TouchableOpacity style={styles.profMain} activeOpacity={0.7}>
              <Image source={images.profile} style={styles.profile} />
              <View style={styles.cameraMain}>
                <Image source={images.camera} style={styles.camera} />
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
                placeholder="+1"
                placeholderTextColor={colors.black}
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
                onFocus={() => setIsPhoneFocused(true)}
                onBlur={() => setIsPhoneFocused(false)}
              />
            </View>
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
            />
            <CustomTextInput
              placeholder="*Street"
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
              defaultValue=""
            />
            <CustomTextInput
              placeholder="*Date Of Birth"
              placeholderTextColor={colors.black}
              borderColor={colors.brown}
              borderRadius={30}
              inputWidth={width * 0.85}
              inputHeight={height * 0.06}
              // value={street}
              // onChangeText={setStreet}
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
            <DatePicker
              modal
              open={openStartPicker}
              date={startDate || new Date()}
              mode="date"
              onConfirm={handleDateConfirm}
              onCancel={() => setOpenStartPicker(false)}
              // minimumDate={new Date()}
            />
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
              // value={card}
              // onChangeText={setCard}
              backgroundColor={colors.gray}
            />
            <View style={styles.DocumentUpload}>
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
          <View style={styles.btnMain}>
            <CustomButton
              btnHeight={height * 0.075}
              btnWidth={width * 0.85}
              text="Continue"
              backgroundColor={isFormValid ? colors.brown : colors.black}
              textColor={colors.white}
              borderRadius={30}
              disabled={!isFormValid}
              // onPress={() => navigation.navigate('Congratulation')}
              onPress={() => setModalVisible(true)}
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
    rideType,
    startDate,
    openStartPicker,
    isPhoneFocused,
    isFormValid,
    profileImage,
    modalOpen,
    setModalOpen,
    modalVisible,
    setModalVisible,
  ]);

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        <TopHeader text="Profile" isBack={true} />
        {selectedRole === 'user' && UserScreens}
        {selectedRole === 'driver' && DriverScreens}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  expiryDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.01,
  },
  AddExpiryDate: {
    borderColor: colors.brown,
    borderWidth: 1,
    borderRadius: 30,
    fontSize: fontSizes.sm,
    color: colors.black,
    paddingHorizontal: 15,
    paddingVertical: height * 0.015,
    width: width * 0.85,
    backgroundColor: colors.gray,
  },
  calendarIcon: {
    position: 'absolute',
    right: 15,
    top: '50%',
    marginTop: -height * 0.015, // Center vertically
  },
  calendarImage: {
    width: width * 0.06,
    height: height * 0.03,
    resizeMode: 'contain',
  },
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
  imgMain: {
    bottom: height * 0.09,
    alignItems: 'center',
  },
  profMain: {
    position: 'absolute',
    top: height * 0.12,
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
    bottom: height * 0.3,
    // paddingHorizontal: width * 0.05,
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
  AddExpiryDate: {
    borderBottomWidth: 1,
    borderColor: colors.darkGray,
    marginTop: height * 0.01,
    fontSize: fontSizes.sm,
    color: colors.black,
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
});

export default CreateProfile;

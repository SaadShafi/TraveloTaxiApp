// import { isCancel, pick, types } from '@react-native-documents/picker';
// import { NavigationProp, useNavigation } from '@react-navigation/native';
// import { useMemo, useState } from 'react';
// import {
//   Image,
//   Keyboard,
//   Modal,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//   View,
// } from 'react-native';
// import DatePicker from 'react-native-date-picker';
// import ImagePicker from 'react-native-image-crop-picker';
// import { useSelector } from 'react-redux';
// import { fontFamily } from '../../assets/Fonts';
// import images from '../../assets/Images';
// import CustomButton from '../../components/CustomButton';
// import CustomProfileImgModal from '../../components/CustomProfileImage';
// import CustomSelect from '../../components/CustomSelect';
// import CustomTextInput from '../../components/CustomTextInput';
// import TopHeader from '../../components/Topheader';
// import { RootState } from '../../redux/store';
// import { height, width } from '../../utilities';
// import { colors } from '../../utilities/colors';
// import { fontSizes } from '../../utilities/fontsizes';

// const EditProfile = () => {
//   const navigation = useNavigation<NavigationProp<any>>();
//   const [modalOpen, setModalOpen] = useState(false);
//   const [profileImage, setProfileImage] = useState<string | null>(null);
//   const selectedRole = useSelector(
//     (state: RootState) => state.role.selectedRole,
//   );
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [street, setStreet] = useState('');
//   const [isPhoneFocused, setIsPhoneFocused] = useState(false);
//   const [gender, setGender] = useState('');
//   const [city, setCity] = useState('');
//   const [rideType, setRideType] = useState('');
//   const [card, setCard] = useState('');
//   const [startDate, setStartDate] = useState<Date | null>(null);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [openStartPicker, setOpenStartPicker] = useState(false);
//   const [drivingLicense, setDrivingLicense] = useState(null);
//   const [privateHireLicense, setPrivateHireLicense] = useState(null);
//   const [logBook, setLogBook] = useState(null);
//   const [vehicleLicense, setVehicleLicense] = useState(null);
//   const [insurance, setInsurance] = useState(null);
//   const [mot, setMot] = useState(null);
//   const [hireAgreement, setHireAgreement] = useState(null);

//   const toggleModal = () => {
//     setModalOpen(!modalOpen);
//   };

//   const uploadFromGallery = () => {
//     ImagePicker.openPicker({
//       width: 300,
//       height: 400,
//       cropping: true,
//     }).then(image => {
//       setProfileImage(image.path);
//       toggleModal();
//     });
//   };

//   const uploadFromCamera = () => {
//     ImagePicker.openCamera({
//       width: 300,
//       height: 400,
//       cropping: true,
//     }).then(image => {
//       setProfileImage(image.path);
//       toggleModal();
//     });
//   };

//   const isFormValid =
//     name.length > 4 &&
//     email.includes('@') &&
//     phone.length > 7 &&
//     street.length > 5;

//   const dismissKeyboard = () => {
//     Keyboard.dismiss();
//   };

//   const genderOptions = [
//     { name: 'Select Gender', id: '' },
//     { name: 'Male', id: 'male' },
//     { name: 'Female', id: 'female' },
//     { name: 'Other', id: 'other' },
//   ];

//   const cityOptions = [
//     { name: 'Select City', id: '' },
//     { name: 'Texas', id: 'texas' },
//     { name: 'Misissippi', id: 'misissippi' },
//     { name: 'New York', id: 'new york' },
//     { name: 'Other', id: 'other' },
//   ];

//   const rideOptions = [
//     { name: 'Select Ride Type', id: '' },
//     { name: 'Bike', id: 'bike' },
//     { name: 'Car', id: 'car' },
//     { name: 'SUV', id: 'suv' },
//   ];

//   const toggleModalSec = () => {
//     setModalVisible(false);
//     navigation.goBack();
//   };

//   const formatDateForDisplay = (date: Date | null): string => {
//     if (!date) return '';
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//     });
//   };

//   const handlePickDocument = async (setter: (file: any) => void) => {
//     try {
//       const results = await pick({
//         type: [types.allFiles],
//         allowMultiSelection: false,
//         keepLocalCopy: true,
//       });

//       if (results && results.length > 0) {
//         const file = results[0];
//         setter({
//           name: file.name,
//           uri: file.uri,
//           type: file.type,
//           size: file.size,
//         });
//       }
//     } catch (err: any) {
//       if (!isCancel(err)) console.error('Document pick error:', err);
//     }
//   };

//   const handleDateConfirm = (selectedDate: Date) => {
//     setOpenStartPicker(false);
//     setStartDate(selectedDate);
//   };

//   const renderUploadField = (
//     label: string,
//     file: any,
//     setter: (file: any) => void,
//     fieldKey: string,
//   ) => (
//     <>
//       <Text style={styles.label}>{label}</Text>
//       <View style={styles.container}>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => handlePickDocument(setter)}
//         >
//           <Text style={styles.buttonText}>Choose File</Text>
//         </TouchableOpacity>

//         {!file && <Text style={styles.title}>No File Selected</Text>}

//         {file && (
//           <View style={styles.preview}>
//             <Text style={styles.fileLabel}>Selected File:</Text>
//             <Text style={styles.fileName}>{file.name}</Text>
//             <Text style={styles.fileUri}>{file.uri}</Text>
//             {file.type && <Text style={styles.fileUri}>Type: {file.type}</Text>}
//             {file.size && (
//               <Text style={styles.fileUri}>Size: {file.size} bytes</Text>
//             )}
//           </View>
//         )}
//       </View>
//       <TextInput
//         placeholder="*Add Expiry Date"
//         placeholderTextColor={colors.darkGray}
//         style={styles.AddExpiryDate}
//         keyboardType="phone-pad"
//       />
//     </>
//   );

//   const UserFields = useMemo(() => {
//     return (
//       <View style={{ flex: 1, alignItems: 'center' }}>
//         <View style={styles.imgMain}>
//           <Image source={images.profGradient} style={styles.gradient} />
//           <TouchableOpacity onPress={toggleModal} activeOpacity={0.7}>
//             <View style={styles.profileImageWrapper}>
//               {profileImage ? (
//                 <Image
//                   source={{ uri: profileImage }}
//                   style={styles.profileImage}
//                 />
//               ) : (
//                 <View style={styles.profMain}>
//                   <Image source={images.profile} style={styles.profile} />
//                   <View style={styles.cameraMain}>
//                     <Image source={images.camera} style={styles.camera} />
//                   </View>
//                 </View>
//               )}
//             </View>
//           </TouchableOpacity>
//         </View>
//         <View style={styles.inputMain}>
//           <CustomTextInput
//             placeholder="*Enter Your Name..."
//             placeholderTextColor={colors.black}
//             borderColor={colors.brown}
//             borderRadius={30}
//             inputWidth={width * 0.85}
//             inputHeight={height * 0.06}
//             value={name}
//             onChangeText={setName}
//             backgroundColor={colors.gray}
//           />

//           <View
//             style={[
//               styles.phoneRow,
//               {
//                 borderColor:
//                   isPhoneFocused || phone ? colors.brown : colors.gray,
//                 backgroundColor:
//                   isPhoneFocused || phone ? colors.lightBrown : colors.gray,
//               },
//             ]}
//           >
//             <Image source={images.UK} style={styles.flag} />
//             <Image source={images.line} style={styles.lineImg} />
//             <TextInput
//               style={styles.phoneInput}
//               placeholder="+1"
//               placeholderTextColor={colors.black}
//               keyboardType="phone-pad"
//               value={phone}
//               onChangeText={setPhone}
//               onFocus={() => setIsPhoneFocused(true)}
//               onBlur={() => setIsPhoneFocused(false)}
//             />
//           </View>
//           <CustomTextInput
//             placeholder="*Enter Your Email..."
//             placeholderTextColor={colors.black}
//             borderColor={colors.brown}
//             borderRadius={30}
//             inputWidth={width * 0.85}
//             inputHeight={height * 0.06}
//             value={email}
//             onChangeText={setEmail}
//             backgroundColor={colors.gray}
//           />
//           <CustomTextInput
//             placeholder="*Address"
//             placeholderTextColor={colors.black}
//             borderColor={colors.brown}
//             borderRadius={30}
//             inputWidth={width * 0.85}
//             inputHeight={height * 0.06}
//             value={street}
//             onChangeText={setStreet}
//             backgroundColor={colors.gray}
//           />
//           <CustomSelect
//             inputWidth={width * 0.85}
//             inputHeight={height * 0.06}
//             selectElements={cityOptions}
//             borderColor={city ? colors.brown : colors.gray}
//             borderWidth={1}
//             inputColor={city ? colors.lightBrown : colors.gray}
//             borderRadius={30}
//             onChangeText={value => setCity(value)}
//             setSelectedElement={setCity}
//             defaultValue=""
//           />
//           <CustomSelect
//             inputWidth={width * 0.85}
//             inputHeight={height * 0.06}
//             selectElements={genderOptions}
//             borderColor={gender ? colors.brown : colors.gray}
//             borderWidth={1}
//             inputColor={gender ? colors.lightBrown : colors.gray}
//             borderRadius={30}
//             onChangeText={value => setGender(value)}
//             setSelectedElement={setGender}
//             defaultValue=""
//           />
//         </View>
//         <View style={styles.btnMain}>
//           <CustomButton
//             btnHeight={height * 0.065}
//             btnWidth={width * 0.4}
//             text="Cancel"
//             backgroundColor={colors.black}
//             textColor={colors.white}
//             borderRadius={30}
//           />
//           <CustomButton
//             btnHeight={height * 0.065}
//             btnWidth={width * 0.4}
//             text="Save"
//             backgroundColor={isFormValid ? colors.brown : colors.gray}
//             textColor={colors.white}
//             borderRadius={30}
//             disabled={!isFormValid}
//             // onPress={() => navigation.navigate('Congratulation')}
//             onPress={() => setModalVisible(true)}
//           />
//         </View>
//         <CustomProfileImgModal
//           modalOpen={modalOpen}
//           toggleModal={toggleModal}
//           camera={uploadFromCamera}
//           gallery={uploadFromGallery}
//         />
//         <Modal
//           animationType="fade"
//           transparent={true}
//           visible={modalVisible}
//           onRequestClose={() => setModalVisible(false)}
//         >
//           <View style={styles.modalOverlay}>
//             <View style={styles.modalContent}>
//               <Text style={styles.modalText}>Profile Edited Successfully</Text>
//               <Image source={images.checked} />
//               <CustomButton
//                 text="Confirm"
//                 textColor={colors.white}
//                 backgroundColor={colors.brown}
//                 btnHeight={height * 0.06}
//                 btnWidth={width * 0.75}
//                 borderRadius={30}
//                 onPress={toggleModalSec}
//               />
//             </View>
//           </View>
//         </Modal>
//       </View>
//     );
//   }, [
//     name,
//     email,
//     phone,
//     street,
//     gender,
//     city,
//     isPhoneFocused,
//     isFormValid,
//     profileImage,
//     modalOpen,
//     setModalOpen,
//     modalVisible,
//     setModalVisible,
//   ]);

//   const DriverFields = useMemo(() => {
//     return (
//       <View style={{ flex: 1, alignItems: 'center' }}>
//         <ScrollView
//           contentContainerStyle={{
//             alignItems: 'center',
//           }}
//           showsVerticalScrollIndicator={false}
//         >
//           <View style={styles.imgMain}>
//             <Image source={images.profGradient} style={styles.gradient} />
//             <TouchableOpacity style={styles.profMain} activeOpacity={0.7}>
//               <Image source={images.profile} style={styles.profile} />
//               <View style={styles.cameraMain}>
//                 <Image source={images.camera} style={styles.camera} />
//               </View>
//             </TouchableOpacity>
//           </View>
//           <View style={styles.inputMain}>
//             <CustomTextInput
//               placeholder="*Enter Your Name..."
//               placeholderTextColor={colors.black}
//               borderColor={colors.brown}
//               borderRadius={30}
//               inputWidth={width * 0.85}
//               inputHeight={height * 0.06}
//               value={name}
//               onChangeText={setName}
//               backgroundColor={colors.gray}
//             />

//             <View
//               style={[
//                 styles.phoneRow,
//                 {
//                   borderColor:
//                     isPhoneFocused || phone ? colors.brown : colors.gray,
//                   backgroundColor:
//                     isPhoneFocused || phone ? colors.lightBrown : colors.gray,
//                 },
//               ]}
//             >
//               <Image source={images.UK} style={styles.flag} />
//               <Image source={images.line} style={styles.lineImg} />
//               <TextInput
//                 style={styles.phoneInput}
//                 placeholder="+1"
//                 placeholderTextColor={colors.black}
//                 keyboardType="phone-pad"
//                 value={phone}
//                 onChangeText={setPhone}
//                 onFocus={() => setIsPhoneFocused(true)}
//                 onBlur={() => setIsPhoneFocused(false)}
//               />
//             </View>
//             <CustomTextInput
//               placeholder="*Enter Your Email..."
//               placeholderTextColor={colors.black}
//               borderColor={colors.brown}
//               borderRadius={30}
//               inputWidth={width * 0.85}
//               inputHeight={height * 0.06}
//               value={email}
//               onChangeText={setEmail}
//               backgroundColor={colors.gray}
//             />
//             <CustomTextInput
//               placeholder="*Address"
//               placeholderTextColor={colors.black}
//               borderColor={colors.brown}
//               borderRadius={30}
//               inputWidth={width * 0.85}
//               inputHeight={height * 0.06}
//               value={street}
//               onChangeText={setStreet}
//               backgroundColor={colors.gray}
//             />
//             <CustomSelect
//               inputWidth={width * 0.85}
//               inputHeight={height * 0.06}
//               selectElements={cityOptions}
//               borderColor={city ? colors.brown : colors.gray}
//               borderWidth={1}
//               inputColor={city ? colors.lightBrown : colors.gray}
//               borderRadius={30}
//               onChangeText={value => setCity(value)}
//               setSelectedElement={setCity}
//               defaultValue=""
//             />
//             <CustomSelect
//               inputWidth={width * 0.85}
//               inputHeight={height * 0.06}
//               selectElements={genderOptions}
//               borderColor={gender ? colors.brown : colors.gray}
//               borderWidth={1}
//               inputColor={gender ? colors.lightBrown : colors.gray}
//               borderRadius={30}
//               onChangeText={value => setGender(value)}
//               setSelectedElement={setGender}
//               defaultValue=""
//             />
//             <CustomTextInput
//               placeholder="*Date Of Birth"
//               placeholderTextColor={colors.black}
//               borderColor={colors.brown}
//               borderRadius={30}
//               inputWidth={width * 0.85}
//               inputHeight={height * 0.06}
//               // value={street}
//               // onChangeText={setStreet}
//               backgroundColor={colors.gray}
//               editable={false}
//               value={formatDateForDisplay(startDate)}
//               rightIcon={
//                 <TouchableOpacity
//                   activeOpacity={0.7}
//                   onPress={() => setOpenStartPicker(true)}
//                 >
//                   <Image source={images.calendar} />
//                 </TouchableOpacity>
//               }
//             />
//             <DatePicker
//               modal
//               open={openStartPicker}
//               date={startDate || new Date()}
//               mode="date"
//               onConfirm={handleDateConfirm}
//               onCancel={() => setOpenStartPicker(false)}
//               // minimumDate={new Date()}
//             />
//             <CustomSelect
//               inputWidth={width * 0.85}
//               inputHeight={height * 0.06}
//               selectElements={rideOptions}
//               borderColor={rideType ? colors.brown : colors.gray}
//               borderWidth={1}
//               inputColor={rideType ? colors.lightBrown : colors.gray}
//               borderRadius={30}
//               onChangeText={value => setRideType(value)}
//               setSelectedElement={setRideType}
//               defaultValue=""
//             />
//             <CustomTextInput
//               placeholder="*ID Card Number"
//               placeholderTextColor={colors.black}
//               borderColor={colors.brown}
//               borderRadius={30}
//               inputWidth={width * 0.85}
//               inputHeight={height * 0.06}
//               value={card}
//               onChangeText={setCard}
//               backgroundColor={colors.gray}
//             />
//             <View>
//               <Text style={styles.documentUploadText}>Document Uploads:</Text>
//               {renderUploadField(
//                 'Driving License:*',
//                 drivingLicense,
//                 setDrivingLicense,
//                 'drivingLicense',
//               )}
//               {renderUploadField(
//                 'Private Hire Driver License:*',
//                 privateHireLicense,
//                 setPrivateHireLicense,
//                 'privateHireLicense',
//               )}
//               {renderUploadField(
//                 'LogBook V5:*',
//                 logBook,
//                 setLogBook,
//                 'logBook',
//               )}
//               {renderUploadField(
//                 'Private Hire Vehicle License:*',
//                 vehicleLicense,
//                 setVehicleLicense,
//                 'vehicleLicense',
//               )}
//               {renderUploadField(
//                 'Insurance:*',
//                 insurance,
//                 setInsurance,
//                 'insurance',
//               )}
//               {renderUploadField('MOT:*', mot, setMot, 'mot')}
//               {renderUploadField(
//                 'Hire Agreement (if Applicable):',
//                 hireAgreement,
//                 setHireAgreement,
//                 'hireAgreement',
//               )}
//             </View>
//           </View>
//           <View style={styles.btnMain}>
//             <CustomButton
//               btnHeight={height * 0.075}
//               btnWidth={width * 0.85}
//               text="Continue"
//               backgroundColor={isFormValid ? colors.brown : colors.black}
//               textColor={colors.white}
//               borderRadius={30}
//               disabled={!isFormValid}
//               // onPress={() => navigation.navigate('Congratulation')}
//               onPress={() => setModalVisible(true)}
//             />
//           </View>
//         </ScrollView>
//         <CustomProfileImgModal
//           modalOpen={modalOpen}
//           toggleModal={toggleModal}
//           camera={uploadFromCamera}
//           gallery={uploadFromGallery}
//         />
//         <Modal
//           animationType="fade"
//           transparent={true}
//           visible={modalVisible}
//           onRequestClose={() => setModalVisible(false)}
//         >
//           <View style={styles.modalOverlay}>
//             <View style={styles.modalContent}>
//               <Text style={styles.modalText}>Profile Edited Successfully</Text>
//               <Image source={images.approve} />
//               <CustomButton
//                 text="Confirm"
//                 textColor={colors.white}
//                 backgroundColor={colors.brown}
//                 btnHeight={height * 0.06}
//                 btnWidth={width * 0.75}
//                 borderRadius={30}
//                 onPress={toggleModalSec}
//               />
//             </View>
//           </View>
//         </Modal>
//       </View>
//     );
//   }, [
//     name,
//     email,
//     phone,
//     street,
//     gender,
//     city,
//     card,
//     rideType,
//     startDate,
//     openStartPicker,
//     isPhoneFocused,
//     isFormValid,
//     profileImage,
//     modalOpen,
//     setModalOpen,
//     modalVisible,
//     setModalVisible,
//   ]);
//   return (
//     <TouchableWithoutFeedback onPress={dismissKeyboard}>
//       <View style={{ flex: 1, backgroundColor: colors.white }}>
//         <TopHeader text="Edit Profile" />
//         {selectedRole === 'user' && UserFields}
//         {selectedRole === 'driver' && DriverFields}
//       </View>
//     </TouchableWithoutFeedback>
//   );
// };

// const styles = StyleSheet.create({
//   profileImageWrapper: {
//     width: width * 0.4,
//     // height: width * 0.4,
//     justifyContent: 'center',
//     alignItems: 'center',
//     bottom: height * 0.6,
//   },
//   profileImage: {
//     width: width * 0.32,
//     height: width * 0.32,
//     resizeMode: 'cover',
//   },
//   defaultProfileImage: {
//     // height: width * 0.4,
//     bottom: height * 0.09,
//     resizeMode: 'contain',
//   },
//   gradient: {
//     height: height * 0.6,
//     width: width * 0.8,
//     resizeMode: 'contain',
//     bottom: height * 0.07,
//   },
//   imgMain: {
//     bottom: height * 0.09,
//     alignItems: 'center',
//   },
//   profMain: {
//     position: 'absolute',
//     top: height * 0.12,
//   },
//   profile: {
//     width: width * 0.99,
//     height: height * 0.17,
//     resizeMode: 'contain',
//   },
//   cameraMain: {
//     position: 'absolute',
//     left: width * 0.58,
//     top: height * 0.099,
//   },
//   camera: {
//     width: width * 0.09,
//     height: height * 0.09,
//     resizeMode: 'contain',
//   },
//   inputMain: {
//     alignItems: 'center',
//     bottom: height * 0.35,
//     gap: height * 0.02,
//   },
//   phoneRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderColor: colors.gray,
//     borderWidth: 1,
//     borderRadius: 30,
//     paddingHorizontal: 12,
//     width: width * 0.85,
//     height: height * 0.06,
//   },
//   flag: {
//     width: width * 0.05,
//     height: height * 0.015,
//     marginRight: 8,
//     borderRadius: 2,
//   },
//   phoneInput: {
//     flex: 1,
//     fontSize: fontSizes.xm2,
//     color: colors.black,
//   },
//   lineImg: {
//     height: height * 0.024,
//     width: width * 0.01,
//     resizeMode: 'contain',
//   },
//   btnMain: {
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     flexDirection: 'row',
//     bottom: height * 0.3,
//     // paddingHorizontal: width * 0.05,
//     width: width * 0.85,
//   },
//   preview: {
//     marginTop: height * 0.02,
//     alignItems: 'center',
//   },
//   fileLabel: {
//     // fontWeight: '600',
//     fontSize: fontSizes.sm2,
//   },
//   fileName: {
//     marginTop: height * 0.01,
//     fontSize: fontSizes.sm,
//     color: colors.darkGray,
//   },
//   fileUri: {
//     marginTop: 4,
//     fontSize: 12,
//     color: colors.gray,
//   },
//   label: {
//     fontFamily: fontFamily.ClashDisplayMedium,
//     fontSize: fontSizes.sm2,
//     color: colors.black,
//     marginTop: height * 0.025,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(255, 252, 252, 0.9)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 30,
//   },
//   modalContent: {
//     backgroundColor: colors.white,
//     borderRadius: 16,
//     width: width * 0.83,
//     height: height * 0.25,
//     alignItems: 'center',
//     borderWidth: 0.9,
//     borderColor: colors.black,
//     padding: 20,
//     gap: height * 0.02,
//   },
//   modalText: {
//     fontFamily: fontFamily.ClashDisplayMedium,
//     fontSize: fontSizes.md,
//     color: colors.black,
//   },
//   paraMain: {
//     alignItems: 'center',
//     top: height * 0.02,
//     marginBottom: height * 0.02,
//   },
//   container: {
//     backgroundColor: colors.white,
//     height: height * 0.065,
//     width: width * 0.85,
//     borderRadius: 30,
//     marginTop: height * 0.02,
//     borderColor: colors.darkGray,
//     borderWidth: 1,
//     flexDirection: 'row',
//     paddingHorizontal: width * 0.05,
//     alignItems: 'center',
//     gap: width * 0.03,
//   },
//   title: {
//     fontFamily: fontFamily.ClashDisplayMedium,
//     fontSize: fontSizes.sm,
//     color: colors.black,
//   },
//   button: {
//     backgroundColor: colors.gray,
//     height: height * 0.04,
//     width: width * 0.27,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 15,
//     borderStyle: 'dashed',
//     borderWidth: 2,
//     borderColor: colors.darkGray,
//   },
//   buttonText: {
//     color: colors.black,
//     fontSize: fontSizes.sm,
//   },
//   documentUploadText: {
//     fontFamily: fontFamily.ClashDisplayMedium,
//     fontSize: fontSizes.lg,
//     color: colors.black,
//   },
//   AddExpiryDate: {
//     borderBottomWidth: 1,
//     borderColor: colors.darkGray,
//     marginTop: height * 0.01,
//     fontSize: fontSizes.sm,
//     color: colors.black,
//   },
// });

// export default EditProfile;



import DateTimePicker from '@react-native-community/datetimepicker';
import { isCancel, pick, types } from '@react-native-documents/picker';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useMemo, useState } from 'react';
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
import { setCountrySelect, setUser } from '../../redux/slice/roleSlice';
import { RootState } from '../../redux/store';
import { apiHelper, getBaseURL } from '../../services';
import { height, width } from '../../utilities';
import { colors } from '../../utilities/colors';
import {
  countries,
  defaultCountry,
  type Country,
} from '../../utilities/countries';
import { fontSizes } from '../../utilities/fontsizes';

const EditProfile = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [modalOpen, setModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const selectedRole = useSelector(
    (state: RootState) => state.role.selectedRole,
  );
  const User = useSelector((state: RootState) => state.role.user);
  console.log('User from Redux in EditProfile Screen:', User);
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
  // const [drivingLicense, setDrivingLicense] = useState(null);
  // const [privateHireLicense, setPrivateHireLicense] = useState(null);
  // const [logBook, setLogBook] = useState(null);
  // const [vehicleLicense, setVehicleLicense] = useState(null);
  // const [insurance, setInsurance] = useState(null);
  // const [mot, setMot] = useState(null);
  // const [hireAgreement, setHireAgreement] = useState(null);
  // const [showCountryDropdown, setShowCountryDropdown] = useState(false);
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
  const reduxSelectedCountry = useSelector(
    (state: RootState) => state.role.countrySelect || defaultCountry,
  );

  useEffect(() => {
    console.log('User from Redux in EditProfile Screen:', User);
  }, [User]);

  // ✅ Helper: Ensure correct URL even if backend sends relative path
  const getFullImageUrl = (path: string | null | undefined) => {
    if (!path) return null;
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    return `${getBaseURL()}uploads/profile-pictures/${path.replace(
      /^\/+/,
      '',
    )}`;
  };

  // ✅ Prefill fields from Redux user for BOTH roles
  useEffect(() => {
    if (User) {
      console.log('Prefilling form with user data:', User);
      setName(User.full_name || '');
      setEmail(User.email || '');
      setPhone(User.phone_number || '');
      setStreet(User.address || '');
      setGender(User.gender || '');
      setCity(User.city || '');

      // Set profile image for both roles
      const profileImageUrl = getFullImageUrl(
        User.profile_picture_url || User.profile_picture,
      );
      setProfileImage(profileImageUrl);

      // Set additional driver fields if available
      if (selectedRole === 'driver') {
        setRideType(User.ride_type || '');
        setCard(User.id_card_number || '');

        // Set date of birth if available
        if (User.date_of_birth) {
          setStartDate(new Date(User.date_of_birth));
        }
      }
    }
  }, [User, selectedRole]);

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
    { name: 'male', id: 'male' },
    { name: 'female', id: 'female' },
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
    // navigation.goBack();
    navigation.navigate('HomeUser');
    // handleUpdateProfile();
  };

  const formatDateForDisplay = (date: Date | null): string => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // const handlePickDocument = async (setter: (file: any) => void) => {
  //   try {
  //     const results = await pick({
  //       type: [types.allFiles],
  //       allowMultiSelection: false,
  //       keepLocalCopy: true,
  //     });

  //     if (results && results.length > 0) {
  //       const file = results[0];
  //       setter({
  //         name: file.name,
  //         uri: file.uri,
  //         type: file.type,
  //         size: file.size,
  //       });
  //     }
  //   } catch (err: any) {
  //     if (!isCancel(err)) console.error('Document pick error:', err);
  //   }
  // };

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

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setOpenStartPicker(false);
    if (event.type === 'set' && selectedDate) {
      setStartDate(selectedDate);
    }
  };

  // const handleUpdateProfile = async () => {
  //   setLoading(true);

  //   try {
  //     const formData = new FormData();

  //     formData.append('full_name', User?.full_name || name);
  //     formData.append('phone_number', phone);
  //     formData.append('email', User?.email || email);
  //     formData.append('address', street);
  //     formData.append('city', city);
  //     formData.append('gender', gender);
  //     if (profileImage) {
  //       const fileName = profileImage.split('/').pop() || 'photo.jpg';
  //       const fileType = fileName.split('.').pop();

  //       formData.append('profile_picture', {
  //         uri: profileImage,
  //         type: `image/${fileType}`,
  //         name: fileName,
  //       });
  //     }

  //     const { response, error } = await apiHelper(
  //       'PUT',
  //       'user/profile/update',
  //       { 'Content-Type': 'multipart/form-data' },
  //       formData,
  //     );

  //     console.log('FormData sent in Update Profile:', formData);
  //     console.log('Response from Update Profile:', response?.data);

  //     if (response?.data) {
  //       Toast.show({
  //         type: 'success',
  //         text1: 'Success',
  //         text2: 'Profile updated successfully!',
  //       });
  //       dispatch(setUser(response.data.response.data.user));
  //       console.log(
  //         'Dispatching User inn the Update Profile Screen!',
  //         response.data.response.data.user,
  //       );
  //       navigation.goBack();
  //     }
  //   } catch (err) {
  //     console.error('Create profile error:', err);
  //     Toast.show({
  //       type: 'error',
  //       text1: 'Error',
  //       text2: 'Profile update failed',
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleUpdateProfile = async () => {
    if (!isFormValid) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please fill all required fields correctly',
      });
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      // Common fields for both roles
      formData.append('full_name', name);
      formData.append('phone_number', phone);
      formData.append('email', email);
      formData.append('address', street);
      formData.append('city', city);
      formData.append('gender', gender);

      // Add profile picture if changed
      if (profileImage && !profileImage.startsWith('http')) {
        const fileName = profileImage.split('/').pop() || 'photo.jpg';
        const fileType = fileName.split('.').pop();

        formData.append('profile_picture', {
          uri: profileImage,
          type: `image/${fileType}`,
          name: fileName,
        } as any);
      }

      // // Driver-specific fields (only basic info, no documents)
      // if (selectedRole === 'driver') {
      //   if (startDate) {
      //     formData.append('date_of_birth', startDate.toISOString());
      //   }
      //   formData.append('ride_type', rideType);
      //   formData.append('id_card_number', card);
      //   // Note: Document uploads are excluded from this update
      // }

      console.log('Updating profile with formData:', {
        name,
        email,
        phone,
        street,
        city,
        gender,
        // rideType,
        // card,
        // startDate,
        profileImageChanged: !!(
          profileImage && !profileImage.startsWith('http')
        ),
      });

      const { response, error } = await apiHelper(
        'PUT',
        'user/profile/update',
        { 'Content-Type': 'multipart/form-data' },
        formData,
      );

      console.log('Response from Update Profile:', response?.data);

      if (response?.data) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Profile updated successfully!',
        });
        dispatch(setUser(response.data.response.data.user));
        console.log(
          'Updated User dispatched:',
          response.data.response.data.user,
        );
        setModalVisible(true);
      } else if (error) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error.message || 'Profile update failed',
        });
      }
    } catch (err) {
      console.error('Update profile error:', err);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Profile update failed. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

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
  //     <TextInput
  //       placeholder="*Add Expiry Date"
  //       placeholderTextColor={colors.darkGray}
  //       style={styles.AddExpiryDate}
  //       keyboardType="phone-pad"
  //     />
  //   </>
  // );

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
                  onPress={() => removeFile(files, setter, index)}
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

              <TextInput
                placeholder={`*Add Expiry Date for ${file.name}`}
                placeholderTextColor={colors.darkGray}
                style={styles.fileExpiryDate}
                keyboardType="phone-pad"
                value={expiryDates[`${fieldKey}_${index}`] || ''}
                onChangeText={text => {
                  setExpiryDates(prev => ({
                    ...prev,
                    [`${fieldKey}_${index}`]: text,
                  }));
                }}
              />
            </View>
          ))}
        </View>
      )}
    </>
  );

  const handleCountrySelect = useCallback(
    (country: Country) => {
      dispatch(setCountrySelect(country));
      setShowCountryDropdown(false);
      console.log('Selected country:', country.name, country.dialCode);
    },
    [dispatch],
  );

  const PhoneInputWithCountry = useMemo(
    () => (
      <View style={styles.phoneInputContainer}>
        <View
          style={[
            styles.phoneRow,
            {
              borderColor: isPhoneFocused || phone ? colors.brown : colors.gray,
              backgroundColor:
                isPhoneFocused || phone ? colors.lightBrown : colors.gray,
            },
          ]}
        >
          <TouchableOpacity
            style={styles.countrySelector}
            onPress={() => setShowCountryDropdown(!showCountryDropdown)}
          >
            <Image source={reduxSelectedCountry.flag} style={styles.flag} />
            <Image source={images.arrowDropDown} style={styles.icon} />
          </TouchableOpacity>

          <Image source={images.line} style={styles.lineImg} />

          <Text style={styles.countryCodeText}>
            {reduxSelectedCountry.dialCode}
          </Text>

          <TextInput
            style={styles.phoneInput}
            placeholder="Phone Number"
            placeholderTextColor={colors.black}
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
            onFocus={() => {
              setIsPhoneFocused(true);
              setShowCountryDropdown(false);
            }}
            onBlur={() => setIsPhoneFocused(false)}
          />
        </View>

        {showCountryDropdown && (
          <View style={styles.countryDropdown}>
            <ScrollView
              style={styles.dropdownScrollView}
              nestedScrollEnabled={true}
            >
              {countries.map(country => (
                <TouchableOpacity
                  key={country.code}
                  style={[
                    styles.countryOption,
                    reduxSelectedCountry.code === country.code &&
                      styles.selectedCountryOption,
                  ]}
                  onPress={() => handleCountrySelect(country)}
                >
                  <Image source={country.flag} style={styles.dropdownFlag} />
                  <Text style={styles.countryText}>{country.name}</Text>
                  <Text style={styles.dialCodeText}>{country.dialCode}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    ),
    [
      phone,
      isPhoneFocused,
      reduxSelectedCountry,
      showCountryDropdown,
      handleCountrySelect,
    ],
  );

  const renderUKDocuments = () => (
    <>
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
      {renderUploadField('LogBook V5:*', logBook, setLogBook, 'logBook')}
      {renderUploadField(
        'Private Hire Vehicle License:*',
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
        'Driving License Front:*',
        drivingLicenseFront,
        setDrivingLicenseFront,
        'drivingLicenseFront',
      )}
      {renderUploadField(
        'Driving License Back:*',
        drivingLicenseBack,
        setDrivingLicenseBack,
        'drivingLicenseBack',
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
        'ID Card Front:*',
        idCardFront,
        setIdCardFront,
        'idCardFront',
      )}
      {renderUploadField(
        'ID Card Back:*',
        idCardBack,
        setIdCardBack,
        'idCardBack',
      )}
      {renderUploadField(
        'VAT Certificate:',
        vatCertificate,
        setVatCertificate,
        'vatCertificate',
      )}
    </>
  );

  const renderPakistanDocuments = () => (
    <>
      {renderUploadField(
        'ID Card Front:*',
        idCardFrontPK,
        setIdCardFrontPK,
        'idCardFrontPK',
      )}
      {renderUploadField(
        'ID Card Back:*',
        idCardBackPK,
        setIdCardBackPK,
        'idCardBackPK',
      )}
      {renderUploadField(
        'Vehicle Registration Paper:*',
        vehicleRegistrationPaper,
        setVehicleRegistrationPaper,
        'vehicleRegistrationPaper',
      )}
      {renderUploadField(
        'Driving License Paper Front:*',
        drivingLicensePaperFront,
        setDrivingLicensePaperFront,
        'drivingLicensePaperFront',
      )}
      {renderUploadField(
        'Driving License Paper Back:*',
        drivingLicensePaperBack,
        setDrivingLicensePaperBack,
        'drivingLicensePaperBack',
      )}
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

  // const UserFields = useMemo(() => {
  //   return (
  //     <View style={{ flex: 1, alignItems: 'center' }}>
  //       <View style={styles.imgMain}>
  //         <Image source={images.profGradient} style={styles.gradient} />
  //         <TouchableOpacity onPress={toggleModal} activeOpacity={0.7}>
  //           <View style={styles.profileImageWrapper}>
  //             {/* {profileImage ? (
  //               <Image
  //                 source={{ uri: profileImage }}
  //                 style={styles.profileImage}
  //               />
  //             ) : (
  //               <View style={styles.profMain}>
  //                 <Image source={images.profile} style={styles.profile} />
  //                 <View style={styles.cameraMain}>
  //                   <Image source={images.camera} style={styles.camera} />
  //                 </View>
  //               </View>
  //             )} */}
  //             <Image
  //               source={profileImage ? { uri: profileImage } : images.profile}
  //               style={styles.profileImage}
  //               onError={() => setProfileImage(null)}
  //             />
  //             <View style={styles.cameraMain}>
  //               <Image source={images.camera} style={styles.camera} />
  //             </View>
  //           </View>
  //         </TouchableOpacity>
  //       </View>
  //       <View style={styles.inputMain}>
  //         <CustomTextInput
  //           placeholder="*Enter Your Name..."
  //           placeholderTextColor={colors.black}
  //           borderColor={colors.brown}
  //           borderRadius={30}
  //           inputWidth={width * 0.85}
  //           inputHeight={height * 0.06}
  //           value={name}
  //           onChangeText={setName}
  //           backgroundColor={colors.gray}
  //         />

  //         {/* <View
  //           style={[
  //             styles.phoneRow,
  //             {
  //               borderColor:
  //                 isPhoneFocused || phone ? colors.brown : colors.gray,
  //               backgroundColor:
  //                 isPhoneFocused || phone ? colors.lightBrown : colors.gray,
  //             },
  //           ]}
  //         >
  //           <Image source={images.UK} style={styles.flag} />
  //           <Image source={images.line} style={styles.lineImg} />
  //           <TextInput
  //             style={styles.phoneInput}
  //             placeholder="+1"
  //             placeholderTextColor={colors.black}
  //             keyboardType="phone-pad"
  //             value={phone}
  //             onChangeText={setPhone}
  //             onFocus={() => setIsPhoneFocused(true)}
  //             onBlur={() => setIsPhoneFocused(false)}
  //           />
  //         </View> */}
  //         {PhoneInputWithCountry}
  //         <CustomTextInput
  //           placeholder="*Enter Your Email..."
  //           placeholderTextColor={colors.black}
  //           borderColor={colors.brown}
  //           borderRadius={30}
  //           inputWidth={width * 0.85}
  //           inputHeight={height * 0.06}
  //           value={email}
  //           onChangeText={setEmail}
  //           backgroundColor={colors.gray}
  //         />
  //         <CustomTextInput
  //           placeholder="*Address"
  //           placeholderTextColor={colors.black}
  //           borderColor={colors.brown}
  //           borderRadius={30}
  //           inputWidth={width * 0.85}
  //           inputHeight={height * 0.06}
  //           value={street}
  //           onChangeText={setStreet}
  //           backgroundColor={colors.gray}
  //         />
  //         <CustomSelect
  //           inputWidth={width * 0.85}
  //           inputHeight={height * 0.06}
  //           selectElements={cityOptions}
  //           borderColor={city ? colors.brown : colors.gray}
  //           borderWidth={1}
  //           inputColor={city ? colors.lightBrown : colors.gray}
  //           borderRadius={30}
  //           onChangeText={value => setCity(value)}
  //           setSelectedElement={setCity}
  //           defaultValue=""
  //         />
  //         <CustomSelect
  //           inputWidth={width * 0.85}
  //           inputHeight={height * 0.06}
  //           selectElements={genderOptions}
  //           borderColor={gender ? colors.brown : colors.gray}
  //           borderWidth={1}
  //           inputColor={gender ? colors.lightBrown : colors.gray}
  //           borderRadius={30}
  //           onChangeText={value => setGender(value)}
  //           setSelectedElement={setGender}
  //           defaultValue=""
  //         />
  //       </View>
  //       <View style={styles.btnMain}>
  //         <CustomButton
  //           btnHeight={height * 0.065}
  //           btnWidth={width * 0.4}
  //           text="Cancel"
  //           backgroundColor={colors.black}
  //           textColor={colors.white}
  //           borderRadius={30}
  //         />
  //         <CustomButton
  //           btnHeight={height * 0.065}
  //           btnWidth={width * 0.4}
  //           text="Save"
  //           backgroundColor={isFormValid ? colors.brown : colors.gray}
  //           textColor={colors.white}
  //           borderRadius={30}
  //           disabled={!isFormValid}
  //           // onPress={() => navigation.navigate('Congratulation')}
  //           onPress={() => setModalVisible(true)}
  //         />
  //       </View>
  //       <CustomProfileImgModal
  //         modalOpen={modalOpen}
  //         toggleModal={toggleModal}
  //         camera={uploadFromCamera}
  //         gallery={uploadFromGallery}
  //       />
  //       <Modal
  //         animationType="fade"
  //         transparent={true}
  //         visible={modalVisible}
  //         onRequestClose={() => setModalVisible(false)}
  //       >
  //         <View style={styles.modalOverlay}>
  //           <View style={styles.modalContent}>
  //             <Text style={styles.modalText}>Profile Edited Successfully</Text>
  //             <Image source={images.checked} />
  //             <CustomButton
  //               text="Confirm"
  //               textColor={colors.white}
  //               backgroundColor={colors.brown}
  //               btnHeight={height * 0.06}
  //               btnWidth={width * 0.75}
  //               borderRadius={30}
  //               onPress={toggleModalSec}
  //             />
  //           </View>
  //         </View>
  //       </Modal>
  //     </View>
  //   );
  // }, [
  //   name,
  //   email,
  //   phone,
  //   street,
  //   gender,
  //   city,
  //   isPhoneFocused,
  //   isFormValid,
  //   profileImage,
  //   modalOpen,
  //   setModalOpen,
  //   modalVisible,
  //   setModalVisible,
  // ]);

  const UserFields = useMemo(() => {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <View style={styles.imgMain}>
          <Image source={images.profGradient} style={styles.gradient} />
          <TouchableOpacity onPress={toggleModal} activeOpacity={0.7}>
            <View style={styles.profileImageWrapper}>
              <Image
                source={profileImage ? { uri: profileImage } : images.profile}
                style={styles.profileImage}
                onError={() => setProfileImage(null)}
              />
              <View style={styles.cameraMain}>
                <Image source={images.camera} style={styles.camera} />
              </View>
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
          />

          <CustomTextInput
            placeholder="*Address"
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
            defaultValue={city}
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
            defaultValue={gender}
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
            onPress={() => navigation.goBack()}
          />
          <CustomButton
            btnHeight={height * 0.065}
            btnWidth={width * 0.4}
            text={loading ? 'Saving...' : 'Save'}
            backgroundColor={isFormValid ? colors.brown : colors.gray}
            textColor={colors.white}
            borderRadius={30}
            disabled={!isFormValid || loading}
            onPress={handleUpdateProfile}
          />
        </View>
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
              <Text style={styles.modalText}>Profile Updated Successfully</Text>
              <Image source={images.checked} />
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
    isPhoneFocused,
    isFormValid,
    profileImage,
    modalOpen,
    modalVisible,
    loading,
  ]);

  const DriverFields = useMemo(() => {
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
            <TouchableOpacity
              style={styles.profMain}
              activeOpacity={0.7}
              onPress={toggleModal}
            >
              <Image source={images.profile} style={styles.profile} />
              <View style={styles.cameraMainSec}>
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
            />
            <CustomTextInput
              placeholder="*Address"
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
            {/*
            <DatePicker
              modal
              open={openStartPicker}
              date={startDate || new Date()}
              mode="date"
              onConfirm={handleDateConfirm}
              onCancel={() => setOpenStartPicker(false)}
              // minimumDate={new Date()}
            /> */}

            {/* Updated DateTimePicker */}
            {openStartPicker && (
              <DateTimePicker
                value={startDate || new Date()}
                mode="date"
                display="spinner" // or "default", "compact", "inline"
                onChange={handleDateChange}
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
            <View>
              <Text style={styles.documentUploadText}>Document Uploads:</Text>
              {renderCountrySpecificDocuments()}
            </View>
          </View>
          <View style={styles.btnMainSec}>
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
              <Text style={styles.modalText}>Profile Edited Successfully</Text>
              <Image source={images.approve} />
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
    isFormValid,
    profileImage,
    modalOpen,
    setModalOpen,
    modalVisible,
    setModalVisible,
  ]);

  // const DriverFields = useMemo(() => {
  //   return (
  //     <View style={{ flex: 1, alignItems: 'center' }}>
  //       <ScrollView
  //         contentContainerStyle={{
  //           alignItems: 'center',
  //           paddingBottom: height * 0.05,
  //         }}
  //         showsVerticalScrollIndicator={false}
  //       >
  //         <View style={styles.imgMain}>
  //           <Image source={images.profGradient} style={styles.gradient} />
  //           <TouchableOpacity onPress={toggleModal} activeOpacity={0.7}>
  //             <View style={styles.profileImageWrapper}>
  //               <Image
  //                 source={profileImage ? { uri: profileImage } : images.profile}
  //                 style={styles.profileImage}
  //                 onError={() => setProfileImage(null)}
  //               />
  //               <View style={styles.cameraMain}>
  //                 <Image source={images.camera} style={styles.camera} />
  //               </View>
  //             </View>
  //           </TouchableOpacity>
  //         </View>
  //         <View style={styles.inputMain}>
  //           <CustomTextInput
  //             placeholder="*Enter Your Name..."
  //             placeholderTextColor={colors.black}
  //             borderColor={colors.brown}
  //             borderRadius={30}
  //             inputWidth={width * 0.85}
  //             inputHeight={height * 0.06}
  //             value={name}
  //             onChangeText={setName}
  //             backgroundColor={colors.gray}
  //           />

  //           {PhoneInputWithCountry}

  //           <CustomTextInput
  //             placeholder="*Enter Your Email..."
  //             placeholderTextColor={colors.black}
  //             borderColor={colors.brown}
  //             borderRadius={30}
  //             inputWidth={width * 0.85}
  //             inputHeight={height * 0.06}
  //             value={email}
  //             onChangeText={setEmail}
  //             backgroundColor={colors.gray}
  //           />

  //           <CustomTextInput
  //             placeholder="*Address"
  //             placeholderTextColor={colors.black}
  //             borderColor={colors.brown}
  //             borderRadius={30}
  //             inputWidth={width * 0.85}
  //             inputHeight={height * 0.06}
  //             value={street}
  //             onChangeText={setStreet}
  //             backgroundColor={colors.gray}
  //           />

  //           <CustomSelect
  //             inputWidth={width * 0.85}
  //             inputHeight={height * 0.06}
  //             selectElements={cityOptions}
  //             borderColor={city ? colors.brown : colors.gray}
  //             borderWidth={1}
  //             inputColor={city ? colors.lightBrown : colors.gray}
  //             borderRadius={30}
  //             onChangeText={value => setCity(value)}
  //             setSelectedElement={setCity}
  //             defaultValue={city}
  //           />

  //           <CustomSelect
  //             inputWidth={width * 0.85}
  //             inputHeight={height * 0.06}
  //             selectElements={genderOptions}
  //             borderColor={gender ? colors.brown : colors.gray}
  //             borderWidth={1}
  //             inputColor={gender ? colors.lightBrown : colors.gray}
  //             borderRadius={30}
  //             onChangeText={value => setGender(value)}
  //             setSelectedElement={setGender}
  //             defaultValue={gender}
  //           />

  //           <CustomTextInput
  //             placeholder="*Date Of Birth"
  //             placeholderTextColor={colors.black}
  //             borderColor={colors.brown}
  //             borderRadius={30}
  //             inputWidth={width * 0.85}
  //             inputHeight={height * 0.06}
  //             backgroundColor={colors.gray}
  //             editable={false}
  //             value={formatDateForDisplay(startDate)}
  //             rightIcon={
  //               <TouchableOpacity
  //                 activeOpacity={0.7}
  //                 onPress={() => setOpenStartPicker(true)}
  //               >
  //                 <Image source={images.calendar} />
  //               </TouchableOpacity>
  //             }
  //           />

  //           {openStartPicker && (
  //             <DateTimePicker
  //               value={startDate || new Date()}
  //               mode="date"
  //               display="spinner"
  //               onChange={handleDateChange}
  //             />
  //           )}

  //           <CustomSelect
  //             inputWidth={width * 0.85}
  //             inputHeight={height * 0.06}
  //             selectElements={rideOptions}
  //             borderColor={rideType ? colors.brown : colors.gray}
  //             borderWidth={1}
  //             inputColor={rideType ? colors.lightBrown : colors.gray}
  //             borderRadius={30}
  //             onChangeText={value => setRideType(value)}
  //             setSelectedElement={setRideType}
  //             defaultValue={rideType}
  //           />

  //           <CustomTextInput
  //             placeholder="*ID Card Number"
  //             placeholderTextColor={colors.black}
  //             borderColor={colors.brown}
  //             borderRadius={30}
  //             inputWidth={width * 0.85}
  //             inputHeight={height * 0.06}
  //             value={card}
  //             onChangeText={setCard}
  //             backgroundColor={colors.gray}
  //           />

  //           <View style={styles.documentSection}>
  //             <Text style={styles.documentUploadText}>Document Uploads</Text>
  //             <Text style={styles.documentNote}>
  //               Note: Document updates are managed separately in the Documents
  //               section.
  //             </Text>
  //           </View>
  //         </View>
  //         <View style={styles.btnMain}>
  //           <CustomButton
  //             btnHeight={height * 0.075}
  //             btnWidth={width * 0.85}
  //             text={loading ? 'Saving...' : 'Save Changes'}
  //             backgroundColor={isFormValid ? colors.brown : colors.gray}
  //             textColor={colors.white}
  //             borderRadius={30}
  //             disabled={!isFormValid || loading}
  //             onPress={handleUpdateProfile}
  //           />
  //         </View>
  //       </ScrollView>
  //       <CustomProfileImgModal
  //         modalOpen={modalOpen}
  //         toggleModal={toggleModal}
  //         camera={uploadFromCamera}
  //         gallery={uploadFromGallery}
  //       />
  //       <Modal
  //         animationType="fade"
  //         transparent={true}
  //         visible={modalVisible}
  //         onRequestClose={() => setModalVisible(false)}
  //       >
  //         <View style={styles.modalOverlay}>
  //           <View style={styles.modalContent}>
  //             <Text style={styles.modalText}>Profile Updated Successfully</Text>
  //             <Image source={images.checked} />
  //             <CustomButton
  //               text="Confirm"
  //               textColor={colors.white}
  //               backgroundColor={colors.brown}
  //               btnHeight={height * 0.06}
  //               btnWidth={width * 0.75}
  //               borderRadius={30}
  //               onPress={toggleModalSec}
  //             />
  //           </View>
  //         </View>
  //       </Modal>
  //     </View>
  //   );
  // }, [
  //   name,
  //   email,
  //   phone,
  //   street,
  //   gender,
  //   city,
  //   card,
  //   rideType,
  //   startDate,
  //   openStartPicker,
  //   isPhoneFocused,
  //   isFormValid,
  //   profileImage,
  //   modalOpen,
  //   modalVisible,
  //   loading,
  // ]);

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        <TopHeader text="Edit Profile" />
        {selectedRole === 'user' && UserFields}
        {selectedRole === 'driver' && DriverFields}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  profileImageWrapper: {
    width: width * 0.4,
    // height: width * 0.4,
    // justifyContent: 'center',
    alignItems: 'center',
    bottom: height * 0.5,
  },
  profileImage: {
    width: width * 0.32,
    height: width * 0.32,
    resizeMode: 'cover',
    borderRadius: 70,
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
    // bottom: height * 0.07,
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
    left: width * 0.28,
    top: height * 0.08,
  },
  cameraMainSec: {
    position: 'absolute',
    left: width * 0.6,
    top: height * 0.1,
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
  btnMain: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    bottom: height * 0.45,
    width: width * 0.85,
  },
  btnMainSec: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    bottom: height * 0.06,
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
    height: height * 0.25,
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
  phoneInputContainer: {
    width: width * 0.85,
    position: 'relative',
    zIndex: 999,
  },
  countrySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  flag: {
    width: width * 0.06,
    height: height * 0.03,
    borderRadius: 20,
    marginRight: 4,
  },
  icon: {
    width: width * 0.04,
    height: height * 0.02,
    resizeMode: 'contain',
  },
  countryDropdown: {
    position: 'absolute',
    top: height * 0.065,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    zIndex: 1000,
    elevation: 10,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    maxHeight: height * 0.25,
  },
  dropdownScrollView: {
    maxHeight: height * 0.25,
  },
  countryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  selectedCountryOption: {
    backgroundColor: colors.lightBrown,
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
    marginHorizontal: 8,
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

export default EditProfile;
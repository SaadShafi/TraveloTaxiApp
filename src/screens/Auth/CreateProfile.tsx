// import { isCancel, pick, types } from '@react-native-documents/picker';
// import type { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { useEffect, useMemo, useState } from 'react';
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
// import type { StackParamList } from '../../navigation/AuthStack';
// import { RootState } from '../../redux/store';
// import { height, width } from '../../utilities';
// import { colors } from '../../utilities/colors';
// import { fontSizes } from '../../utilities/fontsizes';

// type Props = NativeStackScreenProps<StackParamList, 'CreateProfile'>;

// const CreateProfile: React.FC<Props> = ({ navigation }) => {
//   const [openStartPicker, setOpenStartPicker] = useState(false);
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
//   const [modalOpen, setModalOpen] = useState(false);
//   const [profileImage, setProfileImage] = useState<string | null>(null);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [drivingLicense, setDrivingLicense] = useState(null);
//   const [privateHireLicense, setPrivateHireLicense] = useState(null);
//   const [logBook, setLogBook] = useState(null);
//   const [vehicleLicense, setVehicleLicense] = useState(null);
//   const [insurance, setInsurance] = useState(null);
//   const [mot, setMot] = useState(null);
//   const [hireAgreement, setHireAgreement] = useState(null);
//   const [openPicker, setOpenPicker] = useState<string | null>(null);
//   const [expiryDates, setExpiryDates] = useState<{ [key: string]: string }>({});

//   useEffect(() => {
//     console.log('Selected Role in CreateProfile:', selectedRole);
//   }, [selectedRole]);

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

//   const handleDateConfirm = (selectedDate: Date) => {
//     setOpenStartPicker(false);
//     setStartDate(selectedDate);
//   };

//   const formatDateForDisplay = (date: Date | null): string => {
//     if (!date) return '';
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//     });
//   };

//   const isFormValid =
//     name.length > 4 &&
//     email.includes('@') &&
//     phone.length > 7 &&
//     street.length > 5;

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

//   const formatDate = (date: Date) => {
//     return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
//   };

//   const toggleModalSec = () => {
//     setModalVisible(false);
//     navigation.navigate('BankDetails');
//   };

//   const UserScreens = useMemo(() => {
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
//             onPress={() => navigation.navigate('Congratulation')}
//           />
//         </View>
//         <CustomProfileImgModal
//           modalOpen={modalOpen}
//           toggleModal={toggleModal}
//           camera={uploadFromCamera}
//           gallery={uploadFromGallery}
//         />
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
//   ]);

//   // const renderUploadField = (
//   //   label: string,
//   //   file: any,
//   //   setter: (file: any) => void,
//   //   fieldKey: string,
//   // ) => (
//   //   <>
//   //     <Text style={styles.label}>{label}</Text>
//   //     <View style={styles.container}>
//   //       <TouchableOpacity
//   //         style={styles.button}
//   //         onPress={() => handlePickDocument(setter)}
//   //       >
//   //         <Text style={styles.buttonText}>Choose File</Text>
//   //       </TouchableOpacity>

//   //       {!file && <Text style={styles.title}>No File Selected</Text>}

//   //       {file && (
//   //         <View style={styles.preview}>
//   //           <Text style={styles.fileLabel}>Selected File:</Text>
//   //           <Text style={styles.fileName}>{file.name}</Text>
//   //           <Text style={styles.fileUri}>{file.uri}</Text>
//   //           {file.type && <Text style={styles.fileUri}>Type: {file.type}</Text>}
//   //           {file.size && (
//   //             <Text style={styles.fileUri}>Size: {file.size} bytes</Text>
//   //           )}
//   //         </View>
//   //       )}
//   //     </View>
//   //     <TouchableOpacity onPress={() => setOpenPicker(fieldKey)}>
//   //       <TextInput
//   //         placeholder="*Add Expiry Date"
//   //         placeholderTextColor={colors.darkGray}
//   //         style={styles.AddExpiryDate}
//   //         value={expiryDates[fieldKey] || ''}
//   //         editable={false}
//   //       />
//   //     </TouchableOpacity>
//   //     <DatePicker
//   //       modal
//   //       mode="date"
//   //       open={openPicker === fieldKey}
//   //       date={new Date()}
//   //       onConfirm={date => {
//   //         setOpenPicker(null);
//   //         setExpiryDates(prev => ({ ...prev, [fieldKey]: formatDate(date) }));
//   //       }}
//   //       onCancel={() => setOpenPicker(null)}
//   //     />
//   //   </>
//   // );

//   // const renderUploadField = (
//   //   label: string,
//   //   file: any,
//   //   setter: (file: any) => void,
//   //   fieldKey: string,
//   // ) => (
//   //   <>
//   //     <Text style={styles.label}>{label}</Text>
//   //     <View style={styles.container}>
//   //       <TouchableOpacity
//   //         style={styles.button}
//   //         onPress={() => handlePickDocument(setter)}
//   //       >
//   //         <Text style={styles.buttonText}>Choose File</Text>
//   //       </TouchableOpacity>

//   //       {!file && <Text style={styles.title}>No File Selected</Text>}

//   //       {file && (
//   //         <View style={styles.preview}>
//   //           <Text style={styles.fileLabel}>Selected File:</Text>
//   //           <Text style={styles.fileName}>{file.name}</Text>
//   //           <Text style={styles.fileUri}>{file.uri}</Text>
//   //           {file.type && <Text style={styles.fileUri}>Type: {file.type}</Text>}
//   //           {file.size && (
//   //             <Text style={styles.fileUri}>Size: {file.size} bytes</Text>
//   //           )}
//   //         </View>
//   //       )}
//   //     </View>

//   //     {/* Expiry date field */}
//   //     <TouchableOpacity onPress={() => setOpenPicker(fieldKey)}>
//   //       <TextInput
//   //         placeholder="*Add Expiry Date"
//   //         placeholderTextColor={colors.darkGray}
//   //         style={styles.AddExpiryDate}
//   //         value={
//   //           expiryDates[fieldKey]
//   //             ? formatDate(new Date(expiryDates[fieldKey]))
//   //             : ''
//   //         }
//   //         editable={false}
//   //       />
//   //     </TouchableOpacity>

//   //     <DatePicker
//   //       modal
//   //       open={openPicker === fieldKey}
//   //       date={
//   //         expiryDates[fieldKey] ? new Date(expiryDates[fieldKey]) : new Date()
//   //       }
//   //       mode="date"
//   //       onConfirm={date => {
//   //         setOpenPicker(null);
//   //         setExpiryDates(prev => ({
//   //           ...prev,
//   //           [fieldKey]: date.toISOString(),
//   //         }));
//   //       }}
//   //       onCancel={() => setOpenPicker(null)}
//   //     />
//   //   </>
//   // );

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

//       {/* Expiry date field - FIXED: Properly set the field key when opening */}
//       {/* <View style={styles.expiryDateContainer}> */}
//       <TextInput
//         placeholder="*Add Expiry Date"
//         placeholderTextColor={colors.darkGray}
//         style={styles.AddExpiryDate}
//         keyboardType="phone-pad"
//         // value={
//         //   expiryDates[fieldKey]
//         //     ? formatDateForDisplay(new Date(expiryDates[fieldKey]))
//         //     : ''
//         // }
//         // editable={false}
//       />
//       {/* <TouchableOpacity
//           activeOpacity={0.7}
//           onPress={() => setOpenPicker(fieldKey)}
//           style={styles.calendarIcon}
//         >
//           <Image source={images.calendar} />
//         </TouchableOpacity> */}
//       {/* </View> */}

//       {/* <DatePicker
//         modal
//         open={openPicker === fieldKey}
//         date={
//           expiryDates[fieldKey] ? new Date(expiryDates[fieldKey]) : new Date()
//         }
//         mode="date"
//         onConfirm={date => {
//           setOpenPicker(null);
//           setExpiryDates(prev => ({
//             ...prev,
//             [fieldKey]: date.toISOString(),
//           }));
//         }}
//         onCancel={() => setOpenPicker(null)}
//       /> */}
//     </>
//   );

//   const DriverScreens = useMemo(() => {
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
//             <View style={styles.DocumentUpload}>
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
//               <Text style={styles.modalText}>Admin Approval</Text>
//               <Image source={images.approve} />
//               <View style={styles.paraMain}>
//                 <Text style={styles.modalText}>Your Request Has Been</Text>
//                 <Text style={styles.modalText}>Accepted! </Text>
//               </View>
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
//         <TopHeader text="Profile" isBack={true} />
//         {selectedRole === 'user' && UserScreens}
//         {selectedRole === 'driver' && DriverScreens}
//       </View>
//     </TouchableWithoutFeedback>
//   );
// };

// const styles = StyleSheet.create({
//   expiryDateContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: height * 0.01,
//   },
//   calendarIcon: {
//     position: 'absolute',
//     right: 15,
//     top: '50%',
//     marginTop: -height * 0.015, // Center vertically
//   },
//   calendarImage: {
//     width: width * 0.06,
//     height: height * 0.03,
//     resizeMode: 'contain',
//   },
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
//   gradient: {
//     height: height * 0.6,
//     width: width * 0.8,
//     resizeMode: 'contain',
//     bottom: height * 0.07,
//   },
//   btnMain: {
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     flexDirection: 'row',
//     bottom: height * 0.3,
//     // paddingHorizontal: width * 0.05,
//     width: width * 0.85,
//   },
//   DocumentUpload: {},
//   documentUploadText: {
//     fontFamily: fontFamily.ClashDisplayMedium,
//     fontSize: fontSizes.lg,
//     color: colors.black,
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
//   AddExpiryDate: {
//     borderBottomWidth: 1,
//     borderColor: colors.darkGray,
//     marginTop: height * 0.01,
//     fontSize: fontSizes.sm,
//     color: colors.black,
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
//     height: height * 0.34,
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
// });

// export default CreateProfile;




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
  const [openPicker, setOpenPicker] = useState<string | null>(null);
  const [expiryDates, setExpiryDates] = useState<{ [key: string]: string }>({});
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  useEffect(() => {
    console.log('Selected Role in CreateProfile:', selectedRole);
    console.log('Selected Country:', reduxSelectedCountry.name);
  }, [selectedRole, reduxSelectedCountry]);

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

  // const isFormValid =
  //   name.length > 4 &&
  //   email.includes('@') &&
  //   phone.length > 7 &&
  //   street.length > 5;
  const isFormValid = name && email && phone && street;

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

        const allFiles = [...currentFiles, ...newFiles];
        setter(allFiles);
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
    // navigation.navigate('BankDetailsAuth');
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

  const PhoneInputWithCountry = useMemo(() => {
    return (
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
      console.error('Create profile error:', err);
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
            value={User?.full_name || name}
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
            value={User?.email || email}
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
          {/* <CustomSelect
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
          /> */}
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
            preselectedValue={gender || User?.gender || null} // ✅ prefill gender
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
            backgroundColor={colors.brown}
            // backgroundColor={isFormValid ? colors.brown : colors.gray}
            textColor={colors.white}
            borderRadius={30}
            // disabled={!isFormValid}
            // onPress={() => navigation.navigate('Congratulation')}
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
              value={User?.full_name || name}
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
              value={User?.email || email}
              onChangeText={setEmail}
              backgroundColor={colors.gray}
              editable={false}
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
            {/* <CustomSelect
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
            /> */}
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
              preselectedValue={gender || User?.gender || null}
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
              backgroundColor={colors.brown}
              textColor={colors.white}
              borderRadius={30}
              // disabled={!isFormValid}
              // onPress={() => setModalVisible(true)}
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
    isFormValid,
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
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
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
    // left: width * 0.01,
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
});

export default CreateProfile;
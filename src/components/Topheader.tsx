// import { BlurView } from '@react-native-community/blur';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { fontFamily } from '../assets/Fonts';
import images from '../assets/Images';
import { height, width } from '../utilities';
import { colors } from '../utilities/colors';
import { fontSizes } from '../utilities/fontsizes';
// import CustomModal from "./CustomModal";
// import BouncyCheckbox from 'react-native-bouncy-checkbox';
// import { useSelector } from 'react-redux';
// import { apiHelper } from "../service";
// import { useTranslation } from "react-i18next";

interface TopHeaderProps {
  text?: string;
  transparent?: boolean;
  isBack?: boolean;
  steps?: string;
  isMenu?: boolean;
  isMenuSec?: boolean;
  notification?: boolean;
  notificationImage?: 'notiSec' | string;
  menuSecond?: 'MenuColor' | string;
  backSec?: 'whiteArrow' | string;
  add?: boolean;
  isClose?: boolean;
  isChat?: boolean;
  isWhite?: boolean;
  setIsCompleted?: () => void;
  isQr?: boolean;
  isBlueBg?: boolean;
  statusToggle?: boolean;
  toggleSwitch?: (newState: any) => void;
  toggleValue?: boolean;
  addCard?: boolean;
  msgIcon?: boolean;
  skip?: boolean;
  list?: boolean;
}

const TopHeader: React.FC<TopHeaderProps> = ({
  text,
  transparent = false,
  isBack = false,
  steps,
  isMenu = false,
  isMenuSec = false,
  notification = false,
  notificationImage,
  menuSecond,
  backSec,
  add = false,
  isChat = false,
  isWhite = false,
  isClose = false,
  setIsCompleted,
  isQr = false,
  isBlueBg = false,
  statusToggle = false,
  toggleSwitch,
  toggleValue = true,
  addCard = false,
  msgIcon = false,
  skip = false,
  list = false,
}) => {
  // const navigation = useNavigation<any>();
  const [disputeOpen, setdisputeOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [reportModal, setReportModal] = useState(false);
  const [blockModal, setBlockModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);
  const [isChecked4, setIsChecked4] = useState(false);
  const [isChecked5, setIsChecked5] = useState(false);
  const [isChecked6, setIsChecked6] = useState(false);
  const [isChecked7, setIsChecked7] = useState(false);
  // const freelancerId = useSelector((state: any) => state.role.freelancerId);
  // const token = useSelector((state: any) => state.role.userAuthToken);
  const [value, setValue] = useState({
    reason: '',
  });
  //   const { t, i18n } = useTranslation();
  //   const isRTL = i18n.language === "ar";

  const toggleDisputeModal = () => {
    setdisputeOpen(!disputeOpen);
  };
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const toggleReportModal = () => {
    setdisputeOpen(false);
    setReportModal(true);
  };

  const toggleBlockModal = () => {
    setdisputeOpen(false);
    setBlockModal(true);
  };

  const handleDrawer = () => {
    // navigation.dispatch(DrawerActions.openDrawer());
  };

  const handlePress = () => {
    setReportModal(false);
    setdisputeOpen(true);
  };

  const handleBlockPress = () => {
    setBlockModal(false);
    // setdisputeOpen(true);
  };

  // const bodyElem = () => {
  //   return (
  //     // <View style={{flex: 1}}>
  //     <View style={styles.checkboxMain}>
  //       <View style={{ flexDirection: "row" }}>
  //         <BouncyCheckbox
  //           size={20}
  //           fillColor={colors.darkBlue}
  //           unFillColor={colors.lightBlue}
  //           iconStyle={{
  //             borderWidth: 2,
  //             borderColor: colors.lightBlue,
  //             borderRadius: 2,
  //             left: width * 0.09,
  //           }}
  //           innerIconStyle={{
  //             borderRadius: 1,
  //           }}
  //           isChecked={isChecked}
  //           onPress={(checked: boolean) => setIsChecked(checked)}
  //         />
  //         <Text style={styles.text}>Inappropriate Content</Text>
  //       </View>
  //       <View style={{ flexDirection: "row" }}>
  //         <BouncyCheckbox
  //           size={20}
  //           fillColor={colors.darkBlue}
  //           unFillColor={colors.lightBlue}
  //           iconStyle={{
  //             borderWidth: 2,
  //             borderColor: colors.lightBlue,
  //             borderRadius: 2,
  //             left: width * 0.09,
  //           }}
  //           innerIconStyle={{
  //             borderRadius: 1,
  //           }}
  //           isChecked={isChecked2}
  //           onPress={(checked: boolean) => setIsChecked2(checked)}
  //         />
  //         <Text style={styles.text}>Harassment or Bullying.</Text>
  //       </View>
  //       <View style={{ flexDirection: "row" }}>
  //         <BouncyCheckbox
  //           size={20}
  //           fillColor={colors.darkBlue}
  //           unFillColor={colors.lightBlue}
  //           iconStyle={{
  //             borderWidth: 2,
  //             borderColor: colors.lightBlue,
  //             borderRadius: 2,
  //             left: width * 0.09,
  //           }}
  //           innerIconStyle={{
  //             borderRadius: 1,
  //           }}
  //           isChecked={isChecked3}
  //           onPress={(checked: boolean) => setIsChecked3(checked)}
  //         />
  //         <Text style={styles.text}>Spam or Advertising.</Text>
  //       </View>
  //       <View style={{ flexDirection: "row" }}>
  //         <BouncyCheckbox
  //           size={20}
  //           fillColor={colors.darkBlue}
  //           unFillColor={colors.lightBlue}
  //           iconStyle={{
  //             borderWidth: 2,
  //             borderColor: colors.lightBlue,
  //             borderRadius: 2,
  //             left: width * 0.09,
  //           }}
  //           innerIconStyle={{
  //             borderRadius: 1,
  //           }}
  //           isChecked={isChecked4}
  //           onPress={(checked: boolean) => setIsChecked4(checked)}
  //         />
  //         <Text style={styles.text}>Impersonation.</Text>
  //       </View>
  //       <View style={{ flexDirection: "row" }}>
  //         <BouncyCheckbox
  //           size={20}
  //           fillColor={colors.darkBlue}
  //           unFillColor={colors.lightBlue}
  //           iconStyle={{
  //             borderWidth: 2,
  //             borderColor: colors.lightBlue,
  //             borderRadius: 2,
  //             left: width * 0.09,
  //           }}
  //           innerIconStyle={{
  //             borderRadius: 1,
  //           }}
  //           isChecked={isChecked5}
  //           onPress={(checked: boolean) => setIsChecked5(checked)}
  //         />
  //         <Text style={styles.text}>Hate Speech.</Text>
  //       </View>
  //       <View style={{ flexDirection: "row" }}>
  //         <BouncyCheckbox
  //           size={20}
  //           fillColor={colors.darkBlue}
  //           unFillColor={colors.lightBlue}
  //           iconStyle={{
  //             borderWidth: 2,
  //             borderColor: colors.lightBlue,
  //             borderRadius: 2,
  //             left: width * 0.09,
  //           }}
  //           innerIconStyle={{
  //             borderRadius: 1,
  //           }}
  //           isChecked={isChecked6}
  //           onPress={(checked: boolean) => setIsChecked6(checked)}
  //         />
  //         <Text style={styles.text}>Explicit Content.</Text>
  //       </View>
  //       <View style={{ flexDirection: "row" }}>
  //         <BouncyCheckbox
  //           size={20}
  //           fillColor={colors.darkBlue}
  //           unFillColor={colors.lightBlue}
  //           iconStyle={{
  //             borderWidth: 2,
  //             borderColor: colors.lightBlue,
  //             borderRadius: 2,
  //             left: width * 0.09,
  //           }}
  //           innerIconStyle={{
  //             borderRadius: 1,
  //           }}
  //           isChecked={isChecked7}
  //           onPress={(checked: boolean) => setIsChecked7(checked)}
  //         />
  //         <Text style={styles.text}>Others</Text>
  //       </View>
  //       <View style={{ left: width * 0.04 }}>
  //         <CustomMultiInput
  //           placeholder="Bio"
  //           placeholderTextColor={colors.black}
  //           backgroundColor={colors.white}
  //           keyboardType="default"
  //           inputHeight={height * 0.13}
  //           inputWidth={width * 0.7}
  //           borderWidth={1}
  //           borderColor={colors.lightBlue}
  //         />
  //       </View>
  //     </View>
  //     // </View>
  //   );
  // };

  // const bodyElem = () => {
  //   return (
  //     <View style={styles.checkboxMain}>
  //       {[
  //         {
  //           state: isChecked,
  //           setter: setIsChecked,
  //           text: 'Inappropriate Content',
  //         },
  //         {
  //           state: isChecked2,
  //           setter: setIsChecked2,
  //           text: 'Harassment or Bullying',
  //         },
  //         {
  //           state: isChecked3,
  //           setter: setIsChecked3,
  //           text: 'Spam or Advertising',
  //         },
  //         { state: isChecked4, setter: setIsChecked4, text: 'Impersonation' },
  //         { state: isChecked5, setter: setIsChecked5, text: 'Hate Speech' },
  //         {
  //           state: isChecked6,
  //           setter: setIsChecked6,
  //           text: 'Explicit Content',
  //         },
  //         { state: isChecked7, setter: setIsChecked7, text: 'Others' },
  //       ].map((item, index) => (
  //         <View key={index} style={{ flexDirection: 'row' }}>
  //           <BouncyCheckbox
  //             size={20}
  //             fillColor={colors.darkBlue}
  //             unFillColor={colors.lightBlue}
  //             iconStyle={{
  //               borderWidth: 2,
  //               borderColor: colors.lightBlue,
  //               borderRadius: 2,
  //               left: width * 0.09,
  //             }}
  //             innerIconStyle={{
  //               borderRadius: 1,
  //             }}
  //             isChecked={item.state}
  //             onPress={(checked: boolean) => item.setter(checked)}
  //           />
  //           <Text style={styles.text}>{item.text}</Text>
  //         </View>
  //       ))}
  //       <View style={{ left: width * 0.04 }}>
  //         <CustomMultiInput
  //           placeholder="Please specify (if Others is selected)"
  //           placeholderTextColor={colors.black}
  //           backgroundColor={colors.white}
  //           keyboardType="default"
  //           inputHeight={height * 0.13}
  //           inputWidth={width * 0.7}
  //           borderWidth={1}
  //           borderColor={colors.lightBlue}
  //           value={value.reason}
  //           onChangeText={handleOtherReasonChange}
  //         />
  //       </View>
  //     </View>
  //   );
  // };

  const handleOtherReasonChange = (text: string) => {
    setValue(prev => ({ ...prev, reason: text }));
  };

  const handkeIconPressed = () => {
    // navigation.navigate('editProfile')
  };

  useEffect(() => {
    if (isQr && setIsCompleted) {
      setIsCompleted();
    }
  }, [isQr, setIsCompleted]);

  //   const reportFreelancer = async () => {
  //     if (!token) {
  //       Toast.show({
  //         type: "error",
  //         text1: "Error",
  //         text2: "Please Authenticate the user first!",
  //       });
  //       return;
  //     }

  //     const selectedReasons = [];
  //     if (isChecked) selectedReasons.push("Inappropriate Content");
  //     if (isChecked2) selectedReasons.push("Harassment or Bullying");
  //     if (isChecked3) selectedReasons.push("Spam or Advertising");
  //     if (isChecked4) selectedReasons.push("Impersonation");
  //     if (isChecked5) selectedReasons.push("Hate Speech");
  //     if (isChecked6) selectedReasons.push("Explicit Content");
  //     if (isChecked7) {
  //       selectedReasons.push("Others: " + value.reason);
  //     }

  //     if (selectedReasons.length === 0) {
  //       Toast.show({
  //         type: "error",
  //         text1: "Error",
  //         text2: "Please select at least one reason for reporting",
  //       });
  //       return;
  //     }

  //     try {
  //       const headers = {
  //         "Content-type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       };

  //       const body = {
  //         reason: selectedReasons.join(", "),
  //       };

  //       const { response, error } = await apiHelper(
  //         "POST",
  //         `user/report-profile/${freelancerId}`,
  //         headers,
  //         body
  //       );

  //       if (response) {
  //         Toast.show({
  //           type: "success",
  //           text1: "Success",
  //           text2: "User reported successfully",
  //         });
  //         setReportModal(false);
  //       } else {
  //         throw error;
  //       }
  //     } catch (error) {
  //       Toast.show({
  //         type: "error",
  //         text1: "Error",
  //         text2: "Error reporting the user",
  //       });
  //     }
  //   };

  //   const blockFreelancer = async () => {
  //     if (!token) {
  //       Toast.show({
  //         type: "error",
  //         text1: "Error",
  //         text2: "Please Authenticate the user first!",
  //       });
  //       return;
  //     }

  //     try {
  //       const { response, error } = await apiHelper(
  //         "POST",
  //         `user/toggle-profile/${freelancerId}`,
  //         {},
  //         {}
  //       );

  //       if (response?.data) {
  //         Toast.show({
  //           type: "success",
  //           text1: "Success",
  //           text2: response.data.message || "freelancer blocked successfully",
  //         });
  //         setBlockModal(false);
  //         console.log("Response while blocking the profile", response.data);
  //       }
  //     } catch (error) {
  //       Toast.show({
  //         type: "error",
  //         text1: "Error",
  //         text2:
  //           error?.response?.data.message || "Error while blocking the profile",
  //       });
  //     }
  //   };

  //   const dynamicStyles = StyleSheet.create({
  //     belowMain: {
  //       width: width * 0.75,
  //       paddingTop: height * 0.02,
  //       gap: height * 0.03,
  //     },
  //     modalContainer: {
  //       flex: 1,
  //       backgroundColor: colors.white,
  //       height: height * 0.09,
  //       width: width * 1,
  //       marginTop: Platform.OS === "ios" ? height * 0.6 : height * 0.6,
  //       borderColor: colors.borderGray,
  //       borderWidth: 2,
  //       borderTopRightRadius: 30,
  //       borderTopLeftRadius: 30,
  //       alignItems: "center",
  //       // flexDirection: isRTL ? "row-reverse" : "row",
  //     },
  //     Main: {
  //       flexDirection: isRTL ? "row-reverse" : "row",
  //       alignItems: "center",
  //       gap: width * 0.02,
  //     },
  //   });

  return (
    <View
      style={{
        zIndex: 20,
        backgroundColor: isBlueBg ? colors.darkBlue : 'transparent',
      }}
    >
      <SafeAreaView>
        <View style={styles.MainHeader}>
          {isBack && (
            <Pressable
              style={styles.headerArrow}
              // onPress={() => {
              //   navigation.canGoBack()
              //     ? navigation.goBack()
              //     : navigation.navigate('Home' as never);
              // }}
            >
              <Image
                source={
                  backSec === 'whiteArrow'
                    ? images.whiteArrow
                    : images.backArrow
                }
                style={styles.backArrow}
              />
            </Pressable>
          )}
          {isClose && (
            <Pressable
              style={styles.headerArrow}
              //   onPress={() => {
              //     navigation.canGoBack()
              //       ? navigation.goBack()
              //       : navigation.navigate('Home' as never);
              //   }}
            >
              {transparent ? (
                <Image source={images.closeTopWhite} style={styles.closeTop} />
              ) : (
                <Image source={images.closeTop} style={styles.closeTop} />
              )}
            </Pressable>
          )}
          {isMenu && (
            <Pressable style={styles.headerArrow} onPress={handleDrawer}>
              {/* <Image source={images.DrawerImg} style={styles.menuIcon}/> */}
              <Image
                source={
                  menuSecond === 'MenuColor' ? images.menuImg : images.menuImg
                }
                style={styles.menuIcon}
              />
            </Pressable>
          )}
          {/* {isMenuSec && (
            <Pressable style={styles.headerArrow} onPress={handleDrawer}> 
                <Image source={images.MenuColor} style={styles.menuIcon}/>
            </Pressable>
          )} */}
          <Text
            style={[
              styles.MainHeaderText,
              { color: transparent ? colors.white : colors.black },
            ]}
          >
            {text}
          </Text>
          {notification && (
            <View style={styles.headerBell}>
              <TouchableOpacity
              // onPress={() => navigation.navigate('notifications')}
              >
                {/* <Image source={images.bell} style={styles.bellImg}/> */}
                <Image
                  source={
                    notificationImage === 'notiSec'
                      ? images.notiMain
                      : images.notiMain
                  }
                  style={styles.bellImg}
                />
                {/* <View style={styles.headerBellNoti}>
                <Text style={styles.notiText}>1</Text>
              </View> */}
              </TouchableOpacity>
            </View>
          )}
          {list && (
            <View style={styles.headerBell}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={toggleDisputeModal}
              >
                {/* onPress={handleChat} */}
                <Image source={images.listImg} style={styles.bellImgSec} />
              </TouchableOpacity>
            </View>
          )}
          {addCard && (
            <TouchableOpacity
              //   onPress={()=>navigation.navigate('addCard')}
              style={styles.headerBell}
            >
              <Text style={styles.addCardText}>Add Card</Text>
            </TouchableOpacity>
          )}
          {msgIcon && (
            <TouchableOpacity
              style={styles.headerBell}
              //   onPress={() => navigation.navigate('disputeChat')}
            >
              <Image source={images.messageIcon} style={styles.msgIcon} />
            </TouchableOpacity>
          )}
          {skip && (
            <TouchableOpacity
              style={styles.headerBell}
              //   onPress={() => navigation.navigate('homeUser')}
            >
              <Text style={styles.skipCardText}>Skip</Text>
            </TouchableOpacity>
          )}

          {/* <Modal
            animationType="fade"
            transparent={true}
            visible={disputeOpen}
            onRequestClose={toggleModal}
          >
            <TouchableWithoutFeedback onPress={toggleDisputeModal}>
              <View style={{ flex: 1 }}>
                <BlurView
                  style={styles.modalBlur}
                  blurType="light"
                  blurAmount={5}
                  reducedTransparencyFallbackColor="white"
                />
              </View>
            </TouchableWithoutFeedback>

            <View style={styles.modalContainer}>
              <View style={styles.imgMain}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={toggleDisputeModal}
                >
                  <Image source={images.barImg} style={styles.filterImg} />
                </TouchableOpacity>
              </View>
              <View style={styles.belowMain}>
                <TouchableOpacity
                  style={styles.Main}
                  activeOpacity={0.7}
                  onPress={toggleReportModal}
                >
                  <Image source={images.reportImg} style={styles.ExcImg} />
                  <View>
                    <Text style={styles.text1}>"Report"</Text>
                  </View>
                </TouchableOpacity>
                <View style={styles.border}></View>
                <TouchableOpacity
                  style={styles.Main}
                  activeOpacity={0.7}
                  onPress={toggleBlockModal}
                >
                  <Image source={images.blockImg} style={styles.ExcImg} />
                  <View>
                    <Text style={styles.text1}>"Block"</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </Modal> */}

          {/* <CustomModal
            modalOpen={reportModal}
            toggleModal={toggleReportModal}
            onPressSec={reportFreelancer}
            headText={t("report") || "Report"}
            btnText={[t("submit")]}
            bodyElem={bodyElem()}
            backgroundChoice="noBackground"
          />
          <CustomModal
            modalOpen={blockModal}
            toggleModal={toggleBlockModal}
            onPressSec={handleBlockPress}
            onPress={blockFreelancer}
            headText={t("blockProfile") || "Block Profile"}
            paraTextOne={
              t("blockText") || "Are you sure you want to block this profile"
            }
            // paraTextTwo="Smith"
            btnText={[t("No"), t("Yes")]}
            // bodyElem={bodyElem()}
            // backgroundChoice="noBackground"
          /> */}
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  MainHeader: {
    display: 'flex',
    flexDirection: 'row',
    height: width * 0.15,
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    position: 'relative',
    marginHorizontal: width * 0.07,
  },
  headerArrow: {
    position: 'absolute',
    height: '100%',
    alignContent: 'center',
    top: 0,
    left: 0,
    justifyContent: 'center',
  },
  headerBell: {
    position: 'absolute',
    height: '100%',
    alignContent: 'center',
    top: 0,
    right: 0,
    justifyContent: 'center',
  },
  MainHeaderText: {
    fontSize: fontSizes.lg2,
    fontFamily: fontFamily.ClashDisplayMedium,
  },
  backArrow: {
    width: width * 0.04,
    resizeMode: 'contain',
  },
  closeTop: {
    width: width * 0.04,
    resizeMode: 'contain',
  },
  headerBellNoti: {
    position: 'absolute',
    width: width * 0.04,
    height: width * 0.04,
    borderWidth: 2,
    borderColor: colors.white,
    backgroundColor: colors.orange,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
  },
  bellImg: {
    width: width * 0.11,
    height: width * 0.11,
    resizeMode: 'contain',
  },
  notiText: {
    fontSize: width * 0.02,
    color: colors.white,
    fontFamily: fontFamily.Inter,
  },
  menuIcon: {
    width: width * 0.11,
    resizeMode: 'contain',
  },
  onlineText: {
    color: colors.gradient2,
    position: 'absolute',
    top: '24%',
    left: 23,
    zIndex: 100,
    fontFamily: fontFamily.SegoeUIBold,
    fontSize: 14,
  },
  offlineText: {
    color: colors.white,
    position: 'absolute',
    top: '24%',
    right: 23,
    zIndex: 100,
    fontFamily: fontFamily.SegoeUIBold,
    fontSize: 14,
  },
  thumbStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    borderRadius: 100,
    backgroundColor: colors.white,
  },
  addCardText: {
    fontSize: fontSizes.sm2,
    fontFamily: fontFamily.OpenSansBold,
    textDecorationLine: 'underline',
    color: colors.darkBlue,
  },
  skipCardText: {
    fontSize: fontSizes.sm2,
    fontFamily: fontFamily.OpenSansBold,
    textDecorationLine: 'underline',
    color: colors.white,
  },
  msgIcon: {
    backgroundColor: colors.darkBlue,
    width: Platform.OS === 'ios' ? width * 0.08 : width * 0.07,
    height: Platform.OS === 'ios' ? width * 0.08 : height * 0.02,
    padding: Platform.OS === 'ios' ? 8 : 15,
    borderRadius: 30,
  },
  bellImgSec: {
    width: width * 0.06,
    height: width * 0.06,
    resizeMode: 'contain',
  },

  modalContainer: {
    flex: 1,
    backgroundColor: colors.white,
    height: height * 0.09,
    width: width * 1,
    marginTop: Platform.OS === 'ios' ? height * 0.6 : height * 0.6,
    borderColor: colors.borderGray,
    borderWidth: 2,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    alignItems: 'center',
  },
  modalBlur: {
    flex: 1,
    width: width,
    height: height,
    position: 'absolute',
  },
  filterImg: {
    width: width * 0.5,
    height: width * 0.018,
  },
  imgMain: {
    paddingTop: height * 0.01,
  },
  belowMain: {
    width: width * 0.75,
    paddingTop: height * 0.02,
    gap: height * 0.03,
  },
  Main: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: width * 0.02,
  },
  text1: {
    fontFamily: fontFamily.JakartaMedium,
    fontSize: fontSizes.md,
    color: colors.black,
  },
  ExcImg: {
    width: width * 0.06,
    height: width * 0.06,
    resizeMode: 'contain',
  },
  border: {
    borderWidth: 1,
    borderColor: colors.borderGray,
    width: width * 0.9,
    right: width * 0.09,
  },
  checkboxMain: {
    flexDirection: 'column',
    gap: height * 0.01,
    right: width * 0.04,
  },
  text: {
    color: colors.black,
    fontFamily: fontFamily.JakartaRegular,
    left: width * 0.08,
  },
});

export default TopHeader;

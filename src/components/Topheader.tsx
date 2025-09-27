// import { DrawerActions, NavigationProp } from '@react-navigation/native';
import {
  DrawerActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
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

// type NavigationProp = NativeStackNavigationProp<
//   StackParamList,
//   keyof StackParamList
// >;

interface TopHeaderProps {
  text?: string;
  title?: string;
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
  backIcon?: boolean;
  isPhone?: boolean;
  isBackWhite?: boolean;
}

const TopHeader: React.FC<TopHeaderProps> = ({
  text,
  title,
  backIcon,
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
  isPhone = false,
  isBackWhite = false,
  // navigation,
}) => {
  const navigation = useNavigation<NavigationProp<any>>();
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
  const [value, setValue] = useState({
    reason: '',
  });

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
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const handlePress = () => {
    setReportModal(false);
    setdisputeOpen(true);
  };

  const handleBlockPress = () => {
    setBlockModal(false);
    // setdisputeOpen(true);
  };

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
              onPress={() => {
                if (navigation) {
                  navigation.canGoBack()
                    ? navigation.goBack()
                    : navigation.navigate('Home' as never);
                }
              }}
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
          {isBackWhite && (
            <TouchableOpacity
              style={styles.headerArrow}
              onPress={() => {
                if (navigation) {
                  navigation.canGoBack()
                    ? navigation.goBack()
                    : navigation.navigate('Home' as never);
                }
              }}
              activeOpacity={0.7}
            >
              <Image source={images.backWhite} style={styles.backArrow} />
            </TouchableOpacity>
          )}
          {isClose && (
            <Pressable
              style={styles.headerArrow}
              //   onPress={() => {
              //     navigation.canGoBack()
              //       ? navigation.goBack()
              //       : navigation.navigate('Home' as never);
              //   }}
              onPress={() => {
                if (navigation) {
                  navigation.canGoBack()
                    ? navigation.goBack()
                    : navigation.navigate('Home' as never);
                }
              }}
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
                // source={
                //   menuSecond === 'MenuColor' ? images.menuImg : images.menuImg
                // }
                source={images.drawerIcon}
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
          {isPhone && (
            <View style={styles.headerBell}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate('CallMain')}
              >
                <Image source={images.phoneBlack} style={styles.isChatImg} />
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
            <TouchableOpacity style={styles.headerBell}>
              <Text style={styles.addCardText}>Add Card</Text>
            </TouchableOpacity>
          )}
          {msgIcon && (
            <TouchableOpacity style={styles.headerBell}>
              <Image source={images.messageIcon} style={styles.msgIcon} />
            </TouchableOpacity>
          )}
          {skip && (
            <TouchableOpacity style={styles.headerBell}>
              <Text style={styles.skipCardText}>Skip</Text>
            </TouchableOpacity>
          )}
          {isChat && (
            <View style={styles.headerBell}>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate('CallMain')}
                >
                  <Image source={images.phoneBlack} style={styles.isChatImg} />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate('Chat')}
                >
                  <Image source={images.chat} style={styles.isChatImg} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  isChatImg: {
    width: width * 0.1,
    height: width * 0.1,
    resizeMode: 'contain',
  },
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
    // backgroundColor: colors.black,
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
    width: width * 0.045,
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

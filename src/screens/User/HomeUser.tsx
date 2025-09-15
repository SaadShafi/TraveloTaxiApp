import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useRef } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import LinearGradient from 'react-native-linear-gradient';
import { fontFamily } from '../../assets/Fonts';
import images from '../../assets/Images';
import CustomTextInput from '../../components/CustomTextInput';
import TopHeader from '../../components/Topheader';
import { StackParamList } from '../../navigation/UserStack';
import { height, width } from '../../utilities';
import { colors } from '../../utilities/colors';
import { fontSizes } from '../../utilities/fontsizes';

type Props = NativeStackScreenProps<StackParamList, 'homeUser'>;

const HomeUser = () => {
  const actionSheetRef = useRef<ActionSheetRef>(null);

  useEffect(() => {
    actionSheetRef.current?.show();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <TopHeader isMenu={true} />
      <View style={styles.headerMain}>
        <View style={styles.headTextMain}>
          <View style={{ flexDirection: 'row', gap: width * 0.01 }}>
            <Text style={styles.greetingText}>Hi</Text>
            <Text style={styles.nameText}>Alex!</Text>
          </View>
          <Image source={images.notification} style={styles.notiImg} />
        </View>
        <View style={styles.locationMain}>
          <CustomTextInput
            placeholder="Groklyn Bridge Park"
            placeholderTextColor={colors.black}
            borderColor={colors.gray}
            borderRadius={30}
            inputWidth={width * 0.65}
            inputHeight={height * 0.04}
            leftIcon={
              <Image source={images.locationImage} style={styles.locationImg} />
            }
          />
          <CustomTextInput
            placeholder="Groklyn Bridge Park"
            placeholderTextColor={colors.black}
            borderColor={colors.gray}
            borderRadius={30}
            inputWidth={width * 0.65}
            inputHeight={height * 0.04}
            leftIcon={
              <Image source={images.locationImage} style={styles.locationImg} />
            }
          />
        </View>
        <View style={styles.headerBottomMain}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: width * 0.01,
            }}
          >
            <Image source={images.add} />
            <Text>Add Stop</Text>
          </View>
          <View style={styles.reverseMain}>
            <Image source={images.reverse} />
          </View>
        </View>
      </View>
      <ActionSheet
        ref={actionSheetRef}
        containerStyle={styles.actionSheetMain}
        isModal={false}
      >
        <LinearGradient
          colors={['#FFD6D6', '#FFFFFF']}
          start={{ x: 0.5, y: 0.3 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.gradientBackground}
        >
          <View style={{ backgroundColor: colors.black, position: 'absolute' }}>
            <Text style={{ color: colors.white }}>sdfsdfsdffdsdf</Text>
          </View>
        </LinearGradient>
      </ActionSheet>
    </View>
  );
};
const styles = StyleSheet.create({
  headerMain: {
    bottom: height * 0.06,
    width: width * 0.72,
    left: width * 0.2,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: colors.black,
    padding: 10,
    backgroundColor: colors.white,
  },
  greetingText: {
    color: colors.black,
    fontFamily: fontFamily.ClashDisplayMedium,
    fontSize: fontSizes.sm,
  },
  nameText: {
    color: colors.black,
    fontFamily: fontFamily.ClashDisplayBold,
    fontSize: fontSizes.sm,
  },
  signup: {
    color: colors.black,
    fontFamily: fontFamily.ClashDisplayMedium,
    fontSize: fontSizes.lg2,
    top: height * 0.1,
  },
  headTextMain: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.03,
  },
  notiImg: {
    width: width * 0.045,
    height: height * 0.03,
    resizeMode: 'contain',
  },
  locationMain: {
    gap: height * 0.01,
    paddingTop: height * 0.01,
  },
  locationImg: {
    width: width * 0.03,
    height: height * 0.03,
    resizeMode: 'contain',
  },
  headerBottomMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  reverseMain: {
    right: width * 0.06,
    bottom: height * 0.07,
  },
  actionSheetMain: {
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    overflow: 'hidden',
    height: height * 0.47,
    width: width,
    position: 'relative',
  },
  gradientBackground: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 25,
    alignItems: 'center',
    // position: 'absolute',
  },
});

export default HomeUser;

import { useEffect, useRef } from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { fontFamily } from '../../assets/Fonts';
import images from '../../assets/Images';
import { height, width } from '../../utilities';
import { colors } from '../../utilities/colors';
import { fontSizes } from '../../utilities/fontsizes';

const WelcomeFirst = () => {
  const translateX = useRef(new Animated.Value(0)).current;
  const btnTranslateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const distance = 40;
    const duration = 7500;

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(translateX, {
          toValue: distance,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: 0,
          duration,
          useNativeDriver: true,
        }),
      ]),
    );

    loop.start();
    return () => loop.stop();
  }, [translateX]);

  useEffect(() => {
    const distance = 15; // how much button moves
    const duration = 2000; // speed

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(btnTranslateX, {
          toValue: distance,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(btnTranslateX, {
          toValue: 0,
          duration,
          useNativeDriver: true,
        }),
      ]),
    );

    loop.start();
    return () => loop.stop();
  }, [btnTranslateX]);

  return (
    <ImageBackground source={images.simpleBg} style={styles.bgImg}>
      <Animated.View style={{ flex: 1, transform: [{ translateX }] }}>
        <View style={styles.logoMain}>
          <Image source={images.logo} style={styles.logo} />
        </View>
      </Animated.View>
      <View style={styles.vectormain}>
        <Image source={images.Vector} style={styles.vectorimg} />
      </View>

      <View style={styles.textContainer}>
        <View style={styles.textMain}>
          <Text style={styles.trusted}>Your trusted,</Text>
          <Text style={styles.trusted}>fast, and safe ride</Text>
          <Text style={styles.trustedSec}>Just a tap away.</Text>
        </View>
        <TouchableOpacity style={styles.btnMain}>
          <Text style={styles.btnText}>Get Started</Text>
          <Image source={images.arrowUp} style={styles.arrowImg} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bgImg: {
    flex: 1,
    width: width * 1,
    height: height * 1,
  },
  logoMain: {
    alignItems: 'center',
    top: height * 0.36,
    right: width * 0.05,
  },
  logo: {
    width: width * 0.8,
    height: height * 0.19,
  },
  vectorimg: {
    width: width * 1,
    height: height * 0.5,
  },
  vectormain: {
    alignItems: 'center',
    bottom: height * 0.25,
  },
  textContainer: {
    position: 'absolute',
    top: height * 0.7,
    left: width * 0.06,
  },
  textMain: {
    lineHeight: height * -0.09,
  },
  trusted: {
    color: colors.white,
    fontFamily: fontFamily.ClashDisplayMedium,
    fontSize: fontSizes.xxl,
  },
  trustedSec: {
    color: colors.brown,
    fontFamily: fontFamily.ClashDisplayMedium,
    fontSize: fontSizes.xxl,
  },
  btnMain: {
    marginTop: height * 0.04,
    borderRadius: 30,
    width: width * 0.88,
    height: height * 0.075,
    backgroundColor: colors.brown,
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.04,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnText: {
    color: colors.white,
    fontFamily: fontFamily.SfProDisplayRegular,
    fontSize: fontSizes.md,
  },
  arrowImg: {
    width: width * 0.03,
    height: height * 0.03,
    resizeMode: 'contain',
  },
});

export default WelcomeFirst;

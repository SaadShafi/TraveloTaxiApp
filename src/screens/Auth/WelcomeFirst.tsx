import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  PanResponder,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { fontFamily } from '../../assets/Fonts';
import images from '../../assets/Images';
import { height, width } from '../../utilities';
import { colors } from '../../utilities/colors';
import { fontSizes } from '../../utilities/fontsizes';
// import { useNavigation, NavigationProp} from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { StackParamList } from '../../navigation/AuthStack';

type Props = NativeStackScreenProps<StackParamList, 'WelcomeFirst'>;

const WelcomeFirst: React.FC<Props> = ({ navigation }) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const slidePosition = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const arrowOpacity = useRef(new Animated.Value(0)).current;
  const trackBackground = useRef(new Animated.Value(0)).current;
  const [isUnlocked, setIsUnlocked] = useState(false);
  const maxSlideDistance = width * 0.88 - height * 0.075 - width * 0.04;

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

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx >= 0 && gestureState.dx <= maxSlideDistance) {
          slidePosition.setValue(gestureState.dx);

          // Fade in text as user slides
          textOpacity.setValue(gestureState.dx / maxSlideDistance);

          // Change background color as user slides
          trackBackground.setValue(gestureState.dx / maxSlideDistance);

          // Only show arrow when fully slid
          if (gestureState.dx >= maxSlideDistance * 0.95) {
            arrowOpacity.setValue(1);
          } else {
            arrowOpacity.setValue(0);
          }
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx >= maxSlideDistance * 0.8) {
          // Complete the slide
          Animated.parallel([
            Animated.timing(slidePosition, {
              toValue: maxSlideDistance,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(textOpacity, {
              toValue: 1,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(arrowOpacity, {
              toValue: 1,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(trackBackground, {
              toValue: 1,
              duration: 200,
              useNativeDriver: false,
            }),
          ]).start(() => {
            setIsUnlocked(true);
            navigation.navigate('WelcomeSec');
            // Here you would navigate to the next screen
          });
        } else {
          // Return to start
          Animated.parallel([
            Animated.spring(slidePosition, {
              toValue: 0,
              friction: 7,
              useNativeDriver: true,
            }),
            Animated.timing(textOpacity, {
              toValue: 0,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(arrowOpacity, {
              toValue: 0,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(trackBackground, {
              toValue: 0,
              duration: 200,
              useNativeDriver: false,
            }),
          ]).start();
        }
      },
    }),
  ).current;

  const backgroundColor = trackBackground.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(0,0,0,0)', colors.brown],
  });

  useEffect(() => {
    console.log('Navigation prop:', navigation);
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      {/* <ImageBackground source={images.simpleBg} style={styles.bgImg}> */}
      {/* <Animated.View style={{ flex: 1, transform: [{ translateX }] }}>
        <View style={styles.logoMain}>
          <Image source={images.logo} style={styles.logo} />
        </View>
      </Animated.View> */}
      {/* <View style={styles.vectormain}>
        <Image source={images.Vector} style={styles.vectorimg} />
      </View> */}
      <View style={styles.logoMain}>
        <Image source={images.logo} style={styles.logo} />
      </View>

      <View style={styles.textContainer}>
        <View style={styles.textMain}>
          <Text style={styles.trusted}>Your trusted,</Text>
          <Text style={styles.trusted}>fast, and safe ride</Text>
          <Text style={styles.trustedSec}>Just a tap away.</Text>
        </View>
        {/* <TouchableOpacity style={styles.btnMain}>
          <Text style={styles.btnText}>Get Started</Text>
          <Image source={images.arrowUp} style={styles.arrowImg} />
        </TouchableOpacity> */}

        <View style={styles.sliderContainer}>
          <Animated.View
            style={[styles.sliderTrack, { backgroundColor }]}
            {...panResponder.panHandlers}
          >
            <Animated.View
              style={[
                styles.sliderThumb,
                {
                  transform: [{ translateX: slidePosition }],
                },
              ]}
            >
              <Animated.View style={{ opacity: arrowOpacity }}>
                <Image source={images.arrowUp} style={styles.arrowImg} />
              </Animated.View>
            </Animated.View>

            <Animated.Text
              style={[
                styles.sliderText,
                {
                  opacity: textOpacity,
                  left: height * 0.075 + width * 0.02,
                },
              ]}
            >
              Get Started
            </Animated.Text>
          </Animated.View>
        </View>
      </View>
      {/* </ImageBackground> */}
    </View>
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
    // top: height * 0.36,
    // right: width * 0.05,
  },
  logo: {
    width: width * 0.5,
    height: height * 0.16,
    resizeMode: 'contain',
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
    color: colors.black,
    fontFamily: fontFamily.ClashDisplayMedium,
    fontSize: fontSizes.xxl,
  },
  trustedSec: {
    color: colors.brown,
    fontFamily: fontFamily.ClashDisplayMedium,
    fontSize: fontSizes.xxl,
  },
  // btnMain: {
  //   marginTop: height * 0.04,
  //   borderRadius: 30,
  //   width: width * 0.88,
  //   height: height * 0.075,
  //   backgroundColor: colors.brown,
  //   paddingVertical: height * 0.02,
  //   paddingHorizontal: width * 0.04,
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  // },
  // btnText: {
  //   color: colors.white,
  //   fontFamily: fontFamily.SfProDisplayRegular,
  //   fontSize: fontSizes.md,
  // },
  // arrowImg: {
  //   width: width * 0.03,
  //   height: height * 0.03,
  //   resizeMode: 'contain',
  // },

  sliderContainer: {
    marginTop: height * 0.04,
    width: width * 0.88,
  },
  sliderTrack: {
    height: height * 0.075,
    borderRadius: 40,
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 0.5,
  },
  sliderThumb: {
    position: 'absolute',
    left: 0,
    width: height * 0.075,
    height: height * 0.075,
    borderRadius: (height * 0.075) / 2,
    backgroundColor: colors.brown,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  sliderText: {
    position: 'absolute',
    color: colors.white,
    fontFamily: fontFamily.SfProDisplayRegular,
    fontSize: fontSizes.md,
  },
  arrowImg: {
    width: width * 0.03,
    height: height * 0.03,
    resizeMode: 'contain',
    tintColor: colors.white,
  },
});

export default WelcomeFirst;

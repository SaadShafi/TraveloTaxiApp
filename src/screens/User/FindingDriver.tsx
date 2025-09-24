// import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
// import { fontFamily } from '../../assets/Fonts';
// import images from '../../assets/Images';
// import CustomButton from '../../components/CustomButton';
// import TopHeader from '../../components/Topheader';
// import { height, width } from '../../utilities';
// import { colors } from '../../utilities/colors';
// import { fontSizes } from '../../utilities/fontsizes';
// import type { NativeStackScreenProps } from '@react-navigation/native-stack';
// import type { StackParamList } from '../../navigation/AuthStack';

// type Props = NativeStackScreenProps<StackParamList, 'FindingDriver'>;

// const FindingDriver: React.FC<Props>  = ({ navigation }) => {
//   return (
//     <View style={{ flex: 1 }}>
//       <TopHeader text="Finding Driver" />
//       <View
//         style={{
//           alignItems: 'center',
//           top: height * 0.3,
//         }}
//       >
//         <ActivityIndicator
//           size={width * 0.2}
//           color={colors.brown}
//           style={{ marginBottom: height * 0.05 }}
//         />
//         <Text style={styles.text}>Have you tried</Text>
//         <Text style={styles.text}>Bidding</Text>
//         <View style={styles.btnMain}>
//           <Image source={images.logo} style={styles.logo} />
//           <View>
//             <CustomButton
//               btnHeight={height * 0.07}
//               btnWidth={width * 0.85}
//               borderColor={colors.black}
//               borderRadius={30}
//               borderWidth={1}
//               backgroundColor={colors.black}
//               text="Cancel Booking"
//               textColor={colors.white}
//               onPress={() => navigation.navigate('DriverOfferings')}
//             />
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   logo: {
//     width: width * 0.4,
//     height: height * 0.2,
//     resizeMode: 'contain',
//     top: height * 0.02,
//   },
//   btnMain: {
//     top: height * 0.13,
//     alignItems: 'center',
//   },
//   text: {
//     fontFamily: fontFamily.ClashDisplayMedium,
//     fontSize: fontSizes.lg2,
//     color: colors.black,
//   },
// });

// export default FindingDriver;





import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import { fontFamily } from '../../assets/Fonts';
import images from '../../assets/Images';
import CustomButton from '../../components/CustomButton';
import TopHeader from '../../components/Topheader';
import { height, width } from '../../utilities';
import { colors } from '../../utilities/colors';
import { fontSizes } from '../../utilities/fontsizes';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { StackParamList } from '../../navigation/AuthStack';
import { useEffect } from 'react';   // ⬅️ import useEffect

type Props = NativeStackScreenProps<StackParamList, 'FindingDriver'>;

const FindingDriver: React.FC<Props>  = ({ navigation }) => {

  // ⬅️ run once when screen mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('DriverOfferings');
    }, 10000); // 20 seconds

    return () => clearTimeout(timer); // cleanup on unmount
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <TopHeader text="Finding Driver" />
      <View
        style={{
          alignItems: 'center',
          top: height * 0.3,
        }}
      >
        <ActivityIndicator
          size={width * 0.2}
          color={colors.brown}
          style={{ marginBottom: height * 0.05 }}
        />
        <Text style={styles.text}>Have you tried</Text>
        <Text style={styles.text}>Bidding</Text>
        <View style={styles.btnMain}>
          <Image source={images.logo} style={styles.logo} />
          <View>
            <CustomButton
              btnHeight={height * 0.07}
              btnWidth={width * 0.85}
              borderColor={colors.black}
              borderRadius={30}
              borderWidth={1}
              backgroundColor={colors.black}
              text="Cancel Booking"
              textColor={colors.white}
              onPress={() => navigation.navigate('HomeUser')}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: width * 0.4,
    height: height * 0.2,
    resizeMode: 'contain',
    top: height * 0.02,
  },
  btnMain: {
    top: height * 0.13,
    alignItems: 'center',
  },
  text: {
    fontFamily: fontFamily.ClashDisplayMedium,
    fontSize: fontSizes.lg2,
    color: colors.black,
  },
});

export default FindingDriver;

import react from 'react';
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';
import { colors } from '../../utilities/colors';
import { fontFamily } from '../../assets/Fonts';
import { fontSizes } from '../../utilities/fontsizes';
import images from '../../assets/Images';
import { width } from '../../utilities';
import { height } from '../../utilities';
import CustomButton from '../../components/CustomButton';


const WelcomeFourth = () => {
  return (
        <ImageBackground source={images.background} style={styles.bgImg}>
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome</Text>
                <View style={styles.paraMain}>
                  <Text style={styles.paraText}>Lorem ipsum dolor sit amet, consectetur</Text>
                <Text style={styles.paraText}>adipiscing elit, sed do</Text>
                <Text style={styles.paraText}>eiusmod.</Text>
                </View>
                <View style={styles.btnMain}>
                   <CustomButton
                      text="Create An Account"
                      btnWidth={width * 0.85}
                      btnHeight={height * 0.067}
                      backgroundColor={colors.brown}
                      textColor={colors.white}
                      borderRadius={30}
                    />
                  <CustomButton
                    text="Sign In"
                    btnWidth={width * 0.85}
                    btnHeight={height * 0.067}
                    backgroundColor={colors.white}
                    textColor={colors.black}
                    borderRadius={30}
                  />
                </View>
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
   container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.6,
   },
   welcome:{
    fontFamily: fontFamily.ClashDisplayBold,
    color: colors.white,
    fontSize: fontSizes.lg2
   },
   paraMain: {
    marginTop: height * 0.01,
    alignItems: 'center',
    gap: height * 0.005
   },
   paraText: {
     fontFamily: fontFamily. ClashDisplayLight,
    color: colors.gray,
    fontSize: fontSizes.sm2
   },
   btnMain: {
    marginTop: height * 0.03,
    gap: height * 0.02
   }
});

export default WelcomeFourth;
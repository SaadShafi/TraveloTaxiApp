import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import TopHeader from '../../components/Topheader';
import images from '../../assets/Images';
import { height, width } from '../../utilities';
import { fontFamily } from '../../assets/Fonts';
import CustomButton from '../../components/CustomButton';
import { colors } from '../../utilities/colors';

const Congratulation = () => {
  return (
    <ImageBackground source={images.Shade} style={{flex:1}}>
      <TopHeader isBack={true} />
      <Image
      source={images.success}
      style={styles.success}
      />
      <Text style={styles.saved}>Profile Saved</Text>
      <Text style={styles.successfully}>Succesfully</Text>

      <View style={{top: height * 0.63, alignItems:'center'}}>
         <CustomButton
          btnHeight={height * 0.07}
          btnWidth={width * 0.85}
          text="Continue To Sign In"
          backgroundColor={colors.brown}
          textColor={colors.white}
          borderRadius={30}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
    success:{
        alignSelf:'center',
        top: height * 0.26,
    },
    saved:{
        alignSelf:"center",
        top: height * 0.3,
        fontFamily:fontFamily.ClashDisplayMedium,
        fontSize:25,
    },
    successfully:{
        alignSelf:"center",
        top: height * 0.3,
        fontFamily:fontFamily.ClashDisplayMedium,
        fontSize:25,
    }
});

export default Congratulation;
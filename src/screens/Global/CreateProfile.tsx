import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import TopHeader from '../../components/Topheader';
import images from '../../assets/Images';
import { height, width } from '../../utilities';
import { fontFamily } from '../../assets/Fonts';
import CustomButton from '../../components/CustomButton';
import { colors } from '../../utilities/colors';
import CustomTextInput from '../../components/CustomTextInput';

const CreateProfile = () => {
  return (
    
      <View style={{flex: 1, backgroundColor: colors.white}}>
        <TopHeader text="Profile" isBack={true} />
       <View style={styles.imgMain}> 
         <Image
        source={images.profile}
        style={styles.profile}
        />
       </View>

        <View style={styles.inputMain}>
        <CustomTextInput
          placeholder="*Enter Your Name."
          placeholderTextColor={colors.black}
          borderColor={colors.brown}
          borderRadius={30}
          inputWidth={width * 0.85}
          inputHeight={height * 0.06}
        />
      </View>
      </View>
  );
};

const styles = StyleSheet.create({
  imgMain: {
    top: height * 0.02,
  },
  profile:{
    width:width * 0.99,
    height:height * 0.17,
    resizeMode:'cover',
  },
   inputMain: {
    alignItems: 'center',
    marginBottom: height * 0.06,
    fontFamily: fontFamily.ClashDisplayRegular,
  },
});

export default CreateProfile;
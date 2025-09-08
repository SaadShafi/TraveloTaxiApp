import { Image, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import TopHeader from '../../components/Topheader';
import { height, width } from '../../utilities';
import images from '../../assets/Images';
import { colors } from '../../utilities/colors';
import { fontFamily } from '../../assets/Fonts';
import { useState } from 'react';
import { fontSizes } from '../../utilities/fontsizes';

const BookingDetails = () => {
  // const [activeTab, setActiveTab] = useState('Completed');

  return (
    <View style={{ flex: 1 }}>
      <TopHeader text="Booking Details" isMenu={true} />
      
      <View style={styles.main}>
        <View style={{flexDirection:'row', gap: width * 0.08}}>
          <Image source={images.User} style={styles.img}/>
          <View style={{ top: height * 0.02,}}>
            <Text style={styles.name}>Name</Text>
            <Text style={styles.description}>Description</Text>
          </View>
        </View>
        
        <View style={{flexDirection:'row', justifyContent:'space-between', paddingVertical: width * 0.09, paddingHorizontal: width * 0.05}}>
          <Text style={styles.ride}>Ride Type:</Text>
          <Text style={styles.booking}>Pre Booking</Text>
        </View>


        <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal: width * 0.05, bottom: height * 0.03,}}>
          <Text style={styles.date}>Date & Time:</Text>
          <Text style={styles.time}>Aug 20,2025 & 5:30 AM</Text>
        </View>

        <View style={{flexDirection:'row',}}>
        <Image
        source={images.guide}
        style={styles.guide}
        />
         <View style={{gap: height * 0.01}}>
            <View style={styles.location}>
            <View style={{flexDirection:'row', gap:width * 0.02, alignItems:'center', left: width * 0.03, top: height* 0.01}}>
                <Image source={images.Location} style={styles.locImg}/>
                <Text style={styles.park}>Brooklyn Bridge Park</Text>
            </View>
        </View>

          <View style={styles.location}>
            <View style={{flexDirection:'row', gap:width * 0.02, alignItems:'center', left: width * 0.03, top: height* 0.01}}>
                <Image source={images.Location} style={styles.locImg}/>
                <Text style={styles.park}>Empire State Building</Text>
            </View>
        </View>
        </View>
       </View>

       <View style={styles.container}>
        <View style={{flexDirection:'row',justifyContent:'space-between',}}>
          <Text style={styles.fare}>Estimated Fare:</Text>
          <Text style={styles.dollar}>$65.00</Text>
        </View>
       </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    main:{
        backgroundColor:colors.lightGray,
        borderColor:colors.border,
        borderWidth:1,
        borderRadius:20,
        height: height * 0.45,
        width: width * 0.89,
        alignSelf:'center',
        top: height * 0.02,
    },
    img:{
      left: width * 0.04,
      top: height * 0.02,
    },
    name:{
      color:colors.black,
      fontFamily:fontFamily.SfProDisplayMedium,
      fontSize:fontSizes.md,
      fontWeight:'700'
    },
    description:{
      color:colors.darkGray,
      fontFamily:fontFamily.SfProDisplayMedium,
      fontSize:fontSizes.sm,
    },
    ride:{
      color:colors.black,
      fontFamily:fontFamily.SfProDisplayMedium,
      fontSize:fontSizes.sm2,
      fontWeight:'700',
    },
    booking:{
      color:colors.black,
      fontFamily:fontFamily.SfProDispalyMedium,
      fontSize:fontSizes.sm2
    },
    date:{
      color:colors.black,
      fontFamily:fontFamily.SfProDisplayMedium,
      fontSize:fontSizes.sm2,
      fontWeight:'700',
    },
    time:{
      color:colors.black,
      fontFamily:fontFamily.SfProDispalyMedium,
      fontSize:fontSizes.sm2
    },
     guide:{
        left: width * 0.06,
        top: height * 0.02
    },
    location:{
        borderWidth:1,
        borderColor: colors.brown,
        borderRadius:10,
        height: height * 0.05,
        width: width * 0.72,
        left: width * 0.1,
        backgroundColor:colors.white,
        alignSelf:'center',
    },
    locImg:{
        height: height * 0.027,
        width: width * 0.05,
    },
    park:{
        color: colors.black,
        fontFamily: fontFamily.SfProDisplayMedium,
        fontSize:20,
    },
    container:{
      backgroundColor:colors.white,
      height: height * 0.08,
      borderRadius:20,
      width: width * 0.83,
      alignSelf:'center',
      top: height * 0.02
    },
    fare:{
      color:colors.black,
      fontFamily:fontFamily.SfProDisplaySemiBold,
      fontSize:fontSizes.lg,
      fontWeight:"700",
      top: height * 0.02,
      left: width * 0.04
    },
    dollar:{
       fontFamily: fontFamily.SfProDisplaySemiBold,
        fontSize:fontSizes.lg,
        fontWeight:"600",
        color: colors.black,
        width: width * 0.18,
        right: width * 0.03,
        top: height * 0.02
    }
});

export default BookingDetails;


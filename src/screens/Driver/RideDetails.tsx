import React, { useState } from 'react';
import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import TopHeader from '../../components/Topheader';
import { colors } from '../../utilities/colors';
import { height, width } from '../../utilities';
import { fontFamily } from '../../assets/Fonts';
import images from '../../assets/Images';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const RideDetails = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TopHeader text="Ride Details" isMenu={true} />

      <View style={styles.subContainer}>
        <View style={styles.Precontainer}>
          <Text style={styles.booking}>Book Now</Text>
        </View>
        <Image
        source={images.User}
        style={styles.img}
        />

        <View style={styles.user}>
          <Text style={styles.userName}>Passenger Name:</Text>
          <Text style={styles.adam}>Adam James</Text>
        </View>

        <View style={styles.milesDistance}>
          <Text style={styles.distance}>Distance:</Text>
          <Text style={styles.miles}>10 Miles away</Text>
        </View>

        <View style={styles.Date}>
          <Text style={styles.date}>Date:</Text>
          <Text style={styles.year}>10 Dec 2025</Text>
        </View>

        <View style={styles.Timing}>
          <Text style={styles.time}>Time:</Text>
          <Text style={styles.clock}>10:00 PM</Text>
        </View>

        <View style={styles.fare}>
          <Text style={styles.Fare}>Fare:</Text>
          <Text style={styles.dollar}>$50.00</Text>
        </View>

        <Image
        source={images.Pickup}
        style={styles.pickup}
        />

        <View style={styles.whitecontainer}>
          <Text style={styles.pick}>Pickup Location</Text>
          <View style={styles.locContainer}>
            <View style={{flexDirection:'row', gap:10}}>
              <Image
              source={images.Location}
              style={styles.location}
              />
              <Text style={styles.park}>Brooklyn Bridge Park</Text>
            </View>
          </View>

          <Text style={styles.drop}>Drop Off Location</Text>
          <View style={styles.dropContainer}>
            <View style={{flexDirection:'row', gap:10}}>
              <Image
              source={images.Location}
              style={styles.location}
              />
              <Text style={styles.park}>Empire State Building</Text>
            </View>
          </View>

        <View style={{flexDirection:'row', gap: width * 0.02}}>
            <View style={styles.btn}>
             <CustomButton
              btnHeight={height * 0.06}
              btnWidth={width * 0.38}
              text="Cancel"
              backgroundColor={colors.black}
              textColor={colors.white}
              borderRadius={30}
              onPress={() => navigation.goBack()} 
            />
          </View>

           <View style={styles.btn1}>
             <CustomButton
              btnHeight={height * 0.06}
              btnWidth={width * 0.38}
              text="Bid Now"
              backgroundColor={colors.brown}
              textColor={colors.white}
              borderRadius={30}
              onPress={() => navigation.navigate("RideArriving")}
            />
          </View>
        </View>

        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },
  subContainer:{
  height: height * 0.68,
  width: width * 0.93,
  alignSelf:'center',
  borderRadius:20,
  marginTop:20,
  backgroundColor:colors.lightGray,
  },
  pickup:{
    left: width * 0.05,
    height: height * 0.12,
    top: height * 0.1,
  },
  locContainer:{
    backgroundColor:colors.mediumGray,
    height: height * 0.06,
    width: width * 0.73,
    borderRadius:10,
    left: width * 0.04,
    top: height * 0.02,
  },
  dropContainer:{
    backgroundColor:colors.mediumGray,
    height: height * 0.06,
    width: width * 0.73,
    borderRadius:10,
    left: width * 0.04,
    top: height * 0.06,
  },
  Precontainer:{
    backgroundColor:colors.lightBrown,
    height:height * 0.03,
    width:width * 0.3,
    borderRadius:20,
    left: width * 0.04,
    top: height * 0.02,
  },
  whitecontainer:{
    backgroundColor:colors.white,
      height: height * 0.25,
      width: width * 0.79,
      borderRadius:20,
      left: width * 0.11,
      bottom: height * 0.04,
  },
  booking:{
    color:colors.black,
    fontFamily:fontFamily.SfProDisplayBold,
    fontSize:20,
    alignSelf:'center',
  },
  img:{
      left: width * 0.04,
      top: height * 0.06,
  },
  btn:{
    marginTop: height * 0.1,
  },
  btn1:{
    marginTop: height * 0.1,
  },
  user:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:width * 0.65,
    left: width * 0.24,
  },
  userName:{
    fontFamily:fontFamily.SfProDisplayMedium,
    fontSize:18,
    color:colors.jetBlack,
  },
  adam:{
    fontFamily:fontFamily.SfProDisplayMedium,
    fontSize:18,
    color:colors.black,
  },
  distance:{
    fontFamily:fontFamily.SfProDisplayMedium,
    fontSize:18,
    color:colors.jetBlack,
  },
  miles:{
     fontFamily:fontFamily.SfProDisplayMedium,
    fontSize:18,
    color:colors.black,
  },
  milesDistance:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:width * 0.65,
    left: width * 0.24,
    top: height * 0.015,
  },
  Date:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:width * 0.65,
    left: width * 0.24,
    top: height * 0.033,
  },
  date:{
    fontFamily:fontFamily.SfProDisplayMedium,
    fontSize:18,
    color:colors.jetBlack,
  },
  year:{
    fontFamily:fontFamily.SfProDisplayMedium,
    fontSize:18,
    color:colors.black,
  },
  Timing:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:width * 0.65,
    left: width * 0.24,
    top: height * 0.05,
  },
  time:{
    fontFamily:fontFamily.SfProDisplayMedium,
    fontSize:18,
    color:colors.jetBlack,
  },
  clock:{
    fontFamily:fontFamily.SfProDisplayMedium,
    fontSize:18,
    color:colors.black,
  },
  fare:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:width * 0.65,
    left: width * 0.24,
    top: height * 0.065,
  },
  Fare:{
    fontFamily:fontFamily.SfProDisplayMedium,
    fontSize:18,
    color:colors.jetBlack,
  },
  dollar:{
    fontFamily:fontFamily.SfProDisplayBold,
    fontSize:22,
    color:colors.black,
  },
  pick:{
    fontFamily:fontFamily.SfProDisplayRegular,
    fontSize:20,
    left: width * 0.04,
    top: height * 0.01,
  },
  drop:{
    fontFamily:fontFamily.SfProDisplayRegular,
    fontSize:20,
    left: width * 0.04,
    top: height * 0.05,
  },
  location:{
    left: width * 0.03,
    height: 24,
    width: 20,
    top: height * 0.015,
  },
  park:{
    fontFamily:fontFamily.SfProDisplayRegular,
    fontSize:21,
    left: width * 0.05,
    top: height * 0.013,
  }
});

export default RideDetails
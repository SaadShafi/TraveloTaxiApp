import { Image, StyleSheet, Text, View } from 'react-native';
import TopHeader from '../../components/Topheader';
import { height, width } from '../../utilities';
import images from '../../assets/Images';
import { colors } from '../../utilities/colors';
import { fontFamily } from '../../assets/Fonts';

const PaymentHistory = () => {
  return (
    <View style={{ flex: 1 }}>
      <TopHeader text="Payment History" isBack={true} />

      <View style={styles.mainContainer}>
        <Image
        source={images.User}
        style={styles.userImg}
        />
        <View style={styles.rideContainer}>
            <Text style={styles.bookText}>Ride Type: Book Now</Text>
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-between', width: width * 0.67, left: height * 0.096, bottom: height * 0.04}}>
            <Text style={styles.name}>Passenger Name:</Text>
            <Text style={styles.adam}>Adam James</Text>
        </View>

         <View style={{flexDirection:'row', justifyContent:'space-between', width: width * 0.67, left: height * 0.096, bottom: height * 0.04}}>
            <Text style={styles.name}>Distance:</Text>
            <Text style={styles.adam}>10 Miles Away</Text>
        </View>

        <View style={styles.location}>

        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    mainContainer:{
        borderWidth:1,
        borderColor:'#D4D4D4',
        backgroundColor:'#F4F4F4',
        height: height * 0.3,
        width: width * 0.92, 
        borderRadius:20,
        alignSelf:'center',
        top: height * 0.01
    },
    userImg:{
        left: width * 0.03,
        top: height * 0.02,
    },
    rideContainer:{
        backgroundColor: '#BD070633',
        height: height * 0.03,
        borderRadius:20,
        width: width * 0.4,
        justifyContent:'center',
        left: width * 0.2,
        bottom: height * 0.05
    },
    bookText:{
        fontSize:17,
        fontFamily:fontFamily.SfProDisplayMedium,
        width: width * 0.6,
        fontWeight:'500',
        alignItems:'center',
        left: width * 0.02
    },
    name:{
        fontSize:18,
        fontFamily: fontFamily.SfProDisplaySemiBold,
        color:colors.black,
    },
    adam:{
        fontSize:18,
        fontFamily: fontFamily.SfProDisplaySemiBold,
        color:colors.black,
    },
    location:{
        borderWidth:1,
        borderColor: colors.brown
    }
});

export default PaymentHistory;


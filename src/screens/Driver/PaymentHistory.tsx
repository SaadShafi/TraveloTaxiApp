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

        <View style={styles.fareContainer}>
            <Text style={styles.fare}>Fare:</Text>
            <Text style={styles.dollar}>$60.00</Text>
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
        height: height * 0.4,
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
        borderColor: colors.brown,
        borderRadius:10,
        height: height * 0.05,
        width: width * 0.75,
        left: width * 0.11,
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
    fareContainer:{
        backgroundColor: colors.white,
        borderRadius:10,
        height: height * 0.08,
        width: width * 0.85,
        alignSelf:'center',
        top:height * 0.04,
        flexDirection:'row',
        justifyContent:'space-between',
    },
    fare:{
        fontFamily: fontFamily.SfProDisplaySemiBold,
        fontSize:25,
        fontWeight:"500",
        color: colors.black,
        width: width * 0.15,
        alignSelf:"center",
        left: width * 0.08,
    },
    dollar:{
        fontFamily: fontFamily.SfProDisplaySemiBold,
        fontSize:25,
        fontWeight:"800",
        color: colors.black,
        width: width * 0.18,
        alignSelf:"center",
        right: width * 0.06,
    },
    guide:{
        left: width * 0.06,
        top: height * 0.02
    }
});

export default PaymentHistory;


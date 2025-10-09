import { useNavigation } from '@react-navigation/native';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { fontFamily } from '../../assets/Fonts';
import TopHeader from '../../components/Topheader';
import { height, width } from '../../utilities';
import { colors } from '../../utilities/colors';
import { fontSizes } from '../../utilities/fontsizes';

interface tipsProp {
  image?: any;
  name: string;
  desc: string;
  details: string;
  text1: string;
  text2: string;
  text3: string;
  text4: string;
}

const Schedule = () => {
  const navigation = useNavigation<any>();
  const scheduleData = [
    {
      name: 'Ride ID',
      desc: '#4564',
      details: 'View Details',
      text1: 'Ride Type:',
      text2: 'Pre Booking',
      text3: 'Date & Time:',
      text4: 'Aug 20,2025 & 5:30 AM',
    },
    {
      name: 'Ride ID',
      desc: '#4564',
      details: 'View Details',
      text1: 'Ride Type:',
      text2: 'Pre Booking',
      text3: 'Date & Time:',
      text4: 'Aug 20,2025 & 5:30 AM',
    },
    {
      name: 'Ride ID',
      desc: '#4564',
      details: 'View Details',
      text1: 'Ride Type:',
      text2: 'Pre Booking',
      text3: 'Date & Time:',
      text4: 'Aug 20,2025 & 5:30 AM',
    },
  ];

  const ScheduleBox = ({ item }: { item: tipsProp }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate('ScheduleDetail')}
        style={styles.container}
      >
        {/* <View style={styles.container}> */}
        <View style={styles.main}>
          <View style={styles.contentMain}>
            <Image source={item.image} style={styles.img} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: width * 0.6,
                left: width * 0.03,
              }}
            >
              <View style={{ flexDirection: 'column', right: width * 0.14 }}>
                <Text
                  style={{
                    color: colors.black,
                    fontFamily: fontFamily.SfProDisplayMedium,
                    fontWeight: '800',
                  }}
                >
                  {item.name}
                </Text>
                <Text
                  style={{
                    color: colors.darkGray,
                    fontFamily: fontFamily.SfProDisplayRegular,
                    fontWeight: '100',
                  }}
                >
                  {item.desc}
                </Text>
              </View>
              <TouchableOpacity style={styles.detailsMain} activeOpacity={0.7}>
                <Text style={styles.detailText}>{item.details}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              width: width * 0.83,
              paddingHorizontal: width * 0.03,
              gap: -1,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text style={styles.textOne}>{item.text1}</Text>
              <Text style={styles.textTwo}>{item.text2}</Text>
            </View>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text style={styles.textOne}>{item.text3}</Text>
              <Text style={styles.textTwo}>{item.text4}</Text>
            </View>
          </View>
        </View>
        {/* </View> */}
      </TouchableOpacity>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <TopHeader text="Schedule" isBack={true} />
      <FlatList
        data={scheduleData}
        renderItem={ScheduleBox}
        keyExtractor={item => item.id}
        contentContainerStyle={{
          gap: height * 0.02,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: width * 0.05,
    top: height * 0.02,
  },
  main: {
    backgroundColor: colors.lightGray,
    borderColor: colors.gray,
    borderWidth: 1,
    width: width * 0.85,
    height: height * 0.15,
    borderRadius: 20,
  },
  contentMain: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.04,
  },
  img: {
    width: width * 0.1,
    height: height * 0.09,
    resizeMode: 'contain',
  },
  detailsMain: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderColor: colors.brown,
    borderWidth: 1,
    borderRadius: 30,
    width: width * 0.22,
    height: height * 0.03,
    left: width * 0.04,
  },
  detailText: {
    textAlign: 'center',
    fontFamily: fontFamily.SfProDisplayRegular,
    color: colors.black,
    fontWeight: '600',
    top: 2,
  },
  textOne: {
    fontFamily: fontFamily.SfProDisplayMedium,
    fontSize: fontSizes.xsm,
    color: colors.black,
  },
  textTwo: {
    fontFamily: fontFamily.SfProDisplayRegular,
    fontSize: fontSizes.xsm,
    color: colors.black,
  },
});

export default Schedule;

import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { fontFamily } from '../../assets/Fonts';
import images from '../../assets/Images';
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
  const scheduleData = [
    {
      image: images.User,
      name: 'Name',
      desc: 'Description',
      details: 'View Details',
      text1: 'Ride Type:',
      text2: 'Pre Booking',
      text3: 'Date & Time:',
      text4: 'Aug 20,2025 & 5:30 AM',
    },
    {
      image: images.User,
      name: 'Name',
      desc: 'Description',
      details: 'View Details',
      text1: 'Ride Type:',
      text2: 'Pre Booking',
      text3: 'Date & Time:',
      text4: 'Aug 20,2025 & 5:30 AM',
    },
    {
      image: images.User,
      name: 'Name',
      desc: 'Description',
      details: 'View Details',
      text1: 'Ride Type:',
      text2: 'Pre Booking',
      text3: 'Date & Time:',
      text4: 'Aug 20,2025 & 5:30 AM',
    },
  ];

  const ScheduleBox = ({ item }: { item: tipsProp }) => {
    return (
      <View style={styles.container}>
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
              <View style={{ flexDirection: 'column' }}>
                <Text>{item.name}</Text>
                <Text>{item.desc}</Text>
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
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <TopHeader text="Schedule" isMenu={true} />
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
  },
  detailText: {
    textAlign: 'center',
    fontFamily: fontFamily.SfProDisplayRegular,
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

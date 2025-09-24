import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { fontFamily } from '../../assets/Fonts';
import images from '../../assets/Images';
import CustomTabs from '../../components/CustomTabs';
import TopHeader from '../../components/Topheader';
import { RootState } from '../../redux/store';
import { height, width } from '../../utilities';
import { colors } from '../../utilities/colors';
import { fontSizes } from '../../utilities/fontsizes';

interface cardProp {
  image?: any;
  name: string;
  desc: string;
  status: string;
  text1: string;
  text2: string;
  text3: string;
  text4: string;
}

const History = () => {
  const navigation = useNavigation<any>();
  const selectedRole = useSelector(
    (state: RootState) => state.role.selectedRole,
  );
  const CompletedData = [
    {
      image: images.User,
      name: 'Name',
      desc: 'Description',
      status: 'Completed',
      text1: 'Ride Type:',
      text2: 'Pre Booking',
      text3: 'Date & Time:',
      text4: 'Aug 20,2025 & 5:30 AM',
    },
    {
      image: images.User,
      name: 'Name',
      desc: 'Description',
      status: 'Completed',
      text1: 'Ride Type:',
      text2: 'Pre Booking',
      text3: 'Date & Time:',
      text4: 'Aug 20,2025 & 5:30 AM',
    },
    {
      image: images.User,
      name: 'Name',
      desc: 'Description',
      status: 'Completed',
      text1: 'Ride Type:',
      text2: 'Pre Booking',
      text3: 'Date & Time:',
      text4: 'Aug 20,2025 & 5:30 AM',
    },
  ];

  const CanceledData = [
    {
      image: images.User,
      name: 'Name',
      desc: 'Description',
      status: 'Canceled',
      text1: 'Ride Type:',
      text2: 'Pre Booking',
      text3: 'Date & Time:',
      text4: 'Aug 20,2025 & 5:30 AM',
    },
    {
      image: images.User,
      name: 'Name',
      desc: 'Description',
      status: 'Canceled',
      text1: 'Ride Type:',
      text2: 'Pre Booking',
      text3: 'Date & Time:',
      text4: 'Aug 20,2025 & 5:30 AM',
    },
    {
      image: images.User,
      name: 'Name',
      desc: 'Description',
      status: 'Canceled',
      text1: 'Ride Type:',
      text2: 'Pre Booking',
      text3: 'Date & Time:',
      text4: 'Aug 20,2025 & 5:30 AM',
    },
  ];

  const cardComplete = ({ item }: { item: cardProp }) => {
    const handleCompletePress = () => {
      if (selectedRole === 'user') {
        navigation.navigate('HistoryDetailUserOne');
      } else if (selectedRole === 'driver') {
        navigation.navigate('HistoryDetailOne');
      }
    };

    return (
      <TouchableOpacity
        style={styles.centeredCard}
        activeOpacity={0.7}
        onPress={handleCompletePress}
      >
        <View style={styles.cardContainer}>
          <View style={styles.imgMain}>
            <Image source={item.image} style={styles.cardImg} />
            <View style={styles.cardInfoMain}>
              <View style={styles.nameDescMain}>
                <Text style={styles.nameText}>{item.name}</Text>
                <Text style={styles.descText}>{item.desc}</Text>
              </View>
              <View style={styles.statusMain}>
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
            </View>
          </View>
          <View style={styles.belowContentMain}>
            <View style={styles.row}>
              <Text style={styles.text}>{item.text1}</Text>
              <Text style={styles.textSec}>{item.text2}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text}>{item.text3}</Text>
              <Text style={styles.textSec}>{item.text4}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const cardCanceled = ({ item }: { item: cardProp }) => {
    const handleCancelPress = () => {
      if (selectedRole === 'user') {
        navigation.navigate('HistoryDetailUserSec');
      } else if (selectedRole === 'driver') {
        navigation.navigate('HistoryDetailSec');
      }
    };
    return (
      <TouchableOpacity
        style={styles.centeredCard}
        activeOpacity={0.7}
        // onPress={() => navigation.navigate('HistoryDetailSec')}
        onPress={handleCancelPress}
      >
        {/* <View style={styles.centeredCard}> */}
        <View style={styles.cardContainer}>
          <View style={styles.imgMain}>
            <Image source={item.image} style={styles.cardImg} />
            <View style={styles.cardInfoMain}>
              <View style={styles.nameDescMain}>
                <Text style={styles.nameText}>{item.name}</Text>
                <Text style={styles.descText}>{item.desc}</Text>
              </View>
              <View style={styles.statusMainSec}>
                <Text style={styles.statusTextSec}>{item.status}</Text>
              </View>
            </View>
          </View>
          <View style={styles.belowContentMain}>
            <View style={styles.row}>
              <Text style={styles.text}>{item.text1}</Text>
              <Text style={styles.textSec}>{item.text2}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text}>{item.text3}</Text>
              <Text style={styles.textSec}>{item.text4}</Text>
            </View>
          </View>
        </View>
        {/* </View> */}
      </TouchableOpacity>
    );
  };

  const CompletedScreen = () => (
    <View style={{ flex: 1, top: height * 0.01 }}>
      <FlatList
        data={CompletedData}
        renderItem={cardComplete}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{
          top: height * 0.01,
          gap: height * 0.02,
          paddingBottom: height * 0.02,
        }}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );

  const CanceledScreen = () => (
    <View style={{ flex: 1, top: height * 0.01 }}>
      <FlatList
        data={CanceledData}
        renderItem={cardCanceled}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{
          top: height * 0.01,
          gap: height * 0.02,
          paddingBottom: height * 0.02,
        }}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <TopHeader text="History" isBack={true} />
      <CustomTabs
        tabs={['Completed', 'Canceled']}
        tabContents={[CompletedScreen, CanceledScreen]}
        activeTabLoad={0}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centeredCard: {
    flex: 1,
    alignItems: 'center',
  },
  cardContainer: {
    width: width * 0.85,
    backgroundColor: colors.lightGray,
    borderRadius: 10,
    borderWidth: 0.2,
    paddingHorizontal: width * 0.04,
  },
  imgMain: {
    flexDirection: 'row',
  },
  cardImg: {
    width: width * 0.12,
    height: height * 0.09,
    resizeMode: 'contain',
  },
  cardInfoMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.65,
    height: height * 0.04,
    paddingHorizontal: width * 0.02,
    top: height * 0.02,
  },
  nameDescMain: {},
  nameText: {
    fontFamily: fontFamily.SfProDisplayBold,
    fontSize: fontSizes.xsm,
    color: colors.black,
  },
  descText: {
    fontFamily: fontFamily.SfProDisplayRegular,
    fontSize: fontSizes.xsm,
    color: colors.black,
  },
  statusMain: {
    backgroundColor: colors.lightGreen,
    borderRadius: 30,
    height: height * 0.028,
    width: width * 0.2,
  },
  statusText: {
    fontFamily: fontFamily.ClashDisplayMedium,
    fontSize: fontSizes.xsm,
    padding: 6,
    color: colors.green,
  },
  statusMainSec: {
    backgroundColor: colors.lightBrown,
    borderRadius: 30,
    height: height * 0.028,
    width: width * 0.17,
  },
  statusTextSec: {
    fontFamily: fontFamily.ClashDisplayMedium,
    fontSize: fontSizes.xsm,
    padding: 6,
    color: colors.brown,
  },
  belowContentMain: {
    paddingBottom: height * 0.03,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontFamily: fontFamily.SfProDisplayMedium,
    color: colors.black,
    fontSize: fontSizes.xsm,
  },
  textSec: {
    fontFamily: fontFamily.SfProDisplayMedium,
    color: colors.black,
    fontSize: fontSizes.xsm,
  },
});

export default History;

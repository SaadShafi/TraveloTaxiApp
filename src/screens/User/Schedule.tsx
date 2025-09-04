import { FlatList, StyleSheet, View } from 'react-native';
import TopHeader from '../../components/Topheader';
import { height, width } from '../../utilities';
import { colors } from '../../utilities/colors';

interface tipsProp {
  Image?: any;
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
      name: 'Name',
      desc: 'Description',
      details: 'View Details',
      text1: 'Ride Type:',
      text2: 'Pre Booking',
      text3: 'Date & Time:',
      text4: 'Aug 20,2025 & 5:30 AM',
    },
    {
      name: 'Name',
      desc: 'Description',
      details: 'View Details',
      text1: 'Ride Type:',
      text2: 'Pre Booking',
      text3: 'Date & Time:',
      text4: 'Aug 20,2025 & 5:30 AM',
    },
    {
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
        <View style={styles.main}></View>
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
    height: height * 0.1,
    borderRadius: 20,
  },
});

export default Schedule;

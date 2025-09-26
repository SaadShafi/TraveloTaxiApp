import { useState } from 'react';
import {
  Image,
  ScrollView,
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

const HelpAndSupport = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const data = [
    {
      id: 1,
      title: 'Reason Goes Here',
      desc: 'You can get in touch with us through below platforms. Our team will reach out to you as soon as possible.',
    },
    { id: 2, title: 'Reason Goes Here', desc: 'Details for reason 2 go here.' },
    { id: 3, title: 'Reason Goes Here', desc: 'Details for reason 3 go here.' },
    { id: 4, title: 'Other', desc: 'Other details go here.' },
  ];

  const toggleDropdown = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <TopHeader text="Help & Support" isBack={true} />

      <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
        {data.map((item, index) => (
          <View key={item.id} style={styles.card}>
            <TouchableOpacity
              onPress={() => toggleDropdown(index)}
              style={styles.row}
              activeOpacity={0.7}
            >
              <Text style={styles.title}>{item.title}</Text>
              {activeIndex === index ? (
                <TouchableOpacity onPress={() => setActiveIndex(null)}>
                  <Image source={images.cross} />
                </TouchableOpacity>
              ) : (
                // <Text style={styles.arrow}>⌄</Text>
                <Image source={images.arrow} />
              )}
            </TouchableOpacity>

            {activeIndex === index && (
              <View style={styles.dropdown}>
                <Text style={styles.desc}>{item.desc}</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.lightGray,
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: 33,
    width: width * 0.9,
    alignSelf: 'center',
    marginBottom: height * 0.02,
    paddingHorizontal: width * 0.07,
    paddingVertical: height * 0.02,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: fontFamily.SfProDisplayMedium,
    fontSize: 16,
    color: colors.black,
  },
  arrow: {
    fontSize: 20,
    color: colors.gray,
  },
  icon: {
    height: 18,
    width: 18,
    tintColor: colors.black,
  },
  dropdown: {
    marginTop: 12,
  },
  desc: {
    fontFamily: fontFamily.SfProDisplayMedium,
    fontSize: 14,
    color: colors.darkGray,
    lineHeight: 20,
  },
});

export default HelpAndSupport;

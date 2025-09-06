import { Image, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import TopHeader from '../../components/Topheader';
import { height, width } from '../../utilities';
import images from '../../assets/Images';
import { colors } from '../../utilities/colors';
import { fontFamily } from '../../assets/Fonts';
import { useState } from 'react';

const History = () => {
  // const [activeTab, setActiveTab] = useState('Completed');

  return (
    <View style={{ flex: 1 }}>
      <TopHeader text="History" isBack={true} />
      
    </View>
  );
};

const styles = StyleSheet.create({
 
});

export default History;


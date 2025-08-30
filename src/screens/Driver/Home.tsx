import { StyleSheet, View } from 'react-native';
import TopHeader from '../../components/Topheader';

const DriverHome = () => {
  return (
    <View style={{ flex: 1 }}>
      <TopHeader text="Driver Home" isMenu={true} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default DriverHome;

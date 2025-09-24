import { StyleSheet, View } from 'react-native';
import TopHeader from '../../components/Topheader';
import { colors } from '../../utilities/colors';

const CallMain = () => {
  return (
    <View style={{ flex: 1, backgroundColor: colors.black }}>
      <TopHeader isBackWhite={true} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default CallMain;

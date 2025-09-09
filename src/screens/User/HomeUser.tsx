import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import TopHeader from '../../components/Topheader';
import { StackParamList } from '../../navigation/UserStack';

type Props = NativeStackScreenProps<StackParamList, 'homeUser'>;

const HomeUser: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <TopHeader text="Home" isMenu={true} navigation={navigation} />
    </View>
  );
};
const styles = StyleSheet.create({});

export default HomeUser;

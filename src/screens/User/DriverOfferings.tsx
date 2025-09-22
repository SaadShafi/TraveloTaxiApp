import { FlatList, StyleSheet, View } from 'react-native';
import images from '../../assets/Images';
import TopHeader from '../../components/Topheader';
import { height } from '../../utilities';

interface DriverProps {
  name: string;
  price: string;
  carType: string;
  carModel: string;
  ratingImage: any;
}

const DriverOfferings = () => {
  const DriverOfferingData = [
    {
      name: 'Aqeel',
      price: '$16.00',
      carType: 'Tesla Model 3',
      carModel: 'MWY10X9',
      rating: images.rating,
    },
    {
      name: 'Aqeel',
      price: '$16.00',
      carType: 'Tesla Model 3',
      carModel: 'MWY10X9',
      rating: images.rating,
    },
    {
      name: 'Aqeel',
      price: '$16.00',
      carType: 'Tesla Model 3',
      carModel: 'MWY10X9',
      rating: images.rating,
    },
    {
      name: 'Aqeel',
      price: '$16.00',
      carType: 'Tesla Model 3',
      carModel: 'MWY10X9',
      rating: images.rating,
    },
    {
      name: 'Aqeel',
      price: '$16.00',
      carType: 'Tesla Model 3',
      carModel: 'MWY10X9',
      rating: images.rating,
    },
    {
      name: 'Aqeel',
      price: '$16.00',
      carType: 'Tesla Model 3',
      carModel: 'MWY10X9',
      rating: images.rating,
    },
  ];

  const DrriverOffering = ({ item }: { item: DriverProps }) => {
    return (
      <View style={{ flex: 1 }}>
        <View></View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <TopHeader text="Driver Offerings" isBack={true} />
      <FlatList
        data={DriverOfferingData}
        renderItem={DrriverOffering}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{
          gap: height * 0.02,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default DriverOfferings;

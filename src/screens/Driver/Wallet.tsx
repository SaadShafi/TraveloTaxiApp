import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { fontFamily } from '../../assets/Fonts';
import images from '../../assets/Images';
import TopHeader from '../../components/Topheader';
import { height, width } from '../../utilities';
import { colors } from '../../utilities/colors';

const Wallet = () => {
  // Transaction data from your screenshot
  const transactionData = [
    { id: '1', name: 'Edward', time: 'Today at 09:20 am', amount: '$230.00' },
    { id: '2', name: 'Edward', time: 'Today at 09:20 am', amount: '$430.00' },
    { id: '3', name: 'Edward', time: 'Today at 09:20 am', amount: '$200.00' },
    { id: '4', name: 'Edward', time: 'Today at 09:20 am', amount: '$500.00' },
    { id: '5', name: 'Edward', time: 'Today at 09:20 am', amount: '$100.00' },
    { id: '6', name: 'Edward', time: 'Today at 09:20 am', amount: '$700.00' },
    { id: '7', name: 'Edward', time: 'Today at 09:20 am', amount: '$1000.00' },
  ];

  // Render each transaction item with background
  const renderTransactionItem = ({ item }) => (
    <View style={styles.transactionItemContainer}>
      <View style={{ padding: 5, flexDirection: 'row', width: width * 0.8 }}>
        <Image source={images.card} />
        <View style={styles.transactionItem}>
          <View>
            <Text style={styles.transactionName}>{item.name}</Text>
            <Text style={styles.transactionTime}>{item.time}</Text>
          </View>
          <Text style={styles.transactionAmount}>{item.amount}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <TopHeader text="Wallet" isBack={true} />

      <View style={styles.mainContainer}>
        <View style={styles.subContainer}>
          <Text style={styles.dollar}>$300</Text>
          <Text style={styles.balance}>Total Earnings</Text>
        </View>
      </View>

      <View style={styles.transactionHeader}>
        <Text style={styles.transaction}>Transactions</Text>
        {/* <Text style={styles.see}>See All</Text> */}
      </View>

      <FlatList
        data={transactionData}
        renderItem={renderTransactionItem}
        keyExtractor={item => item.id}
        style={styles.transactionList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    borderWidth: 1,
    borderColor: '#D4D4D4',
    backgroundColor: colors.white,
    height: height * 0.2,
    width: width * 0.9,
    borderRadius: 20,
    top: height * 0.02,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: height * 0.04,
  },
  subContainer: {
    borderWidth: 1,
    borderColor: colors.brown,
    backgroundColor: '#BD070633',
    borderRadius: 20,
    alignSelf: 'center',
    height: height * 0.13,
    width: width * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dollar: {
    fontFamily: fontFamily.ClashDisplayMedium,
    fontSize: 36,
    fontWeight: '500',
    alignSelf: 'center',
    color: colors.black,
  },
  balance: {
    fontFamily: fontFamily.ClashDisplayMedium,
    fontSize: 18,
    fontWeight: '500',
    alignSelf: 'center',
    marginTop: 5,
    color: colors.black,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.9,
    alignSelf: 'center',
    marginBottom: 15,
  },
  transaction: {
    fontFamily: fontFamily.ClashDisplayMedium,
    fontSize: 18,
    fontWeight: '500',
    color: colors.black,
  },
  see: {
    fontFamily: fontFamily.SfProDisplayMedium,
    fontSize: 16,
    fontWeight: '500',
    textDecorationLine: 'underline',
    color: colors.black,
  },
  transactionList: {
    width: width * 0.9,
    alignSelf: 'center',
  },
  listContent: {
    gap: height * 0.01,
    paddingBottom: height * 0.02,
  },
  transactionItemContainer: {
    backgroundColor: '#E6E6E6',
    borderColor: '#D7D6D6',
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    width: width * 0.7,
  },

  transactionName: {
    fontFamily: fontFamily.SfProDisplayMedium,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
    color: '#333333',
  },
  transactionTime: {
    fontFamily: fontFamily.SfProDisplayRegular,
    fontSize: 14,
    color: '#666666',
  },
  transactionAmount: {
    fontFamily: fontFamily.SfProDisplayMedium,
    fontSize: 16,
    fontWeight: '600',
    color: colors.brown,
  },
});

export default Wallet;

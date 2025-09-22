import React, { useState } from 'react';
import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  } from 'react-native';
import TopHeader from '../../components/Topheader';
import CustomSelect from '../../components/CustomSelect';
import { height, width } from '../../utilities';
import { colors } from '../../utilities/colors';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../../navigation/AuthStack';

type Props = NativeStackScreenProps<StackParamList, 'BankDetails'>;

  const BankDetails: React.FC<Props> = ({ navigation }) => {

  const [bank, setBank] = useState('');
  const [name, setName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [number, setAccount] = useState('');
  const [routing, setRouting] = useState('');
  const [accountholderName, setAccountholderName] = useState('');
  const [route, setRoute] = useState('');
  const [agree, setAgree] = useState(false);
    
  
  const isAccountNumber = accountNumber.trim().length >= 4;
  const isAccountholderName = accountholderName.trim().length > 7;
  const isRoutingNumber = route.trim().length > 7;
  const isBankOptions = bank !== '';
   const isFormValid =
    isAccountNumber && isAccountholderName && isRoutingNumber 

  const BankOptions = [
    { name: 'Select Bank', id: '' },
    { name: 'HSBC', id: 'hsbc' },
    { name: 'Barclays', id: 'barclays' },
    { name: 'NatWest Groupr', id: 'natWest group' },
  ];


    return (
        <View style={{flex:1}}>
            <TopHeader text="Bank Details" isBack={true} />

        <View style={styles.dropdown}>
            <CustomSelect
            inputWidth={width * 0.85}
            inputHeight={height * 0.06}
            selectElements={BankOptions}
            borderColor={bank ? colors.brown : colors.gray}
            borderWidth={1}
            inputColor={bank ? colors.lightBrown : colors.gray}
            borderRadius={30}
            onChangeText={value => setBank(value)}
            setSelectedElement={setBank}
             onChangeText={setBank}
            defaultValue=""
          />
        </View>

        <View style={styles.holderName}>
            <CustomTextInput
            placeholder="*Account Holder Name."
            placeholderTextColor={colors.black}
            borderColor={colors.brown}
            borderRadius={30}
            inputWidth={width * 0.85}
            inputHeight={height * 0.06}
            value={accountholderName}
            keyboardType='default'
            onChangeText={setAccountholderName}
          />
        </View>

        <View style={styles.account}>
            <CustomTextInput
            placeholder="*Account Number."
            placeholderTextColor={colors.black}
            borderColor={colors.brown}
            borderRadius={30}
            inputWidth={width * 0.85}
            inputHeight={height * 0.06}
            value={accountNumber}
            keyboardType='number-pad'
            onChangeText={setAccountNumber}
          />
        </View>

        <View style={styles.routing}>
            <CustomTextInput
            placeholder="*Routing Number."
            placeholderTextColor={colors.black}
            borderColor={colors.brown}
            borderRadius={30}
            inputWidth={width * 0.85}
            inputHeight={height * 0.06}
            value={route}
            keyboardType='number-pad'
            onChangeText={setRoute}
          />
        </View>

        <View style={{alignSelf:'center', top: height * 0.58}}>
             <CustomButton
              btnHeight={height * 0.06}
              btnWidth={width * 0.85}
              text="Submit"
              backgroundColor={isFormValid ? colors.brown : colors.gray}
              textColor={isFormValid ? colors.white : colors.black}
              borderRadius={30}
              disabled={!isFormValid}
              onPress={() => navigation.navigate('SignIn')}
            />
        </View>
        </View>
    );
  }
  const styles = StyleSheet.create({
    dropdown:{
        alignSelf:'center',
        top: height * 0.02,
    },
    holderName:{
        alignSelf:'center',
        gap: height * 0.02,
        top: height * 0.04,
    },
    account:{
        alignSelf:'center',
        gap: height * 0.02,
        top: height * 0.06,
    },
    routing:{
        alignSelf:'center',
        gap: height * 0.02,
        top: height * 0.08,
    }
  });
  export default BankDetails;
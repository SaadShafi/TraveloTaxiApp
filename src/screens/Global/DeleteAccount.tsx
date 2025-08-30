import type { NativeStackScreenProps } from '@react-navigation/native-stack';
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
import { fontFamily } from '../../assets/Fonts';
import { height, width } from '../../utilities';
import { colors } from '../../utilities/colors';

const DeleteAccount = () => {
    return(
        <View style={{flex: 1}}>
            <TopHeader text="Delete Account" isBack={true}/>

            <Text style={styles.reason}>Tell us the reason</Text>
            <View style={{gap: height * 0.02}}>
                <View style={styles.container}>
                <Text style={styles.goes}>Reason Goes Here</Text>
            </View>

            <View style={styles.container}>
                <Text style={styles.goes}>Reason Goes Here</Text>
            </View>

            <View style={styles.container}>
                <Text style={styles.goes}>Reason Goes Here</Text>
            </View>

            <View style={styles.container}>
                <Text style={styles.goes}>Other</Text>
            </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    reason:{
        fontFamily: fontFamily.ClashDisplayMedium,
        color:colors.black,
        fontSize:21,
        left: width * 0.07,
        top: height * 0.03,
    },
    container:{
        backgroundColor: colors.lightGray,
        height: height * 0.07,
        width: width * 0.9,
        borderRadius:30,
        alignSelf:'center',
        top: height * 0.06
    },
    goes:{
        fontFamily: fontFamily.SfProDisplayMedium,
        color:colors.black,
        fontSize:18,
        left: width * 0.05,
        top: height * 0.021,
    }
})

export default DeleteAccount;
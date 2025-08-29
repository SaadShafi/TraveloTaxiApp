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

const DeleteAccount = () => {
    return(
        <View style={{flex: 1}}>
            <TopHeader text="Delete Account" isBack={true}/>
            <Text>dscdcsc</Text>
        </View>
    )
}

const styles = StyleSheet.create({

})

export default DeleteAccount;
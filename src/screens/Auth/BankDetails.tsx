import { NavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
    Image,
    Keyboard,
    Modal,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { fontFamily } from '../../assets/Fonts';
import images from '../../assets/Images';
import CustomButton from '../../components/CustomButton';
import CustomSelect from '../../components/CustomSelect';
import CustomTextInput from '../../components/CustomTextInput';
import TopHeader from '../../components/Topheader';
import { StackParamList } from '../../navigation/AuthStack';
import { height, width } from '../../utilities';
import { colors } from '../../utilities/colors';
import { fontSizes } from '../../utilities/fontsizes';

type Props = NativeStackScreenProps<StackParamList, 'BankDetails'>;

const BankDetailsAuth = () => {
    const navigation = useNavigation<NavigationProp<any>>();
    const [bank, setBank] = useState('');
    const [name, setName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [number, setAccount] = useState('');
    const [routing, setRouting] = useState('');
    const [accountholderName, setAccountholderName] = useState('');
    const [route, setRoute] = useState('');
    const [agree, setAgree] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleSec, setModalVisibleSec] = useState(false);
    const [modalVisibleThird, setModalVisibleThird] = useState(false);
    const isAccountNumber = accountNumber.trim().length >= 4;
    const isAccountholderName = accountholderName.trim().length > 7;
    const isRoutingNumber = route.trim().length > 5;
    const isBankOptions = bank !== '';
    const isFormValid = isAccountNumber && isAccountholderName && isRoutingNumber;

    const BankOptions = [
        { name: 'Select Bank', id: '' },
        { name: 'HSBC', id: 'hsbc' },
        { name: 'Barclays', id: 'barclays' },
        { name: 'NatWest Groupr', id: 'natWest group' },
    ];

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    const toggleModal = () => {
        setModalVisible(false);
        setModalVisibleSec(true);
    };

    const toggleModalSec = () => {
        setModalVisibleSec(false);
        setModalVisibleThird(true);
    };

    const toggleModalThird = () => {
        setModalVisibleThird(false);
        navigation.navigate('HomeDriver');
    };

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={{ flex: 1 }}>
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
                        keyboardType="default"
                        onChangeText={setAccountholderName}
                        maxLength={32}
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
                        keyboardType="number-pad"
                        onChangeText={setAccountNumber}
                        maxLength={32}
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
                        keyboardType="number-pad"
                        onChangeText={setRoute}
                        maxLength={7}
                    />
                </View>

                <View style={{ alignSelf: 'center', top: height * 0.58 }}>
                    <CustomButton
                        btnHeight={height * 0.06}
                        btnWidth={width * 0.85}
                        text="Submit"
                        backgroundColor={isFormValid ? colors.brown : colors.gray}
                        textColor={isFormValid ? colors.white : colors.black}
                        borderRadius={30}
                        disabled={!isFormValid}
                        onPress={() => navigation.navigate('SignIn')}
                    // onPress={() => setModalVisible(true)}
                    />
                </View>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalText}>Platform Fees</Text>
                            <Image source={images.payment} style={styles.modalImg} />
                            <View style={styles.modalParaMain}>
                                <Text style={styles.modalParaText}>
                                    Platform Fee supports smooth
                                </Text>
                                <Text style={styles.modalParaText}>and safe transactions.</Text>
                            </View>
                            <CustomButton
                                text="Confirm"
                                textColor={colors.white}
                                backgroundColor={colors.brown}
                                btnHeight={height * 0.06}
                                btnWidth={width * 0.75}
                                borderRadius={30}
                                onPress={toggleModal}
                            />
                        </View>
                    </View>
                </Modal>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisibleSec}
                    onRequestClose={() => setModalVisibleSec(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <View style={styles.modalTextMain}>
                                <Text style={styles.modalText}>Would you like to</Text>
                                <Text style={styles.modalText}>Proceed Payment?</Text>
                            </View>
                            <Image source={images.paymentCheck} style={styles.modalImg} />
                            <View style={styles.modalParaMain}>
                                <Text style={styles.modalParaText}>
                                    Ready to proceed with your
                                </Text>
                                <Text style={styles.modalParaText}>payment?</Text>
                            </View>
                            <View style={styles.modalBtnMain}>
                                <CustomButton
                                    text="No"
                                    textColor={colors.white}
                                    backgroundColor={colors.black}
                                    btnHeight={height * 0.06}
                                    btnWidth={width * 0.33}
                                    borderRadius={30}
                                    onPress={() => setModalVisibleSec(false)}
                                />
                                <CustomButton
                                    text="Yes"
                                    textColor={colors.white}
                                    backgroundColor={colors.brown}
                                    btnHeight={height * 0.06}
                                    btnWidth={width * 0.33}
                                    borderRadius={30}
                                    onPress={toggleModalSec}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisibleThird}
                    onRequestClose={() => setModalVisibleThird(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalText}>Payment Successful</Text>
                            <Image source={images.paymentSuccess} style={styles.modalImg} />
                            <View style={styles.modalParaMain}>
                                <Text style={styles.modalParaText}>
                                    Your Payment has been made
                                </Text>
                                <Text style={styles.modalParaText}>Successfully</Text>
                            </View>
                            <CustomButton
                                text="Continue"
                                textColor={colors.white}
                                backgroundColor={colors.brown}
                                btnHeight={height * 0.06}
                                btnWidth={width * 0.75}
                                borderRadius={30}
                                onPress={toggleModalThird}
                            />
                        </View>
                    </View>
                </Modal>
            </View>
        </TouchableWithoutFeedback>
    );
};
const styles = StyleSheet.create({
    dropdown: {
        alignSelf: 'center',
        top: height * 0.02,
    },
    holderName: {
        alignSelf: 'center',
        gap: height * 0.02,
        top: height * 0.04,
    },
    account: {
        alignSelf: 'center',
        gap: height * 0.02,
        top: height * 0.06,
    },
    routing: {
        alignSelf: 'center',
        gap: height * 0.02,
        top: height * 0.08,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(255, 252, 252, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
    },
    modalContent: {
        backgroundColor: colors.white,
        borderRadius: 16,
        width: width * 0.83,
        // height: height * 0.25,
        alignItems: 'center',
        borderWidth: 0.9,
        borderColor: colors.black,
        padding: 20,
        gap: height * 0.02,
    },
    modalText: {
        fontFamily: fontFamily.ClashDisplayMedium,
        fontSize: fontSizes.md,
        color: colors.black,
    },
    modalTextMain: {
        alignItems: 'center',
    },
    modalImg: {
        width: width * 0.12,
        resizeMode: 'contain',
    },
    modalParaMain: {
        alignItems: 'center',
    },
    modalParaText: {
        fontFamily: fontFamily.SfProDisplayRegular,
        fontSize: fontSizes.sm,
        color: colors.darkGray,
    },
    modalBtnMain: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: width * 0.7,
    },
});
export default BankDetailsAuth;

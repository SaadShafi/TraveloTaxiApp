import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { fontFamily } from '../../assets/Fonts';
import images from '../../assets/Images';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import TopHeader from '../../components/Topheader';
import { logout } from '../../redux/slice/authSlice';
import { removeUser } from '../../redux/slice/roleSlice';
import { height, width } from '../../utilities';
import { colors } from '../../utilities/colors';
import { fontSizes } from '../../utilities/fontsizes';

const DeleteAccount = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenSec, setModalOpenSec] = useState(false);
  const [otherReason, setOtherReason] = useState('');
  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch = useDispatch();

  const toggleModal = () => {
    setModalOpen(true);
  };

  const toggleModalSec = () => {
    setModalOpen(false);
    setModalOpenSec(true);
  };

  const handleOtherSubmit = () => {
    if (otherReason.trim() !== '') {
      setModalOpen(true);
    } else {
      // optional: show alert or toast
      console.log('Please enter a reason before submitting');
    }
  };

  const handleHomeNavigation = () => {
    setModalOpenSec(false);
    dispatch(removeUser());
    dispatch(logout());
  };

  return (
    <View style={{ flex: 1 }}>
      <TopHeader text="Delete Account" isBack={true} />
      <Text style={styles.reason}>Tell us the reason</Text>
      <View
        style={{
          gap: height * 0.02,
          alignItems: 'center',
          top: height * 0.05,
        }}
      >
        <TouchableOpacity
          style={styles.reasonMain}
          activeOpacity={0.7}
          onPress={() => setModalOpen(true)}
        >
          <Text style={styles.reasonText}>Reason Goes Here!</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.reasonMain}
          activeOpacity={0.7}
          onPress={() => setModalOpen(true)}
        >
          <Text style={styles.reasonText}>Reason Goes Here!</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.reasonMain}
          activeOpacity={0.7}
          onPress={() => setModalOpen(true)}
        >
          <Text style={styles.reasonText}>Reason Goes Here!</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.reasonMain}
          activeOpacity={0.7}
          onPress={() => setModalOpen(true)}
        >
          <Text style={styles.reasonText}>Reason Goes Here!</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.reasonMain}
          activeOpacity={0.7}
          onPress={() => setModalOpen(true)}
        >
          <Text style={styles.reasonText}>Reason Goes Here!</Text>
        </TouchableOpacity>
        <CustomTextInput
          placeholder="Other"
          placeholderTextColor={colors.black}
          inputWidth={width * 0.85}
          inputHeight={height * 0.07}
          backgroundColor={colors.lightGray}
          borderColor={colors.darkGray}
          borderRadius={30}
          borderWidth={1}
          keyboardType="default"
          value={otherReason}
          onChangeText={setOtherReason}
          onSubmitEditing={() => {
            if (otherReason.trim() !== '') {
              setModalOpen(true);
            } else {
              console.log('Please enter a reason before submitting');
            }
          }}
        />
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalOpen}
        onRequestClose={() => setModalOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Delete Account</Text>
            <Image source={images.exclamation} />
            <View style={{ alignItems: 'center', top: height * 0.01 }}>
              <Text style={{ color: colors.black }}>
                Are you sure you want to delete
              </Text>
              <Text style={{ color: colors.black }}>your Account</Text>
            </View>
            <View style={styles.btnMain}>
              <CustomButton
                text="Cancel"
                textColor={colors.white}
                btnHeight={height * 0.05}
                btnWidth={width * 0.33}
                backgroundColor={colors.black}
                borderRadius={30}
                onPress={() => setModalOpen(false)}
              />
              <CustomButton
                text="Delete"
                textColor={colors.white}
                btnHeight={height * 0.05}
                btnWidth={width * 0.33}
                backgroundColor={colors.brown}
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
        visible={modalOpenSec}
        onRequestClose={() => setModalOpenSec(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, { gap: height * 0.02 }]}>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.modalTitle}>Account Deleted</Text>
              <Text style={styles.modalTitle}>Successfully!</Text>
            </View>
            <Image source={images.success} style={styles.img} />
            <CustomButton
              text="Back to Home"
              textColor={colors.white}
              btnHeight={height * 0.055}
              btnWidth={width * 0.7}
              backgroundColor={colors.brown}
              borderRadius={30}
              onPress={handleHomeNavigation}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  reasonMain: {
    borderWidth: 0.1,
    width: width * 0.85,
    height: height * 0.07,
    borderRadius: 30,
    backgroundColor: colors.gray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reasonText: {
    fontFamily: fontFamily.ClashDisplayMedium,
    color: colors.black,
    fontSize: fontSizes.sm,
    right: width * 0.2,
  },
  reason: {
    fontFamily: fontFamily.ClashDisplayMedium,
    color: colors.black,
    fontSize: 21,
    left: width * 0.07,
    top: height * 0.03,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.61)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 15,
    width: width * 0.8,
    alignItems: 'center',
    gap: height * 0.01,
  },
  modalTitle: {
    fontSize: fontSizes.lg2,
    fontFamily: fontFamily.ClashDisplayMedium,
    color: colors.black,
    marginBottom: 10,
  },
  btnMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: height * 0.02,
    width: width * 0.7,
  },
  img: {
    width: width * 0.19,
    resizeMode: 'contain',
  },
});

export default DeleteAccount;

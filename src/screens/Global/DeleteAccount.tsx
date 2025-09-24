import React, { useState } from 'react';
import { Image, Modal, StyleSheet, Text, View } from 'react-native';
import { fontFamily } from '../../assets/Fonts';
import images from '../../assets/Images';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import TopHeader from '../../components/Topheader';
import { height, width } from '../../utilities';
import { colors } from '../../utilities/colors';
import { fontSizes } from '../../utilities/fontsizes';

const DeleteAccount = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenSec, setModalOpenSec] = useState(false);

  const toggleModal = () => {
    setModalOpen(true);
  };

  const toggleModalSec = () => {
    setModalOpen(false);
    setModalOpenSec(true);
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
        <CustomTextInput
          placeholder="Reason Goes Here"
          placeholderTextColor={colors.black}
          inputWidth={width * 0.85}
          inputHeight={height * 0.06}
          backgroundColor={colors.lightGray}
          borderColor={colors.darkGray}
          borderRadius={30}
          borderWidth={1}
          keyboardType="default"
          //   editable={false}
          onPress={toggleModal}
        />
        <CustomTextInput
          placeholder="Reason Goes Here"
          placeholderTextColor={colors.black}
          inputWidth={width * 0.85}
          inputHeight={height * 0.06}
          backgroundColor={colors.lightGray}
          borderColor={colors.darkGray}
          borderRadius={30}
          borderWidth={1}
          keyboardType="default"
          //   editable={false}
          onPress={toggleModal}
        />
        <CustomTextInput
          placeholder="Reason Goes Here"
          placeholderTextColor={colors.black}
          inputWidth={width * 0.85}
          inputHeight={height * 0.06}
          backgroundColor={colors.lightGray}
          borderColor={colors.darkGray}
          borderRadius={30}
          borderWidth={1}
          keyboardType="default"
          //   editable={false}
          onPress={toggleModal}
        />
        <CustomTextInput
          placeholder="Reason Goes Here"
          placeholderTextColor={colors.black}
          inputWidth={width * 0.85}
          inputHeight={height * 0.06}
          backgroundColor={colors.lightGray}
          borderColor={colors.darkGray}
          borderRadius={30}
          borderWidth={1}
          keyboardType="default"
          //   editable={false}
          onPress={toggleModal}
        />
        <CustomTextInput
          placeholder="Other"
          placeholderTextColor={colors.black}
          inputWidth={width * 0.85}
          inputHeight={height * 0.06}
          backgroundColor={colors.lightGray}
          borderColor={colors.darkGray}
          borderRadius={30}
          borderWidth={1}
          keyboardType="default"
          onPress={toggleModal}
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
              <Text>Are you sure you want to delete</Text>
              <Text>your Account</Text>
            </View>
            <View style={styles.btnMain}>
              <CustomButton
                text="Cancel"
                textColor={colors.white}
                btnHeight={height * 0.055}
                btnWidth={width * 0.33}
                backgroundColor={colors.black}
                borderRadius={30}
                onPress={() => setModalOpen(false)}
              />
              <CustomButton
                text="Delete"
                textColor={colors.white}
                btnHeight={height * 0.055}
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
              onPress={() => setModalOpenSec(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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

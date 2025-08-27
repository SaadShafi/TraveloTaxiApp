import { BlurView } from '@react-native-community/blur';
import AntDesign from '@react-native-vector-icons/ant-design';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { fontFamily } from '../assets/Fonts';
import images from '../assets/Images';
import { globalStyle } from '../assets/Styles';
import { height, width } from '../utilities';
import { colors } from '../utilities/colors';
import { fontSizes } from '../utilities/fontsizes';

interface SelectElement {
  name: string;
  id?: string | null;
}

interface CustomSelectProps {
  inputWidth: number;
  inputHeight: number;
  selectElements: SelectElement[];
  borderColor: string;
  borderWidth: number;
  inputColor: string;
  borderRadius: number;
  onChangeText?: (value: string, id?: string | null) => void;
  setSelectedElement?: (value: string) => void;
  preselectedValue?: string | null; // Add this prop for prefilled data
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  inputWidth,
  inputHeight,
  selectElements,
  borderColor,
  borderWidth,
  inputColor,
  borderRadius,
  onChangeText,
  setSelectedElement,
  preselectedValue,
}) => {
  const [selectElem, setSelectElem] = useState<string>(
    preselectedValue || selectElements[0]?.name || '',
  );
  const [selectPop, setSelectPop] = useState<boolean>(false);

  useEffect(() => {
    if (preselectedValue !== undefined && preselectedValue !== selectElem) {
      setSelectElem(preselectedValue || selectElements[0]?.name || '');
    }
  }, [preselectedValue]);

  return (
    <>
      <View
        style={[
          globalStyle.TextInputMain,
          {
            height: inputHeight,
            width: inputWidth,
            borderWidth: borderWidth,
            borderColor: borderColor,
            backgroundColor: inputColor,
            borderRadius: borderRadius,
          },
        ]}
      >
        <TouchableOpacity
          style={globalStyle.selectInput}
          onPress={() => setSelectPop(true)}
        >
          <Text style={globalStyle.selectText}>{selectElem || 'Select'}</Text>
          <Image source={images.arrowDropDown} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={selectPop}
        onRequestClose={() => setSelectPop(false)}
      >
        <BlurView
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor="white"
          style={styles.selectPop}
        />
        <View style={styles.selectPopMainWrap}>
          <View style={styles.selectPopMain}>
            {selectElements.map((elm, index) => (
              <TouchableOpacity
                style={[
                  styles.selectTab,
                  elm.name === selectElem && styles.selectedTab,
                ]}
                onPress={() => {
                  setSelectElem(elm.name);
                  setSelectPop(false);
                  onChangeText?.(elm.name, elm.id);
                  setSelectedElement?.(elm.name);
                }}
                key={elm.id ? elm.id : `select-${index}`}
              >
                <Text style={styles.selectTabText}>{elm.name}</Text>
                {elm.name === selectElem && (
                  <AntDesign name="check" size={15} color={colors.black} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  selectPop: {
    flex: 1,
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectPopMainWrap: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    position: 'absolute',
    zIndex: 2,
  },
  selectPopMain: {
    display: 'flex',
    backgroundColor: colors.white,
    width: width * 0.85,
    maxHeight: height * 0.85,
    borderRadius: 10,
    shadowColor: 'rgba(0, 0, 0, 0.4)',
    shadowOffset: {
      width: 8,
      height: 8,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5,
    position: 'absolute',
  },
  selectTab: {
    height: 50,
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedTab: {
    backgroundColor: colors.lightPrimary,
  },
  selectTabText: {
    fontSize: fontSizes.sm2,
    fontFamily: fontFamily.JakartaBold,
    color: colors.black,
  },
  icon: {
    width: width * 0.03,
    height: width * 0.03,
    resizeMode: 'contain',
  },
});

export default CustomSelect;

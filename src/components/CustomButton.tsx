import React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { fontFamily } from '../assets/Fonts';
import { height, width } from '../utilities';
import { fontSizes } from '../utilities/fontsizes';

interface CustomButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
  color?: string | string[]; //one color or you can define multiple colors
  text: string;
  btnHeight?: number;
  btnWidth?: number;
  textColor?: string;
  borderColor?: string;
  borderWidth?: number;
  fontSize?: number;
  fontFamily?: string;
  backgroundColor?: string;
  borderRadius?: number;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  onPress,
  color,
  text,
  btnHeight = height * 0.07,
  btnWidth = width * 0.85,
  textColor,
  borderColor,
  borderWidth,
  fontSize = fontSizes.lg,
  backgroundColor,
  fontFamily,
  borderRadius,
}) => {
  const isGradient = Array.isArray(color) && !borderWidth;

  return isGradient ? (
    <TouchableOpacity
      style={[styles.customBtnMain, { height: btnHeight, width: btnWidth }]}
      onPress={onPress}
      activeOpacity={0.6}
    >
      <Text
        style={[
          styles.customBtnText,
          { color: textColor, fontSize, fontFamily },
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      style={[
        styles.customBtnMain,
        {
          height: btnHeight,
          width: btnWidth,
          backgroundColor: backgroundColor,
          borderWidth,
          borderColor,
          borderRadius
        },
      ]}
      onPress={onPress}
      activeOpacity={0.6}
    >
      <Text style={[styles.customBtnText, { color: textColor, fontSize }]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  customBtnMain: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  customBtnText: {
    fontFamily: fontFamily.SfProDisplayBold,
    fontSize: fontSizes.lg,
    textTransform: 'capitalize',
  },
  customBtnGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});

export default CustomButton;

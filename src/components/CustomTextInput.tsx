import AntDesign from '@react-native-vector-icons/ant-design';
import React, { useState } from 'react';
import {
  DimensionValue,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import { width } from '../utilities';
import { colors } from '../utilities/colors';

interface CustomTextInputProps extends TextInputProps {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  inputWidth?: DimensionValue;
  inputHeight?: DimensionValue;
  isPassword?: boolean;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  backgroundColor?: string;
  onRightIconPress?: () => void;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  leftIcon,
  rightIcon,
  placeholder,
  placeholderTextColor,
  inputWidth = '100%' as DimensionValue,
  inputHeight = 50 as DimensionValue,
  isPassword = false,
  keyboardType = 'default',
  multiline = false,
  borderColor = colors.gray,
  borderWidth = 1,
  borderRadius = 8,
  backgroundColor,
  onChangeText,
  value,
  onRightIconPress,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  const handleRightIconPress = () => {
    if (isPassword) {
      setShowPassword(!showPassword);
    } else if (onRightIconPress) {
      onRightIconPress();
    }
  };

  const isActive = isFocused || (value && value.length > 0);

  return (
    <View
      style={[
        styles.container,
        {
          height: inputHeight,
          width: inputWidth,
          borderWidth,
          borderRadius,
          borderColor: isActive ? colors.brown : colors.gray,
          backgroundColor: isActive ? colors.lightBrown : colors.gray,
        },
      ]}
    >
      {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={
          placeholderTextColor ||
          (backgroundColor === colors.gray ? colors.black : colors.black)
        }
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
        style={[
          styles.input,
          {
            color:
              backgroundColor === colors.gray ? colors.black : colors.white,
          },
        ]}
        secureTextEntry={isPassword ? showPassword : false}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...rest}
      />

      {rightIcon && (
        <TouchableOpacity
          style={styles.rightIcon}
          onPress={handleRightIconPress}
        >
          {rightIcon}
        </TouchableOpacity>
      )}

      {isPassword && (
        <TouchableOpacity
          style={styles.rightIcon}
          onPress={handleRightIconPress}
        >
          <AntDesign
            name={showPassword ? 'eye-invisible' : 'eye'}
            size={22}
            color={colors.black}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    position: 'relative',
    // shadowColor: 'rgba(0, 0, 0, 0.3)',
    // shadowOffset: {
    // width: 5,
    // height: 5,
    // },
    // shadowOpacity: 3,
    // shadowRadius: 10,
    // elevation: 9,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingLeft: 10,
    color: colors.black,
  },
  leftIcon: {
    marginRight: 10,
    left: 10,
    // backgroundColor: colors.white,
  },
  rightIcon: {
    // position: 'absolute',
    paddingLeft: width * 0.03,
    right: 10,
  },
});

export default CustomTextInput;

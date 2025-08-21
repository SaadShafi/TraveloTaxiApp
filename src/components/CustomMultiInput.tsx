import { useEffect, useState } from 'react';
import { KeyboardType, StyleSheet, TextInput, View } from 'react-native';
import { colors } from '../utilities/colors';

interface CustomMultiInputProps {
  placeholder?: string;
  placeholderTextColor?: string;
  keyboardType?: KeyboardType;
  inputHeight?: number;
  inputWidth?: number | `${number}%` | 'auto';
  values?: string[];
  borderWidth?: number;
  borderColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  onChangeText?: (text: string) => void;
  value?: string;
  maxLength?: number;
}

const CustomMultiInput: React.FC<CustomMultiInputProps> = ({
  placeholder = '',
  placeholderTextColor = colors.black,
  keyboardType,
  inputHeight = 100,
  inputWidth = '100%',
  values = [],
  borderWidth = 1,
  borderColor = '#FF6A00',
  backgroundColor,
  borderRadius = 10,
  onChangeText,
  value,
  maxLength,
}) => {
  const [inputText, setInputText] = useState<string>('');

  useEffect(() => {
    if (values.length > 0) {
      setInputText(values.join(', '));
    }
  }, [values]);

  const textColor =
    backgroundColor === colors.white ? colors.gray : colors.white;

  return (
    <View style={styles.inputContainer}>
      <View
        style={[
          styles.inputWrapper,
          {
            height: inputHeight,
            width: inputWidth,
            backgroundColor,
            borderWidth,
            borderColor,
            borderRadius,
          },
        ]}
      >
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={textColor}
          style={[styles.textInput, { color: textColor }]}
          keyboardType={keyboardType}
          value={value}
          onChangeText={onChangeText}
          returnKeyType="done"
          multiline
          maxLength={maxLength}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    alignItems: 'center',
  },
  inputWrapper: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#FF6A00',
    borderRadius: 10,
    backgroundColor: 'white',
    textAlignVertical: 'top',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    backgroundColor: 'transparent',
    textAlignVertical: 'top',
  },
});

export default CustomMultiInput;

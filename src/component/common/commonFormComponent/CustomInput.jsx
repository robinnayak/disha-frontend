// CustomInput.js
import React from "react";
import { TextInput, View, Text } from "react-native";

const CustomInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = "default",
  editable,
  maxLength
}) => {
  return (
    <View className="mb-4">
      {label && <Text className="text-lg font-semibold text-white mb-2">{label}</Text>}
      <TextInput
        className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-primary text-base"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        placeholderTextColor="#BDC3C7"
        editable = {editable}
        maxLength={maxLength}
      />
    </View>
  );
};

export default CustomInput;

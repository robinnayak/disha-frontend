// commonFormComponent/CustomPicker.js
import React from "react";
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

const CustomPicker = ({
  label,
  selectedValue,
  onValueChange,
  options = [],
  placeholder = "Select an option",
  className,
}) => {
  return (
    <View className={`mb-4 ${className}`}>
      {label && (
        <Text className="mb-2 text-lg font-semibold text-white">{label}</Text>
      )}
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={{
          height: 50,
          width: "100%",
          borderColor: "white",
          borderWidth: 1,
          backgroundColor: "white",
          color: "gray",
          paddingLeft: 10,
          borderRadius: 50,
        }}
      >
        <Picker.Item label={placeholder} value="" />
        {options.map((option) => (
          <Picker.Item
            key={option.value}
            label={option.label}
            value={option.value}
          />
        ))}
      </Picker>
    </View>
  );
};

export default CustomPicker;

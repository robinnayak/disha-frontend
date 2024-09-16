// components/filters/DriverFilter.js
import React from "react";
import { View, Text, TextInput } from "react-native";

const DriverFilter = ({ value, onChange }) => {
  return (
    <View className="mb-4">
      <Text className="text-sm text-gray-600">Filter by Driver:</Text>
      <TextInput
        className="border border-gray-300 p-2 rounded"
        placeholder="Driver"
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
};

export default DriverFilter;

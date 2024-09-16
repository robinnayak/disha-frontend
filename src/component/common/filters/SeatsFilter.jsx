// components/filters/SeatsFilter.js
import React from "react";
import { View, Text, TextInput } from "react-native";

const SeatsFilter = ({ value, onChange }) => {
  return (
    <View className="mb-4">
      <Text className="text-sm text-gray-600">Filter by Available Seats:</Text>
      <TextInput
        className="border border-gray-300 p-2 rounded"
        placeholder="Available Seats"
        keyboardType="numeric"
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
};

export default SeatsFilter;

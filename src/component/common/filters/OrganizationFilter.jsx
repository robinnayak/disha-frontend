// components/filters/OrganizationFilter.js
import React from "react";
import { View, Text, TextInput } from "react-native";

const OrganizationFilter = ({ value, onChange }) => {
  return (
    <View className="mb-4">
      <Text className="text-sm text-gray-600">Filter by Organization:</Text>
      <TextInput
        className="border border-gray-300 p-2 rounded"
        placeholder="Organization"
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
};

export default OrganizationFilter;

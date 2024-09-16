// components/filters/LocationFilter.js
import React from "react";
import { View, Text } from "react-native";
import { tripChoices } from "../../../utils/formchoices";
import CustomPicker from "../commonFormComponent/CustomPicker";

const LocationFilter = ({ origin, destination, onOriginChange, onDestinationChange }) => {
  return (
    <View className="mb-4">
      <Text className="text-sm text-gray-600 mb-2">Filter by Origin:</Text>
      
      {/* From Location */}
      <CustomPicker
        selectedValue={origin}
        onValueChange={onOriginChange}
        options={tripChoices}
        placeholder="Select origin"
      />

      <Text className="text-sm text-gray-600 mt-4 mb-2">Filter by Destination:</Text>

      {/* To Location */}
      <CustomPicker
        selectedValue={destination}
        onValueChange={onDestinationChange}
        options={tripChoices}
        placeholder="Select destination"
      />
    </View>
  );
};

export default LocationFilter;

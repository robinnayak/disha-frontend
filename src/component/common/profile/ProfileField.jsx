import React from "react";
import { View, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const ProfileField = ({ value, icon }) => {
  return (
    <View className="flex-row items-center my-1 bg-gray-200 p-2 rounded-lg">
      <FontAwesomeIcon icon={icon} size={16} />
      <Text className="text-gray-700 text-sm flex-1 ml-2">{value}</Text>
    </View>
  );
};

export default ProfileField;

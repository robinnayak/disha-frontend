import React from "react";
import { TouchableOpacity, Text } from "react-native";

const MenuItem = ({ title, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="py-3 px-4 border-b border-darker"
    >
      <Text className="text-primary text-lg">{title}</Text>
    </TouchableOpacity>
  );
};

export default MenuItem;

// components/common/CustomCheckbox.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const CustomCheckbox = ({ label, value, onValueChange }) => {
  return (
    <TouchableOpacity
      onPress={() => onValueChange(!value)}
      className="flex flex-row items-center space-x-2 my-2"
    >
      <View className={`w-6 h-6 rounded-md ${value ? 'bg-primary' : 'bg-gray-300'} justify-center items-center`}>
        {value && <FontAwesome name="check" size={14} color="white" />}
      </View>
      <Text className="text-background">{label}</Text>
    </TouchableOpacity>
  );
};

export default CustomCheckbox;

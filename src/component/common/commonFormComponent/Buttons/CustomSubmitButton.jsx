import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

const CustomSubmitButton = ({ onPress, title }) => {
  return (
    <View className="my-4">
      <TouchableOpacity
        onPress={onPress}
        className="bg-background p-4 rounded-lg items-center"
      >
        <Text className="text-primary text-lg font-bold">
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomSubmitButton;

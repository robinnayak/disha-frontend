import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { styled } from 'nativewind';

const ButtonGroup = ({ onTripPress, onBookingPress, onVehiclePress }) => (
  <View className="flex-row justify-around my-5">
    <TouchableOpacity onPress={onTripPress} className="bg-blue-500 py-2 px-5 rounded">
      <Text className="text-white text-lg">Trip</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={onBookingPress} className="bg-blue-500 py-2 px-5 rounded">
      <Text className="text-white text-lg">Booking</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={onVehiclePress} className="bg-blue-500 py-2 px-5 rounded">
      <Text className="text-white text-lg">Vehicle</Text>
    </TouchableOpacity>
  </View>
);

export default styled(ButtonGroup);

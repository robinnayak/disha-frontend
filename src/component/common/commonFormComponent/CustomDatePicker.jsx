import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const CustomDatePicker = ({ label, date, onDateChange }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState('date'); // 'date' or 'time'
  const [selectedDate, setSelectedDate] = useState(date ? new Date(date) : new Date());

  const handleDateChange = (event, newDate) => {
    if (event.type === "dismissed") {
      setShowPicker(false);
      return;
    }

    setSelectedDate(newDate || selectedDate);

    if (pickerMode === 'date') {
      // Once date is selected, prompt the user for time
      setPickerMode('time');
      setShowPicker(true);
    } else {
      setShowPicker(false);
      // Format selectedDate as 'YYYY-MM-DDTHH:mm:ss' for both date and time
      const formattedDateTime = newDate.toISOString();
      onDateChange(formattedDateTime);
    }
  };

  const showDateTimePicker = () => {
    setPickerMode('date'); // Start with date picker
    setShowPicker(true);
  };

  return (
    <View className="mb-4">
      <Text className="text-base text-primary mb-2">{label}</Text>
      <TouchableOpacity
        onPress={showDateTimePicker}
        className="py-3 px-4 rounded-md bg-gray-200 border border-gray-300 items-center justify-center transition-all duration-300"
      >
        <Text className="text-base text-primary">
          {date ? new Date(date).toLocaleString() : 'Select Date & Time'}
        </Text>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={selectedDate}
          mode={pickerMode}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

export default CustomDatePicker;

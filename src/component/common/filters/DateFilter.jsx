// components/filters/DateFilter.js
import React, { useState, useEffect } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AntDesign } from "@expo/vector-icons"; // For arrow icons

const DateFilter = ({ value, onChange }) => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  // Set the default date to today's date when the component mounts
  useEffect(() => {
    const today = new Date(); // Set today's date
    setDate(today);
    onChange(today.toISOString().split("T")[0]); // Set default date in "YYYY-MM-DD" format
  }, []);

  // Handle date change event from DateTimePicker
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false); // Hide picker after selecting date
    setDate(currentDate);
    onChange(currentDate.toISOString().split("T")[0]); // Pass the selected date in "YYYY-MM-DD" format
  };

  // Navigate to the previous date
  const goToPreviousDate = () => {
    const previousDate = new Date(date);
    previousDate.setDate(previousDate.getDate() - 1);
    setDate(previousDate);
    onChange(previousDate.toISOString().split("T")[0]);
  };

  // Navigate to the next date
  const goToNextDate = () => {
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);
    setDate(nextDate);
    onChange(nextDate.toISOString().split("T")[0]);
  };

  return (
    <View className="mb-4">
      <Text className="text-sm text-gray-600 mb-2">Filter by Date:</Text>

      <View className="flex-row justify-center items-center mb-2">
        <TouchableOpacity onPress={goToPreviousDate}>
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>

        <Button
          title={date.toDateString()}
          onPress={() => setShowPicker(true)}
        />

        <TouchableOpacity onPress={goToNextDate}>
          <AntDesign name="right" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}
    </View>
  );
};

export default DateFilter;

/**
 * Need to edit later because passengers don't need to see trips before the current date.
 */

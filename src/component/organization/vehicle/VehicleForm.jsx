import React, { useState } from "react";
import { View, ScrollView, Alert, CheckBox } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import CustomInput from "../../common/commonFormComponent/CustomInput";
import CustomDatePicker from "../../common/commonFormComponent/CustomDatePicker";
import CustomSubmitButton from "../../common/commonFormComponent/Buttons/CustomSubmitButton";
import { postVehicleData } from "../../../api/orgnization/request";
import CustomCheckbox from "../../common/commonFormComponent/CustomCheckbox";
import CustomPicker from "../../common/commonFormComponent/CustomPicker";
import GoBack from "../../menu/GoBack";

const VEHICLE_TYPE_CHOICES = [
  { label: "Jeep", value: "jeep" },
  { label: "Hilux", value: "hilux" },
  { label: "Bike", value: "bike" },
  { label: "Bus", value: "bus" },
  { label: "Car", value: "car" },
];

const VehicleForm = () => {
  const token = useSelector((state) => state.auth?.token?.token);
  const navigation = useNavigation();

  const [vehicle, setVehicle] = useState({
    vehicle_type: "",
    company_made: "",
    model: "",
    color: "",
    seating_capacity: "5", // Initially as string for input
    license_plate_number: "",
    insurance_expiry_date: "",
    fitness_certificate_expiry_date: "",
  });

  const [isDriver, setIsDriver] = useState(false);
  const [licenseNumber, setLicenseNumber] = useState("");

  const handleChange = (name, value) => {
    setVehicle((prevVehicle) => ({
      ...prevVehicle,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!token) {
      Alert.alert("Error", "User not authenticated.");
      return;
    }

    // Validate required fields
    if (
      !vehicle.vehicle_type.trim() ||
      !vehicle.license_plate_number.trim() ||
      !vehicle.insurance_expiry_date.trim() ||
      !vehicle.fitness_certificate_expiry_date.trim()
    ) {
      Alert.alert("Validation Error", "Please fill in all required fields.");
      return;
    }

    // Extract only the date portion from the ISO string (YYYY-MM-DD)
    const formatDate = (date) => (date ? date.toISOString().split("T")[0] : "");

    const vehicleData = {
      ...vehicle,
      insurance_expiry_date: formatDate(
        new Date(vehicle.insurance_expiry_date)
      ), // Format the date
      fitness_certificate_expiry_date: formatDate(
        new Date(vehicle.fitness_certificate_expiry_date)
      ), // Format the date
      license_number: isDriver ? licenseNumber : undefined, // Only include license_number if isDriver is true
    };

    try {
      const response = await postVehicleData(token, vehicleData);
      console.log(response);
      //   Alert.alert("Success", "Vehicle added successfully!");
      navigation.goBack(); // Navigate back to the previous screen or the list
    } catch (error) {
      Alert.alert("Error", "Failed to add vehicle. Please try again.");
      console.error("Error submitting vehicle data:", error);
    }
  };

  return (
    <ScrollView className="bg-background p-4">
      {/* Back Button */}
      <GoBack navigation={navigation} />
      <View className="rounded-lg bg-primary p-6 shadow-md">
        <CustomPicker
          label="Vehicle Type"
          selectedValue={vehicle.vehicle_type}
          onValueChange={(value) => handleChange("vehicle_type", value)}
          options={VEHICLE_TYPE_CHOICES}
          placeholder="Select Vehicle Type"
        />
        <CustomInput
          label="Company Made"
          value={vehicle.company_made}
          onChangeText={(value) => handleChange("company_made", value)}
          placeholder="Enter company made"
        />
        <CustomInput
          label="Model"
          value={vehicle.model}
          onChangeText={(value) => handleChange("model", value)}
          placeholder="Enter vehicle model"
        />
        <CustomInput
          label="Color"
          value={vehicle.color}
          onChangeText={(value) => handleChange("color", value)}
          placeholder="Enter vehicle color"
        />
        <CustomInput
          label="Seating Capacity"
          value={vehicle.seating_capacity}
          onChangeText={(value) => handleChange("seating_capacity", value)}
          placeholder="Enter seating capacity"
          keyboardType="numeric"
        />
        <CustomInput
          label="License Plate Number"
          value={vehicle.license_plate_number}
          onChangeText={(value) => handleChange("license_plate_number", value)}
          placeholder="Enter license plate number"
          maxLength={10}
        />
        <CustomDatePicker
          label="Insurance Expiry Date"
          date={vehicle.insurance_expiry_date}
          onDateChange={(date) => handleChange("insurance_expiry_date", date)}
        />
        <CustomDatePicker
          label="Fitness Certificate Expiry Date"
          date={vehicle.fitness_certificate_expiry_date}
          onDateChange={(date) =>
            handleChange("fitness_certificate_expiry_date", date)
          }
        />

        {/* <View className="flex-row items-center">
          <CheckBox
            value={isDriver}
            onValueChange={setIsDriver}
          />
          <Text className="ml-2 text-secondary">Are you the driver?</Text>
        </View> */}

        <CustomCheckbox
          label={"Do you have Driver?"}
          value={isDriver}
          onValueChange={setIsDriver}
        />

        {isDriver && (
          <CustomInput
            label="License Number"
            value={licenseNumber}
            onChangeText={setLicenseNumber}
            placeholder="Enter license number"
          />
        )}

        <CustomSubmitButton title="Add Vehicle" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

export default VehicleForm;

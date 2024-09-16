import React, { useState, useEffect } from "react";
import { View, ScrollView, Alert } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import { putVehicleViewData } from "../../../api/orgnization/request";
import VehicleImageUpload from "./VehicleImageUpload";
import { handleApiError } from "../../../utils/errorHandler";
import CustomInput from "../../common/commonFormComponent/CustomInput";
import CustomDatePicker from "../../common/commonFormComponent/CustomDatePicker";
import CustomSubmitButton from "../../common/commonFormComponent/Buttons/CustomSubmitButton";
import CustomCheckbox from "../../common/commonFormComponent/CustomCheckbox";
import GoBack from "../../menu/GoBack";

const VehicleEdit = ({ route }) => {
  const vehicleData = route.params?.vehicle;
  const vehicleId = route.params?.vehicleId;
  const token = useSelector((state) => state.auth?.token?.token);
  const navigation = useNavigation();

  // Check if license_number is present, assign it if available
  const [isDriver, setIsDriver] = useState(!!vehicleData?.license_number);
  const [licenseNumber, setLicenseNumber] = useState(
    vehicleData?.license_number || ""
  );

  const [vehicle, setVehicle] = useState({
    color: "",
    company_made: "",
    model: "",
    seating_capacity: "",
    vehicle_type: "",
    insurance_expiry_date: "",
    fitness_certificate_expiry_date: "",
  });

  // Initialize vehicle state from passed vehicleData
  useEffect(() => {
    if (vehicleData) {
      setVehicle({
        color: vehicleData.color || "",
        company_made: vehicleData.company_made || "",
        model: vehicleData.model || "",
        seating_capacity: vehicleData.seating_capacity?.toString() || "",
        vehicle_type: vehicleData.vehicle_type || "",
        insurance_expiry_date: vehicleData.insurance_expiry_date || "",
        fitness_certificate_expiry_date:
          vehicleData.fitness_certificate_expiry_date || "",
      });
    }
  }, [vehicleData]);

  const handleChange = (name, value) => {
    setVehicle((prevVehicle) => ({ ...prevVehicle, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    const vehicleDataToUpdate = {
      ...vehicle,
      license_number: isDriver ? licenseNumber : undefined, // Only include license_number if a driver is assigned
    };

    try {
      const res = await putVehicleViewData(
        token,
        vehicleId,
        vehicleDataToUpdate
      );
      showMessage({
        message: "Success",
        description: "Vehicle updated successfully",
        type: "success",
      });
      navigation.goBack();
    } catch (error) {
      console.log(error);
      handleApiError(error);
    }
  };

  // Ensure fields like company_made, vehicle_type, and license_number can't be changed once assigned
  const isFieldEditable = (fieldName) => !vehicleData?.[fieldName]; // Field is only editable if it's not already set
  // console.log('isFieldEditable',isFieldEditable())
  return (
    <View className="flex-1 bg-background p-4">
      <ScrollView>
        {/* Back Button */}
        <GoBack navigation={navigation} />
        <View className="rounded-lg bg-primary p-6 shadow-md">
          <CustomInput
            label="Color"
            value={vehicle.color}
            onChangeText={(value) => handleChange("color", value)}
            placeholder="Enter vehicle color"
          />
          <CustomInput
            label="Company Made"
            value={vehicle.company_made}
            onChangeText={(value) => handleChange("company_made", value)}
            placeholder="Enter company made"
            editable={isFieldEditable("company_made")} // Non-editable if company_made is already set
          />
          <CustomInput
            label="Model"
            value={vehicle.model}
            onChangeText={(value) => handleChange("model", value)}
            placeholder="Enter vehicle model"
          />
          <CustomInput
            label="Seating Capacity"
            value={vehicle.seating_capacity}
            onChangeText={(value) => handleChange("seating_capacity", value)}
            placeholder="Enter seating capacity"
            keyboardType="numeric"
            editable={isFieldEditable("seating_capacity")} // Non-editable if seating_capacity is already
          />
          <CustomInput
            label="Vehicle Type"
            value={vehicle.vehicle_type}
            onChangeText={(value) => handleChange("vehicle_type", value)}
            placeholder="Enter vehicle type"
            editable={isFieldEditable("vehicle_type")} // Non-editable if vehicle_type is already set
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

          <VehicleImageUpload
            token={token}
            profileUrl={putVehicleViewData}
            profileImage={vehicleData.image}
            id={vehicleId}
          />

          <CustomCheckbox
            label="Do you have Driver?"
            value={isDriver}
            onValueChange={setIsDriver}
            disabled={!!vehicleData?.license_number} // Checkbox disabled if driver is already assigned
          />
          {isDriver && (
            <CustomInput
              label="License Number"
              value={licenseNumber}
              onChangeText={setLicenseNumber}
              placeholder="Enter license number"
              editable={isFieldEditable("license_number")} // Non-editable if license_number is already set
            />
          )}

          <CustomSubmitButton title="Update Vehicle" onPress={handleSubmit} />
        </View>
      </ScrollView>
    </View>
  );
};

export default VehicleEdit;

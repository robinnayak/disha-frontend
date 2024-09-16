import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { showMessage } from "react-native-flash-message";
import CustomInput from "../../common/commonFormComponent/CustomInput";
import CustomDatePicker from "../../common/commonFormComponent/CustomDatePicker";
import CustomSubmitButton from "../../common/commonFormComponent/Buttons/CustomSubmitButton";
import { getTripData, postTripData } from "../../../api/orgnization/request";
import { handleApiError } from "../../../utils/errorHandler";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import CustomPicker from "../../common/commonFormComponent/CustomPicker";
import { tripChoices } from "../../../utils/formchoices";
import GoBack from "../../menu/GoBack";

const TripForm = ({ route }) => {
  const navigation = useNavigation();
  const vehicle_registration_number = route.params.vehicleId;
  const token = useSelector((state) => state.auth.token.token);
  // console.log(token)
  // State for the form fields
  const [tripData, setTripData] = useState({
    registration_number: vehicle_registration_number || "",
    price: "",
    from_location: "",
    to_location: "",
    is_reverse_trip: false,
    duration: "",
    distance: "",
    start_datetime: "",
    end_datetime: "",
  });

  const handleInputChange = (name, value) => {
    setTripData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (
      !tripData.registration_number ||
      !tripData.price ||
      !tripData.from_location ||
      !tripData.to_location ||
      !tripData.start_datetime ||
      !tripData.end_datetime
    ) {
      showMessage({
        message: "Error",
        description: "Please fill out all required fields",
        type: "danger",
      });
      return;
    }

    // console.log(tripData);
    // Perform the form submission

    try {
      const response = await postTripData(token, tripData);
      console.log("get response ", response);
    } catch (err) {
      console.log("error", err);
      handleApiError(err);
    }

    // Success message
    showMessage({
      message: "Success",
      description: "Trip details submitted successfully",
      type: "success",
    });
    navigation.goBack();
  };

  return (
    <ScrollView className="p-4 bg-background">
      <View className="rounded-lg bg-primary p-6 shadow-md">
        
        {/* Back Button */}
        <GoBack navigation={navigation} />

        {/* Registration Number (read-only) */}
        <CustomInput
          label="Registration Number"
          value={tripData.registration_number}
          editable={false}
        />

        {/* Price */}
        <CustomInput
          label="Price"
          value={tripData.price}
          onChangeText={(value) => handleInputChange("price", value)}
          placeholder="Enter trip price"
          keyboardType="numeric"
        />

        {/* From Location */}
        <CustomPicker
          label="From Location"
          selectedValue={tripData.from_location}
          onValueChange={(value) => handleInputChange("from_location", value)}
          options={tripChoices}
          placeholder="Enter starting location"
        />

        {/* To Location */}
        <CustomPicker
          label="To Location"
          selectedValue={tripData.to_location}
          onValueChange={(value) => handleInputChange("to_location", value)}
          options={tripChoices}
          placeholder="Enter destination location"
        />

        {/* Distance */}
        <CustomInput
          label="Distance (km)"
          value={tripData.distance}
          onChangeText={(value) => handleInputChange("distance", value)}
          placeholder="Enter trip distance"
          keyboardType="numeric"
        />

        {/* Start Date and Time */}
        <CustomDatePicker
          label="Start Date & Time"
          date={tripData.start_datetime}
          onDateChange={(value) => handleInputChange("start_datetime", value)}
        />

        {/* End Date and Time */}
        <CustomDatePicker
          label="End Date & Time"
          date={tripData.end_datetime}
          onDateChange={(value) => handleInputChange("end_datetime", value)}
        />

        {/* Submit Button */}
        <CustomSubmitButton title="Submit Trip" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

export default TripForm;

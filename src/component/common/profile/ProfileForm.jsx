import React, { useState, useEffect, useCallback } from "react";
import { View, Button, ScrollView } from "react-native";
import { putOrgUserProfile } from "../../../api/users/request";
import { useSelector } from "react-redux";
import BottomMenu from "../../menu/BottomMenu";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import Icon from "react-native-vector-icons/FontAwesome";
import ProfileImageUpload from "../../organization/ProfileImageUpload";
import CustomSubmitButton from "../commonFormComponent/Buttons/CustomSubmitButton";
import CustomInput from "../commonFormComponent/CustomInput";
import CustomCheckbox from "../commonFormComponent/CustomCheckbox";
import GoBack from "../../menu/GoBack";

// Utility to filter unnecessary fields before submission
const filterProfileData = (data, userType) => {
  const commonFields = ["phone_number", "profile_image", "address", "date_of_birth", "name"];
  
  const fieldsByType = {
    organization: [...commonFields, "registration_number", "description", "logo"],
    driver: [...commonFields, "license_number", "experience", "availability_status"],
    passenger: [...commonFields, "emergency_contact_name", "emergency_contact_number", "preferred_language"],
  };

  const allowedFields = fieldsByType[userType] || [];
  return Object.keys(data)
    .filter(key => allowedFields.includes(key))
    .reduce((obj, key) => ({ ...obj, [key]: data[key] }), {});
};

const ProfileForm = ({ route }) => {

  const navigation = useNavigation();
  const token = useSelector((state) => state.auth.token.token);
  const userType = useSelector((state) => state.auth.user_type);
  const Data = route.params.profileData;

  const [profileData, setProfileData] = useState({
    phone_number: "",
    address: "",
    date_of_birth: null,
    name: "",
    registration_number: "",
    description: "",
    logo: null,
    emergency_contact_name: "",
    emergency_contact_number: "",
    preferred_language: "",
    license_number: "",
    experience: "",
    availability_status: false,
  });

  useEffect(() => {
    if (Data) {
      setProfileData((prev) => ({
        ...prev,
        phone_number: Data.phone_number || "",
        address: Data.address || "",
        date_of_birth: Data.date_of_birth || null,
        name: Data.username || "",
        registration_number: Data.registration_number || "",
        description: Data.description || "",
        logo: Data.logo || null,
        emergency_contact_name: Data.emergency_contact_name || "",
        emergency_contact_number: Data.emergency_contact_number || "",
        preferred_language: Data.preferred_language || "",
        license_number: Data.license_number || "",
        experience: Data.experience || "",
        availability_status: Data.availability_status || false,
      }));
    }
  }, [Data]);

  const handleChange = (name, value) => {
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = useCallback(async () => {
    const filteredData = filterProfileData(profileData, userType);
    // console.log("filtered data",filteredData)
    try {
      const response = await putOrgUserProfile(token, filteredData);
      // console.log("response",response)
      if (response) {
        showMessage({
          message: "Success",
          description: "Profile updated successfully",
          type: "success",
        });
        navigation.navigate("Home");
      } else {
        showMessage({
          message: "Error",
          description: "Failed to update profile",
          type: "danger",
        });
      }
    } catch (error) {
      console.error(error.response.data);
      // console.error("error",error)
      showMessage({
        message: "Error",
        description: "An error occurred while updating the profile",
        type: "danger",
      });
    }
  }, [profileData, token, userType, navigation]);

  const renderInputField = ({ label, name, placeholder, type, keyboardType }) => {
    if (type === "checkbox") {
      return (
        <CustomCheckbox
          key={name}
          label={label}
          value={profileData[name]}
          onValueChange={(newValue) => handleChange(name, newValue)}
        />
      );
    } else {
      return (
        <CustomInput
          key={name}
          label={label}
          value={profileData[name]}
          onChangeText={(value) => handleChange(name, value)}
          placeholder={placeholder}
          keyboardType={keyboardType}
        />
      );
    }
  };

  const fieldsByUserType = {
    organization: [
      { label: "Phone Number", name: "phone_number", placeholder: "Enter phone number" },
      { label: "Address", name: "address", placeholder: "Enter address" },
      { label: "Name", name: "name", placeholder: "Enter organization name" },
      { label: "Registration Number", name: "registration_number", placeholder: "Enter registration number" },
      { label: "Description", name: "description", placeholder: "Enter description" },
    ],
    driver: [
      { label: "Phone Number", name: "phone_number", placeholder: "Enter phone number" },
      { label: "Address", name: "address", placeholder: "Enter address" },
      { label: "Name", name: "name", placeholder: "Enter driver name" },
      { label: "License Number", name: "license_number", placeholder: "Enter license number" },
      { label: "Experience (Years)", name: "experience", placeholder: "Enter years of experience", keyboardType: "numeric" },
      { type: "checkbox", label: "Availability Status", name: "availability_status" },
    ],
    passenger: [
      { label: "Phone Number", name: "phone_number", placeholder: "Enter phone number" },
      { label: "Address", name: "address", placeholder: "Enter address" },
      { label: "Name", name: "name", placeholder: "Enter passenger name" },
      { label: "Emergency Contact Name", name: "emergency_contact_name", placeholder: "Enter emergency contact name" },
      { label: "Emergency Contact Number", name: "emergency_contact_number", placeholder: "Enter emergency contact number" },
      { label: "Preferred Language", name: "preferred_language", placeholder: "Enter preferred language" },
    ],
  };
  console.log( "profile data",Data)

  return (
    <View className="flex-1 bg-background">
      {/* Back Button */}
      {/* <View className="p-4">
        <Icon
          name="arrow-left"
          size={24}
          color="#000"
          onPress={() => navigation.goBack()}
          className="mb-4"
        />
      </View> */}

      <GoBack navigation={navigation} />

      <ScrollView className="flex-1 px-4">
        <View className="rounded-lg bg-primary p-6 shadow-md">
          {fieldsByUserType[userType]?.map(renderInputField)}
          <ProfileImageUpload token={token} profileUrl={putOrgUserProfile} profileImage={Data.profile_image} />
          <CustomSubmitButton title={"Upload Profile"} onPress={handleSubmit} />
        </View>
      </ScrollView>
      
    </View>
  );
};

export default ProfileForm;

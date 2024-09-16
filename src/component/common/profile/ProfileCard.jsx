// src/components/ProfileCard.jsx

import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import ProfileImage from "./ProfileImage";
import StarRating from "./StarRating";
import ProfileField from "./ProfileField";
import {
  faDollarSign,
  faEnvelope,
  faIdBadge,
  faPhone,
  faHome,
  faGift,
} from "@fortawesome/free-solid-svg-icons";
import AvailabilityStatus from "../AvailabilityStatus";

const ProfileCard = ({
  profileData,
  loading,
  user_type,
  secondary = false,
  navigation,
}) => {
  const email = profileData?.email || "Email not provided";

  let username, phone_number, profile_image, address, loyalty_points;
  let additionalFields = [];

  if (user_type === "organization") {
    ({
      username,
      phone_number,
      profile_image,
      registration_number,
      total_earnings,
      address,
    } = profileData || {});

    additionalFields = secondary
      ? [{ value: address || "Organization Address", icon: faIdBadge }]
      : [
          {
            value: registration_number || "Registration Number",
            icon: faIdBadge,
          },
          {
            value: `Earnings: ${total_earnings || "0.00"}`,
            icon: faDollarSign,
          },
          { value: address || "Organization Address", icon: faIdBadge },
        ];
  } else if (user_type === "driver") {
    ({
      username,
      phone_number,
      profile_image,
      license_number,
      availability_status,
      experience,
      total_earnings,
    } = profileData || {});

    additionalFields = secondary
      ? [
          { value: address || "Driver Address", icon: faIdBadge },
          { value: license_number || "License Number", icon: faIdBadge },
          {
            value: `Experience: ${experience || "N/A"} years`,
            icon: faIdBadge,
          },
        ]
      : [
          { value: license_number || "License Number", icon: faIdBadge },
          {
            value: `Earnings: ${total_earnings || "0.00"}`,
            icon: faDollarSign,
          },
        ];
  } else if (user_type === "passenger") {
    // Extract passenger-specific fields
    ({ username, phone_number, profile_image, address, loyalty_points } =
      profileData || {});

    additionalFields = [
      // { value: address || "Address not provided", icon: faHome },
      {
        value: `Loyalty Points: ${loyalty_points || 0}`,
        icon: faGift,
      },
    ];
  } else {
    ({ username, phone_number, profile_image } = profileData || {});

  }

  const renderUserType = () => {
    switch (user_type) {
      case "organization":
        return "Organization";
      case "driver":
        return "Driver";
      default:
        return "Passenger";
    }
  };

  const capitalize = (str) => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  console.log("profile image",profile_image)
  console.log("prfile data",profileData)
  return (
    <View
      className={`${
        secondary
          ? "bg-slate-800 p-3 rounded-md shadow-md"
          : "bg-primary p-6 rounded-lg shadow-lg"
      } mt-4`}
    >
      <View className="flex-row items-center mb-5">
        <ProfileImage uri={profile_image} loading={loading} />
        <View className="ml-4 flex-1">
          <Text
            className={`${
              secondary
                ? " text-lg font-semibold text-gray-200"
                : "text-xl font-bold text-primary-on-dark mb-2"
            }`}
          >
            {capitalize(username) || "Username"} - ({renderUserType()})
          </Text>
          <StarRating review={3} />
          <ProfileField value={email || "Email"} icon={faEnvelope} />
          {user_type === "organization" || user_type === "driver" ? (
            <ProfileField
              value={phone_number || "Phone Number"}
              icon={faPhone}
            />
          ) : null}

          {/* <ProfileField value={phone_number || "Phone Number"} icon={faPhone} /> */}
          {additionalFields.map((field, index) => (
            <ProfileField key={index} value={field.value} icon={field.icon} />
          ))}
          {user_type === "driver" && (
            <AvailabilityStatus availability_status={availability_status} />
          )}

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Profile", {
                profileData: profileData,
                user_type: user_type,
              })
            }
            className="mt-4 bg-accent p-2 rounded-md"
          >
            <Text className="text-primary-on-dark text-center">View</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProfileCard;

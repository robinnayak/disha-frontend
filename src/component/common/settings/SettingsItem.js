import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import showMessage from "react-native-flash-message";
import { handleLogout } from "../../../api/auth/request";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const SettingsItem = ({
  icon,
  label,
  navigation,
  dispatch,
  token,
  profileData,
  user_type,
}) => {
  // Function to handle the press actions
  const handlePress = (label) => {
    switch (label) {
      case "Logout":
        handleLogout(token, dispatch, navigation);
        break;
      case "Profile":
        navigation.navigate("Profile", {
          profileData: profileData,
          user_type: user_type,
        });
        break;
      case "Emergency Support":
        navigation.navigate("EmergencySupport");
        break;
      case "Help":
        navigation.navigate("Help");
        break;
      case "Support Request":
        navigation.navigate("SupportRequest");
        break;
      case "Policies":
        navigation.navigate("Policies");
        break;
      case "Feedback":
        navigation.navigate("Feedback");
        break;

      default:
        // Display an alert for under maintenance sections
        Alert.alert(
          "Under Maintenance",
          `The ${label} page is under maintenance.`,
          [{ text: "OK" }]
        );
        break;
    }
  };

  return (
    <TouchableOpacity
      onPress={() => handlePress(label)}
      activeOpacity={0.7}
      className="flex-row items-center py-4 px-2"
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={`Navigates to ${label} section`}
    >
      {/* Icon with a fallback in case an icon isn't passed */}
      <View className="mr-4">
        <FontAwesomeIcon
          icon={icon || faChevronRight}
          size={20}
          className="text-secondary"
        />
      </View>

      {/* Label Text */}
      <Text className="text-primary text-lg flex-1">{label}</Text>

      {/* Right Chevron for Navigation */}
      <FontAwesomeIcon
        icon={faChevronRight}
        size={16}
        className="text-secondary"
      />
    </TouchableOpacity>
  );
};

export default SettingsItem;

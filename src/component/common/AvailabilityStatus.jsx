import React from "react";
import { View, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

const AvailabilityStatus = ({ availability_status }) => {
  const statusText = availability_status ? "Online" : "Offline";
  const statusColor = availability_status ? "green" : "red";

  return (
    <View className="flex-row items-center mt-2">
      <FontAwesomeIcon
        icon={faCircle}
        size={10}
        color={statusColor}
        style={{ marginRight: 5 }}
      />
      <Text className="text-sm text-primary-on-dark">
        {statusText}
      </Text>
    </View>
  );
};

export default AvailabilityStatus;

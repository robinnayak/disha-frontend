import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import showMessage from "react-native-flash-message";
import { handleLogout } from "../../../api/auth/request";



const SettingsItem = ({ icon, label, navigation,dispatch,token}) => {
  const handlePress = (label) => {
    // if(label==="Logout"){
    //   handleLogout(token,navigation,dispatch)
    // }
    console.log(`under maintenance ${label}`);
    Alert.alert("Under Maintenance", "This page is under maintenance.", [
      { text: "OK" },
    ]);
  };

  return (
    <TouchableOpacity
      onPress={()=>handlePress(label)}
      className="flex-row items-center py-4 px-2"
    >
      {/* <FontAwesomeIcon icon={icon} size={20} className="text-secondary mr-4" /> */}
      <Text className="text-primary text-lg">{label}</Text>
    </TouchableOpacity>
  );
};

export default SettingsItem;

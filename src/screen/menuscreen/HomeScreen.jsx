// src/screens/HomeScreen.js
import { ScrollView, Text, View } from "react-native";
import React from "react";
import OrganizationHomeScreen from "../../component/organization/OrganizationHomeScreen";
import { useSelector } from "react-redux";
import DriverHomeScreen from "../../component/driver/DriverHomeScreen";
import PassengerHomeScreen from "../../component/passenger/PassengerHomeScreen";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const user_type = useSelector((state) => state.auth.user_type);
  const token = useSelector((state) => state.auth?.token?.token);
  const navigation = useNavigation();
  const renderHomeScreen = () => {
    switch (user_type) {
      case "organization":
        return <OrganizationHomeScreen token={token} navigation={navigation} />;
      case "driver":
        return <DriverHomeScreen token={token} navigation={navigation} />;
      case "passenger":
        return <PassengerHomeScreen token={token} navigation={navigation} />;
      default:
        return <Text>Home Screen</Text>;
    }
  };

  console.log("home screen", user_type);

  return <View className="flex-1 ">{renderHomeScreen()}</View>;
};

export default HomeScreen;

// src/components/LogoutButton.js
import React, { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "react-native-flash-message";
import { logoutUser } from "../../api/auth/request";
import { setLogout } from "../../app/features/authSlice";
import { handleApiError } from "../../utils/errorHandler";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const token = useSelector((state) => state.auth?.token?.token);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await logoutUser(token);
      setLoading(false);
      showMessage({
        message: `Successfully Logged Out ${res.user || "Anonymous"}`,
        description: "You have successfully logged out.",
        type: "success",
      });
      dispatch(setLogout());
      navigation.navigate("Login");
    } catch (error) {
      setLoading(false);
      handleApiError(error);
    }
  };

  return (
    <TouchableOpacity
      onPress={handleLogout}
      className="bg-primary py-3 px-5 rounded-xl mt-5"
      activeOpacity={0.7}
    >
      <Text className="text-center text-primary-on-dark font-bold text-lg">
        {loading ? "Logging Out..." : "Logout"}
      </Text>
    </TouchableOpacity>
  );
};

export default LogoutButton;

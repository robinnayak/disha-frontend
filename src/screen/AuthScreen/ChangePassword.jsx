import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { showMessage } from "react-native-flash-message";
import { handleApiError } from "../../utils/errorHandler";
import { useSelector } from "react-redux";
import axios from "axios";

const ChangePassword = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [loading, setLoading] = useState(false);

  // Ensure the token is correctly fetched
  const token = useSelector((state) => state.auth.token?.token); // Adjust based on your Redux structure
  const handleChangePassword = async () => {
    // Validation for empty fields
    if (!oldPassword || !newPassword || !newPassword2) {
      showMessage({
        message: "Validation Error",
        description: "All fields are required.",
        type: "danger",
      });
      return;
    }

    // Validation for matching passwords
    if (newPassword !== newPassword2) {
      showMessage({
        message: "Passwords Do Not Match",
        description: "Please ensure both passwords match.",
        type: "danger",
      });
      return;
    }

    // Extract digits from both old and new passwords
    const oldPasswordDigits = oldPassword.replace(/\D/g, "").length;
    const newPasswordDigits = newPassword.replace(/\D/g, "").length;

    // Ensure new password has equal or greater number of digits
    if (newPasswordDigits < oldPasswordDigits) {
      showMessage({
        message: "Password Error",
        description:
          "New password must have at least as many digits as the old password.",
        type: "danger",
      });
      return;
    }

    const data = {
      old_password: oldPassword,
      new_password: newPassword,
      new_password2: newPassword2,
    };

    if (!token) {
      showMessage({
        message: "Authentication Error",
        description: "User token is missing or invalid.",
        type: "danger",
      });
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://10.0.2.2:8000/api/auth/change-password/",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Correct format for Authorization header
          },
        }
      );

      showMessage({
        message: "Password Changed Successfully",
        description: res.data.message || "Your password has been updated.",
        type: "success",
      });
      navigation.navigate("Home");
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center p-6 bg-background">
      <Text className="text-2xl font-bold text-center mb-6">
        Change Password
      </Text>

      <View className="mb-4">
        <Text className="text-primary text-lg mb-2">Old Password</Text>
        <TextInput
          value={oldPassword}
          onChangeText={setOldPassword}
          placeholder="Enter your old password"
          secureTextEntry
          className="border border-gray-300 rounded-md p-3 text-base"
        />
      </View>

      <View className="mb-4">
        <Text className="text-primary text-lg mb-2">New Password</Text>
        <TextInput
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="Enter your new password"
          secureTextEntry
          className="border border-gray-300 rounded-md p-3 text-base"
        />
      </View>

      <View className="mb-4">
        <Text className="text-primary text-lg mb-2">Confirm New Password</Text>
        <TextInput
          value={newPassword2}
          onChangeText={setNewPassword2}
          placeholder="Confirm your new password"
          secureTextEntry
          className="border border-gray-300 rounded-md p-3 text-base"
        />
      </View>

      <TouchableOpacity
        onPress={handleChangePassword}
        className="bg-accent py-3 rounded-xl active:opacity-75"
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text className="text-center text-primary-on-dark font-bold text-lg">
            Change Password
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ChangePassword;

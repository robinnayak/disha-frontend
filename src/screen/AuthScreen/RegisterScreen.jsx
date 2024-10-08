import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { registerUser } from "../../api/auth/request";
import LoadingAnimation from "../../component/common/LoadingAnimation";
import { handleApiError } from "../../utils/errorHandler";
import { showMessage } from "react-native-flash-message";
import CustomInput from "../../component/common/commonFormComponent/CustomInput";
import CustomCheckbox from "../../component/common/commonFormComponent/CustomCheckbox";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    license_number: "",
    is_organization: false,
    is_driver: false,
    is_passenger: false,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    if (name === "is_driver" && value) {
      setUser({
        ...user,
        is_driver: true,
        is_organization: false,
        is_passenger: false,
      });
    } else if (name === "is_organization" && value) {
      setUser({
        ...user,
        is_driver: false,
        is_organization: true,
        is_passenger: false,
      });
    } else if (name === "is_passenger" && value) {
      setUser({
        ...user,
        is_driver: false,
        is_organization: false,
        is_passenger: true,
      });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const handleRegister = async () => {
    // Frontend validation for required fields
    if (
      !user.username.trim() ||
      !user.password.trim() ||
      !user.password2.trim() ||
      !user.email.trim()
    ) {
      showMessage({
        message: "Validation Error",
        description: "Please fill in all required fields.",
        type: "danger",
      });
      return;
    }
    // Password validation: Check length and special character
    const passwordRegex =
      /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/;

    if (!passwordRegex.test(user.password)) {
      showMessage({
        message: "Password Error",
        description:
          "Password must be at least 8 characters long, contain at least one special character, one letter, and one number.",
        type: "danger",
      });
      return;
    }

    if (user.password !== user.password2) {
      showMessage({
        message: "Error",
        description: "Passwords do not match",
        type: "danger",
      });
      return;
    }

    if (user.is_driver) {
      if (!user.license_number.trim()) {
        showMessage({
          message: "Validation Error",
          description: "Please fill in the required license number field.",
          type: "danger",
        });
        return;
      }
    }

    // Validate license number only if the user is a driver
    // if (user.is_driver && user.license_number) {
    //   if (user.license_number.length > 16 || user.license_number.length < 14) {
    //   showMessage({
    //     message: "Validation Error",
    //     description: "License number must be either 14 or 16 digits.",
    //     type: "danger",
    //   });
    //   return;
    //   }
    // }

    setLoading(true);

    try {
      const response = await registerUser(user); // Use Axios request
      setLoading(false);

      // Check if the response data exists and handle it accordingly
      if (response.data && response.data.user) {
        showMessage({
          message: "Success",
          description: `Registration successful! A verification email has been sent to ${user.email}. Please verify your account.`,
          type: "success",
        });
      } else {
        showMessage({
          message: "Success",
          description:
            "Registration successful! Please check your email for the verification link.",
          type: "success",
        });
      }

      // Redirect to the login page or show a confirmation page
      navigation.navigate("Login");
    } catch (error) {
      console.log("register error", error);
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingAnimation />; // Show loading animation while loading is true
  }

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="flex h-full justify-center p-5 bg-background">
        <View className="flex bg-primary flex-col justify-center items-center mb-8">
          <Text className="text-3xl font-bold text-primary-on-dark pt-2 mb-4">
            Register with Disha
          </Text>
        </View>

        <View className="shadow-lg bg-primary p-6 rounded-lg">
          <CustomInput
            label="Username"
            value={user.username}
            onChangeText={(value) => handleChange("username", value)}
            placeholder="Enter your username"
          />
          <CustomInput
            label="Email"
            value={user.email}
            onChangeText={(value) => handleChange("email", value)}
            placeholder="Enter your email"
          />
          <CustomInput
            label="Password"
            value={user.password}
            onChangeText={(value) => handleChange("password", value)}
            placeholder="Enter your password"
            secureTextEntry
          />
          <CustomInput
            label="Confirm Password"
            value={user.password2}
            onChangeText={(value) => handleChange("password2", value)}
            placeholder="Confirm your password"
            secureTextEntry
          />

          <CustomCheckbox
            label="Are you an Organization?"
            value={user.is_organization}
            onValueChange={(value) => handleChange("is_organization", value)}
          />
          <CustomCheckbox
            label="Are you a Driver?"
            value={user.is_driver}
            onValueChange={(value) => handleChange("is_driver", value)}
          />
          <CustomCheckbox
            label="Are you a Passenger?"
            value={user.is_passenger}
            onValueChange={(value) => handleChange("is_passenger", value)}
          />

          {/* Display License Number field only when Driver is checked */}
          {user.is_driver && (
            <CustomInput
              label="License Number"
              value={user.license_number}
              onChangeText={(value) => handleChange("license_number", value)}
              placeholder="Enter your license number 14 digits"
              keyboardType="numeric"
              maxLength={16} // Limit input length to 16
            />
          )}

          <TouchableOpacity
            onPress={handleRegister}
            className="bg-primary-on-dark py-3 rounded-xl mt-5"
            activeOpacity={0.7}
          >
            <Text className="text-center text-primary font-bold text-lg">
              Register
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            className="mt-6"
          >
            <Text className="text-center text-accent text-lg">
              Already have an account? Login here
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});

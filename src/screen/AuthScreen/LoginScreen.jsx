// src/screen/Login.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import { useDispatch } from "react-redux";
import { setUser, setToken } from "../../app/features/authSlice";
import { loginUser } from "../../api/auth/request";
// import DishaLogo from "";
import DishaLogo from "../../images/dishalogo.gif";
import LoadingAnimation from "../../component/common/LoadingAnimation";
import { handleApiError } from "../../utils/errorHandler";
import CustomInput from "../../component/common/commonFormComponent/CustomInput";

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    setData({ ...data, [name]: value });
  };

  const handleLogin = async () => {
    // Frontend validation for required fields
    if (!data.username.trim() || !data.password.trim()) {
      showMessage({
        message: "Validation Error",
        description: "Please fill in all required fields.",
        type: "danger",
      });
      return;
    }
    setLoading(true);
    try {
      const response = await loginUser({
        username: data.username,
        password: data.password,
      });

      setLoading(false);

      // Update the auth state with user data and token
      dispatch(setUser({ user: response.user }));
      dispatch(setToken({ token: response.token.access }));

      showMessage({
        message: `Successfully Logged In ${
          response.user.username || "Anonymous"
        }`,
        description: "You have successfully logged in.",
        type: "success",
      });

      navigation.navigate("Home", { data: response.user });
    } catch (error) {
      setLoading(false);
      handleApiError(error);
    }
  };
  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <View className="flex h-full justify-center px-5 bg-background">
      <View className="bg-primary rounded-md flex flex-col justify-center items-center mb-8">
        <Image
          style={{
            width: 150,
            height: 150,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
          }}
          source={DishaLogo} // Local GIF source
        />
        <Text className="text-3xl font-bold text-background mb-4">
          Login With Disha
        </Text>
      </View>

      <View className="bg-primary p-6 rounded-lg shadow-lg">
        <CustomInput
          label="Username"
          value={data.username}
          onChangeText={(text) => handleChange("username", text)}
          placeholder="Enter your username"
        />
        <CustomInput
          label="Password"
          value={data.password}
          onChangeText={(text) => handleChange("password", text)}
          placeholder="Enter your password"
          secureTextEntry
        />

        <TouchableOpacity
          onPress={handleLogin}
          className="bg-accent py-3 rounded-xl mt-5 active:opacity-75"
        >
          <Text className="text-center text-primary-on-dark font-bold text-lg">
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Forgot")} // Navigates to Forgot screen
          className="mt-4"
        >
          <Text className="text-center text-accent text-lg">
            Forgot Password?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
          className="mt-6"
        >
          <Text className="text-center text-accent text-lg">
            Don't have an account? Register here
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

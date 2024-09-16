// src/navigation/UnauthenticatedStack.js

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../screen/SplashScreen";
import RegisterScreen from "../screen/AuthScreen/RegisterScreen";
import LoginScreen from "../screen/AuthScreen/LoginScreen";
import ForgotScreen from "../screen/AuthScreen/ForgotScreen";
import ResetPasswordScreen from "../screen/AuthScreen/ResetPasswordScreen";

const Stack = createNativeStackNavigator();

const UnauthenticatedStack = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "Login" }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: "Register" }}
      />
      <Stack.Screen
        name="Forgot"
        component={ForgotScreen}
        options={{ title: "Forgot" }}
      />
      <Stack.Screen
        name="Reset"
        component={ResetPasswordScreen}
        options={{ title: "Reset" }}
      />
    </Stack.Navigator>
  );
};

export default UnauthenticatedStack;

import { Animated, StyleSheet, Text, View,Image } from "react-native";
import React, { useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import DishaLogo from "../images/dishalogo.gif";
const SplashScreen = () => {
  const navigation = useNavigation();
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animation for fading in the logo
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000, // 2 seconds for fade in
      useNativeDriver: true,
    }).start();
    // Navigate to Login screen after 3 seconds
    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 2000);
    // Cleanup the timer
    return () => clearTimeout(timer);
  }, [navigation, opacity]);
  return (
    <View className="flex-1 justify-center items-center bg-background">
      <Animated.View style={{ opacity }}>
        <Image
          source={DishaLogo} // Replace with your logo path
          className="w-40 h-40"
        />
        <Text className="text-2xl font-bold text-primary mt-4">
          Welcome to Disha
        </Text>
      </Animated.View>
    </View>
  );
};

export default SplashScreen;


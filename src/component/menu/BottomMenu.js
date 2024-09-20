import React from "react";
import { View, TouchableOpacity, Text, Animated } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faTicketAlt,
  faMapMarkerAlt,
  faHome,
  faRobot,
  faCog,
  faBell,
} from "@fortawesome/free-solid-svg-icons";

// GlowEffect component for the glow animation
const GlowEffect = ({ isActive }) => {
  const glowAnimation = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (isActive) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnimation, {
            toValue: 0.5,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(glowAnimation, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [isActive, glowAnimation]);

  return (
    isActive && (
      <Animated.View
        className="absolute top-0 left-0 right-0 bottom-0 bg-accent opacity-20 rounded-full"
        style={{
          transform: [
            {
              scale: glowAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.5],
              }),
            },
          ],
        }}
      />
    )
  );
};

const BottomMenu = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const menuItems = [
    { label: "Notification", icon: faBell, screen: "Notification" },
    { label: "Map", icon: faMapMarkerAlt, screen: "Map" },
    { label: "Home", icon: faHome, screen: "Home" },
    { label: "AI", icon: faRobot, screen: "AI" },
    { label: "Settings", icon: faCog, screen: "Settings" },
  ];

  const renderItem = (item) => {
    const isActive = route.name === item.screen;
    return (
      <TouchableOpacity
        key={item.label}
        onPress={() => navigation.navigate(item.screen)}
        className={`flex items-center p-2 relative transition-all duration-300 ${
          isActive ? "scale-110" : "scale-100"
        }`}
        activeOpacity={0.7}
      >
        <GlowEffect isActive={isActive} />
        <FontAwesomeIcon
          icon={item.icon}
          size={24}
          color={isActive ? "#FFFFFF" : "#BDC3C7"}
        />
        <Text
          className={`text-xs mt-0.5 ${
            isActive ? "text-white" : "text-background"
          }`}
        >
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex flex-row justify-around bg-primary py-2 border-t-2 border-darker relative w-full opacity-95 shadow-lg shadow-darker">
      {menuItems.map(renderItem)}
    </View>
  );
};

export default BottomMenu;

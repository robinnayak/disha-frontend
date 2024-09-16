// src/screens/SettingsScreen.js

import React from "react";
import { View, ScrollView, Text } from "react-native";

import {
  faUser,
  faBriefcase,
  faPercentage,
  faGift,
  faLanguage,
  faPhone,
  faQuestionCircle,
  faFileAlt,
  faStar,
  faInfoCircle,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import Section from "../../component/common/settings/Section";
import BottomMenu from "../../component/menu/BottomMenu";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { handleLogout } from "../../api/auth/request";
import { useNavigation } from "@react-navigation/native";

const SettingsScreen = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const token = useSelector((state) => state.auth?.token?.token);
  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 p-4 mb-5">
        <View className="border-b border-secondary-text py-2">
          <Text className="text-primary text-lg px-2">Username</Text>
          <Text className="text-secondary-text px-2">Phone Number</Text>
        </View>

        <Section
          title="Account"
          items={[
            { icon: faUser, label: "Profile" },
            { icon: faBriefcase, label: "Business Profile" },
          ]}
        />

        <Section
          title="Offers"
          items={[
            { icon: faPercentage, label: "Promos" },
            { icon: faGift, label: "Refer & Get Discount" },
          ]}
        />

        <Section
          title="Settings"
          items={[
            { icon: faLanguage, label: "Language" },
          ]}
        />

        <Section
          title="Help & Legal"
          items={[
            { icon: faPhone, label: "Emergency Support" },
            { icon: faQuestionCircle, label: "Help" },
            { icon: faFileAlt, label: "Support Request" },
            { icon: faFileAlt, label: "Policies" },
          ]}
        />

        <Section
          title="More"
          items={[
            { icon: faStar, label: "Rate us" },
            { icon: faInfoCircle, label: "About Disha" },
          ]}
        />

        <Section
          navigation={navigation}
          dispatch={dispatch}
          token={token}
          items={[
            { icon: faSignOutAlt, label: "Logout" },
          ]}
        />

        <View className="p-4">
          <Text className="text-secondary-text text-center">Version 0.0.1</Text>
        </View>
      </ScrollView>
      <BottomMenu />
    </SafeAreaView>
  );
};

export default SettingsScreen;

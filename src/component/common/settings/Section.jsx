// src/components/settings/Section.js

import React from "react";
import { View, Text } from "react-native";
import SettingsItem from "./SettingsItem";

const Section = ({ title, items,navigation,dispatch,token,profileData,user_type}) => {
  return (
    <View className="border-b border-secondary-text py-2">
      {title && (
        <Text className="text-accent uppercase px-2">{title}</Text>
      )}
      {items.map((item, index) => (
        <SettingsItem key={index} icon={item.icon} label={item.label} navigation={navigation} dispatch={dispatch} token={token} profileData={profileData} user_type={user_type} />
      ))}
    </View>
  );
};

export default Section;

import { View, Text, ScrollView } from "react-native";
import React from "react";
import BottomMenu from "../../component/menu/BottomMenu";

const AiScreen = () => {
  return (
    <View className="flex-1">
      <ScrollView className="flex-1 p-4">
        <Text>AiScreen</Text>
      </ScrollView>
      <BottomMenu />
    </View>
  );
};

export default AiScreen;

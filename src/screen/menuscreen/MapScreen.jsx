import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import BottomMenu from "../../component/menu/BottomMenu";

const MapScreen = () => {
  return (
    <View className="flex-1">
      <ScrollView className="flex-1 p-4">
        <Text>MapScreen</Text>
      </ScrollView>
      <BottomMenu />
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({});

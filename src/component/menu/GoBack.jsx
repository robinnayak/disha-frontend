import { View, Text } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/FontAwesome";

const GoBack = ({navigation}) => {
  return (
    <>
      {/* Back Button */}
      <View className="p-4">
        <Icon
          name="arrow-left"
          size={24}
          color="#000"
          onPress={() => navigation.goBack()}
          className="mb-4"
        />
      </View>
    </>
  )
}

export default GoBack
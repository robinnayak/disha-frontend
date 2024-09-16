// components/LoadingAnimation.js
import React from 'react';
import LottieView from 'lottie-react-native';
import { View } from 'react-native';
import Loading from '../../images/loading.json'
const LoadingAnimation = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <LottieView
        source={Loading} // Add a loading animation JSON file in the assets
        autoPlay
        loop
        style={{ width: 150, height: 150 }} // Adjust size as needed
      />
    </View>
  );
};

export default LoadingAnimation;

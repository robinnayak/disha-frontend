import React, { useState } from 'react';
import { View, TouchableOpacity, Image, Text, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const SettingImageUpload = ({ onImageSelected, defaultImageUri }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageSelect = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImageUri = result.assets[0].uri;
      setImage(selectedImageUri);
      onImageSelected(selectedImageUri);  // Notify parent component of image selection
    }
  };

  return (
    <View className="mb-6">
      <Text className="text-primary mb-2">Attach a Screenshot or Image (optional)</Text>
      <TouchableOpacity
        onPress={handleImageSelect}
        className="h-40 border-dashed border-2 border-secondary justify-center items-center rounded"
      >
        {loading ? (
          <ActivityIndicator size="large" color="#3498db" />
        ) : image || defaultImageUri ? (
          <Image source={{ uri: image || defaultImageUri }} style={{ width: '100%', height: '100%', borderRadius: 10 }} />
        ) : (
          <Text className="text-secondary">Tap to select an image</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default SettingImageUpload;


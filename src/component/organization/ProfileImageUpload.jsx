import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Button, Image, View, Alert, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import axios from "axios";
import { handleApiError } from "../../utils/errorHandler";
import { MEDIA_URL } from "../../api/base";

const ProfileImageUpload = ({ token, profileUrl, profileImage }) => {
  // Construct the full image URI from the provided profile image path
  const defaultImageUri = `${MEDIA_URL}${profileImage}`;
  console.log('profile image upload', defaultImageUri);

  // State to manage the selected image and loading status
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  // Function to handle image picking and uploading
  const pickImage = async () => {
    // Request permission to access media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    // Launch the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    // If the user picked an image, prepare and send it to the backend
    if (!result.canceled) {
      const selectedImageUri = result.assets[0].uri;
      setImage(selectedImageUri);

      const formData = new FormData();
      formData.append("profile_image", {
        uri: selectedImageUri,
        name: selectedImageUri.split("/").pop(),
        type: "image/jpeg",
      });

      // Start the loading state
      setLoading(true);

      try {
        const res = await profileUrl(token, formData);
        // console.log("Image uploaded successfully:", res);
        setLoading(false); // End the loading state
      } catch (error) {
        console.log("Image upload failed:", error);
        handleApiError(error);
        setLoading(false); // End the loading state on failure
      }
    }
  };

  return (
    <View className="flex-1 items-center justify-center py-6 bg-white">
      <View className="mb-4">
        <Image
          source={{ uri: image || defaultImageUri }}
          className="w-32 h-32 rounded-full border-4 border-accent"
          style={{ backgroundColor: "#f0f0f0" }} // Fallback background color
        />
      </View>

      {/* Display loading indicator or button */}
      {loading ? (
        <ActivityIndicator size="large" color="#3498db" /> // Replace with your accent color or any color you want
      ) : (
        <TouchableOpacity
          onPress={pickImage}
          className="mt-4 px-4 py-2 rounded-full bg-accent shadow-lg"
          disabled={loading} // Disable button while loading
        >
          <Text className="text-white font-semibold">Change Profile Image</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ProfileImageUpload;

import React from "react";
import { Image, View } from "react-native";
import Profile from "../../../images/profile1.jpg";
import { MEDIA_URL } from "../../../api/base";

const ProfileImage = ({ uri, loading, width=24,height=32 }) => {
  let urii = `${MEDIA_URL}${uri}`;
  console.log("uri", urii);
  const imageUri = urii;
  return (
    <View className="p-1 bg-white rounded-lg">
      <Image
        source={uri ? { uri: imageUri } : Profile} // Display the profile image or fallback to default
        className={`w-${width} h-${height} rounded-lg bg-gray-200`} // Adjusted size and rounded corners
        // className="w-24 h-32 rounded-lg bg-gray-200" // Adjusted size and rounded corners
        style={{ resizeMode: "cover" }} // Ensures the image covers the container
      />
    </View>
  );
};

export default ProfileImage;

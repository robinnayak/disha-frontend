// src/components/ProfileViewScreen.jsx

import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import ProfileImage from "./ProfileImage";
import { useDispatch, useSelector } from "react-redux";
import { deleteuser } from "../../../api/users/request";
import { handleApiError } from "../../../utils/errorHandler";
import Header from "../../menu/Header";
import BottomMenu from "../../menu/BottomMenu";
import GoBack from "../../menu/GoBack";
import { showMessage } from "react-native-flash-message";
import { setLogout } from "../../../app/features/authSlice";

const ProfileViewScreen = ({ route, navigation }) => {
  const dispatch = useDispatch()
  const data = route.params?.profileData;
  console.log("profile data", data.profile_image);
  const user_type = route.params?.user_type;
  const userType = useSelector((state) => state.auth.user_type);
  const token = useSelector((state) => state.auth?.token?.token);
  const canEditDelete = user_type === userType;

  const handleEditProfile = () => {
    // Navigate to the edit profile screen or trigger edit functionality
    navigation.navigate("ProfileForm", { profileData: data });
  };
  
  const handleDeleteProfile = async (token) => {
    try{
      const response = await deleteuser(token);
      console.log(response);
      showMessage({
        message: `Profile deleted successfully ${data.username}`,
        type: "success",
      });
      dispatch(setLogout());
      navigation.navigate("Login");
    }
    catch(error){
      console.log("profile error",error)
      handleApiError(error);
    }
  };
  
  return (
    <View className="flex-1 bg-background">
      <GoBack navigation={navigation} />
      <ScrollView className="flex-1 bg-background p-4">
        <View className="items-center mb-6">
          <ProfileImage uri={data.profile_image} width={32} height={40} />
          <Text className="text-xl font-bold mt-4 text-primary">
            {data.username}
          </Text>
        </View>

        <View className="bg-primary p-4 rounded-lg shadow mb-4">
          <Text className="text-lg font-semibold text-white">
            Contact Information
          </Text>
          <Text className="text-sm text-background mt-2">
            Email: {data.email}
          </Text>
          <Text className="text-sm text-background">
            Phone: {data.phone_number}
          </Text>
          <Text className="text-sm text-background">
            Address: {data.address}
          </Text>
        </View>

        {user_type === "organization" && (
          <View className="bg-primary p-4 rounded-lg shadow mb-4">
            <Text className="text-lg font-semibold text-white">
              Organization Details
            </Text>
            <Text className="text-sm text-background mt-2">
              Name: {data.name}
            </Text>
            {canEditDelete && (
              <>
                <Text className="text-sm text-background">
                  Registration No.: {data.registration_number}
                </Text>
                <Text className="text-sm text-background">
                  Total Earnings: {data.total_earnings}
                </Text>
                <Text className="text-sm text-background">
                  Remaining Earnings: {data.remaining_earnings}
                </Text>
              </>
            )}
            <Text className="text-sm text-background">
              Date Created: {new Date(data.date_created).toLocaleDateString()}
            </Text>
          </View>
        )}

        {user_type === "driver" && (
          <View className="bg-primary p-4 rounded-lg shadow mb-4">
            <Text className="text-lg font-semibold text-white">
              Driver Details
            </Text>
            <Text className="text-sm text-background mt-2">
              License No.: {data.license_number}
            </Text>
            <Text className="text-sm text-background">
              Experience: {data.experience} years
            </Text>
            <Text className="text-sm text-background">
              Availability:{" "}
              {data.availability_status ? "Available" : "Unavailable"}
            </Text>
            {canEditDelete && (
              <>
                <Text className="text-sm text-background">
                  Total Earnings: {data.total_earnings}
                </Text>
                <Text className="text-sm text-background">
                  Remaining Earnings: {data.remaining_earnings}
                </Text>
                <Text className="text-sm text-background">
                  Date of Birth:{" "}
                  {data.date_of_birth
                    ? new Date(data.date_of_birth).toLocaleDateString()
                    : "N/A"}
                </Text>
              </>
            )}
            <Text className="text-sm text-background">
              Date Created: {new Date(data.date_created).toLocaleDateString()}
            </Text>
          </View>
        )}

        {user_type === "passenger" && (
          <View className="bg-primary p-4 rounded-lg shadow mb-4">
            <Text className="text-lg font-semibold text-white">
              Passenger Details
            </Text>
            <Text className="text-sm text-background mt-2">
              Address: {data.address || "N/A"}
            </Text>
            <Text className="text-sm text-background">
              Loyalty Points: {data.loyalty_points}
            </Text>
            <Text className="text-sm text-background">
              Emergency Contact Name: {data.emergency_contact_name || "N/A"}
            </Text>
            <Text className="text-sm text-background">
              Emergency Contact Number: {data.emergency_contact_number || "N/A"}
            </Text>
            <Text className="text-sm text-background">
              Preferred Language: {data.preferred_language || "N/A"}
            </Text>
          </View>
        )}

        {canEditDelete && (
          <View className="flex-row justify-around mt-4">
            <TouchableOpacity
              onPress={handleEditProfile}
              className="bg-accent p-2 rounded-lg"
            >
              <Text className="text-white font-semibold">Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDeleteProfile(token)}
              className="bg-red-500 p-2 rounded-lg"
            >
              <Text className="text-white font-semibold">Delete Profile</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
      <BottomMenu />
    </View>
  );
};

export default ProfileViewScreen;

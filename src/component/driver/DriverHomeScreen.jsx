import React, { useState, useCallback } from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Header from "../menu/Header";
import BottomMenu from "../menu/BottomMenu";
import ProfileCard from "../common/profile/ProfileCard";
import { handleApiError } from "../../utils/errorHandler";
import { orgUserProfile } from "../../api/users/request";
import LoadingAnimation from "../common/LoadingAnimation";
import { getDriOrgProfile } from "../../api/driver/request";

const DriverHomeScreen = ({ navigation, token }) => {
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [organizationData, setOrganizationData] = useState(null);

  const fetchProfileData = async () => {
    if (!token) return;
    setLoading(true);
    try {
      // Fetch user profile data
      const res = await orgUserProfile(token);
      console.log("res org", res.data);
      setProfileData(res.data);

      // Check if organization exists, then fetch organization data
      if (res.data.organization) {
        const organizationResponse = await getDriOrgProfile(token);
        console.log("res driver", organizationResponse.data);
        setOrganizationData(organizationResponse.data);
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProfileData();
    }, [token])
  );

  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <View className="flex-1 bg-background">
      <Header profileData={profileData} />
      <ScrollView className="flex-1 p-1">
        <ProfileCard
          profileData={profileData}
          loading={loading}
          user_type={"driver"}
          navigation={navigation}
        />

        {/* Horizontal Card Buttons */}
        <View className="flex-row justify-around mt-4 mb-6">
          <TouchableOpacity
            className="bg-primary p-4 rounded-lg items-center flex-1 mx-1"
            onPress={() => navigation.navigate("TripDetailView")}
          >
            <Text className="text-white text-lg">Trip</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-primary p-4 rounded-lg items-center flex-1 mx-1"
            onPress={() => navigation.navigate("Booking")}
          >
            <Text className="text-white text-lg">Booking</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-primary p-4 rounded-lg items-center flex-1 mx-1"
            onPress={() => navigation.navigate("VehicleDetail")}
          >
            <Text className="text-white text-lg">Vehicle</Text>
          </TouchableOpacity>
        </View>

        {organizationData ? (
          <ProfileCard
            profileData={organizationData}
            loading={loading}
            user_type={"organization"}
            secondary={true}
            navigation={navigation}
          />
        ) : (
          <View className="flex-1 justify-center items-center">
            <Text className="text-primary">No Organization found.</Text>
          </View>
        )}
      </ScrollView>
      <BottomMenu />
    </View>
  );
};

export default DriverHomeScreen;

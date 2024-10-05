// src/screens/PassengerHomeScreen.jsx

import React, { useState, useCallback } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getDriverProfile } from "../../api/driver/request";
import { handleApiError } from "../../utils/errorHandler";
import Header from "../menu/Header";
import BottomMenu from "../menu/BottomMenu";
import ProfileCard from "../common/profile/ProfileCard";
import LoadingAnimation from "../common/LoadingAnimation";
import HomeList from "./HomeList";
import { useDispatch } from "react-redux";
import { setProfile } from "../../app/features/profileSlice";

const PassengerHomeScreen = ({ navigation, token }) => {
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [tripData, setTripData] = useState([]); // State for trips
  const dispatch = useDispatch()
  const fetchProfileData = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await getDriverProfile(token);
      setProfileData(res.data);
      dispatch(setProfile(res.data))
      setTripData(res.data.vehicle_trip_data || []); // Assume trips are part of profile data
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
          user_type={"passenger"}
          navigation={navigation}
        />
        {/* <HomeList /> Pass trip data */}
        {/* Horizontal Card Buttons */}
        <View className="flex-row justify-around mt-4 mb-6">
          <TouchableOpacity 
            className="bg-primary p-4 rounded-lg items-center flex-1 mx-1" 
            onPress={() => navigation.navigate('CurrentTripStatus')}
          >
            <Text className="text-white text-lg">Check Trip</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity 
            className="bg-primary p-4 rounded-lg items-center flex-1 mx-1" 
            onPress={() => navigation.navigate('Booking')}
          >
            <Text className="text-white text-lg">Booking</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="bg-primary p-4 rounded-lg items-center flex-1 mx-1" 
            onPress={() => navigation.navigate('VehicleDetail')}
          >
            <Text className="text-white text-lg">Vehicle</Text>
          </TouchableOpacity> */}
        </View>

        <HomeList navigation={navigation}/>
      </ScrollView>
      <BottomMenu />
    </View>
  );
};

export default PassengerHomeScreen;

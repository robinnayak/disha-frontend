import React, { useState, useCallback, useEffect } from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import Header from "../menu/Header";
import BottomMenu from "../menu/BottomMenu";
import ProfileCard from "../common/profile/ProfileCard";
import { handleApiError } from "../../utils/errorHandler";
import { orgUserProfile } from "../../api/users/request";
import { useFocusEffect } from "@react-navigation/native";
import LoadingAnimation from "../common/LoadingAnimation";
import { getOrgDrivers } from "../../api/orgnization/request";

const OrganizationHomeScreen = ({ navigation, token }) => {
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [driversData, setDriversData] = useState([]);

  const fetchProfileData = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await orgUserProfile(token);
      setProfileData(res.data);
      const driversResponse = await getOrgDrivers(token);
      setDriversData(driversResponse.data);
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
        <ProfileCard profileData={profileData} loading={loading} user_type={"organization"} navigation={navigation} />
        
        {/* Horizontal Card Buttons */}
        <View className="flex-row justify-around mt-4 mb-6">
          <TouchableOpacity 
            className="bg-primary p-4 rounded-lg items-center flex-1 mx-1" 
            onPress={() => navigation.navigate('TripDetailView')}
          >
            <Text className="text-white text-lg">Trip</Text>
          </TouchableOpacity>
          <TouchableOpacity 
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
          </TouchableOpacity>
        </View>

        {driversData.length > 0 ? (
          driversData.map((driver, index) => (
            <ProfileCard 
              key={index} 
              profileData={driver} 
              loading={loading} 
              user_type={"driver"} 
              secondary={true} 
              navigation={navigation}
            />
          ))
        ) : (
          <View className="flex-1 justify-center items-center">
            <Text className="text-secondary-text">No drivers found.</Text>
          </View>
        )}
      </ScrollView>
      <BottomMenu />
    </View>
  );
};

export default OrganizationHomeScreen;

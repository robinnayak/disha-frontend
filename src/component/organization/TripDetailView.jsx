import { Text, View, FlatList, TouchableOpacity } from "react-native";
import React, { useCallback, useState } from "react";
import { handleApiError } from "../../utils/errorHandler";
import { getDailyEarnings } from "../../api/booking/request";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import BottomMenu from "../menu/BottomMenu";
import Header from "../menu/Header";
import GoBack from "../menu/GoBack";

const TripDetailView = ({ route }) => {
  const token = useSelector((state) => state.auth?.token?.token);
  const [dailyEarnings, setDailyEarnings] = useState([]);
  const navigation = useNavigation(); // Use navigation hook to navigate between screens

  useFocusEffect(
    useCallback(() => {
      fetchDailyEarnings();
    }, [token])
  );

  const fetchDailyEarnings = async () => {
    try {
      const response = await getDailyEarnings(token);
      setDailyEarnings(response.data); // Save the daily earnings data
      // console.log('daily earnings', response.data);
    } catch (error) {
      console.log("Error fetching daily earnings", error);
      handleApiError(error);
    }
  };

  const renderEarningsItem = ({ item }) => {
    return (
      <View className="p-4 mb-3 bg-gray-100 rounded-lg">
        <Text className="text-lg font-bold">Trip Date: {item.trip_date}</Text>
        <Text className="text-base">Total Earnings: {item.total_earnings}</Text>
        <Text className="text-base">
          Passengers: {item.num_passengers_on_that_day}
        </Text>

        <View className="mt-2">
          <Text className="text-base">
            Trip: {item.trip?.from_location} to {item.trip?.to_location}
          </Text>
          <Text className="text-base">Driver: {item.trip?.driver}</Text>
          <Text className="text-base">
            Vehicle: {item.trip?.vehicle_registration_number}
          </Text>
        </View>

        {/* Booking Information
        {item.bookings?.map((booking) => (
          <View key={booking.id} className="mt-2 p-2 bg-white rounded-lg">
            <Text className="text-base">Booking ID: {booking.booking_id}</Text>
            <Text className="text-base">Passenger: {booking.passenger_username}</Text>
            <Text className="text-base">
              Seats: {booking.seats?.map(seat => seat.seat_number).join(', ')}
            </Text>
            <Text className="text-base">Price: {booking.price}</Text>
          </View>
        ))} */}

        {/* Button to View Detailed Earnings */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("DailyEarningsDetail", { earningsData: item })
          }
          className="mt-4 bg-blue-500 rounded-lg py-2 px-4"
        >
          <Text className="text-white text-center">View Detailed Earnings</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View className="flex-1 p-4 bg-white">
      <GoBack navigation={navigation}/>
      <Text className="text-2xl font-bold mb-4">Daily Earnings</Text>
      <FlatList
        data={dailyEarnings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderEarningsItem}
        contentContainerStyle={{ paddingBottom: 16 }}
        ListEmptyComponent={
          <Text className="text-center text-lg text-gray-500">
            No daily earnings
          </Text>
        }
      />
    </View>
  );
};

export default TripDetailView;

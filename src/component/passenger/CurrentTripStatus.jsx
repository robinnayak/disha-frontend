import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux"; 
import { getOngoingTrip } from "../../api/passener/request";
import GoBack from "../menu/GoBack";

const CurrentTripStatus = () => {
  const [trips, setTrips] = useState([]);
  const navigation = useNavigation();
  const token = useSelector((state) => state.auth?.token?.token);

  useEffect(() => {
    const fetchCurrentTrip = async () => {
      try {
        const response = await getOngoingTrip(token);
        // console.log("trip data", response.data);
        setTrips(response.data)
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchCurrentTrip();
  }, []);
  // console.log(trips.length)
  if (!trips.length) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg font-semibold">No Trips...</Text>
      </View>
    );
  }

  return (
    <View className='flex-1'>
  <GoBack navigation={navigation} />
    <ScrollView className="p-4 bg-gray-100">
      {trips.map((trip, index) => (
        <View
          key={trip.booking_id}
          className="mb-4 p-4 bg-white rounded-lg shadow-lg"
        >
          <Text className="text-xl font-bold mb-2">Trip {index + 1} Status</Text>

          <Text className="text-gray-700 mb-1">
            From: {trip.trip_from_location}
          </Text>
          <Text className="text-gray-700 mb-1">To: {trip.trip_to_location}</Text>
          <Text className="text-gray-700 mb-1">Date: {trip.trip_datetime}</Text>
          <Text className="text-gray-700 mb-1">
            Passengers: {trip.num_passengers}
          </Text>

          <View className="my-4">
            <Text className="font-semibold">Seats:</Text>
            {trip.seats.map((seat, seatIndex) => (
              <Text key={seat.id} className="text-gray-600">
                Seat {seat.seat_number} (Vehicle {seat.vehicle_registration_number})
              </Text>
            ))}
          </View>

          <Text className="text-green-700 font-semibold">Price: ₹{trip.price}</Text>
          <Text className="text-warning-text font-semibold">{trip.is_completed? "completed" : "Not Completed"}</Text>

          <TouchableOpacity
            className="mt-4 bg-blue-500 p-3 rounded-lg"
            onPress={() => navigation.navigate("CurrentTripDetail", { trip })}
          >
            <Text className="text-white text-center">View Details</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
    </View>
  );
};

export default CurrentTripStatus;

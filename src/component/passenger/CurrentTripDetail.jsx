import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";

// Enable Layout Animation for Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const CurrentTripDetail = ({ route }) => {
  const trip = route.params?.trip;
  const [timeRemaining, setTimeRemaining] = useState("");
  const [isTripCompleted, setIsTripCompleted] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    if (trip) {
      LayoutAnimation.easeInEaseOut(); // Trigger animation
      calculateTimeRemaining(trip.start_datetime);

      const interval = setInterval(() => {
        calculateTimeRemaining(trip.start_datetime);
      }, 1000);

      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [trip]);

  const calculateTimeRemaining = (startDatetime) => {
    const now = moment(); // Current time
    const tripStart = moment(startDatetime); // Trip start time
    const duration = moment.duration(tripStart.diff(now));

    if (duration.asSeconds() <= 0) {
      setTimeRemaining("00:00:00");
      setIsTripCompleted(true);
      return;
    }

    const hours = String(Math.floor(duration.asHours())).padStart(2, "0");
    const minutes = String(duration.minutes()).padStart(2, "0");
    const seconds = String(duration.seconds()).padStart(2, "0");

    setTimeRemaining(`${hours}:${minutes}:${seconds}`);
  };

  if (!trip) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-lg font-semibold">Loading Trip Details...</Text>
      </View>
    );
  }

  return (
    <View className="p-4 bg-gray-50 rounded-lg shadow-lg mx-4 mt-6">
      <Text className="text-2xl font-bold mb-4 text-center text-indigo-600">
        Trip Details
      </Text>

      <View className="mb-4 border-b-2 border-gray-200 pb-2">
        <Text className="text-gray-700 mb-1">
          <Text className="font-semibold">Booking ID:</Text> {trip.booking_id}
        </Text>

        <Text className="text-gray-700 mb-1">
          <Text className="font-semibold">Passenger Username:</Text>{" "}
          {trip.passenger_username}
        </Text>

        <Text className="text-gray-700 mb-1">
          <Text className="font-semibold">From:</Text> {trip.trip_from_location}
        </Text>

        <Text className="text-gray-700 mb-1">
          <Text className="font-semibold">To:</Text> {trip.trip_to_location}
        </Text>

        <Text className="text-gray-700 mb-1">
          <Text className="font-semibold">Trip Date:</Text> {trip.trip_datetime}
        </Text>

        <Text className="text-gray-700 mb-1">
          <Text className="font-semibold">Start Time:</Text>{" "}
          {moment(trip.start_datetime).format("MMMM Do YYYY, h:mm:ss a")}
        </Text>
      </View>

      <View className="mb-4 border-b-2 border-gray-200 pb-2">
        <Text className="font-semibold text-lg mb-2">Seats:</Text>
        {trip.seats.map((seat) => (
          <Text key={seat.id} className="text-gray-600 mb-1">
            Seat {seat.seat_number} (Vehicle {seat.vehicle_registration_number})
          </Text>
        ))}
      </View>

      <View className="mb-4">
        <Text className="text-green-700 text-lg">
          Total Price: ₹{trip.price}
        </Text>

        <Text className="text-blue-700 mb-4 text-lg">
          Price Per Person: ₹{trip.price_per_person}
        </Text>
      </View>

      <View className="mb-4">
        <Text
          className={`text-lg font-semibold ${
            trip.is_completed ? "text-red-600" : "text-green-600"
          }`}
        >
          {trip.is_completed ? "Trip Completed" : "Trip Ongoing"}
        </Text>
        {isTripCompleted ? (
          <Text className="text-red-700 text-lg font-semibold text-center mt-4">
            Trip Completed
          </Text>
        ) : (
          <Text className="text-gray-700 text-lg font-semibold text-center mt-4">
            Time Remaining: {timeRemaining}
          </Text>
        )}
      </View>

      <View className="bg-indigo-100 p-4 rounded-lg shadow-md">
        <Text className="text-gray-700 mb-4">
          <Text className="font-semibold">Is Confirmed:</Text>{" "}
          {trip.is_confirmed ? "Yes" : "No"}
        </Text>

        <Text className="text-gray-700 mb-4">
          <Text className="font-semibold">Is Paid:</Text>{" "}
          {trip.is_paid ? "Yes" : "No"}
        </Text>
      </View>

      <TouchableOpacity
        className="mt-6 bg-indigo-600 p-4 rounded-lg"
        onPress={() => navigation.goBack()}
      >
        <Text className="text-white text-center text-lg font-bold">
          Go Back
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CurrentTripDetail;

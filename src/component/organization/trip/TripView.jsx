import { Text, TouchableOpacity, View, Animated, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons"; // Ensure this is installed
import moment from "moment";
import axios from "axios"; // Install axios if not already
import { updateTripCompleted } from "../../../api/driver/request";
import { postDailyEarnings } from "../../../api/booking/request"; // Import the postDailyEarnings function
import { handleApiError } from "../../../utils/errorHandler";
import { useSelector } from "react-redux";
import { showMessage } from "react-native-flash-message";
import { deleteTripData } from "../../../api/orgnization/request";

const TripView = ({ route, navigation }) => {
  const trip = route.params?.trip;
  const token = useSelector((state) => state.auth.token.token);

  const {
    vehicle_type,
    driver,
    from_location,
    to_location,
    end_datetime,
    license_plate_number,
    distance,
    duration,
    passenger_count,
    total_earnings,
    is_completed,
    is_reverese_trip,
    trip_id,
  } = trip;

  const [timeLeft, setTimeLeft] = useState({});
  const [tripCompleted, setTripCompleted] = useState(is_completed);
  const [fadeAnim] = useState(new Animated.Value(0)); // Animation for buttons

  // Calculate time left and handle completion state
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = moment();
      const end = moment(end_datetime);
      const duration = moment.duration(end.diff(now));

      if (duration.asSeconds() <= 0 || tripCompleted) {
        if (!tripCompleted) {
          // Mark trip as completed once time runs out
          handleCompleteTrip(true);
        }
        return;
      }

      setTimeLeft({
        hours: Math.floor(duration.asHours()),
        minutes: duration.minutes(),
        seconds: duration.seconds(),
      });
    };

    const timer = setInterval(() => calculateTimeLeft(), 1000);

    return () => clearInterval(timer);
  }, [end_datetime, tripCompleted]);

  // Animation for buttons
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  // Handle API call to set trip as completed or reset
  const handleCompleteTrip = async (completedStatus) => {
    try {
      const res = await updateTripCompleted(token, {
        trip_id: trip_id,
        is_completed: completedStatus,
      });

      setTripCompleted(completedStatus);
      Alert.alert(
        "Success",
        `Trip ${completedStatus ? "completed" : "reset"} successfully.`
      );
      // navigation.goBack(); // Navigate back after completion
    } catch (error) {
      console.error("Error updating trip status:", error);
      handleApiError(error);
    }
  };

  // Handle Reset Trip
  const handleResetTrip = () => {
    Alert.alert("Reset Under Maintenance...");
  };

  // Handle Delete Trip
  const handleDeleteTrip =async () => {

    console.log("Trip deleted",trip_id);
    try{
      const res = await deleteTripData(token,trip_id)
      console.log("deleted trip..", res);
      showMessage(
        {
          message: "Trip deleted successfully",
          type: "success",
        }
      )
      navigation.goBack(); // Navigate back after deleting the trip
    }
      catch (error){
        console.error("Error deleting trip:", error);
        handleApiError(error);
      }
  };

  // Handle Daily Earnings
  const handleDailyEarnings = async () => {
    try {
      const res = await postDailyEarnings(token, {
        trip_id: trip_id, // Send the trip ID for daily earnings
      });
      console.log("daily earnings", res.data.data);
      navigation.navigate("TripDetailView", {
        daily_earnings: res.data.data,
      });
    } catch (error) {
      console.error("Error posting daily earnings:", error);
      handleApiError(error);
    }
  };

  return (
    <View className="bg-primary p-4 rounded-lg shadow-lg border border-accent mb-4">
      <Text className="text-white text-lg font-bold mb-4">
        {vehicle_type.toUpperCase()} Trip
      </Text>

      {/* Vehicle and Driver Info */}
      <View className="flex-row justify-between mb-2">
        <Text className="text-secondary-text">Driver: {driver}</Text>
        <Text className="text-secondary-text">
          Vehicle: {license_plate_number}
        </Text>
      </View>

      {/* Trip Details */}
      <Text className="text-gray-300">
        From: {from_location} → To: {to_location}
      </Text>
      <Text className="text-gray-300">Distance: {distance} km</Text>
      <Text className="text-gray-300">Duration: {duration}</Text>
      <Text className="text-gray-300">Passenger Count: {passenger_count}</Text>
      <Text className="text-gray-300">Total Earnings: ${total_earnings}</Text>
      <Text className="text-yellow-400">
        {tripCompleted ? "Trip Completed" : "Trip Not Completed"}
      </Text>
      <Text className="text-gray-300">
        Reverse Trip: {is_reverese_trip ? "Yes" : "No"}
      </Text>

      {/* Timer or Completed Trip */}
      {tripCompleted ? (
        <Text className="text-success-text text-lg font-semibold mt-4">
          Trip Ended
        </Text>
      ) : (
        <View className="flex-row items-center mt-4">
          <Ionicons name="timer-outline" size={24} color="white" />
          <Text className="text-white text-lg font-semibold ml-2">
            Time Left:{" "}
            {`${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}
          </Text>
        </View>
      )}

      {/* Buttons */}
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ scale: fadeAnim }],
        }}
        className="mt-4"
      >
        {/* If trip is completed, show "Reset Trip" button */}
        {tripCompleted ? (
          <>
            <TouchableOpacity
              className="bg-accent p-3 rounded-lg mt-4"
              onPress={() => handleResetTrip(false)} // Reset Trip
            >
              <Text className="text-white font-bold text-center">
                Reset Trip
              </Text>
            </TouchableOpacity>

            {/* Daily Earnings Button */}
            <TouchableOpacity
              className="bg-blue-500 p-3 rounded-lg mt-4"
              onPress={handleDailyEarnings} // Call daily earnings function
            >
              <Text className="text-white font-bold text-center">
                Daily Earnings
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          // If trip is not completed, show "Complete Trip" button
          <TouchableOpacity
            className="bg-green-500 p-3 rounded-lg mt-4"
            onPress={() => handleCompleteTrip(true)} // Complete Trip
          >
            <Text className="text-white font-bold text-center">
              Complete Trip
            </Text>
          </TouchableOpacity>
        )}

        {/* Delete Trip Button */}
        <TouchableOpacity
          className="bg-red-500 p-3 rounded-lg mt-4"
          onPress={handleDeleteTrip}
        >
          <Text className="text-white font-bold text-center">Delete Trip</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default TripView;

import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Feather } from "@expo/vector-icons"; // Optional: Using Feather icons for icons
import { Animated } from "react-native";
import GoBack from "../../menu/GoBack";
import { useNavigation } from "@react-navigation/native";

const BookingDetail = ({ route }) => {
  const booking = route.params?.booking_data;
  // console.log("bookings",booking)
  const navigation = useNavigation();
  // Animation for the view
  const animation = new Animated.Value(0);

  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  // Define interpolations for animations
  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  // Determine trip status based on the trip date
  const isTripCompleted = new Date(booking.trip_datetime) < new Date();

  return (
    <Animated.View
      className="flex-1 p-4 bg-gray-100"
      style={{ transform: [{ translateY }], opacity }}
    >
    <GoBack navigation={navigation} />
      <View className="bg-white rounded-lg shadow-md p-6 mb-4 transition duration-300 ease-in-out transform hover:scale-105">
        <Text className="text-2xl font-bold text-gray-800 mb-2">
          Booking Details
        </Text>
        <Text className="text-lg font-semibold text-gray-600 mb-1">
          Booking ID: {booking.booking_id}
        </Text>
        <Text className="text-base text-gray-600 mb-1">
          Passenger: {booking.passenger_username}
        </Text>
        <Text className="text-base text-gray-600 mb-1">
          From: {booking.trip_from_location}
        </Text>
        <Text className="text-base text-gray-600 mb-1">
          To: {booking.trip_to_location}
        </Text>
        <Text className="text-base text-gray-600 mb-1">
          Trip Date: {new Date(booking.trip_datetime).toLocaleDateString()}
        </Text>
        <Text className="text-base text-gray-600 mb-1">
          Number of Passengers: {booking.num_passengers}
        </Text>
        <Text className="text-base text-gray-600 mb-1">
          Price per Person: {booking.price_per_person}
        </Text>
        <Text className="text-base text-gray-600 mb-1">
          Seats: {booking.seats.map((seat) => seat.seat_number).join(", ")}
        </Text>
        <Text className="text-base text-gray-600 mb-1">
          Vehicle: {booking.seats[0]?.vehicle_registration_number}
        </Text>
        <Text className="text-base text-gray-600 mb-1">
          Organization: {booking.seats[0]?.organization}
        </Text>
        <Text className="text-base text-gray-600 mb-1">
          Driver: {booking.seats[0]?.driver}
        </Text>
        <Text className="text-base text-gray-600 mb-1">
          Total Price: ₹{booking.price}
        </Text>

        {/* Payment and Trip Status */}
        <Text
          className={`text-base font-semibold mt-2 ${
            booking.is_paid ? "text-green-600" : "text-red-600"
          }`}
        >
          Payment Status: {booking.is_paid ? "Paid" : "Not Paid"}
        </Text>
        <Text
          className={`text-base font-semibold ${
            isTripCompleted ? "text-green-600" : "text-orange-600"
          }`}
        >
          Trip Status: {isTripCompleted ? "Completed" : "Upcoming"}
        </Text>

        <TouchableOpacity
          className="flex-row items-center mt-4 p-3 bg-blue-500 rounded-lg transition duration-200 ease-in-out transform hover:bg-blue-600"
          onPress={() =>
            Alert.alert(
              "More Actions",
              "Additional functionalities can be added here!"
            )
          }
        >
          <Feather name="info" size={20} color="white" className="mr-2" />
          <Text className="text-white font-semibold">More Info</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default BookingDetail;

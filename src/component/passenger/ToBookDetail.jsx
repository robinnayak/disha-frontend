import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { handleApiError } from "../../utils/errorHandler";
import { postBookingData } from "../../api/booking/request";
import { useSelector } from "react-redux";
import { showMessage } from "react-native-flash-message";
import GoBack from "../menu/GoBack";

const ToBookDetail = ({ route }) => {
  const navigation = useNavigation();
  const book_detail = route.params?.book_detail;
  const [selectedSeats, setSelectedSeats] = useState([]);
  const token = useSelector((state) => state.auth.token.token);

  const handleSeatSelection = (seatNumber, isOccupied) => {
    if (isOccupied) {
      Alert.alert("Seat is already booked.", "Please select a different seat.");
      return;
    }

    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const handlePayment = async () => {
    if (selectedSeats.length === 0) {
      Alert.alert("Please select at least one seat before proceeding.");
      return;
    }

    const bookingDetails = {
      trip_id: book_detail.trip_id,
      seats: selectedSeats.map((seatNumber) => ({ seat_number: seatNumber })), // Create seat objects
      is_confirmed: true,
    };

    // console.log("Booking Details Payload:", bookingDetails);

    try {
      const res = await postBookingData(token, bookingDetails); // Ensure this function sends the correct data format
      // console.log("id", res.data);
      showMessage({
        message: "Booking Confirmed",
        type: "success",
      });
      navigation.navigate("Payment", {
        booking_data: res.data.data,
        token: token,
      });
    } catch (err) {
      console.log("Error in booking: ", err.response ? err.response.data : err);
      handleApiError(err);
    }
  };

  const getSeatColor = (seat) => {
    if (seat.is_occupied) {
      return "bg-red-500"; // Booked/Occupied seat
    } else if (selectedSeats.includes(seat.seat_number)) {
      return "bg-green-400"; // Selected seat
    } else {
      return "bg-primary"; // Available seat
    }
  };

  return (
    <View className="bg-background flex-1">
      <GoBack navigation={navigation} />
      <View className="flex-1 p-4 bg-white">
        <Text className="text-lg font-bold mb-4">Trip Details</Text>
        <Text>From: {book_detail.from_location}</Text>
        <Text>To: {book_detail.to_location}</Text>
        <Text>
          Vehicle: {book_detail.vehicle_type} (
          {book_detail.vehicle_registration_number})
        </Text>
        <Text>Organization: {book_detail.organization}</Text>
        <Text>Driver: {book_detail.driver}</Text>
        <Text>Available Seats: {book_detail.available_seat}</Text>
        <Text>Trip Price: {book_detail.trip_price.price}</Text>

        <Text className="mt-4 mb-2">Select Your Seat(s):</Text>
        <FlatList
          data={book_detail.seats}
          numColumns={3}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              className={`p-2 m-2 rounded-lg ${getSeatColor(item)}`}
              onPress={() =>
                handleSeatSelection(item.seat_number, item.is_occupied)
              }
              disabled={item.is_occupied}
            >
              <Text className="text-center text-white">{item.seat_number}</Text>
            </TouchableOpacity>
          )}
        />

        <TouchableOpacity
          className="bg-blue-500 p-4 mt-4 rounded-md"
          onPress={handlePayment}
        >
          <Text className="text-white text-center font-bold">
            Pay & Confirm
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ToBookDetail;

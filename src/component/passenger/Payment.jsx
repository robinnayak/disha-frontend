import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { handleApiError } from "../../utils/errorHandler";
import { postPayment } from "../../api/passener/request";

const Payment = ({ route }) => {
  const navigation = useNavigation();
  const [paymentMethod, setPaymentMethod] = useState("mobile_wallet"); // Default payment method
  const { booking_data } = route.params;
  const token = route.params?.token;

  // Check if booking data exists
  if (!booking_data) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg font-bold">Booking not found</Text>
      </View>
    );
  }

  // Extract necessary details from booking data
  const {
    booking_id,
    trip_from_location,
    trip_to_location,
    trip_datetime,
    num_passengers,
    price,
    is_paid,
    seats,
  } = booking_data;

  const handlePayment = async () => {
    if (is_paid) {
      Alert.alert("Payment Already Made", "This booking has already been paid.");
      return;
    }

    const paymentData = {
      booking_id: booking_id,
      payment_method: paymentMethod,
    };

    try {
      const res = await postPayment(token, paymentData);
      // console.log("Payment response data:", res.data);
      navigation.navigate("PayStatus", { transaction_id: res.data.data.transaction_id });
    } catch (err) {
      console.error("Error processing payment", err);
      handleApiError(err); // Display the API error
      Alert.alert(
        "Payment Error",
        "There was an error processing your payment. Please try again."
      );
    }
  };

  const handleSkipPayment = () => {
    // Handle skipping payment and navigate to the next screen without changing is_paid
    Alert.alert(
      "Payment Skipped",
      "You have skipped the payment. You can complete the payment later.",
      [
        {
          text: "OK",
          onPress: () => navigation.navigate("Home"), // Redirect to Home after skipping payment
        },
      ]
    );
  };

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-lg font-bold mb-4">Payment</Text>
      <Text className="text-lg font-bold mb-4">Booking Id: {booking_id}</Text>

      {/* Trip and Booking Info */}
      <Text>From: {trip_from_location}</Text>
      <Text>To: {trip_to_location}</Text>
      <Text>Trip Date: {trip_datetime}</Text>
      <Text>
        Seats Booked: {seats.map((seat) => seat.seat_number).join(", ")}
      </Text>
      <Text>Number of Passengers: {num_passengers}</Text>
      <Text>Price per Seat: {(parseFloat(price)/num_passengers).toFixed(2)}</Text>
      <Text className="font-bold">
        Total Price: {(parseFloat(price)).toFixed(2)}
      </Text>

      {/* Payment Status */}
      <Text className="mt-4">
        Payment Status:{" "}
        {is_paid ? (
          <Text className="text-green-600 font-bold">Paid</Text>
        ) : (
          <Text className="text-red-600 font-bold">Not Paid</Text>
        )}
      </Text>

      {/* Payment Method */}
      {!is_paid && (
        <>
          <Text className="mt-4">Payment Method:</Text>
          <TextInput
            value={paymentMethod}
            onChangeText={setPaymentMethod}
            placeholder="Enter payment method (e.g., mobile_wallet)"
            className="border border-gray-300 p-2 rounded-md mb-4"
          />
        </>
      )}

      {/* Pay & Confirm Button */}
      {!is_paid && (
        <TouchableOpacity
          className="bg-blue-500 p-4 rounded-md mt-4"
          onPress={handlePayment}
        >
          <Text className="text-white text-center font-bold">Pay & Confirm</Text>
        </TouchableOpacity>
      )}

      {/* Skip Payment Button */}
      {!is_paid && (
        <TouchableOpacity
          className="bg-yellow-500 p-4 rounded-md mt-4"
          onPress={handleSkipPayment}
        >
          <Text className="text-white text-center font-bold">Skip Payment</Text>
        </TouchableOpacity>
      )}

      {is_paid && (
        <TouchableOpacity className="bg-gray-400 p-4 rounded-md mt-4" disabled={true}>
          <Text className="text-white text-center font-bold">Payment Complete</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Payment;

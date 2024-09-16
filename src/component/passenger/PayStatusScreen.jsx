import React, { useCallback, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { handleApiError } from "../../utils/errorHandler";
import { getPayStatus } from "../../api/passener/request";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native"; // For navigation
import LottieView from "lottie-react-native"; // for animations
import Loading from "../../images/loading.json";
import Success from "../../images/success.json";
import Pending from "../../images/pending.json";

const PayStatusScreen = ({ route }) => {
  const trans_id = route.params?.transaction_id;
  const token = useSelector((state) => state.auth.token.token);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [payData, setPayData] = useState(null);
  const [timer, setTimer] = useState(60); // 60 seconds timer

  const navigation = useNavigation(); // For navigation

  console.log("trans", trans_id);

  useFocusEffect(
    useCallback(() => {
      fetchPayStatus();
    }, [token])
  );

  const fetchPayStatus = async () => {
    try {
      const res = await getPayStatus(token, trans_id);
      console.log("fetch pay status", res.data);
      setPaymentStatus(res.data.is_successful);
      setPayData(res.data); // Assign the entire response data to payData
    } catch (error) {
      console.log("error", error);
      handleApiError(error);
    }
  };

  const handleRetryPayment = () => {
    Alert.alert("Retry Payment", "Would you like to retry the payment?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Retry",
        onPress: () => {
          // Implement retry payment logic here
          Alert.alert("Payment Retry", "Payment retry initiated.");
        },
      },
    ]);
  };

  // Function to handle button navigation based on payment status
  const handleNavigation = () => {
    if (paymentStatus) {
      navigation.navigate("Home"); // Navigate to Home if payment is successful
    } else {
      navigation.navigate("Pay"); // Navigate to Pay if payment is pending
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white p-4">
      <Text className="text-lg font-bold mb-4">Payment Status</Text>

      {paymentStatus === null ? (
        <LottieView
          source={Loading}
          autoPlay
          loop
          style={{ width: 150, height: 150 }}
        />
      ) : paymentStatus ? (
        <View className="justify-center items-center p-4">
          <LottieView
            source={Success}
            autoPlay
            loop={false}
            style={{ width: 150, height: 150 }}
          />
          <Text className="text-green-600 text-lg font-bold mt-4">
            Payment Successfully Done
          </Text>
          <Text className="text-gray-500 mt-2">Transaction ID: {trans_id}</Text>

          {/* Button to navigate to Home if payment is successful */}
          <TouchableOpacity
            onPress={handleNavigation}
            className="bg-blue-500 px-4 py-2 rounded-lg mt-4"
          >
            <Text className="text-white font-bold">Go to Home</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="justify-center items-center p-4">
          <LottieView
            source={Pending}
            autoPlay
            loop
            style={{ width: 150, height: 150 }}
          />
          <Text className="text-yellow-600 text-lg font-bold mt-4">
            Payment Pending
          </Text>
          <Text className="text-gray-500 mt-2">Transaction ID: {trans_id}</Text>
          
          {timer > 0 ? (
            <Text className="text-red-600 text-base font-semibold mt-2">
              Retry in {timer} seconds
            </Text>
          ) : (
            <TouchableOpacity
              onPress={handleRetryPayment}
              className="bg-blue-500 px-4 py-2 rounded-lg mt-4"
            >
              <Text className="text-white font-bold">Retry Payment</Text>
            </TouchableOpacity>
          )}

          {/* Button to navigate to Pay if payment is pending */}
          <TouchableOpacity
            onPress={handleNavigation}
            className="bg-blue-500 px-4 py-2 rounded-lg mt-4"
          >
            <Text className="text-white font-bold">Go to Pay</Text>
          </TouchableOpacity>
        </View>
      )}

      {payData && payData.booking ? (
        <View className="mt-6">
          <Text className="text-base font-semibold">Booking Details</Text>
          <Text className="text-gray-600">
            Trip: {payData.booking.trip_from_location} to{" "}
            {payData.booking.trip_to_location}
          </Text>
          <Text className="text-gray-600">
            Trip Date: {new Date(payData.booking.trip_datetime).toDateString()}
          </Text>
          <Text className="text-gray-600">
            Booking Date: {new Date(payData.booking.booking_datetime).toDateString()}
          </Text>
          <Text className="text-gray-600">
            Amount Paid: {payData.amount_paid}
          </Text>
          <Text className="text-gray-600">
            Seats:{" "}
            {payData.booking.seats && payData.booking.seats.length > 0
              ? payData.booking.seats.map((seat) => seat.seat_number).join(", ")
              : "No seats available"}
          </Text>
        </View>
      ) : (
        <Text className="text-red-500 mt-4">No booking data available</Text>
      )}
    </View>
  );
};

export default PayStatusScreen;

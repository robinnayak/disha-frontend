import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { getPaymentList } from "../../../api/passener/request";
import { postPayment } from "../../../api/passener/request";
import { handleApiError } from "../../../utils/errorHandler";

const PaymentList = ({ token, navigation }) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      return;
    }
    fetchPayments();
  }, [token]);

  const fetchPayments = async () => {
    try {
      const res = await getPaymentList(token);
      setPayments(res.data); // Assuming your API returns an array of payment data
      setLoading(false);
    } catch (error) {
      console.log("Error fetching payments", error);
      handleApiError(error);
      setLoading(false);
    }
  };

  const handlePayment = async (payment) => {
    console.log("payment",payment.transaction_id)
    navigation.navigate('PayStatus',{transaction_id:payment.transaction_id})
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg font-bold">Loading payments...</Text>
      </View>
    );
  }

  return (
    <View className="p-4">
      {payments.length === 0 ? (
        <Text className="text-gray-500 text-center">No payments available</Text>
      ) : (
        payments.map((payment) => (
          <View
            key={payment.id}
            className="border border-gray-300 p-3 rounded-md mb-4"
          >
            <Text className="text-lg font-semibold">
              Payment for Booking ID: {payment.booking.booking_id}
            </Text>
            <Text className="text-sm text-gray-600">
              Amount: {payment.amount_paid} | Status:{" "}
              {payment.booking.is_paid ? "Paid" : "Pending"}
            </Text>
            <Text className="text-sm text-gray-600">
              Date: {new Date(payment.payment_date).toLocaleDateString()}
            </Text>
            <Text className="text-sm text-gray-600">
              Trip: {payment.booking.trip_from_location} to{" "}
              {payment.booking.trip_to_location}
            </Text>

            <TouchableOpacity
              className={`${
                payment.is_successful
                  ? "bg-primary"
                  : "bg-blue-500"
              } mt-3 py-2 px-4 rounded-md`}
              
              onPress={() => handlePayment(payment)}
            >
              <Text className="text-white text-center font-bold">
                {payment.booking.is_paid ? "View Details" : "Pay Now"}
              </Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </View>
  );
};

export default PaymentList;

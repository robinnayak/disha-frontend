import { Text, View, ScrollView, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { getBookingData } from "../../../api/booking/request";

const BookingList = ({ token, navigation, userType }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (!token) return;
    fetchBooking();
  }, [token]);

  const fetchBooking = async () => {
    try {
      const res = await getBookingData(token);
      setBookings(res.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const handlePay = (booking) => {
    navigation.navigate("Payment", { booking_data: booking, token });
  };

  const handleViewTicket = (booking) => {
    navigation.navigate("BookingDetail", { booking_data: booking });
  };

  return (
    <View className="flex-1 p-4 bg-primary">
      <Text className="text-2xl text-primary-on-dark font-bold mb-6">
        Your Bookings
      </Text>
      <ScrollView contentContainerStyle={{ paddingBottom: 16 }}>
        {bookings.map((item) => (
          <View
            key={item.booking_id}
            className="p-4 bg-gray-100 rounded-lg mb-4"
          >
            <Text className="text-lg font-bold mb-2">
              Booking ID: {item.booking_id}
            </Text>
            <Text>From: {item.trip_from_location}</Text>
            <Text>To: {item.trip_to_location}</Text>
            <Text>Trip Date: {item.trip_datetime}</Text>
            <Text>
              Seats: {item.seats.map((seat) => seat.seat_number).join(", ")}
            </Text>
            <Text>Price: {item.price}</Text>
            <Text>Number of Passengers: {item.num_passengers}</Text>
            <Text className="font-semibold mt-2">
              Payment Status: {item.is_paid ? "Paid" : "Not Paid"}
            </Text>

            {item.is_paid ? (
              <TouchableOpacity
                className="bg-green-500 p-3 rounded-lg mt-4"
                onPress={() => handleViewTicket(item)}
              >
                <Text className="text-white text-center font-bold">
                  View Booking
                </Text>
              </TouchableOpacity>
            ) : userType === "organization" || userType === "driver" ? (
              <>
                <TouchableOpacity
                  className="bg-green-500 p-3 rounded-lg mt-4"
                  onPress={() => handleViewTicket(item)}
                >
                  <Text className="text-white text-center font-bold">
                    View Booking
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-blue-500 p-3 rounded-lg mt-4"
                  onPress={() => Alert.alert("Under maintenance")}
                >
                  <Text className="text-white text-center font-bold">
                    ALert Pay
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                className="bg-blue-500 p-3 rounded-lg mt-4"
                onPress={() => handlePay(item)}
              >
                <Text className="text-white text-center font-bold">Pay</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default BookingList;

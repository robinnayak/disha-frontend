import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import TicketList from "../../component/common/notificationCommon/TicketList";
import PaymentList from "../../component/common/notificationCommon/PaymentList";
import BookingList from "../../component/common/notificationCommon/BookingList"; // Import BookingList component
import BottomMenu from "../../component/menu/BottomMenu";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const NotificationScreen = () => {
  const [activeTab, setActiveTab] = useState("tickets");
  const token = useSelector((state) => state.auth.token.token);
  const user_type = useSelector((state) => state.auth.user_type);
  const navigation = useNavigation();
  const tickets = [
    // Sample tickets data
    {
      id: 1,
      title: "Ticket 1",
      from: "Dharan",
      to: "Kathmandu",
      date: "2024-09-12",
    },
    {
      id: 2,
      title: "Ticket 2",
      from: "Pokhara",
      to: "Butwal",
      date: "2024-09-14",
    },
  ];

  const payments = [
    // Sample payments data
    {
      id: 1,
      method: "Mobile Wallet",
      amount: "1500.00",
      status: true,
      date: "2024-09-01",
    },
    {
      id: 2,
      method: "Credit Card",
      amount: "2500.00",
      status: false,
      date: "2024-09-05",
    },
  ];

  const bookings = [
    // Sample bookings data
    {
      id: 1,
      booking_id: "BOK-DHAKAT-630214",
      from: "Dharan",
      to: "Kathmandu",
      date: "2024-09-12",
    },
    {
      id: 2,
      booking_id: "BOK-JANDHA-679725",
      from: "Janakpur",
      to: "Dharan",
      date: "2024-09-14",
    },
  ];

  return (
    <View className="flex-1 bg-gray-100">
      <ScrollView className="flex-1 p-4">
        {/* Tab Buttons */}
        <View className="flex-row justify-around mb-4">
          <TouchableOpacity
            className={`${
              activeTab === "tickets"
                ? "border-b-2 border-blue-500 bg-blue-500 text-white"
                : "bg-white text-blue-500"
            } pb-2 px-4 py-2 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105`}
            onPress={() => setActiveTab("tickets")}
          >
            <Text className="text-lg font-semibold">Tickets</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            className={`${
              activeTab === "payments"
                ? "border-b-2 border-green-500 bg-green-500 text-white"
                : "bg-white text-green-500"
            } pb-2 px-4 py-2 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105`}
            onPress={() => setActiveTab("payments")}
          >
            <Text className="text-lg font-semibold">Payments</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            className={`${
              activeTab === "bookings"
                ? "border-b-2 border-purple-500 bg-purple-500 text-white"
                : "bg-white text-purple-500"
            } pb-2 px-4 py-2 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105`}
            onPress={() => setActiveTab("bookings")}
          >
            <Text className="text-lg font-semibold">Bookings</Text>
          </TouchableOpacity>
        </View>

        {/* Render List Based on Active Tab */}
        {activeTab === "tickets" ? (
          <View className="bg-primary p-4 mb-4 rounded-lg shadow-lg">
            <TicketList
              tickets={tickets}
              navigation={navigation}
              token={token}
              userType={user_type}
            />
          </View>
        ) : activeTab === "bookings" ? (
          <View className="bg-primary p-4 mb-4 rounded-lg shadow-lg">
            <BookingList
              bookings={bookings}
              navigation={navigation}
              token={token}
              userType={user_type}
            />
          </View>
        ) : (
          <View className="bg-white p-4 mb-4 rounded-lg shadow-lg">
            <Text>Nothing...</Text>
          </View>
        )}
      </ScrollView>
      <BottomMenu />
    </View>
  );
};

export default NotificationScreen;

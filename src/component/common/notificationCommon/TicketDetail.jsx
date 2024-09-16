import React from "react";
import { View, Text, TouchableOpacity, Alert, Linking } from "react-native";
import { BASE_URL, MEDIA_URL,TICKET_URL } from "../../../api/base";
import { Feather } from "@expo/vector-icons"; // Optional: Using Feather icons for the button
import GoBack from "../../menu/GoBack";

const TicketDetail = ({ route,navigation }) => {
  const ticket = route.params?.ticket;

  // Complete URL for accessing the ticket file
  const ticketUrl = `${TICKET_URL}${decodeURIComponent(ticket.ticket_file)}`;

  const handleOpenTicketFile = () => {
    // Open the ticket file URL
    Linking.canOpenURL(ticketUrl)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(ticketUrl);
        } else {
          Alert.alert("Error", "No application found to open this URL.");
        }
      })
      .catch((err) => {
        console.error("Failed to open URL:", err);
        Alert.alert("Error", "Could not open the ticket URL.");
      });
  };

  return (
    <View className="flex-1 bg-background">
    <GoBack navigation={navigation} />
      <View className="flex-1 p-4 bg-gray-100">
        <View className="bg-white rounded-lg shadow-md p-6 mb-4 transition duration-300 ease-in-out transform hover:scale-105">
          <Text className="text-2xl font-bold text-gray-800 mb-2">
            Ticket Details
          </Text>
          <Text className="text-lg font-semibold text-gray-600 mb-1">
            Ticket ID: {ticket.ticket_id}
          </Text>
          <Text className="text-base text-gray-600 mb-1">
            Booking ID: {ticket.booking_id}
          </Text>
          <Text className="text-sm text-gray-500">Ticket File:</Text>

          <TouchableOpacity
            className="flex-row items-center mt-2 p-2 bg-blue-500 rounded-lg transition duration-200 ease-in-out transform hover:bg-blue-600"
            onPress={handleOpenTicketFile}
          >
            <Feather name="download" size={20} color="white" className="mr-2" />
            <Text className="text-white font-semibold">
              Open or Download Ticket
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TicketDetail;

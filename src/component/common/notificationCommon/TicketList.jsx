import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { getTicketData } from "../../../api/booking/request";
import { handleApiError } from "../../../utils/errorHandler";

const TicketList = ({ navigation, token }) => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    if (!token) return;
    fetchTicket();
  }, [token]);

  const fetchTicket = async () => {
    try {
      const res = await getTicketData(token);
      setTickets(res.data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
      handleApiError(error);
    }
  };

  const handleTicketClick = (ticket) => {
    navigation.navigate("TicketDetail", { ticket });
  };

  return (
    <View className="p-6 bg-primary flex-1">
      {/* Title */}
      <Text className="text-2xl font-bold text-primary-on-dark mb-4">
        Your Tickets
      </Text>

      <ScrollView>
        {tickets.length === 0 ? (
          <Text className="text-gray-500 text-center mt-10">
            No tickets available
          </Text>
        ) : (
          tickets.map((ticket) => (
            <TouchableOpacity
              key={ticket.id}
              className="bg-white p-4 mb-4 rounded-lg shadow-md"
              onPress={() => handleTicketClick(ticket)}
            >
              <Text className="text-lg font-semibold text-primary mb-1">
                {ticket.ticket_id}
              </Text>
              <Text className="text-sm text-gray-700 mb-1">
                Booking ID: {ticket.booking_id}
              </Text>
              <Text className="text-xs text-gray-500">
                Ticket ID: {ticket.id}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default TicketList;

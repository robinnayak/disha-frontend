import React from 'react';
import { Text, View, FlatList, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GoBack from '../../menu/GoBack';

const DailyEarningsDetail = ({ route }) => {
  const earningsData = route.params?.earningsData;
  const { trip, bookings, total_earnings, num_passengers_on_that_day } = earningsData;
  const navigation = useNavigation();

  const handleViewDetails = (item) => {
    // Navigate to a detailed view for the selected booking
    // navigation.navigate('BookingDetail', { booking: item });
    Alert.alert("Under Maintenance")
  };

  const renderBookingRow = ({ item }) => {
    const seats = item.seats.map(seat => seat.seat_number).join(', '); // Extract seat numbers

    return (
      <View className="flex-row justify-between items-center py-2 border-b border-gray-200 hover:bg-gray-50 transition duration-150 ease-in-out">
        <Text className="w-24 text-center text-sm">{item.booking_id}</Text>
        <Text className="w-24 text-center text-sm">{item.passenger_username}</Text>
        <Text className="w-24 text-center text-sm">{seats}</Text>
        <Text className="w-24 text-center text-sm">{item.price}</Text>
        <Text className="w-24 text-center text-sm">{item.num_passengers}</Text>
        <Text className="w-24 text-center text-sm">
          {new Date(item.booking_datetime).toLocaleDateString()} {new Date(item.booking_datetime).toLocaleTimeString()}
        </Text>
        {/* Display the trip_datetime from booking */}
        <Text className="w-24 text-center text-sm">
          {new Date(item.trip_datetime).toLocaleDateString()} 
        </Text>
        <Text className="w-24 text-center text-sm">{item.is_paid ? 'Paid' : 'Unpaid'}</Text>

        {/* View Button */}
        <TouchableOpacity
          className="bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded-lg ml-2"
          onPress={() => handleViewDetails(item)}
        >
          <Text className="text-sm font-bold text-white">View</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View className="flex-1 p-4 bg-white">
      {/* Trip Details Section */}
      <GoBack navigation={navigation} />
      <View className="mb-6">
        <Text className="text-xl font-bold mb-3">Trip Details</Text>
        <Text className="text-sm">From: {trip.from_location} → To: {trip.to_location}</Text>
        <Text className="text-sm">Organization: {trip.organization}</Text>
        <Text className="text-sm">Driver: {trip.driver}</Text>
        <Text className="text-sm">Vehicle: {trip.vehicle_registration_number}</Text>
        <Text className="text-sm">Total Earnings: {total_earnings}</Text>
        <Text className="text-sm">Passengers: {num_passengers_on_that_day}</Text>
        <Text className="text-sm">Trip Completed: {trip.is_completed ? 'Yes' : 'No'}</Text>
      </View>

      {/* Booking Details Table Header */}
      <ScrollView horizontal>
        <View className="flex-row justify-between py-2 bg-gray-100 border-b border-gray-300">
          <Text className="w-24 text-center font-bold text-sm">Booking ID</Text>
          <Text className="w-24 text-center font-bold text-sm">Passenger</Text>
          <Text className="w-24 text-center font-bold text-sm">Seats</Text>
          <Text className="w-24 text-center font-bold text-sm">Price</Text>
          <Text className="w-24 text-center font-bold text-sm">Passengers</Text>
          <Text className="w-24 text-center font-bold text-sm">Booking Time</Text>
          <Text className="w-24 text-center font-bold text-sm">Trip Date</Text>
          <Text className="w-24 text-center font-bold text-sm">Paid Status</Text>
          <Text className="w-24 text-center font-bold text-sm">Actions</Text>
        </View>
      </ScrollView>

      {/* Booking Details List */}
      <ScrollView horizontal>
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderBookingRow}
          contentContainerStyle={{ paddingBottom: 16 }}
          showsVerticalScrollIndicator={false}
        />
      </ScrollView>
    </View>
  );
};

export default DailyEarningsDetail;

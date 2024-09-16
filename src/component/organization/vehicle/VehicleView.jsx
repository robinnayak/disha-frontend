import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import defaultVehicleImage from "../../../images/vehicle.jpg"; // Make sure this path is correct
import { getVehicleViewData } from "../../../api/orgnization/request";
import { handleApiError } from "../../../utils/errorHandler";
import { useSelector } from "react-redux";
import { MEDIA_URL } from "../../../api/base";
import GoBack from "../../menu/GoBack";

const VehicleView = ({ route,navigation }) => {
  const vehicleID = route.params?.vehicleId;
  const token = useSelector((state) => state.auth?.token?.token);
  const [vehicleData, setVehicleData] = useState(null);

  useEffect(() => {
    if (token) {
      getVehicleData();
    } else {
      console.log("Token is not available");
    }
  }, [token]);

  const getVehicleData = async () => {
    try {
      const response = await getVehicleViewData(token, vehicleID);

      setVehicleData(response.data);
    } catch (error) {
      console.log(error);
      handleApiError(error);
    }
  };

  if (!vehicleData) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-secondary-text">Loading...</Text>
      </View>
    );
  }

  const { seats, vehicle, trip } = vehicleData || {};
  const imagePath = `${MEDIA_URL}/${vehicle.image}`;
  console.log("image", imagePath);
  // console.log("seats", seats);
  return (
    <ScrollView className="flex-1 bg-background p-4">
      {/* Back Button */}
      <GoBack navigation={navigation} />
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-primary text-xl font-bold">
          {vehicle.company_made} {vehicle.model}
        </Text>
        <Image source={{ uri: imagePath }} style={styles.vehicleImage} />
      </View>
      <View className="bg-primary p-4 rounded-lg shadow-md mb-4">
        <Text className="text-white font-bold mb-2">Vehicle Details</Text>
        <Text className="text-background">Type: {vehicle.vehicle_type}</Text>
        <Text className="text-background">Color: {vehicle.color}</Text>
        <Text className="text-background">
          License Plate: {vehicle.license_plate_number}
        </Text>
        <Text className="text-background">
          Seating Capacity: {vehicle.seating_capacity}
        </Text>
        <Text className="text-background">
          Available Seats: {vehicle.available_seat}
        </Text>
        <Text className="text-background">
          Insurance Expiry: {vehicle.insurance_expiry_date}
        </Text>
        <Text className="text-background">
          Fitness Certificate Expiry: {vehicle.fitness_certificate_expiry_date}
        </Text>
      </View>

      <View className="bg-primary p-4 rounded-lg shadow-md mb-4">
        <Text className="text-white font-bold mb-2">Trip Details</Text>
        <Text className="text-background">Trip ID: {trip.trip_id}</Text>
        <Text className="text-background">From: {trip.from_location}</Text>
        <Text className="text-background">To: {trip.to_location}</Text>
        <Text className="text-background">Start: {trip.start_datetime}</Text>
        <Text className="text-background">End: {trip.end_datetime}</Text>
        <Text className="text-background">Duration: {trip.duration}</Text>
      </View>

      <View className="bg-primary p-4 rounded-lg shadow-md">
        <Text className="text-white font-bold mb-2">Seats</Text>
        {seats.length > 0 ? (
          seats.map((seat) => (
            <View key={seat.id} className="flex-row justify-between mb-2">
              <Text className="text-background">
                Seat Number: {seat.seat_number}
              </Text>
              {/* <Text className={`${seat.is_occupied ? 'text-red-500' : 'text-green-500'}`}>
                {seat.is_occupied ? 'Occupied' : 'Available'}
              </Text> */}

              {seat.is_occupied ? (
                <Text className="text-red-500">Occupied</Text>
              ) : (
                <Text className="text-green-500">Available</Text>
              )}
            </View>
          ))
        ) : (
          <Text className="text-secondary-text">No seats available.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  vehicleImage: {
    width: 200,
    height: 100,
    borderRadius: 8,
  },
});

export default VehicleView;

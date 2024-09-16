import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { useSelector } from "react-redux";
import {
  getVehicleData,
  getTripData,
  deleteVehicleViewData,
} from "../../api/orgnization/request";
import { handleApiError } from "../../utils/errorHandler";
import { useFocusEffect } from "@react-navigation/native";
import { MEDIA_URL } from "../../api/base";
import Vehicle from "../../images/vehicle.jpg";
import { Ionicons } from "@expo/vector-icons"; // Ensure expo vector icons are installed
import BottomMenu from "../menu/BottomMenu";
import Header from "../menu/Header";

const VehicleDetailView = ({ navigation }) => {
  const token = useSelector((state) => state.auth?.token?.token);
  const [vehicles, setVehicles] = useState([]);
  const [vehicleTrips, setVehicleTrips] = useState({});
  const user_type = useSelector((state) => state.auth.user_type); // organization or driver

  const getData = async (token) => {
    try {
      const response = await getVehicleData(token);
      setVehicles(response.data);
      await handleTrips(token, response.data);
    } catch (error) {
      console.log(error);
      handleApiError(error);
    }
  };

  const handleTrips = async (token, vehicles) => {
    try {
      const tripResponse = await getTripData(token);
      const trips = tripResponse.data;

      const updatedVehicleTrips = {};
      vehicles.forEach((vehicle) => {
        const assignedTrip = trips.find(
          (trip) => trip.driver === vehicle.driver
        );
        if (assignedTrip) {
          updatedVehicleTrips[vehicle.registration_number] = assignedTrip; // Store the full trip data
        }
      });

      setVehicleTrips(updatedVehicleTrips);
    } catch (error) {
      console.log("Error fetching trip data", error);
      handleApiError(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (token) {
        getData(token);
      } else {
        console.log("Token is not available");
      }
    }, [token])
  );

  const handleView = (vehicle) => {
    navigation.navigate("Vehicle", { vehicleId: vehicle.registration_number });
  };

  const handleEdit = (vehicle) => {
    navigation.navigate("VehicleEdit", {
      vehicleId: vehicle.registration_number,
      vehicle: vehicle,
    });
  };

  const handleDelete = async (vehicleId) => {
    console.log("delete id", vehicleId);
    try {
      const res = await deleteVehicleViewData(token, vehicleId);
      console.log("Delete vehicle with ID:", res);
      Alert.alert("Success", "Vehicle deleted successfully!");
      navigation.navigate("Home");
    } catch (error) {
      console.log("Error deleting vehicle:", error);
      handleApiError(error);
    }
  };

  const handleTrip = (vehicle) => {
    const matchingTrip = vehicleTrips[vehicle.registration_number]; // Check if the trip exists for the vehicle

    if (matchingTrip) {
      navigation.navigate("TripView", {
        vehicleId: vehicle.registration_number,
        trip: matchingTrip, // Pass the trip data to ViewTrip
      });
    } else {
      navigation.navigate("TripForm", {
        vehicleId: vehicle.registration_number,
      });
    }
  };

  return (
    <View className="flex-1 bg-background">
      <Header />

      <ScrollView className="flex-1 bg-background p-4">
        {/* Show 'Add Vehicle' button for organization users */}

        {user_type === "organization" && (
          <TouchableOpacity
            className="bg-accent p-4 rounded-lg flex-row items-center justify-center mb-4"
            onPress={() => navigation.navigate("VehicleForm")}
          >
            <Ionicons name="add-circle-outline" size={24} color="#FFF" />
            <Text className="text-white font-semibold ml-2">Add Vehicle</Text>
          </TouchableOpacity>
        )}

        {vehicles.length > 0 ? (
          vehicles.map((vehicle, index) => (
            <View
              key={index}
              className="bg-primary p-4 mb-4 rounded-lg shadow-md"
            >
              <Image
                source={
                  vehicle.image
                    ? { uri: `${MEDIA_URL}/${vehicle.image}` }
                    : Vehicle
                }
                style={styles.vehicleImage}
              />
              <Text className="text-lg text-white font-semibold">
                {vehicle.model}
              </Text>
              <Text className="text-sm text-background">
                {vehicle.company_made} - {vehicle.license_plate_number}
              </Text>
              <Text className="text-sm text-background">
                Seating Capacity: {vehicle.seating_capacity}
              </Text>
              <Text className="text-sm text-background">
                Available Seats: {vehicle.available_seat}
              </Text>
              <Text className="text-sm text-background">
                Driver: {vehicle.driver}
              </Text>

              {/* Display Trip Info */}
              {vehicleTrips[vehicle.registration_number] ? (
                <Text className="text-sm text-green-400">
                  Trip:{" "}
                  {vehicleTrips[vehicle.registration_number].from_location} →{" "}
                  {vehicleTrips[vehicle.registration_number].to_location}
                </Text>
              ) : (
                <Text className="text-sm text-yellow-400">
                  No trip assigned
                </Text>
              )}

              {/* Actions */}
              <View className="flex-row justify-between mt-4">
                {/* View Button for all users */}
                <TouchableOpacity
                  className="bg-background p-2 rounded-lg"
                  onPress={() => handleView(vehicle)}
                >
                  <Text className="text-primary text-center">View</Text>
                </TouchableOpacity>

                {user_type === "organization" && (
                  <>
                    {/* Edit Button for organization users */}
                    <TouchableOpacity
                      className="bg-orange-400 p-2 rounded-lg"
                      onPress={() => handleEdit(vehicle)}
                    >
                      <Text className="text-primary-on-dark text-center">
                        Edit
                      </Text>
                    </TouchableOpacity>

                    {/* Delete Button for organization users */}
                    <TouchableOpacity
                      className="bg-red-500 p-2 rounded-lg"
                      onPress={() => handleDelete(vehicle.registration_number)}
                    >
                      <Text className="text-primary-on-dark text-center">
                        Delete
                      </Text>
                    </TouchableOpacity>
                  </>
                )}

                {/* Trip Button for both drivers and organizations */}
                <TouchableOpacity
                  className={`bg-${
                    vehicleTrips[vehicle.registration_number]
                      ? "green-500"
                      : "blue-500"
                  } p-2 rounded-lg`}
                  onPress={() => handleTrip(vehicle)}
                >
                  <Text className="text-primary-on-dark text-center">
                    {vehicleTrips[vehicle.registration_number]
                      ? "View Trip"
                      : "Add Trip"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <View className="flex-1 justify-center items-center">
            <Text className="text-primary">No vehicles found.</Text>
          </View>
        )}
      </ScrollView>
      <BottomMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  vehicleImage: {
    width: 200,
    height: 100,
    borderRadius: 8,
  },
});

export default VehicleDetailView;

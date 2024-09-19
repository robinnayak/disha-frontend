// components/HomeList.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import { useSelector } from "react-redux";
import { MEDIA_URL } from "../../api/base";
import { getHome } from "../../api/passener/request";
import { showMessage } from "react-native-flash-message";
import HomeFilters from "./HomeFilters";
import { tripChoices } from "../../utils/formchoices";
import ProfileImage from "../common/profile/ProfileImage";

const HomeList = ({ navigation }) => {
  const token = useSelector((state) => state.auth.token.token);
  const [trips, setTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    date: new Date().toISOString().split("T")[0], // Set default date to today in "YYYY-MM-DD" format
    origin: "",
    destination: "",
    availableSeats: "",
    organization: "",
    driver: "",
  });

  useEffect(() => {
    if (!token) return;
    fetchHome();
  }, [token]);

  const fetchHome = async () => {
    try {
      const res = await getHome(token);
      if (res.status === "success" && res.data && res.data.vehicle_trip_data) {
        setTrips(res.data.vehicle_trip_data);
        setFilteredTrips(res.data.vehicle_trip_data); // Initialize with full trip data
      } else {
        console.log("No trip data found.");
      }
    } catch (error) {
      console.log("Home list error:", error);
    } finally {
      setLoading(false);
    }
  };

  const stringIncludes = (mainStr, subStr) =>
    mainStr.toLowerCase().includes(subStr.toLowerCase());

  const applyFilters = () => {
    let updatedTrips = trips;
    if (filters.date) {
      updatedTrips = updatedTrips.filter(
        (trip) =>
          new Date(trip.start_datetime).toLocaleDateString() ===
          new Date(filters.date).toLocaleDateString()
      );
    }

    if (filters.origin) {
      updatedTrips = updatedTrips.filter((trip) =>
        stringIncludes(trip.from_location, filters.origin)
      );
    }

    if (filters.destination) {
      updatedTrips = updatedTrips.filter((trip) =>
        stringIncludes(trip.to_location, filters.destination)
      );
    }

    if (filters.availableSeats) {
      updatedTrips = updatedTrips.filter(
        (trip) => trip.available_seat >= Number(filters.availableSeats)
      );
    }

    if (filters.organization) {
      updatedTrips = updatedTrips.filter((trip) =>
        stringIncludes(trip.organization || "", filters.organization)
      );
    }

    if (filters.driver) {
      updatedTrips = updatedTrips.filter((trip) =>
        stringIncludes(trip.driver || "", filters.driver)
      );
    }

    setFilteredTrips(updatedTrips);
  };

  const clearFilters = () => {
    setFilters({
      date: "",
      origin: "",
      destination: "",
      availableSeats: "",
      organization: "",
      driver: "",
    });
    setFilteredTrips(trips); // Reset filteredTrips to the original full list
  };

  const handleBookingClick = (trip) => {
    navigation.navigate("ToBook", { book_detail: trip });
    showMessage({
      message: "Success",
      description: "Redirecting to book details",
      type: "success",
    });
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-lg text-primary">Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-4">
      <HomeFilters
        filters={filters}
        onFiltersChange={setFilters}
        onApplyFilters={applyFilters}
      />
      <Button title="Clear Filters" onPress={clearFilters} />
      <ScrollView className="flex-1 bg-gradient-to-b from-primary to-darker">
        {filteredTrips.length === 0 ? (
          <Text className="text-center text-lg text-secondary">
            No trips available.
          </Text>
        ) : (
          filteredTrips.map((trip) => {
            const tripDateTime = new Date(trip.start_datetime);
            const tripDate = tripDateTime.toLocaleDateString(); // Extract date
            const tripTime = tripDateTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }); // Extract time

            return (
              <View
                key={trip.id}
                className="bg-primary p-4 mb-6 rounded-lg shadow-md hover:bg-secondary hover:scale-[1.02] transition-transform duration-300 ease-in-out"
              >
              {/* <ProfileImage uri={trip.vehicle_image} loading={loading} width="full" height={36} /> */}
              {/* vehicle image display in list */}
                <Image
                  source={{ uri: `${trip.vehicle_image}` }}
                  className="w-full h-36 rounded-md mb-4"
                  resizeMode="cover"
                />
                <View>
                  <Text className="text-lg font-bold text-white mb-2">
                    {trip.vehicle_type}
                  </Text>
                  <Text className="text-sm text-secondary-text mb-1">
                    {trip.from_location} ➔ {trip.to_location}
                  </Text>
                  <View className="flex-row justify-between mb-2">
                    <Text className="text-sm text-secondary-text">{`Trip Date: ${tripDate}`}</Text>
                    <Text className="text-sm text-secondary-text">{`Trip Time: ${tripTime}`}</Text>
                  </View>
                  <Text className="text-sm text-secondary-text mb-1">
                    Available Seats: {trip.available_seat}
                  </Text>
                </View>
                <TouchableOpacity
                  className="mt-4 bg-accent p-2 rounded-md"
                  onPress={() => handleBookingClick(trip)}
                >
                  <Text className="text-white text-center">Book Now</Text>
                </TouchableOpacity>
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
};

export default HomeList;

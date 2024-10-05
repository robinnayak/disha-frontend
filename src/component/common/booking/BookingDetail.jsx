import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import GoBack from "../../menu/GoBack";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import ReviewForm from "./ReviewForm";
import { postReview } from "../../../api/users/request"; // Assuming this API function exists

const BookingDetail = ({ route }) => {
  const booking = route.params?.booking_data;
  const user_type = useSelector((state) => state.auth?.user_type);
  const token = useSelector((state) => state.auth?.token?.token);

  const [isReviewVisible, setReviewVisible] = useState(false);
  const [revieweeType, setRevieweeType] = useState(null);

  const navigation = useNavigation();
  const isTripCompleted = new Date(booking.trip_datetime) < new Date();

  const handleReviewPress = (type) => {
    setRevieweeType(type);
    setReviewVisible(true);
  };

  const hideReviewForm = () => {
    setReviewVisible(false);
  };

  const submitReview = async (revieweeType) => {
    let reviewData = {
      rating: 4,
      comment: "The service was excellent.",
    };

    if (user_type === "passenger") {
      if (revieweeType === "driver") {
        reviewData.reviewee_content_type = "driver";
        reviewData.reviewee_object_id = booking.driver_id;
      } else if (revieweeType === "organization") {
        reviewData.reviewee_content_type = "organization";
        reviewData.reviewee_object_id = booking.organization_id;
      }
    } else if (user_type === "organization") {
      if (revieweeType === "driver") {
        reviewData.reviewee_content_type = "driver";
        reviewData.reviewee_object_id = booking.driver_id;
      } else if (revieweeType === "passenger") {
        reviewData.reviewee_content_type = "passenger";
        reviewData.reviewee_object_id = booking.passenger_id;
      }
    } else if (user_type === "driver") {
      if (revieweeType === "organization") {
        reviewData.reviewee_content_type = "organization";
        reviewData.reviewee_object_id = booking.organization_id;
      } else if (revieweeType === "passenger") {
        reviewData.reviewee_content_type = "passenger";
        reviewData.reviewee_object_id = booking.passenger_id;
      }
    }

    try {
      const res = await postReview(token, reviewData);
      console.log(res.data)
      Alert.alert("Review Submitted", "Your review has been posted successfully.");
    } catch (error) {
      Alert.alert("Error", "Failed to submit the review.");
    }
  };

  return (
    <View className="flex-1 p-4 bg-gray-100">
      <GoBack navigation={navigation} />
      <ScrollView className="mt-4">
        <View className="bg-white rounded-lg shadow-md p-6 mb-4">
          <Text className="text-2xl font-bold text-gray-800 mb-2">Booking Details</Text>
          <Text className="text-lg font-semibold text-gray-600 mb-1">Booking ID: {booking.booking_id}</Text>
          <Text className="text-base text-gray-600 mb-1">Passenger: {booking.passenger_username}</Text>
          <Text className="text-base text-gray-600 mb-1">From: {booking.trip_from_location}</Text>
          <Text className="text-base text-gray-600 mb-1">To: {booking.trip_to_location}</Text>
          <Text className="text-base text-gray-600 mb-1">
            Trip Date: {new Date(booking.trip_datetime).toLocaleDateString()}
          </Text>
          <Text className="text-base text-gray-600 mb-1">Number of Passengers: {booking.num_passengers}</Text>
          <Text className="text-base text-gray-600 mb-1">Price per Person: ₹{booking.price_per_person}</Text>
          <Text className="text-base text-gray-600 mb-1">
            Seats: {booking.seats.map((seat) => seat.seat_number).join(", ")}
          </Text>
          <Text className="text-base text-gray-600 mb-1">
            Vehicle: {booking.seats[0]?.vehicle_registration_number}
          </Text>
          <Text className="text-base text-gray-600 mb-1">Organization: {booking.seats[0]?.organization}</Text>
          <Text className="text-base text-gray-600 mb-1">Driver: {booking.seats[0]?.driver}</Text>
          <Text className="text-base text-gray-600 mb-1">Total Price: ₹{booking.price}</Text>

          <Text
            className={`text-base font-semibold mt-2 ${
              booking.is_paid ? "text-green-600" : "text-red-600"
            }`}
          >
            Payment Status: {booking.is_paid ? "Paid" : "Not Paid"}
          </Text>
          <Text
            className={`text-base font-semibold ${
              isTripCompleted ? "text-green-600" : "text-orange-600"
            }`}
          >
            Trip Status: {isTripCompleted ? "Completed" : "Upcoming"}
          </Text>

          {user_type === "passenger" && (
            <>
              <TouchableOpacity
                className="flex-row items-center mt-4 p-3 bg-blue-500 rounded-lg"
                onPress={() => handleReviewPress("driver")}
              >
                <Feather name="star" size={20} color="white" />
                <Text className="text-white font-semibold ml-2">Review Driver</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-row items-center mt-4 p-3 bg-green-500 rounded-lg"
                onPress={() => handleReviewPress("organization")}
              >
                <Feather name="star" size={20} color="white" />
                <Text className="text-white font-semibold ml-2">Review Organization</Text>
              </TouchableOpacity>
            </>
          )}

          {user_type === "organization" && (
            <>
              <TouchableOpacity
                className="flex-row items-center mt-4 p-3 bg-blue-500 rounded-lg"
                onPress={() => handleReviewPress("driver")}
              >
                <Feather name="star" size={20} color="white" />
                <Text className="text-white font-semibold ml-2">Review Driver</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-row items-center mt-4 p-3 bg-green-500 rounded-lg"
                onPress={() => handleReviewPress("passenger")}
              >
                <Feather name="star" size={20} color="white" />
                <Text className="text-white font-semibold ml-2">Review Passenger</Text>
              </TouchableOpacity>
            </>
          )}

          {user_type === "driver" && (
            <>
              <TouchableOpacity
                className="flex-row items-center mt-4 p-3 bg-blue-500 rounded-lg"
                onPress={() => handleReviewPress("organization")}
              >
                <Feather name="star" size={20} color="white" />
                <Text className="text-white font-semibold ml-2">Review Organization</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-row items-center mt-4 p-3 bg-green-500 rounded-lg"
                onPress={() => handleReviewPress("passenger")}
              >
                <Feather name="star" size={20} color="white" />
                <Text className="text-white font-semibold ml-2">Review Passenger</Text>
              </TouchableOpacity>
            </>
          )}
          {isReviewVisible && (
            <ReviewForm
              revieweeContentType={revieweeType}
              revieweeObjectId={
                revieweeType === "driver"
                  ? booking.driver_id
                  : revieweeType === "organization"
                  ? booking.organization_id
                  : booking.passenger_id
              }
              onSuccess={hideReviewForm}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default BookingDetail;

import React, { useState } from "react";
import { View, TextInput, Button, Text, Alert } from "react-native";
import { useSelector } from "react-redux";
import { postReview } from "../../../api/users/request";

const ReviewForm = ({ revieweeContentType, revieweeObjectId, onSuccess }) => {
  const [rating, setRating] = useState(0); // Initial rating set to 0
  const [comment, setComment] = useState(""); // Initial comment set to empty
  const token = useSelector((state) => state.auth?.token?.token); // Get user token from Redux

  const handleSubmit = async () => {
    if (rating === 0 || comment.trim() === "") {
      Alert.alert("Error", "Please provide both rating and comment.");
      return;
    }

    const reviewData = {
      rating,
      comment,
      reviewee_content_type: revieweeContentType,
      reviewee_object_id: revieweeObjectId,
    };

    try {
      const response = await postReview(token, reviewData);
      console.log(response)
      Alert.alert("Success", "Review submitted successfully.");
      if (onSuccess) {
        onSuccess(); // Callback for successful submission (if needed)
      }
    } catch (error) {
      Alert.alert("Error", "Failed to submit review.");
      console.error("Review submission error:", error);
    }
  };

  return (
    <View style={{ padding: 16, backgroundColor: "white", borderRadius: 8 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Submit Your Review
      </Text>

      {/* Rating Input */}
      <Text style={{ fontSize: 16, marginBottom: 8 }}>Rating (1 to 5):</Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 4,
          padding: 8,
          marginBottom: 16,
        }}
        keyboardType="numeric"
        placeholder="Enter rating (1-5)"
        value={rating.toString()}
        onChangeText={(text) => setRating(parseInt(text) || 0)}
      />

      {/* Comment Input */}
      <Text style={{ fontSize: 16, marginBottom: 8 }}>Comment:</Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 4,
          padding: 8,
          marginBottom: 16,
          height: 100,
        }}
        multiline={true}
        placeholder="Enter your review comment"
        value={comment}
        onChangeText={(text) => setComment(text)}
      />

      {/* Submit Button */}
      <Button title="Submit Review" onPress={handleSubmit} color="#2196F3" />
    </View>
  );
};

export default ReviewForm;

import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  ActivityIndicator,
  Alert,
  TouchableOpacity
} from "react-native";
import React, { useState } from "react";
import SettingImageUpload from "./SettingImageUpload";
import CustomPicker from "../../commonFormComponent/CustomPicker";
import { useSelector } from "react-redux";
import GoBack from "../../../menu/GoBack";
import { postSupportRequest } from "../../../../api/users/request";
import { MEDIA_URL } from "../../../../api/base";

// Assuming `token`, `profileImage`, and `id` are passed as props
const SupportRequest = ({ profileImage, id, navigation }) => {
  const defaultImageUri = `${MEDIA_URL}/${profileImage}`; // Default image URL
  const email = useSelector((state) => state.auth?.user?.user.email); // Non-editable email
  const token = useSelector((state) => state.auth?.token?.token);
  const [subject, setSubject] = useState("");
  const [customSubject, setCustomSubject] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null); // Optional image
  const [loading, setLoading] = useState(false); // Loading state

  const SUBJECT_CHOICES = [
    { label: "Technical Issue", value: "Technical Issue" },
    { label: "Billing", value: "Billing" },
    { label: "Payment", value: "Payment" },
    { label: "Booking", value: "Booking" },
    { label: "Account Management", value: "Account Management" },
    { label: "Feedback", value: "Feedback" },
    { label: "Cancellation", value: "Cancellation" },
    { label: "Refund", value: "Refund" },
    { label: "Others", value: "Others" },
  ];

  const handleImageSelected = (imageUri) => {
    console.log("support image uri", imageUri);
    setImage(imageUri); // Image selection callback
  };

  const handleSubmit = async () => {
    if (subject && (subject !== "Others" || customSubject) && message) {
      try {
        setLoading(true); // Start loading

        // Create a FormData object
        const formData = new FormData();
        formData.append("email", email); // Non-editable email
        formData.append(
          "subject",
          subject === "Others" ? customSubject : subject
        ); // Handle custom subject
        formData.append("message", message); // Support message

        // Append the image if it exists
        if (image) {
          const imageExtension = image.split(".").pop(); // Get the file extension from the URI
          formData.append("image", {
            uri: image,
            name: `support_image.${imageExtension}`, // Create dynamic image name with extension
            type: `image/${imageExtension}`, // Set image type dynamically
          });
        }

        // Assuming postSupportRequest API handles file uploads properly
        const res = await postSupportRequest(token, formData);

        console.log(res.data); // Handle successful response
        setLoading(false); // Stop loading
        Alert.alert("Success", "Support request submitted successfully!");
        navigation.goBack(); // Navigate back on success
      } catch (error) {
        console.error(error);
        setLoading(false); // Stop loading on error
        Alert.alert("Error", "An error occurred. Please try again later.");
      }
    } else {
      Alert.alert("Validation Error", "Please fill out all required fields.");
    }
  };
  const handleViewPreviousTickets = () => {
    navigation.navigate("SupportRequestList"); // Navigate to a screen to show previous tickets
    // console.log("previous tickets")
  };
  return (
    <View className="flex-1">
      <GoBack navigation={navigation} />
      <ScrollView className="p-4 bg-background flex-1">
        {/* Title and Description */}
        {/* View Previous Tickets Button */}
        <TouchableOpacity
          onPress={handleViewPreviousTickets}
          className=" bg-green-300 p-2 mb-2 rounded-full"
        >
          <Text className="text-center text-primary">
            View Previous Tickets
          </Text>
        </TouchableOpacity>
        <View className="mb-6">
          <Text className="text-primary text-2xl font-bold text-center">
            Submit a Support Request
          </Text>
          <Text className="text-secondary-text text-center mt-2">
            Let us know your issue, and we will get back to you as soon as
            possible.
          </Text>
        </View>

        {/* Non-editable Email Field */}
        <View className="mb-4">
          <Text className="text-primary mb-2">Email (Non-editable)</Text>
          <TextInput
            value={email}
            editable={false}
            className="p-2 border text-gray-500 border-secondary rounded bg-gray-200"
          />
        </View>

        {/* CustomPicker for Subject */}
        <CustomPicker
          label="Subject"
          selectedValue={subject}
          onValueChange={(value) => setSubject(value)}
          options={SUBJECT_CHOICES}
          placeholder="Select a Subject"
          textColor="primary"
          font="sm"
        />

        {/* Custom Subject Input (if 'Others' is selected) */}
        {subject === "Others" && (
          <View className="mb-4">
            <Text className="text-primary mb-2">Custom Subject</Text>
            <TextInput
              value={customSubject}
              onChangeText={setCustomSubject}
              placeholder="Enter your custom subject"
              className="p-2 border border-secondary rounded"
            />
          </View>
        )}

        {/* Message Field */}
        <View className="mb-6">
          <Text className="text-primary mb-2">Message</Text>
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Describe your issue"
            multiline
            numberOfLines={5}
            className="p-2 border border-secondary rounded"
          />
        </View>

        {/* Image Upload (Optional) */}
        <SettingImageUpload
          onImageSelected={handleImageSelected}
          defaultImageUri={defaultImageUri}
        />

        {/* Submit Button */}
        {loading ? (
          <ActivityIndicator size="large" color="#3498db" />
        ) : (
          <Button
            title="Submit Request"
            onPress={handleSubmit}
            className="bg-accent text-white py-2 px-4 rounded-full"
          />
        )}
      </ScrollView>
    </View>
  );
};

export default SupportRequest;

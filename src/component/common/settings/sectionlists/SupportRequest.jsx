import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import SettingImageUpload from "./SettingImageUpload"; // Assuming the ImageUpload component is in the same folder
import { MEDIA_URL } from "../../../../api/base";
import CustomPicker from "../../commonFormComponent/CustomPicker";
import { useSelector } from "react-redux";
import GoBack from "../../../menu/GoBack";

const SupportRequest = ({ token, profileImage, id, navigation }) => {
  const defaultImageUri = `${MEDIA_URL}/${profileImage}`;
  const email = useSelector((state) => state.auth?.user?.user.email);

  const [subject, setSubject] = useState("");
  const [customSubject, setCustomSubject] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

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
    setImage(imageUri);
  };

  const handleSubmit = () => {
    if (subject && (subject !== "Others" || customSubject) && message) {
      console.log("Support request submitted:", {
        email, // Include the non-editable email in the form submission
        subject: subject === "Others" ? customSubject : subject,
        message,
        image,
      });
      // You can handle your form submission logic here
    } else {
      alert("Please fill out all required fields.");
    }
  };

  return (
    <View className="flex-1">
    <GoBack navigation={navigation} />
      <ScrollView className="p-4 bg-background flex-1">
        {/* Title and Description */}
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
            editable={false} // Makes the field non-editable
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

        {/* Reusable Image Upload Component */}
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

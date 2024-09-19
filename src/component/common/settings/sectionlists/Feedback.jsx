import { View, Text, TextInput, Button, ScrollView, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import SettingImageUpload from './SettingImageUpload';  // Assuming you want image upload
import CustomPicker from '../../commonFormComponent/CustomPicker';

const Feedback = ({ token }) => {
  const email = useSelector(state => state.auth?.user?.user.email);  // Fetch user's email from Redux store
  const [feedbackType, setFeedbackType] = useState('');
  const [comments, setComments] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const FEEDBACK_CHOICES = [
    { label: 'Positive', value: 'positive' },
    { label: 'Negative', value: 'negative' },
  ];

  const handleImageSelected = (imageUri) => {
    setImage(imageUri);
  };

  const handleSubmit = () => {
    if (feedbackType && comments) {
      console.log('Feedback submitted:', {
        email,
        feedbackType,
        comments,
        image,
      });
      // Handle your feedback submission logic here (e.g., POST request to the server)
    } else {
      alert('Please fill out all required fields.');
    }
  };

  return (
    <ScrollView className="p-4 bg-background flex-1">
      {/* Title */}
      <View className="mb-6">
        <Text className="text-primary text-2xl font-bold text-center">Submit Feedback</Text>
        <Text className="text-secondary-text text-center mt-2">
          We value your feedback! Let us know your thoughts and help us improve.
        </Text>
      </View>

      {/* Feedback Type Picker */}
      <CustomPicker
        label="Feedback Type"
        selectedValue={feedbackType}
        onValueChange={(value) => setFeedbackType(value)}
        options={FEEDBACK_CHOICES}
        placeholder="Select Feedback Type"
        textColor='primary'
        font='light'
      />

      {/* Comments Input */}
      <View className="mb-4">
        <Text className="text-primary mb-2">Comments</Text>
        <TextInput
          value={comments}
          onChangeText={setComments}
          placeholder="Write your feedback here"
          multiline
          numberOfLines={5}
          className="p-2 border border-secondary rounded"
        />
      </View>

      {/* Image Upload (Optional) */}
      <SettingImageUpload onImageSelected={handleImageSelected} />

      {/* Submit Button */}
      {loading ? (
        <ActivityIndicator size="large" color="#3498db" />
      ) : (
        <Button title="Submit Feedback" onPress={handleSubmit} className="bg-accent text-white py-2 px-4 rounded-full" />
      )}
    </ScrollView>
  );
};

export default Feedback;

import { View, Text, TextInput, Button, ScrollView, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CustomPicker from '../../commonFormComponent/CustomPicker';  // Custom picker component for selecting feedback type
import { postFeedback } from '../../../../api/users/request';  // Assuming the post request is handled here
import { showMessage } from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/native';

const Feedback = () => {
  const [feedbackType, setFeedbackType] = useState('');
  const [comments, setComments] = useState('');
  const [loading, setLoading] = useState(false);
  const token = useSelector(state=>state.auth?.token?.token)
  const navigation = useNavigation()
  // Updated feedback choices: 'Acknowledgment' and 'Improvement'
  const FEEDBACK_CHOICES = [
    { label: 'Acknowledgment', value: 'acknowledgment' },
    { label: 'Improvement', value: 'improvement' },
  ];

  const handleSubmit = async () => {
    if (feedbackType && comments) {
      setLoading(true);

      // Create the feedback data
      const feedbackData = {
        feedback_type: feedbackType,
        comments: comments,
      };

      try {
        // Call the postFeedback API
        const res = await postFeedback(token, feedbackData);
        console.log('Feedback submitted:', res);

        // Clear the form after successful submission
        setFeedbackType('');
        setComments('');
        showMessage(
          {
            message: "Feedback submitted successfully",
            type: "success",
            duration:3000
          }
        )
        navigation.goBack()
      } catch (error) {
        console.error('Error submitting feedback:', error);
        alert('Error submitting feedback. Please try again.');
      } finally {
        setLoading(false);
      }
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
        textColor="primary"
        font="light"
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

      {/* Submit Button */}
      {loading ? (
        <ActivityIndicator size="large" color="#3498db" />
      ) : (
        <Button
          title="Submit Feedback"
          onPress={handleSubmit}
          className="bg-accent text-white py-2 px-4 rounded-full"
        />
      )}
    </ScrollView>
  );
};

export default Feedback;

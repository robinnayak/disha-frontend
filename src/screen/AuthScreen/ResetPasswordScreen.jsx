import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { handleApiError } from '../../utils/errorHandler';
import axios from 'axios';

const ResetPasswordScreen = ({ route, navigation }) => {
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [loading, setLoading] = useState(false); // New state to handle loading
  const { resetUrl } = route.params; // Assuming the reset URL is passed through route params

  const handleResetPassword = async () => {
    // Validation
    if (!password || !password2) {
      showMessage({
        message: 'Validation Error',
        description: 'Both password fields are required.',
        type: 'danger',
      });
      return;
    }

    if (password !== password2) {
      showMessage({
        message: 'Passwords Do Not Match',
        description: 'Please ensure both passwords match.',
        type: 'danger',
      });
      return;
    }

    // Data to be sent
    const data = {
      password,
      password2,
    };

    try {
      setLoading(true); // Start loading
      console.log("data before sending", data);
      
      // POST request to reset URL with new password
      const res = await axios.post(resetUrl, {
        password: data.password,
        password2: data.password2,
      });
      
      console.log("reset", res.data);
      showMessage({
        message: 'Password Reset Successful',
        description: 'Your password has been reset successfully.',
        type: 'success',
      });

      // Navigate to Login or any other relevant screen after success
      navigation.navigate('Login');
    } catch (error) {
      handleApiError(error); // Handle error using your existing error handler
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <View className="flex-1 justify-center p-6 bg-background">
      <Text className="text-2xl font-bold text-center mb-6">Reset Password</Text>

      <View className="mb-4">
        <Text className="text-primary text-lg mb-2">New Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your new password"
          secureTextEntry
          className="border border-gray-300 rounded-md p-3 text-base"
        />
      </View>

      <View className="mb-4">
        <Text className="text-primary text-lg mb-2">Confirm New Password</Text>
        <TextInput
          value={password2}
          onChangeText={setPassword2}
          placeholder="Confirm your new password"
          secureTextEntry
          className="border border-gray-300 rounded-md p-3 text-base"
        />
      </View>

      <TouchableOpacity
        onPress={handleResetPassword}
        className="bg-accent py-3 rounded-xl active:opacity-75"
        disabled={loading} // Disable the button while loading
      >
        {loading ? (
          <ActivityIndicator size="small" color="Green" /> // Show loading indicator
        ) : (
          <Text className="text-center text-primary-on-dark font-bold text-lg">
            Reset Password
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ResetPasswordScreen;

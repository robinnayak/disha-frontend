import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { forget_password } from '../../api/auth/request'; // Assume you have this API call
import { handleApiError } from '../../utils/errorHandler';
import GoBack from '../../component/menu/GoBack';

const ForgotScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false); // New state to handle loading

  const handleForgotPassword = async () => {
    // Validate email
    if (!email.trim()) {
      showMessage({
        message: 'Validation Error',
        description: 'Email is required.',
        type: 'danger',
      });
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showMessage({
        message: 'Invalid Email',
        description: 'Please enter a valid email address.',
        type: 'danger',
      });
      return;
    }

    const data = {
      email: email.trim(),
    };

    try {
      setLoading(true); // Start loading
      const res = await forget_password(data); // Sending the email in the required format
      console.log(res);
      showMessage({
        message: 'Email Sent',
        description: 'Please check your email for password reset instructions.',
        type: 'success',
      });
      navigation.navigate('Reset', { resetUrl: res.data.reset_url });
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <View className="flex-1 bg-background">
      <GoBack navigation={navigation} />
      <View className="flex-1 justify-center p-6 bg-background">
        <Text className="text-2xl font-bold text-center mb-6">Forgot Password</Text>

        <View className="mb-4">
          <Text className="text-primary text-lg mb-2">Email Address</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            className="border border-gray-300 rounded-md p-3 text-base"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <TouchableOpacity
          onPress={handleForgotPassword}
          className="bg-accent py-3 rounded-xl active:opacity-75"
          disabled={loading} // Disable the button while loading
        >
          {loading ? (
            <ActivityIndicator size="small" color="#FFFFFF" /> // Loading spinner
          ) : (
            <Text className="text-center text-primary-on-dark font-bold text-lg">
              Reset Password
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgotScreen;

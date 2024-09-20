import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import React, { useState } from "react";
import GoBack from "../../../menu/GoBack";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Help = ({navigation}) => {
  const [activeQuestion, setActiveQuestion] = useState(null);

  const toggleQuestion = (questionIndex) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveQuestion(activeQuestion === questionIndex ? null : questionIndex);
  };

  const questions = [
    {
      question: "Steps to Book a Ticket",
      answer: (
        <View className="mt-2">
          <Text className="text-secondary-text mb-2">
            <Text className="font-bold">1. Login as a Passenger: </Text>
            Log in to your account, filter your date and trip, select your
            seats, and proceed to payment.
          </Text>
          <Text className="text-secondary-text mb-2">
            <Text className="font-bold">
              2. Check Pricing and Choose Seats:{" "}
            </Text>
            Review the pricing and choose your seats, then proceed to complete
            the payment.
          </Text>
          <Text className="text-secondary-text mb-2">
            <Text className="font-bold">3. Complete Payment: </Text>
            Once the payment is successful, you will be redirected to download
            your ticket.
          </Text>
        </View>
      ),
    },
    {
      question: "Checking Payment Status",
      answer: (
        <View className="mt-2">
          <Text className="text-secondary-text mb-2">
            <Text className="font-bold">
              1. Navigate to Notification Screen:{" "}
            </Text>
            Go to the "Notification" screen and check your bookings under the
            "Booking" tab. You can view the payment status there.
          </Text>
        </View>
      ),
    },
    {
      question: "Contacting Support",
      answer: (
        <View className="mt-2">
          <Text className="text-secondary-text mb-2">
            <Text className="font-bold">1. Go to Settings: </Text>
            In the "Help & Legal" section, find "Support" and "Feedback" options
            to contact us or provide feedback.
          </Text>
        </View>
      ),
    },
    {
      question: "For Organization - Adding a Vehicle",
      answer: (
        <View className="mt-2">
          <Text className="text-secondary-text mb-2">
            <Text className="font-bold">1. In the Home Screen: </Text>
            Click on the "Vehicle" button, add a vehicle, assign the trip and
            the driver.
          </Text>
        </View>
      ),
    },
    {
      question: "Checking Daily Earnings (Organization)",
      answer: (
        <View className="mt-2">
          <Text className="text-secondary-text mb-2">
            <Text className="font-bold">1. Once the Trip is Completed: </Text>
            {
              "Navigate to `Vehicle > Related Vehicle > View Trip`, and check the total daily earnings under Daily Earnings."
            }
          </Text>
          <Text className="text-secondary-text mb-2">
            <Text className="font-bold">2. Home Screen: </Text>
            Click on "Trip" to see daily earnings by trip date.
          </Text>
        </View>
      ),
    },
    {
      question: "Checking Daily Earnings (Drivers)",
      answer: (
        <View className="mt-2">
          <Text className="text-secondary-text mb-2">
            <Text className="font-bold">1. Follow the Same Steps: </Text>
            Drivers can follow the same steps to check their daily earnings.
          </Text>
        </View>
      ),
    },
  ];

  return (
    <View className="flex-1">
    <GoBack navigation={navigation} />
      <ScrollView className="flex-1 bg-background p-4">
        <View className="mb-6">
          <Text className="text-primary text-2xl font-bold text-center">
            Help & FAQs
          </Text>
          <Text className="text-secondary-text text-center mt-2">
            Find answers to common questions and get help with bookings,
            payments, and more.
          </Text>
        </View>

        {/* FAQ Section */}
        {questions.map((item, index) => (
          <View key={index} className="mb-4">
            <TouchableOpacity
              className="bg-white rounded-lg p-4 shadow-sm"
              onPress={() => toggleQuestion(index)}
            >
              <Text className="text-primary text-lg font-semibold">
                {item.question}
              </Text>
            </TouchableOpacity>
            {activeQuestion === index && (
              <View className="bg-gray-100 rounded-b-lg p-4">
                {item.answer}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Help;

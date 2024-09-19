import React from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPhone, faExclamationTriangle, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import GoBack from "../../../menu/GoBack";

const EmergencySupport = ({navigation}) => {
  const emergencyContacts = [
    { label: "Emergency Hotline", number: "+977 9815823670", icon: faPhone },
    { label: "Police Station", number: "911", icon: faExclamationTriangle },
    { label: "Email Support", email: "robinnayak86@gmail.com", icon: faEnvelope },
  ];

  // Function to handle phone call
  const handleCall = (number) => {
    Linking.openURL(`tel:${number}`)
      .catch((err) => console.error('Error opening dialer:', err));
  };

  // Function to handle sending email
  const handleEmail = (email) => {
    Linking.openURL(`mailto:${email}`)
      .catch((err) => console.error('Error opening email client:', err));
  };

  return (
    <SafeAreaView className="flex-1 bg-background p-4">
      <GoBack navigation={navigation} />
      <View className="flex-1">
        {/* Emergency Header */}
        <View className="mb-6">
          <Text className="text-primary text-2xl font-bold text-center">
            Emergency Support
          </Text>
          <Text className="text-darker text-center mt-2">
            This is the app's emergency information page. Use the provided contacts in urgent situations.
          </Text>
        </View>

        {/* Emergency Contact List */}
        {emergencyContacts.map((contact, index) => (
          <View
            key={index}
            className="flex-row items-center bg-white p-4 rounded-lg shadow-lg mb-4"
          >
            {/* Icon */}
            <View className="mr-4">
              <FontAwesomeIcon icon={contact.icon} size={24} className="text-secondary" />
            </View>

            {/* Contact Info */}
            <View className="flex-1">
              <Text className="text-primary text-lg font-semibold">{contact.label}</Text>
              <Text className="text-darker text-base">
                {contact.number || contact.email}
              </Text>
            </View>

            {/* Call Button (for phone contacts) */}
            {contact.number && (
              <TouchableOpacity
                className="bg-accent p-2 rounded-lg"
                onPress={() => handleCall(contact.number)}
              >
                <Text className="text-white">Call</Text>
              </TouchableOpacity>
            )}

            {/* Email Button (for email contacts) */}
            {contact.email && (
              <TouchableOpacity
                className="bg-accent p-2 rounded-lg"
                onPress={() => handleEmail(contact.email)}
              >
                <Text className="text-white">Email</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default EmergencySupport;

// src/utils/errorHandler.js

import { showMessage } from "react-native-flash-message";

// Centralized error handling function for API errors
export const handleApiError = (error) => {
  let defaultErrorMessage = "An unexpected error occurred. Please try again.";
  let errorMessage = defaultErrorMessage;

  if (error.response) {
    const { data } = error.response;

    // Check for specific "errors" or "non_field_errors" structures in response
    if (data.errors) {
      handleErrors(data.errors);
    } else if (data.non_field_errors) {
      errorMessage = formatErrorMessage(data.non_field_errors);
    } else if (typeof data === "string") {
      errorMessage = data;
    } else if (data.errors?.error?.message) {
      errorMessage = data.errors.error.message;
    }

    // Handle ErrorDetail parsing
    if (errorMessage.includes("ErrorDetail")) {
      const matchedMessage = errorMessage.match(/ErrorDetail\(string='(.+?)'/);
      console.log("mismathced",matchedMessage)
      if (matchedMessage) {
        errorMessage = matchedMessage[1]; // Extracted error message
      }
    }

    // Show error message to the user
    showMessage({
      message: "Error",
      description: errorMessage || defaultErrorMessage,
      type: "danger",
      duration: 4000,
    });

  } else if (error.request) {
    // Handle no response from server
    showMessage({
      message: "Error",
      description: "No response from server. Please check your internet connection.",
      type: "danger",
      duration: 4000,
    });
  } else {
    // Handle unexpected errors
    showMessage({
      message: "Error",
      description: defaultErrorMessage,
      type: "danger",
      duration: 4000,
    });
  }

  // Log the error for debugging purposes
  console.error("Error:", error.response?.data || error.message || error);
};

// Helper to handle structured errors (from 'errors' object)
const handleErrors = (errors) => {
  if (errors.non_field_errors) {
    showMessage({
      message: "Error",
      description: errors.non_field_errors.join(", "),
      type: "danger",
    });
  } else {
    Object.keys(errors).forEach((field) => {
      const fieldError = errors[field][0]; // Only take the first error message
      showMessage({
        message: "Error",
        description: `${capitalizeFirstLetter(field)}: ${fieldError}`,
        type: "danger",
      });
    });
  }
};

// Helper function to format non-field error messages
const formatErrorMessage = (error) => {
  return Array.isArray(error) ? error.join(", ") : error;
};

// Helper function to capitalize the first letter of a string
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

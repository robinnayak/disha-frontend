// src/utils/errorHandler.js

import { showMessage } from "react-native-flash-message";

// Centralized error handling function for API errors
export const handleApiError = (error) => {
  // Default error message
  let defaultErrorMessage = "An unexpected error occurred. Please try again.";

  if (error.response) {
    const { data } = error.response;

    // Check for errors in the response data
    if (data.errors) {
      const errors = data.errors;

      // Handle non-field errors
      if (errors.non_field_errors) {
        showMessage({
          message: "Error",
          description: errors.non_field_errors.join(", "),
          type: "danger",
        });
      } else {
        // Handle field-specific errors, showing only the first error for each field
        Object.keys(errors).forEach((field) => {
          const fieldError = errors[field][0]; // Only take the first error message
          showMessage({
            message: "Error",
            description: `${capitalizeFirstLetter(field)}: ${fieldError}`,
            type: "danger",
          });
        });
      }
    } else if (data.non_field_errors) {
      // Handle non-field errors directly under response data
      console.error("data.nonfieldserror",data.non_field_errors[0])
      showMessage({
        message: "Error",
        description: data.non_field_errors[0],
        type: "danger",
      });

      showMessage({
        message: "Error",
        description: Array.isArray(data.non_field_errors)
          ? data.non_field_errors.join(", ")
          : data.non_field_errors,
        type: "danger",
      });
    } else if (Array.isArray(data.messages)) {
      // Handle error messages in 'messages' array format
      showMessage({
        message: "Error",
        description: data.messages[0].message,
        type: "danger",
      });
    } else if (typeof data === "string") {
      // Show a simplified message if data is a string
      showMessage({
        message: "Error",
        description: data,
        type: "danger",
      });
    } else {
      // Fallback for unknown structures
      showMessage({
        message: "Error",
        description: defaultErrorMessage,
        type: "danger",
      });
    }
  } else if (error.request) {
    // Handle no response from server
    showMessage({
      message: "Error",
      description:
        "No response from server. Please check your internet connection.",
      type: "danger",
    });
  } else {
    // Handle unexpected errors
    showMessage({
      message: "Error",
      description: defaultErrorMessage,
      type: "danger",
    });
  }

  // Log the error for debugging purposes
  console.error("Error:", error.response?.data || error.message || error);
};

// Helper function to capitalize the first letter of a string
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

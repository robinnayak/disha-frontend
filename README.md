# Disha Frontend

## Overview
Disha is a long-route vehicle booking app. It enables users to book vehicles for trips across long distances, managing trips, passengers, and more. In the future, we plan to implement map integration and AI-driven technology for improved functionality.

## Bugs and Functionality Corrections

### 1. Automatic Trip Calculation (High Priority)
- **Bug**: Once the trip date is completed, the system does not automatically calculate the trip or reset the trip if there are no bookings.
- **Fix Needed**: This should be automated. If a date is passed and no bookings are present, a force reset should be done. If bookings exist, the trip should automatically be calculated.

### 2. Passenger Count in Trip View (Medium Priority)
- **Bug**: The passenger count in the trip view is incorrect.
- **Fix Needed**: Correct the logic to display the accurate number of passengers for each trip.

### 3. Review Functionality (Medium Priority)
- **Bug**: The review functionality is broken or not working as expected.
- **Fix Needed**: Review and correct the logic for creating, reading, and displaying reviews.

### 4. Multi-Day Trips Loop (Medium Priority)
- **Bug**: For multi-day trips, the system does not handle multiple days efficiently.
- **Fix Needed**: Add a for-loop or similar functionality to handle multi-day trip calculations properly.

### 5. Password Reset and Change Password (High Priority)
- **Bug**: There is an issue with the "Forgot Password" and "Change Password" functionality.
- **Fix Needed**: Fix the logic to correctly handle password resets and password changes.

## Starting the App

To start the app:

1. Make sure all dependencies are installed by running:
   ```bash
   npm install

npm start



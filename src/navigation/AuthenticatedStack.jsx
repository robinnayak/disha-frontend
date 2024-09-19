// src/navigation/AuthenticatedStack.js

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screen/menuscreen/HomeScreen";
import MapScreen from "../screen/menuscreen/MapScreen";
import SettingsScreen from "../screen/menuscreen/SettingsScreen";
import AiScreen from "../screen/menuscreen/AiScreen";
import ProfileForm from "../component/common/profile/ProfileForm";
import ProfileViewScreen from "../component/common/profile/ProfileViewScreen";
import BookingScreen from "../component/common/booking/BookingScreen";
import VehicleDetailView from "../component/organization/VehicleDetailView";
import VehicleView from "../component/organization/vehicle/VehicleView";
import VehicleEdit from "../component/organization/vehicle/VehicleEdit";
import TripDetailView from "../component/organization/TripDetailView";
import VehicleForm from "../component/organization/vehicle/VehicleForm";
import TripForm from "../component/organization/trip/TripForm";
import TripView from "../component/organization/trip/TripView";
import ToBookDetail from "../component/passenger/ToBookDetail";
import Payment from "../component/passenger/Payment";
import PayStatusScreen from "../component/passenger/PayStatusScreen";
import NotificationScreen from "../screen/menuscreen/NotificationScreen";
import Pay from "../component/passenger/Pay";
import TicketDetail from "../component/common/notificationCommon/TicketDetail";
import BookingDetail from "../component/common/booking/BookingDetail";
import DailyEarningsDetail from "../component/organization/trip/DailyEarningsDetail";
import ChangePassword from "../screen/AuthScreen/ChangePassword";
import EmergencySupport from "../component/common/settings/sectionlists/EmergencySupport";
import Help from "../component/common/settings/sectionlists/Help";
import SupportRequest from "../component/common/settings/sectionlists/SupportRequest";
import Policies from "../component/common/settings/sectionlists/Policies";
import Feedback from "../component/common/settings/sectionlists/Feedback";

const Stack = createNativeStackNavigator();

const AuthenticatedStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
      <Stack.Screen
        name="Map"
        component={MapScreen}
        options={{ title: "Map" }}
      />
      <Stack.Screen
        name="Notification"
        component={NotificationScreen}
        options={{ title: "Notification" }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: "Settings" }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{ title: "Change Password" }}
      />
      <Stack.Screen name="AI" component={AiScreen} options={{ title: "AI" }} />
      <Stack.Screen
        name="ProfileForm"
        component={ProfileForm}
        options={{ title: "ProfileForm" }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileViewScreen}
        options={{ title: "Profile" }}
      />

      <Stack.Screen
        name="TripDetailView"
        component={TripDetailView}
        options={{ title: "Trip" }}
      />
      <Stack.Screen
        name="TripView"
        component={TripView}
        options={{ title: "Trip" }}
      />
      
      <Stack.Screen
        name="TripForm"
        component={TripForm}
        options={{ title: "create Trip" }}
      />

    
      <Stack.Screen
        name="VehicleForm"
        component={VehicleForm}
        options={{ title: "Vehicle Form" }}
      />

      <Stack.Screen
        name="VehicleDetail"
        component={VehicleDetailView}
        options={{ title: "Vehicle List" }}
      />
      <Stack.Screen
        name="Vehicle"
        component={VehicleView}
        options={{ title: "Vehicle" }}
      />
      <Stack.Screen
        name="VehicleEdit"
        component={VehicleEdit}
        options={{ title: "Vehicle Edit" }}
      />

      <Stack.Screen
        name="Booking"
        component={BookingScreen}
        options={{ title: "Booking" }}
      />
      
      <Stack.Screen
        name="ToBook"
        component={ToBookDetail}
        options={{ title: "Booking Details" }}
      />
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{ title: "Payment" }}
      />
      <Stack.Screen
        name="PayStatus"
        component={PayStatusScreen}
        options={{ title: "Pay Status" }}
      />
      <Stack.Screen
        name="Pay"
        component={Pay}
        options={{ title: "Pay " }}
      />
      <Stack.Screen
        name="TicketDetail"
        component={TicketDetail}
        options={{ title: "Ticket Detail" }}
      />
      <Stack.Screen
        name="BookingDetail"
        component={BookingDetail}
        options={{ title: "Booking Detail" }}
      />
      <Stack.Screen
        name="DailyEarningsDetail"
        component={DailyEarningsDetail}
        options={{ title: "Daily Earnings Detail" }}
      />
      <Stack.Screen
        name="EmergencySupport"
        component={EmergencySupport}
        options={{ title: "Emergency Support" }}
      />
      <Stack.Screen
        name="Help"
        component={Help}
        options={{ title: "Help with QA" }}
      />
      <Stack.Screen
        name="SupportRequest"
        component={SupportRequest}
        options={{ title: "Support Request" }}
      />
      <Stack.Screen
        name="Policies"
        component={Policies}
        options={{ title: "Policies" }}
      />
      <Stack.Screen
        name="Feedback"
        component={Feedback}
        options={{ title: "Feedback" }}
      />

      

    </Stack.Navigator>
  );
};

export default AuthenticatedStack;

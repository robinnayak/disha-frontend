// src/navigation/AppStackNavigation.js
import React from "react";
import { useSelector } from "react-redux";
import AuthenticatedStack from "./AuthenticatedStack";
import UnauthenticatedStack from "./UnauthenticatedStack";

const AppStackNavigation = () => {
  const isAuthenticated = useSelector((state) => state.auth?.token?.token);
  console.log("is Authenticated", isAuthenticated);
  return isAuthenticated ? <AuthenticatedStack /> : <UnauthenticatedStack />;
};

export default AppStackNavigation;

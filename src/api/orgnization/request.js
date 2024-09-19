import axios from "axios";
import { org_drivers_api, org_vehicles_api, org_trip_api } from "./endpoints";

export const getOrgDrivers = async (token) => {
  const res = await axios.get(org_drivers_api, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getVehicleData = async (token) => {
  const res = await axios.get(org_vehicles_api, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
export const postVehicleData = async (token, credential) => {
  console.log("send data", token);
  console.log("send data", credential);
  const res = await axios.post(org_vehicles_api, credential, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getVehicleViewData = async (token, vehicleId) => {
  const res = await axios.get(`${org_vehicles_api}${vehicleId}`, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const putVehicleViewData = async (token, vehicleId, credential) => {
  const res = await axios.put(`${org_vehicles_api}${vehicleId}/`, credential, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// http://localhost:8000/api/organization/vehicles/VEH-GR-2096/

export const deleteVehicleViewData = async (token, vehicleId) => {
  console.log("delete vehicle id", vehicleId);

  const res = await axios.delete(`${org_vehicles_api}${vehicleId}/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("deleted vehicle..", res);
  return res;
};

export const getTripData = async (token) => {
  const res = await axios.get(org_trip_api, {
    headers: {
      // "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
export const postTripData = async (token, credential) => {
  const res = await axios.post(org_trip_api, credential, {
    headers: {
      // "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// http://localhost:8000/api/organization/trips/DHAKAT20240828030817/ , method =delete
export const deleteTripData = async (token, tripId) => {
  console.log("delete trip id", tripId);

  const res = await axios.delete(`${org_trip_api}${tripId}/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.status;
};

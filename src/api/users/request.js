import axios from "axios";
import {
  org_profile_api,
  support_request_api,
  feedback_api,
  create_review_api,
} from "./endpoints";

export const orgUserProfile = async (token) => {
  const res = await axios.get(org_profile_api, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const putOrgUserProfile = async (token, credential) => {
  const res = await axios.put(org_profile_api, credential, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const deleteuser = async (token) => {
  console.log("profile delete token", token);
  const res = await axios.delete(org_profile_api, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("Profile deleted response", res);
  return res;
};

export const postSupportRequest = async (token, credential) => {
  // Simply send the FormData (credential) as the request body
  console.log("post supoort request", credential);
  const res = await axios.post(support_request_api, credential, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data", // Ensure correct content type
    },
  });

  // Return the response data from the server
  return res.data;
};

export const getSupportRequest = async (token) => {
  const res = await axios.get(support_request_api, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const postFeedback = async (token, credential) => {
  console.log("credential of feedback", credential);
  console.log("token", token);
  const res = await axios.post(feedback_api, credential, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const postReview = async (token, credential) => {
  const res = await axios.post(create_review_api, credential, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

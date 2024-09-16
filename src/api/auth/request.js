import axios from "axios"
import { login_api, logout_api, register_api,change_password_api,forget_password_api } from "./endpoints";
import { showMessage } from "react-native-flash-message";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../app/features/authSlice";
import { handleApiError } from "../../utils/errorHandler";

export const registerUser = async (credential) =>{
  // console.log("register credential",credential)
    const res = await axios.post(register_api,credential)
    return res.data  
}

export const loginUser = async (credential) =>{
    const res = await axios.post(login_api,credential)
    return res.data  
}

export const logoutUser = async (token) =>{
    const res = await axios.get(logout_api,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return res.data
}

export const handleLogout = async (token, dispatch, navigation) => {
    try {
      const res = await logoutUser(token);
      showMessage({
        message: `Successfully Logged Out ${res.user || "Anonymous"}`,
        description: "You have successfully logged out.",
        type: "success",
      });
      dispatch(setLogout());

      navigation.navigate('Login')
    } catch (error) {
      handleApiError(error);
    //   showMessage({
    //     message: "Logout Failed",
    //     description: "An error occurred while logging out.",
    //     type: "danger",
    //   });
      
    }
  };


export const forget_password = async (credential)=>{
  // console.log("credential")
  const res = await axios.post(forget_password_api,credential)
  return res.data
}

export const change_password = async (token,credential)=>{
  console.log("token",token)
  console.log("credential",credential)
  const res = await axios.post(change_password_api,credential,{
    headers:{
      Authorization: `Bearer ${token}`
    }
  })
  return res.data
}

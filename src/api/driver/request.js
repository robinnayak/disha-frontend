import axios from "axios"
import { driver_organization_profile_api, driver_profile_api,set_tripcomplete_api } from "./endpoints"



export const getDriverProfile = async (token)=>{
    const res = await axios.get(driver_profile_api,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return res.data
}

export const setDriverProfile = async (token,credential)=>{
    const res = await axios.put(driver_profile_api,credential,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return res.data
}

export const getDriOrgProfile = async (token)=>{
    const res = await axios.get(driver_organization_profile_api,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return res.data
}

export const updateTripCompleted = async(token,credential) =>{
    const res = await axios.post(set_tripcomplete_api,credential,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return res.data
}




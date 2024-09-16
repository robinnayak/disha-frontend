import axios from "axios";
import { org_profile_api } from "./endpoints";

export const orgUserProfile = async (token)=>{
    const res = await axios.get(org_profile_api,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return res.data
}

export const putOrgUserProfile = async (token,credential)=>{
    const res = await axios.put(org_profile_api,credential,{
        headers:{
            "Content-Type":"multipart/form-data",
            Authorization: `Bearer ${token}`
        }
    })
    return res.data
}

export const deleteuser = async (token)=>{
    const res = await axios.delete(org_profile_api,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return res.data
}



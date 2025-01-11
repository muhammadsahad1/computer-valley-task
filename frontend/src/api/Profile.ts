import axiosInstance from "../config/axio";
import { ProfileUpdateData } from "../types/user";

export const userProfileUpdate = async (formdata: ProfileUpdateData): Promise<any> => {
    try {
        const response = await axiosInstance.post('/user/profile', formdata)
        return response
    } catch (error) {
        console.error("err in logout", error)
        return {
            success: false,
        };
    }
}


import axiosInstance from "../config/axio";
import { UserLoginData, UserSignupData } from "../types/user";

interface ApiResponse {
    success: boolean;
    message: string;
    data?: any;
}


export const createUser = async (formData: UserSignupData): Promise<ApiResponse | null | undefined> => {
    try {
        const response = await axiosInstance.post('/auth/register', formData)
        return response.data
    } catch (error) {
        console.error("Unexpected error:", error);
        return {
            success: false,
            message: 'An unexpected error occurred.',
        };
    }
}

export const loginUser = async (formData: UserLoginData): Promise<ApiResponse | undefined | null> => {
    try {
        const response = await axiosInstance.post('/auth/login', formData)

        return response.data
    } catch (error) {
        console.error("Unexpected error:", error);
        return {
            success: false,
            message: 'An unexpected error occurred.',
        };
    }
}
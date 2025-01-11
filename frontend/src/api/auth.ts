import axiosInstance from "../config/axio";
import { UserLoginData, UserSignupData } from "../types/user";

interface ApiResponse {
    success: boolean;
    error?: string,
    userData?: {
        id: string,
        email: string,
        username: string
    }
}


export const createUser = async (formData: UserSignupData): Promise<ApiResponse | null | undefined> => {
    try {
        const response = await axiosInstance.post('/auth/register', formData)
        return response.data
    } catch (error) {
        console.error("Unexpected error:", error);
        return {
            success: false,
            error: "An unexpected error occurred."
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
            error: 'An unexpected error occurred.',
        };
    }
}


export const userLogout = async () => {
    try {
        const response = await axiosInstance.post('/auth/logout')

        return response.data
    } catch (error) {
        console.error("err in logout", error)
        return {
            success: false,
            error: 'An unexpected error occurred.',
        };
    }
}
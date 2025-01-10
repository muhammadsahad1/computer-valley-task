// types/user.ts
export interface UserSignupData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface ProfileUpdateData {
    name?: string;
    address?: string;
    gender?: 'male' | 'female' | 'other';
    avatar?: string;
    bio?: string;
    phoneNumber?: string;
    birthDate?: Date;
}
export interface UserLoginData {
    email: string;
    password: string;
}


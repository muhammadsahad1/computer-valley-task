export interface UserSignupData {
    name: string;
    username: string;
    address: string;
    gender: 'male' | 'female' | 'other';
    password: string;
    confirmPassword: string
}


export interface UserLoginData {
    username: string;
    password: string;
}


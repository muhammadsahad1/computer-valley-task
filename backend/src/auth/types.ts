export type UserData = {
    name?: string,
    email: string,
    username: string,
    address?: string,
    gender?: "male" | "female" | "other" | undefined;
    password: string,
}

export type AuthResult = {
    success: boolean;
    data?: {
        id: string;
        token: string;
        email: string;
        username: string;
    };
    error?: string;
}




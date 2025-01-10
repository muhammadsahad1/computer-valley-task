export type UserData = {
    name: string,
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
        name: string;
        username: string;
    };
    error?: string;
}


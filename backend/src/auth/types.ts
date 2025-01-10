export type UserData = {
    name: string,
    email: string,
    password: string,
    address?: string,
    gender?: string,
}

export type AuthResult = {
    status: boolean;
    data?: {
        id: string;
        token: string;
        name: string;
        email: string;
    };
    error?: string;
}


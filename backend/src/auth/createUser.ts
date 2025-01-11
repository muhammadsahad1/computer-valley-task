import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { UserData, AuthResult } from './types';

// for generate token
const createToken = (userId: string): string => {
    return jwt.sign({ userId }, process.env.JWT_SECRET || "secret",
        { expiresIn: '1h' }
    )
}

export const createUser = async (data: UserData): Promise<AuthResult> => {
    try {

        console.log(data)
        const { email, password } = data
        const exists = await User.findOne({ email })
        // check email is exists
        console.log("exits", exists);

        if (exists) {
            return { success: false, error: 'email already taken' };
        }

        // creating new user with hashed pass for security 
        const hash = await bcrypt.hash(password, 10)

        const user = await User.create({
            ...data,
            password: hash
        })

        const token = createToken(user._id as string)

        // returing auth result 
        return {
            success: true,
            data: {
                id: user._id as string,
                token,
                email: user.email,
                username: user.username
            }
        };

    } catch (error: any) {
        console.error(error)
        return { success: false, error: 'Failed to create user' };
    }
};


export const loginUser = async (
    email: string,
    password: string
): Promise<AuthResult> => {
    try {
        // Find user
        const user = await User.findOne({ email });

        if (!user) {
            return { success: false, error: 'Invalid credentials' };
        }

        // Check password
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return { success: false, error: 'Invalid credentials' };
        }

        // Generate token
        const token = createToken(user._id as string);

        return {
            success: true,
            data: {
                id: user._id as string,
                token,
                email: user.email,
                username: user.username
            }
        };
    } catch (error) {
        console.error(error)
        return { success: false, error: 'Login failed' };
    }
};
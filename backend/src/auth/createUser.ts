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

        const { username, password } = data
        const exists = await User.find({ username })
        console.log("exists =>", exists)
        // check email is exists
        if (!exists) {
            return { success: false, error: 'Username already taken' };
        }

        // creating new user with hashed pass for security 
        const hash = await bcrypt.hash(password, 10)
        console.log("has", hash);

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
                name: user.name,
                username: user.username
            }
        };

    } catch (error: any) {
        console.error(error)
        return { success: false, error: 'Failed to create user' };
    }
};


export const loginUser = async (
    username: string,
    password: string
): Promise<AuthResult> => {
    try {
        // Find user
        const user = await User.findOne({ username });

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
                name: user.name,
                username: user.username
            }
        };
    } catch (error) {
        return { success: false, error: 'Login failed' };
    }
};
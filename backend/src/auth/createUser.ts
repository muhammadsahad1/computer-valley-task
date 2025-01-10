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

        const { email, password } = data
        const exists = await User.find({ email: email })
        // check email is exists
        if (exists) {
            return { status: false, error: 'Email already taken' };
        }

        // creating new user with hashed pass for security 
        const hash = await bcrypt.hash(password, 10)
        const user = await User.create({
            ...data,
            password: hash
        })

        const token = await createToken(user._id as string)

        // returing auth result 
        return {
            status: true,
            data: {
                id: user._id as string,
                token,
                name: user.name,
                email: user.email
            }
        };
    } catch (error) {
        return { status: false, error: 'Failed to create user' };
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
            return { status: false, error: 'Invalid credentials' };
        }

        // Check password
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return { status: false, error: 'Invalid credentials' };
        }

        // Generate token
        const token = createToken(user._id as string);

        return {
            status: true,
            data: {
                id: user._id as string,
                token,
                name: user.name,
                email: user.email
            }
        };
    } catch (error) {
        return { status: false, error: 'Login failed' };
    }
};
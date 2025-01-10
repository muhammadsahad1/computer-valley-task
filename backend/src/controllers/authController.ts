import { Request, Response } from 'express';
import { z } from 'zod';
import { loginSchema, registerSchema } from '../validation/zod-schemas';
import { createUser, loginUser } from '../auth/createUser';

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const validatedData = registerSchema.parse(req.body);
        const user = await createUser(validatedData);

        res.cookie('auth_token', user.data?.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 3600000 // 1-hour expiration
        });

        console.log("created user", user);


        const { token, ...userData } = user.data || {};
        res.status(201).json(userData);

    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({
                errors: error.errors
            });
        }
        res.status(500).json({ message: 'Server error' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const validatedData = loginSchema.parse(req.body);

        // Authenticate user 
        const user = await loginUser(validatedData.email, validatedData.password)

        res.cookie('auth_token', user.data?.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 3600000 // 1-hour expiration
        });


        console.log("logined user", user);

        const { token, ...userData } = user.data || {};
        res.status(200).json(userData);

    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({
                errors: error.errors
            });
        }
        res.status(500).json({ message: 'Server error' });
    }
}


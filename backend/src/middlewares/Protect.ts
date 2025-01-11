import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/User';

// Extend Express Request to include user
interface AuthenticatedRequest extends Request {
    user?: IUser;
}

// Protect middleware
export const protect = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    let token: string | undefined;
    console.log("tokennnnnn", req.cookies)
    if (req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token) {
        res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token as string, process.env.JWT_SECRET as string) as JwtPayload;

        if (!decoded.id) {
            res.status(401).json({ message: 'Invalid token, authorization denied' });
        }

        req.user = await User.findById(decoded.id) as IUser;

        if (!req.user) {
            res.status(404).json({ message: 'User not found, authorization denied' });
        }

        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
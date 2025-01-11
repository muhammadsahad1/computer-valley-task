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
    console.log("tokennnnnn", req.cookies);

    if (req.cookies.auth_token) {
        token = req.cookies.auth_token;
    }

    if (!token) {
        res.status(401).json({ message: 'No token, authorization denied' });
        return
    }

    try {
        const decoded = jwt.verify(token as string, process.env.JWT_SECRET as string) as JwtPayload;
        console.log("decoded", decoded)
        if (!decoded.userId) {
            res.status(401).json({ message: 'Invalid token, authorization denied' });
            return
        }

        req.user = await User.findById(decoded.userId) as IUser;
        console.log("req =>", req.user)
        if (!req.user) {
            res.status(404).json({ message: 'User not found, authorization denied' });
            return
        }

        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
        return
    }
};

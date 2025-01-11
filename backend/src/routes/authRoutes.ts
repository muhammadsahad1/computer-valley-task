import express from 'express';
import { validateResource } from '../middlewares/zodValidation';
import { registerSchema, loginSchema } from '../validation/zod-schemas';
import { register, login, logout } from '../controllers/authController';
import { protect } from '../middlewares/Protect';

const authRoute = express.Router();

// Use validateResource middleware for request validation
authRoute.post('/register', validateResource(registerSchema), register);
authRoute.post('/login', validateResource(loginSchema), login);
authRoute.post('/logout', protect, logout)

export default authRoute;

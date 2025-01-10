import express from 'express';
import { validateResource } from '../middlewares/zodValidation';
import { registerSchema, loginSchema } from '../validation/zod-schemas';
import { register, login } from '../controllers/authController';

const authRoute = express.Router();

// Use validateResource middleware for request validation
authRoute.post('/register', validateResource(registerSchema), register);

authRoute.post('/login', validateResource(loginSchema), login);

export default authRoute;

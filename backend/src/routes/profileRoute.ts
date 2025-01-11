import express from 'express';
import { protect } from '../middlewares/Protect';
import cloudinaryUploadMiddleware from '../middlewares/uploadImage';
import { updateProfile } from '../controllers/profileController';

const profileRoute = express.Router();

// Use validateResource middleware for request validation
profileRoute.post('/profile', protect, cloudinaryUploadMiddleware, updateProfile);


export default profileRoute;

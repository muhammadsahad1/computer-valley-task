import multer from 'multer';
import { CloudinaryStorage, Options } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinaryConfig';
import { Request, Response, NextFunction } from 'express';

// Set up Cloudinary Storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req, file) => ({
        folder: 'product-pictures',
        allowed_formats: ['jpg', 'jpeg', 'png'],
        transformation: [{ width: 500, height: 500, crop: 'limit' }],
    }) as Options['params'],
});

const upload = multer({ storage });

interface RequestWithFile extends Request {
    file?: Express.Multer.File;
    imageUrl?: string;
}

const cloudinaryUploadMiddleware = (req: RequestWithFile, res: Response, next: NextFunction): void => {
    try {
        console.log("ethii");
        console.log(req.file ? "yes" : "noo");

        upload.single('image')(req, res, (err: any) => {
            if (err) {
                console.error("Error uploading image:", err); // Log the error for better understanding.
                return res.status(500).json({ message: 'Error uploading image', error: err.message });
            }


            console.log("imgUrl", req.file?.path);
            req.imageUrl = req.file?.path;
            next();
        });
    } catch (error: any) {
        console.log("Err", error);
        res.status(500).json({ message: 'Error processing image upload', error: error.message });
    }
};

export default cloudinaryUploadMiddleware;

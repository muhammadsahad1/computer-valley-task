import { Request, Response } from 'express';
import User from '../models/User';

export const updateProfile = async (req: any, res: Response):Promise<any> => {
    try {
        const { name, address, gender, bio, phoneNumber, birthDate } = req.body;
        const imageUrl = req.imageUrl;

        if (!name && !address && !gender && !bio && !phoneNumber && !birthDate && !imageUrl) {
            return res.status(400).json({ message: "No fields to update" });
        }

        const userId = req.user.id;
        const updatedProfile = await User.findByIdAndUpdate(userId, {
            $set: {
                name,
                address,
                gender,
                bio,
                phoneNumber,
                birthDate,
                avatar: imageUrl
            },

        },
            { new: true })

        if (!updatedProfile) {
            return res.status(404).json({ message: "User not found" })
        }


        return res.status(201).json({ success: true, updateProfile })

    } catch (error : any) {
        console.error(error);
        return res.status(500).json({ message: "Failed to update profile", error: error.message });
    }
}

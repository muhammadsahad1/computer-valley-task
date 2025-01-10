import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    name?: string;
    email: string;
    username: string;
    password: string;
    address?: string;
    gender?: 'male' | 'female' | 'other';
    avatar?: string;
    bio?: string;
    phoneNumber?: string;
    birthDate?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        // required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        // required: true
    },
    avatar: {
        type: String
    },
    bio: {
        type: String,
        maxlength: 500
    },
    phoneNumber: {
        type: String,
        trim: true
    },
    birthDate: {
        type: Date
    },
}, {
    timestamps: true
});


UserSchema.index({ email: 1, username: 1 });
export default mongoose.model<IUser>('User', UserSchema);
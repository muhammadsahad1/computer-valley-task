import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    name: string;
    username: string;
    password: string;
    address?: string;
    gender?: string;
}

const UserSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String },
    gender: { type: String },
}, { timestamps: true });

export default mongoose.model<IUser>('User', UserSchema)
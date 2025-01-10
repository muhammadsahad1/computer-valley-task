import mongoose from 'mongoose';

export async function mongoConnect() {
    try {
        if (!process.env.MONGO_URL) {
            throw new Error('MONGO_URL is not defined in the environment variables');
        }
        const connect = await mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB connected successfully');
        return connect;
    } catch (error: any) {
        console.error('MongoDB connection failed:', error.message);
    }
}

import mongoose from 'mongoose';
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/socialNetworkDB');
        console.log('Database connected!');
        return mongoose.connection;
    }
    catch (error) {
        console.error('MongoDB connection error:', error);
        throw new Error('Database connection error');
    }
};
export default connectDB;

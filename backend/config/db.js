import mongoose from 'mongoose';

/**
 * Connect to MongoDB database
 */
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/medicare';
    const conn = await mongoose.connect(mongoUri);
    console.log(`[MongoDB Connected] Host: ${conn.connection.host} | Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`[MongoDB Connection Notice]: ${error.message}`);
    console.log('[MongoDB Notice] Local MongoDB is offline or unreachable at 127.0.0.1:27017. Server will start; please start MongoDB service for full database persistence.');
  }
};

export default connectDB;

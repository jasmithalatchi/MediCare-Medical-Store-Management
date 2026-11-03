import mongoose from 'mongoose';

/**
 * Connect to MongoDB database using environment variables
 */
const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/medicare';
  const isProduction = process.env.NODE_ENV === 'production';

  // Informative log masking credentials
  const safeUri = mongoUri.replace(/:([^:@]+)@/, ':****@');

  if (isProduction && !process.env.MONGO_URI) {
    console.warn('[MongoDB Warning] MONGO_URI environment variable is not set! Using default localhost URI.');
    console.warn('[MongoDB Warning] In production, ensure MONGO_URI is set to your MongoDB Atlas or remote database connection string.');
  }

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[MongoDB Connected] Host: ${conn.connection.host} | Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`[MongoDB Connection Error]: ${error.message}`);
    if (isProduction) {
      console.error(`[MongoDB Notice] Connection failed for URI: ${safeUri}`);
      console.error('[MongoDB Notice] Deployment Checklist:');
      console.error('  1. Check MONGO_URI in your cloud host environment variables.');
      console.error('  2. Verify database username and password in MongoDB Atlas.');
      console.error('  3. In MongoDB Atlas Network Access, ensure IP 0.0.0.0/0 (Allow from Anywhere) is whitelisted.');
    } else {
      console.log('[MongoDB Notice] Local MongoDB is offline or unreachable at 127.0.0.1:27017. Server will start; please start MongoDB service for full database persistence.');
    }
  }

  // Monitor database connection lifecycle
  mongoose.connection.on('error', (err) => {
    console.error(`[MongoDB Runtime Error]: ${err.message}`);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('[MongoDB Status] Disconnected from database.');
  });
};

export default connectDB;

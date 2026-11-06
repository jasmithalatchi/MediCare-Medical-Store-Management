import mongoose from 'mongoose';

/**
 * Global connection cache for serverless environments (Vercel)
 * Reuses active MongoDB connection across warm function invocations.
 */
let cached = global._mongooseCache;
if (!cached) {
  cached = global._mongooseCache = { conn: null, promise: null };
}

/**
 * Connect to MongoDB database using environment variables
 */
const connectDB = async () => {
  // If already connected (readyState 1 = connected, 2 = connecting), return
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (cached.conn) {
    return cached.conn;
  }

  const mongoUri =
    process.env.MONGO_URI ||
    process.env.MONGODB_URI ||
    'mongodb://127.0.0.1:27017/medicare';

  const isProduction = process.env.NODE_ENV === 'production' || !!process.env.VERCEL;

  // Informative log masking credentials
  const safeUri = mongoUri.replace(/:([^:@]+)@/, ':****@');

  if (isProduction && !process.env.MONGO_URI && !process.env.MONGODB_URI) {
    console.warn('[MongoDB Warning] Neither MONGO_URI nor MONGODB_URI is set! Defaulting to localhost fallback.');
  }

  if (!cached.promise) {
    const opts = {
      serverSelectionTimeoutMS: 5000,
      bufferCommands: false, // Fail fast rather than hanging on queries if DB is unreachable
    };

    cached.promise = mongoose
      .connect(mongoUri, opts)
      .then((m) => {
        console.log(`[MongoDB Connected] Host: ${m.connection.host} | Database: ${m.connection.name}`);
        return m.connection;
      })
      .catch((error) => {
        cached.promise = null;
        console.error(`[MongoDB Connection Error]: ${error.message}`);
        if (isProduction) {
          console.error(`[MongoDB Notice] Target URI: ${safeUri}`);
          console.error('[MongoDB Notice] Ensure MONGO_URI is configured in Vercel and 0.0.0.0/0 is whitelisted in Atlas Network Access.');
        }
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    throw error;
  }
};

export default connectDB;

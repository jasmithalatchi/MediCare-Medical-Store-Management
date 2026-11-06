import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import medicineRoutes from './routes/medicineRoutes.js';
import { getCategories } from './controllers/medicineController.js';
import { seedDatabase } from './controllers/seedController.js';
import orderRoutes from './routes/orderRoutes.js';
import inventoryRoutes from './routes/inventoryRoutes.js';
import userRoutes from './routes/userRoutes.js';
import prescriptionRoutes from './routes/prescriptionRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration: Load backend/.env first, then fallback to root .env
dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config();

// Connect to Database
connectDB().catch((err) => {
  console.warn('[MongoDB Init Warning]:', err.message);
});

// Ensure uploads directories exist (safely handled for serverless environments)
const uploadsDir = path.join(__dirname, 'uploads');
const prescriptionsDir = path.join(uploadsDir, 'prescriptions');
try {
  if (!fs.existsSync(prescriptionsDir)) {
    fs.mkdirSync(prescriptionsDir, { recursive: true });
  }
} catch (e) {
  // Read-only filesystem in Vercel serverless environment
}

// Production-ready CORS Configuration
const rawClientUrls = process.env.CLIENT_URL || '';
const allowedOrigins = rawClientUrls
  .split(',')
  .map((url) => url.trim().replace(/\/+$/, ''))
  .filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    // Allow non-browser requests (e.g. mobile apps, curl, server-to-server, health checks)
    if (!origin) {
      return callback(null, true);
    }

    const normalizedOrigin = origin.replace(/\/+$/, '');

    // Allow wildcard, configured origins, any vercel.app domain, or any localhost
    if (
      allowedOrigins.includes('*') ||
      allowedOrigins.includes(normalizedOrigin) ||
      /\.vercel\.app$/.test(normalizedOrigin) ||
      /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)
    ) {
      return callback(null, true);
    }

    return callback(new Error(`CORS error: Request from origin ${origin} is not allowed by CORS configuration.`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 86400, // 24 hours preflight cache
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection middleware for warm/cold serverless invocations
app.use(async (req, res, next) => {
  if (req.originalUrl.startsWith('/api') || req.originalUrl.startsWith('/health')) {
    try {
      await connectDB();
    } catch (err) {
      // If DB is disconnected and user calls a data endpoint (not /api/health or /api), return clean 503 message
      if (
        req.originalUrl !== '/api' &&
        req.originalUrl !== '/api/' &&
        !req.originalUrl.startsWith('/api/health') &&
        !req.originalUrl.startsWith('/health') &&
        !req.originalUrl.startsWith('/api/categories') &&
        !req.originalUrl.startsWith('/categories')
      ) {
        return res.status(503).json({
          success: false,
          error: 'DATABASE_DISCONNECTED',
          message:
            'MongoDB Atlas is not connected. Please ensure MONGO_URI is added in your Vercel Project Environment Variables and 0.0.0.0/0 is whitelisted in MongoDB Atlas Network Access.',
        });
      }
    }
  }
  next();
});

if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Static folder for uploaded files
app.use('/uploads', express.static(uploadsDir));

// Health Check Routes (Accessible via /api/health and /health)
app.get(['/api/health', '/health'], (req, res) => {
  const isConnected = mongoose.connection.readyState === 1;
  res.status(200).json({
    success: true,
    message: 'MediCare API is running',
    status: 'online',
    service: 'MediCare API Server',
    environment: process.env.NODE_ENV || (process.env.VERCEL ? 'production' : 'development'),
    database: isConnected ? 'connected' : 'disconnected',
    databaseDetails: {
      status: isConnected ? 'connected' : 'disconnected',
      readyState: mongoose.connection.readyState,
      host: isConnected ? mongoose.connection.host : undefined,
      databaseName: isConnected ? mongoose.connection.name : undefined,
    },
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

// API Root Status & Route Directory
app.get(['/api', '/api/status'], (req, res) => {
  res.status(200).json({
    success: true,
    message: 'MediCare REST API is running',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      categories: '/api/categories',
      medicines: '/api/medicines',
      products: '/api/products',
      seed: '/api/seed',
      auth: '/api/auth',
      orders: '/api/orders',
      inventory: '/api/inventory',
      users: '/api/users',
      prescriptions: '/api/prescriptions',
    },
  });
});

// Root Route - Welcome / Status Handler (fallback when serving outside static host)
app.get('/', (req, res) => {
  const frontendDistPath = path.resolve(__dirname, '../frontend/dist');
  if (fs.existsSync(frontendDistPath)) {
    return res.sendFile(path.resolve(frontendDistPath, 'index.html'));
  }
  res.status(200).json({
    success: true,
    message: 'MediCare API is running',
    service: 'MediCare API Server',
    healthCheck: '/api/health',
    environment: process.env.NODE_ENV || 'development',
  });
});

// Mount API Routes (supports both /api/* and /* for Vercel Serverless Function rewrites)
app.get(['/api/categories', '/categories'], getCategories);
app.all(['/api/seed', '/seed'], seedDatabase);
app.use(['/api/auth', '/auth'], authRoutes);
app.use(['/api/medicines', '/medicines', '/api/products', '/products'], medicineRoutes);
app.use(['/api/orders', '/orders'], orderRoutes);
app.use(['/api/inventory', '/inventory'], inventoryRoutes);
app.use(['/api/users', '/users'], userRoutes);
app.use(['/api/prescriptions', '/prescriptions'], prescriptionRoutes);

// In Production: Serve Built Frontend static assets if available (Unified fullstack deployment)
const frontendDistPath = path.resolve(__dirname, '../frontend/dist');
if (fs.existsSync(frontendDistPath)) {
  app.use(express.static(frontendDistPath));

  // SPA fallback: Route all non-API, non-upload GET requests to index.html
  app.get('*', (req, res, next) => {
    if (req.originalUrl.startsWith('/api') || req.originalUrl.startsWith('/uploads')) {
      return next();
    }
    res.sendFile(path.resolve(frontendDistPath, 'index.html'));
  });
}

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Start Server locally if not running in serverless / Vercel
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'test' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`[MediCare API] Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
}

export default app;

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
connectDB();

// Ensure uploads directories exist
const uploadsDir = path.join(__dirname, 'uploads');
const prescriptionsDir = path.join(uploadsDir, 'prescriptions');
if (!fs.existsSync(prescriptionsDir)) {
  fs.mkdirSync(prescriptionsDir, { recursive: true });
}

// Production-ready CORS Configuration
const rawClientUrls = process.env.CLIENT_URL || 'http://localhost:5173,http://localhost:3000,http://127.0.0.1:5173';
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

    // Allow wildcard, configured origins, or any localhost in non-production
    if (
      allowedOrigins.includes('*') ||
      allowedOrigins.includes(normalizedOrigin) ||
      (process.env.NODE_ENV !== 'production' && /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin))
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

if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Static folder for uploaded files
app.use('/uploads', express.static(uploadsDir));

// Health Check Routes (Accessible via /api/health and /health)
app.get(['/api/health', '/health'], (req, res) => {
  res.status(200).json({
    success: true,
    message: 'MediCare API is running',
    status: 'online',
    service: 'MediCare API Server',
    environment: process.env.NODE_ENV || 'development',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

// Root Route - Welcome / Status Handler
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

// Mount API Routes
app.use('/api/auth', authRoutes);
app.use('/api/medicines', medicineRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/prescriptions', prescriptionRoutes);

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

// Start Server
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`[MediCare API] Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
}

export default app;

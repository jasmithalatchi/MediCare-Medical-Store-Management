/**
 * MediCare - User Database Seeder
 * Populates MongoDB with default Administrator and Demo Customer accounts.
 *
 * Safe and Repeatable: Uses email lookup to avoid duplicates.
 * Credentials are securely sourced from environment variables.
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../backend/.env') });

import User from '../../backend/models/User.js';

const seedUsers = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/medicare';

  try {
    console.log(`Connecting to MongoDB at ${mongoUri}...`);
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected successfully.');

    // 1. Admin Account Configuration
    const adminEmail = (process.env.ADMIN_EMAIL || '').toLowerCase().trim();
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminName = process.env.ADMIN_NAME || 'MediCare Administrator';

    if (!adminEmail || !adminPassword) {
      console.warn('⚠ ADMIN_EMAIL and ADMIN_PASSWORD environment variables not set. Skipping admin seed.');
    } else {
      const existingAdmin = await User.findOne({ email: adminEmail });
      if (!existingAdmin) {
        console.log(`Creating Admin account: ${adminEmail}...`);
        await User.create({
          name: adminName,
          email: adminEmail,
          password: adminPassword,
          role: 'admin',
          phone: '+91 98765 43210',
          address: {
            street: '101 Pharmacy Ave, Suite 400',
            city: 'Mumbai',
            state: 'Maharashtra',
            postalCode: '400001',
            country: 'India',
          },
        });
        console.log(`✓ Admin account created successfully (${adminEmail})`);
      } else {
        console.log(`ℹ Admin account already exists (${adminEmail}) - skipping creation.`);
      }
    }

    // 2. Demo Customer Account Configuration
    const customerEmail = (process.env.DEMO_CUSTOMER_EMAIL || '').toLowerCase().trim();
    const customerPassword = process.env.DEMO_CUSTOMER_PASSWORD;
    const customerName = process.env.DEMO_CUSTOMER_NAME || 'Demo Customer';

    if (!customerEmail || !customerPassword) {
      console.warn('⚠ DEMO_CUSTOMER_EMAIL and DEMO_CUSTOMER_PASSWORD environment variables not set. Skipping customer seed.');
    } else {
      const existingCustomer = await User.findOne({ email: customerEmail });
      if (!existingCustomer) {
        console.log(`Creating Demo Customer account: ${customerEmail}...`);
        await User.create({
          name: customerName,
          email: customerEmail,
          password: customerPassword,
          role: 'customer',
          phone: '+91 91234 56789',
          address: {
            street: '42 Health Street, Apt 3B',
            city: 'Bangalore',
            state: 'Karnataka',
            postalCode: '560001',
            country: 'India',
          },
        });
        console.log(`✓ Demo customer account created successfully (${customerEmail})`);
      } else {
        console.log(`ℹ Demo customer account already exists (${customerEmail}) - skipping creation.`);
      }
    }

    const totalUsers = await User.countDocuments();
    console.log(`\n========================================`);
    console.log(`User Database Seeding Complete!`);
    console.log(`Total active user accounts in database: ${totalUsers}`);
    console.log(`========================================\n`);

    await mongoose.disconnect();
    console.log('MongoDB connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('Error during user database seeding:', error);
    try {
      await mongoose.disconnect();
    } catch (_) {}
    process.exit(1);
  }
};

seedUsers();

import Medicine from '../models/Medicine.js';
import User from '../models/User.js';
import rawCatalog from '../catalog/catalog.js';

export const seedDatabase = async (req, res) => {
  try {
    // 1. Seed or Upsert Medicines
    const medicineOps = rawCatalog.map((item) => ({
      updateOne: {
        filter: { name: item.name },
        update: { $set: item },
        upsert: true,
      },
    }));

    const bulkResult = await Medicine.bulkWrite(medicineOps);
    const totalMedicines = await Medicine.countDocuments();

    // 2. Ensure Admin User exists
    const adminEmail = (process.env.ADMIN_EMAIL || 'admin@medicare.com').toLowerCase().trim();
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@MediCare2026!';
    const adminName = process.env.ADMIN_NAME || 'MediCare Administrator';

    let admin = await User.findOne({ email: adminEmail });
    if (!admin) {
      admin = await User.create({
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
    }

    // 3. Ensure Demo Customer exists
    const customerEmail = (process.env.DEMO_CUSTOMER_EMAIL || 'customer@medicare.com').toLowerCase().trim();
    const customerPassword = process.env.DEMO_CUSTOMER_PASSWORD || 'Customer@MediCare2026!';
    const customerName = process.env.DEMO_CUSTOMER_NAME || 'Demo Customer';

    let customer = await User.findOne({ email: customerEmail });
    if (!customer) {
      customer = await User.create({
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
    }

    const totalUsers = await User.countDocuments();

    const responseData = {
      success: true,
      message: 'MediCare database initialized successfully',
      medicines: {
        total: totalMedicines,
        upserted: bulkResult.upsertedCount,
        matched: bulkResult.matchedCount,
      },
      users: {
        total: totalUsers,
        adminEmail,
        demoEmail: customerEmail,
      },
    };

    if (res) {
      return res.status(200).json(responseData);
    }
    return responseData;
  } catch (error) {
    if (res) {
      return res.status(500).json({ success: false, error: error.message });
    }
    throw error;
  }
};

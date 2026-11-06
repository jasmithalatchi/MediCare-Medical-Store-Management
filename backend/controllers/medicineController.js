import Medicine from '../models/Medicine.js';
import { seedDatabase } from './seedController.js';

/**
 * @desc    Fetch all medicines with search, category filtering, sorting & pagination
 * @route   GET /api/medicines
 * @access  Public
 */
export const getMedicines = async (req, res, next) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limitParam = req.query.limit;
    const pageSize = limitParam === 'all' ? 1000 : Math.min(500, Math.max(1, Number(limitParam) || 24));

    // Search keyword query across name, genericName, brand, manufacturer, category
    const keyword = req.query.keyword
      ? {
          $or: [
            { name: { $regex: req.query.keyword, $options: 'i' } },
            { genericName: { $regex: req.query.keyword, $options: 'i' } },
            { brand: { $regex: req.query.keyword, $options: 'i' } },
            { manufacturer: { $regex: req.query.keyword, $options: 'i' } },
            { category: { $regex: req.query.keyword, $options: 'i' } },
          ],
        }
      : {};

    // Flexible category filter supporting composite and standard categories
    let category = {};
    if (req.query.category && req.query.category !== 'All') {
      const cat = req.query.category.trim();
      const lower = cat.toLowerCase();
      if (lower === 'syrups and tonics' || lower === 'syrups' || lower === 'tonics') {
        category = { category: { $in: ['Syrups', 'Tonics', 'Syrups and Tonics'] } };
      } else if (lower === 'vitamins and supplements' || lower === 'vitamins' || lower === 'supplements') {
        category = { category: { $in: ['Vitamins', 'Supplements', 'Vitamins and Supplements'] } };
      } else if (lower === 'ors and hydration' || lower === 'ors') {
        category = { category: { $in: ['ORS', 'ORS and Hydration'] } };
      } else if (lower === 'personal care') {
        category = { category: { $in: ['Personal Care', 'Creams', 'Gels'] } };
      } else if (lower === 'skin care') {
        category = { category: { $in: ['Skin Care', 'Creams', 'Gels', 'Serums'] } };
      } else if (lower === 'medical equipment' || lower === 'healthcare essentials') {
        category = { category: { $in: ['Medical Equipment', 'Healthcare Essentials', 'First Aid'] } };
      } else {
        category = { category: { $regex: new RegExp(`^${cat}$`, 'i') } };
      }
    }

    // Availability filter (optional)
    const availability = req.query.inStock === 'true'
      ? { stockQuantity: { $gt: 0 }, isAvailable: true }
      : {};

    const filter = { ...keyword, ...category, ...availability };

    // Sorting logic
    let sortOptions = { createdAt: -1 };
    const sort = req.query.sort;
    if (sort === 'price-low' || sort === 'price-asc') {
      sortOptions = { price: 1 };
    } else if (sort === 'price-high' || sort === 'price-desc') {
      sortOptions = { price: -1 };
    } else if (sort === 'name-asc') {
      sortOptions = { name: 1 };
    } else if (sort === 'name-desc') {
      sortOptions = { name: -1 };
    } else if (sort === 'discount') {
      sortOptions = { discountPercentage: -1 };
    }

    let count = await Medicine.countDocuments(filter);

    // Auto-seed demo medicines if database has 0 products
    if (count === 0 && !req.query.keyword && (!req.query.category || req.query.category === 'All')) {
      try {
        await seedDatabase();
        count = await Medicine.countDocuments(filter);
      } catch (seedErr) {
        // Continue if seed fails
      }
    }

    const medicines = await Medicine.find(filter)
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort(sortOptions);

    return res.status(200).json({
      success: true,
      data: medicines,
      page,
      pages: Math.ceil(count / pageSize) || 1,
      total: count,
      limit: pageSize,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Fetch distinct medicine categories
 * @route   GET /api/medicines/categories or GET /api/categories
 * @access  Public
 */
export const getCategories = async (req, res, next) => {
  try {
    const intendedCategories = [
      'Tablets',
      'Capsules',
      'Syrups and Tonics',
      'Injections',
      'Serums',
      'Baby Care',
      'Personal Care',
      'Skin Care',
      'Vitamins and Supplements',
      'First Aid',
      'Medical Equipment',
      'ORS and Hydration',
      'Healthcare Essentials',
    ];

    let dbCategories = [];
    try {
      dbCategories = await Medicine.distinct('category');
    } catch (e) {
      // Graceful fallback if database is not yet ready
    }

    const allCategories = Array.from(new Set([...intendedCategories, ...dbCategories.filter(Boolean)]));

    return res.status(200).json({
      success: true,
      data: allCategories,
      count: allCategories.length,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Fetch single medicine by ID
 * @route   GET /api/medicines/:id
 * @access  Public
 */
export const getMedicineById = async (req, res, next) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) {
      return res.status(404).json({ success: false, message: 'Medicine not found' });
    }
    return res.status(200).json({ success: true, data: medicine });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create new medicine
 * @route   POST /api/medicines
 * @access  Private / Admin
 */
export const createMedicine = async (req, res, next) => {
  try {
    const payload = { ...req.body };
    if (!payload.imageUrl && payload.category) {
      const slug = payload.category
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
      payload.imageUrl = `/images/categories/${slug}.svg`;
    }
    const medicine = await Medicine.create(payload);
    return res.status(201).json({ success: true, data: medicine });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update existing medicine
 * @route   PUT /api/medicines/:id
 * @access  Private / Admin
 */
export const updateMedicine = async (req, res, next) => {
  try {
    const medicine = await Medicine.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!medicine) {
      return res.status(404).json({ success: false, message: 'Medicine not found' });
    }

    return res.status(200).json({ success: true, data: medicine });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a medicine
 * @route   DELETE /api/medicines/:id
 * @access  Private / Admin
 */
export const deleteMedicine = async (req, res, next) => {
  try {
    const medicine = await Medicine.findByIdAndDelete(req.params.id);
    if (!medicine) {
      return res.status(404).json({ success: false, message: 'Medicine not found' });
    }
    return res.status(200).json({ success: true, message: 'Medicine removed successfully' });
  } catch (error) {
    next(error);
  }
};

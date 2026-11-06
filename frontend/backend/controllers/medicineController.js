import mongoose from 'mongoose';
import Medicine from '../models/Medicine.js';
import { seedDatabase } from './seedController.js';
import rawCatalog from '../catalog/catalog.js';

/**
 * 13 Certified MediCare Pharmacy Categories
 */
export const INTENDED_CATEGORIES = [
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

/**
 * Match a product's stored category against a user's selected category filter
 */
export const matchesCategory = (itemCategory, targetCategory) => {
  if (!targetCategory || targetCategory === 'All') return true;
  const p = (itemCategory || '').toLowerCase().trim();
  const t = (targetCategory || '').toLowerCase().trim();

  if (t === 'all') return true;
  if (t === 'tablets') return p === 'tablets';
  if (t === 'capsules') return p === 'capsules';
  if (t === 'injections') return p === 'injections';
  if (t === 'serums') return p === 'serums';
  if (t === 'baby care') return p === 'baby care';
  if (t === 'first aid') return p === 'first aid';
  if (t === 'medical equipment') return p === 'medical equipment';

  if (t === 'syrups and tonics' || t === 'syrups' || t === 'tonics') {
    return p === 'syrups' || p === 'tonics' || p === 'syrups and tonics';
  }
  if (t === 'vitamins and supplements' || t === 'vitamins' || t === 'supplements') {
    return p === 'vitamins' || p === 'supplements' || p === 'vitamins and supplements';
  }
  if (t === 'ors and hydration' || t === 'ors') {
    return p === 'ors' || p === 'ors and hydration';
  }
  if (t === 'personal care') {
    return p === 'personal care' || p === 'creams' || p === 'gels';
  }
  if (t === 'skin care') {
    return p === 'skin care' || p === 'creams' || p === 'gels' || p === 'serums';
  }
  if (t === 'healthcare essentials') {
    return p === 'healthcare essentials' || p === 'medical equipment' || p === 'first aid';
  }

  return p === t;
};

/**
 * Build Mongoose query for category filtering
 */
export const buildCategoryQuery = (targetCategory) => {
  if (!targetCategory || targetCategory === 'All') return {};
  const t = targetCategory.toLowerCase().trim();

  if (t === 'syrups and tonics' || t === 'syrups' || t === 'tonics') {
    return { category: { $in: ['Syrups', 'Tonics', 'Syrups and Tonics'] } };
  }
  if (t === 'vitamins and supplements' || t === 'vitamins' || t === 'supplements') {
    return { category: { $in: ['Vitamins', 'Supplements', 'Vitamins and Supplements'] } };
  }
  if (t === 'ors and hydration' || t === 'ors') {
    return { category: { $in: ['ORS', 'ORS and Hydration'] } };
  }
  if (t === 'personal care') {
    return { category: { $in: ['Personal Care', 'Creams', 'Gels'] } };
  }
  if (t === 'skin care') {
    return { category: { $in: ['Skin Care', 'Creams', 'Gels', 'Serums'] } };
  }
  if (t === 'medical equipment') {
    return { category: { $in: ['Medical Equipment'] } };
  }
  if (t === 'first aid') {
    return { category: { $in: ['First Aid'] } };
  }
  if (t === 'healthcare essentials') {
    return { category: { $in: ['Healthcare Essentials', 'Medical Equipment', 'First Aid'] } };
  }

  return { category: { $regex: new RegExp(`^${targetCategory}$`, 'i') } };
};

/**
 * @desc    Fetch all medicines with search, category filtering, sorting & pagination
 * @route   GET /api/medicines, GET /api/products
 * @access  Public
 */
export const getMedicines = async (req, res, next) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limitParam = req.query.limit;
    const pageSize = limitParam === 'all' ? 1000 : Math.min(500, Math.max(1, Number(limitParam) || 24));
    const isDbConnected = mongoose.connection.readyState === 1;

    // --- CASE 1: Database Connected (MongoDB Atlas) ---
    if (isDbConnected) {
      try {
        // Auto-seed if database is currently empty
        const totalMedicinesInDb = await Medicine.estimatedDocumentCount().catch(() => 0);
        if (totalMedicinesInDb === 0) {
          try {
            await seedDatabase();
          } catch (seedErr) {
            console.warn('[Auto-seed Notice]', seedErr.message);
          }
        }

        const categoryQuery = buildCategoryQuery(req.query.category);
        const keywordQuery = req.query.keyword
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
        const availabilityQuery = req.query.inStock === 'true'
          ? { stockQuantity: { $gt: 0 }, isAvailable: true }
          : {};

        const filter = { ...keywordQuery, ...categoryQuery, ...availabilityQuery };

        let sortOptions = { createdAt: -1 };
        const sort = req.query.sort;
        if (sort === 'price-low' || sort === 'price-asc') sortOptions = { price: 1 };
        else if (sort === 'price-high' || sort === 'price-desc') sortOptions = { price: -1 };
        else if (sort === 'name-asc') sortOptions = { name: 1 };
        else if (sort === 'name-desc') sortOptions = { name: -1 };
        else if (sort === 'discount') sortOptions = { discountPercentage: -1 };

        const count = await Medicine.countDocuments(filter);
        const medicines = await Medicine.find(filter)
          .limit(pageSize)
          .skip(pageSize * (page - 1))
          .sort(sortOptions);

        if (medicines && medicines.length > 0) {
          return res.status(200).json({
            success: true,
            data: medicines,
            page,
            pages: Math.ceil(count / pageSize) || 1,
            total: count,
            limit: pageSize,
            source: 'mongodb',
          });
        }
      } catch (dbError) {
        console.warn('[DB Query Notice] Database query fallback:', dbError.message);
      }
    }

    // --- CASE 2: High-Availability Catalogue Dataset Fallback ---
    let items = [...rawCatalog];

    if (req.query.category && req.query.category !== 'All') {
      items = items.filter((item) => matchesCategory(item.category, req.query.category));
    }

    if (req.query.keyword && req.query.keyword.trim()) {
      const kw = req.query.keyword.trim().toLowerCase();
      items = items.filter(
        (item) =>
          (item.name && item.name.toLowerCase().includes(kw)) ||
          (item.genericName && item.genericName.toLowerCase().includes(kw)) ||
          (item.brand && item.brand.toLowerCase().includes(kw)) ||
          (item.manufacturer && item.manufacturer.toLowerCase().includes(kw)) ||
          (item.category && item.category.toLowerCase().includes(kw))
      );
    }

    if (req.query.inStock === 'true') {
      items = items.filter((item) => item.stockQuantity > 0 && item.isAvailable !== false);
    }

    const sort = req.query.sort;
    if (sort === 'price-low' || sort === 'price-asc') items.sort((a, b) => a.price - b.price);
    else if (sort === 'price-high' || sort === 'price-desc') items.sort((a, b) => b.price - a.price);
    else if (sort === 'name-asc') items.sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === 'name-desc') items.sort((a, b) => b.name.localeCompare(a.name));
    else if (sort === 'discount') items.sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0));

    const total = items.length;
    const pages = Math.ceil(total / pageSize) || 1;
    const paged = items.slice((page - 1) * pageSize, page * pageSize);

    return res.status(200).json({
      success: true,
      data: paged,
      page,
      pages,
      total,
      limit: pageSize,
      source: isDbConnected ? 'mongodb' : 'catalog_dataset',
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
    let dbCategories = [];
    if (mongoose.connection.readyState === 1) {
      try {
        dbCategories = await Medicine.distinct('category');
      } catch (e) {
        // Fall back gracefully
      }
    }

    const allCategories = Array.from(new Set([...INTENDED_CATEGORIES, ...dbCategories.filter(Boolean)]));

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
    if (mongoose.connection.readyState === 1) {
      try {
        const medicine = await Medicine.findById(req.params.id);
        if (medicine) {
          return res.status(200).json({ success: true, data: medicine });
        }
      } catch (e) {
        // Fall back to catalog lookup
      }
    }

    const targetId = req.params.id;
    const item = rawCatalog.find(
      (m) =>
        String(m._id) === targetId ||
        String(m.id) === targetId ||
        (m.name && m.name.toLowerCase().replace(/[^a-z0-9]/g, '-') === targetId.toLowerCase())
    );

    if (item) {
      return res.status(200).json({ success: true, data: item });
    }

    return res.status(404).json({ success: false, message: 'Medicine not found' });
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

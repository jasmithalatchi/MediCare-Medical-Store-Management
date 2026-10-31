import Medicine from '../models/Medicine.js';

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

    // Category filter
    const category = req.query.category && req.query.category !== 'All'
      ? { category: req.query.category }
      : {};

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

    const count = await Medicine.countDocuments(filter);
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
 * @route   GET /api/medicines/categories
 * @access  Public
 */
export const getCategories = async (req, res, next) => {
  try {
    const categories = await Medicine.distinct('category');
    return res.status(200).json({
      success: true,
      data: categories.filter(Boolean).sort(),
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

import Inventory from '../models/Inventory.js';
import Medicine from '../models/Medicine.js';

/**
 * @desc    Get all inventory records
 * @route   GET /api/inventory
 * @access  Private / Admin
 */
export const getInventoryItems = async (req, res, next) => {
  try {
    const inventory = await Inventory.find({})
      .populate('medicine', 'name category price stockQuantity dosageForm')
      .sort({ updatedAt: -1 });

    return res.status(200).json({ success: true, data: inventory });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single inventory record
 * @route   GET /api/inventory/:id
 * @access  Private / Admin
 */
export const getInventoryItemById = async (req, res, next) => {
  try {
    const item = await Inventory.findById(req.params.id).populate('medicine');
    if (!item) {
      return res.status(404).json({ success: false, message: 'Inventory record not found' });
    }
    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update inventory stock level
 * @route   PUT /api/inventory/:id
 * @access  Private / Admin
 */
export const updateInventoryStock = async (req, res, next) => {
  try {
    const { currentStock, reorderLevel, costPrice, locationShelf } = req.body;

    const item = await Inventory.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Inventory record not found' });
    }

    if (currentStock !== undefined) {
      item.currentStock = currentStock;
      item.lastRestockedDate = Date.now();

      // Synchronize with Medicine stockQuantity
      await Medicine.findByIdAndUpdate(item.medicine, {
        stockQuantity: currentStock,
        isAvailable: currentStock > 0,
      });
    }

    if (reorderLevel !== undefined) item.reorderLevel = reorderLevel;
    if (costPrice !== undefined) item.costPrice = costPrice;
    if (locationShelf) item.locationShelf = locationShelf;

    const updated = await item.save();
    return res.status(200).json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get inventory items below reorder level
 * @route   GET /api/inventory/low-stock
 * @access  Private / Admin
 */
export const getLowStockAlerts = async (req, res, next) => {
  try {
    const lowStockItems = await Inventory.find({
      $expr: { $lte: ['$currentStock', '$reorderLevel'] },
    }).populate('medicine', 'name category stockQuantity');

    return res.status(200).json({
      success: true,
      count: lowStockItems.length,
      data: lowStockItems,
    });
  } catch (error) {
    next(error);
  }
};

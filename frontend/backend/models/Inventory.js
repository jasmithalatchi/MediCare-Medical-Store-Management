import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema(
  {
    medicine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Medicine',
      required: true,
      unique: true,
    },
    batchNumber: {
      type: String,
      required: true,
      trim: true,
    },
    currentStock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    reorderLevel: {
      type: Number,
      default: 20,
      min: 0,
    },
    costPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    supplierName: {
      type: String,
      default: '',
    },
    lastRestockedDate: {
      type: Date,
      default: Date.now,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    locationShelf: {
      type: String,
      default: 'A-1',
    },
  },
  {
    timestamps: true,
  }
);

// Virtual to check if item is low stock
inventorySchema.virtual('isLowStock').get(function () {
  return this.currentStock <= this.reorderLevel;
});

const Inventory = mongoose.models.Inventory || mongoose.model('Inventory', inventorySchema);
export default Inventory;

import mongoose from 'mongoose';

const medicineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Medicine name is required'],
      trim: true,
      index: true,
    },
    genericName: {
      type: String,
      trim: true,
      default: '',
    },
    brand: {
      type: String,
      trim: true,
      default: '',
      index: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      index: true,
    },
    manufacturer: {
      type: String,
      trim: true,
      default: '',
    },
    price: {
      type: Number,
      required: [true, 'Price (INR) is required'],
      min: [0, 'Price must be positive'],
    },
    originalPrice: {
      type: Number,
      min: [0, 'Original price must be positive'],
      default: function () {
        return this.price;
      },
    },
    discountPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 95,
    },
    stockQuantity: {
      type: Number,
      required: [true, 'Stock quantity is required'],
      default: 0,
      min: 0,
    },
    dosageForm: {
      type: String,
      default: 'Tablet',
    },
    strength: {
      type: String,
      default: '',
    },
    requiresPrescription: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      default: '',
    },
    sideEffects: {
      type: [String],
      default: [],
    },
    expiryDate: {
      type: Date,
      default: () => new Date(Date.now() + 730 * 24 * 60 * 60 * 1000), // Default 2 years out
    },
    imageUrl: {
      type: String,
      default: '/images/default-medicine.svg',
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for discounted / final price
medicineSchema.virtual('finalPrice').get(function () {
  if (this.price !== undefined) {
    return this.price;
  }
  if (this.originalPrice && this.discountPercentage > 0) {
    return +(this.originalPrice * (1 - this.discountPercentage / 100)).toFixed(2);
  }
  return this.originalPrice || 0;
});

const Medicine = mongoose.models.Medicine || mongoose.model('Medicine', medicineSchema);
export default Medicine;

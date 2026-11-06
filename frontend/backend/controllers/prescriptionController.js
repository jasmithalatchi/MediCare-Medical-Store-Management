import Prescription from '../models/Prescription.js';

/**
 * @desc    Upload customer prescription record
 * @route   POST /api/prescriptions
 * @access  Private
 */
export const uploadPrescription = async (req, res, next) => {
  try {
    const { patientName, doctorName, notes, filePath } = req.body;

    const prescription = await Prescription.create({
      user: req.user._id,
      patientName,
      doctorName,
      notes,
      filePath: filePath || req.file?.path || '/uploads/prescriptions/sample-rx.png',
      status: 'Pending',
    });

    return res.status(201).json({ success: true, data: prescription });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get prescriptions for logged-in user
 * @route   GET /api/prescriptions/my
 * @access  Private
 */
export const getMyPrescriptions = async (req, res, next) => {
  try {
    const prescriptions = await Prescription.find({ user: req.user._id }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: prescriptions });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all prescriptions (Admin)
 * @route   GET /api/prescriptions
 * @access  Private / Admin
 */
export const getAllPrescriptions = async (req, res, next) => {
  try {
    const prescriptions = await Prescription.find({})
      .populate('user', 'name email phone')
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, data: prescriptions });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Verify or reject prescription
 * @route   PUT /api/prescriptions/:id/status
 * @access  Private / Admin
 */
export const reviewPrescription = async (req, res, next) => {
  try {
    const { status, rejectionReason } = req.body;

    const prescription = await Prescription.findById(req.params.id);
    if (!prescription) {
      return res.status(404).json({ success: false, message: 'Prescription not found' });
    }

    prescription.status = status;
    prescription.verifiedBy = req.user._id;
    if (rejectionReason) prescription.rejectionReason = rejectionReason;

    const updated = await prescription.save();
    return res.status(200).json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

import Order from '../models/Order.js';

/**
 * @desc    Create new customer order
 * @route   POST /api/orders
 * @access  Private
 */
export const addOrderItems = async (req, res, next) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      prescription,
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ success: false, message: 'No order items provided' });
    }

    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      prescription,
    });

    const createdOrder = await order.save();
    return res.status(201).json({ success: true, data: createdOrder });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get order details by ID
 * @route   GET /api/orders/:id
 * @access  Private
 */
export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email phone')
      .populate('orderItems.medicine', 'name category price');

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Customer can only view their own order unless admin
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to view this order' });
    }

    return res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get logged in user orders
 * @route   GET /api/orders/myorders
 * @access  Private
 */
export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all orders (Admin)
 * @route   GET /api/orders
 * @access  Private / Admin
 */
export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({})
      .populate('user', 'id name email')
      .sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update order status
 * @route   PUT /api/orders/:id/status
 * @access  Private / Admin
 */
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { orderStatus, isDelivered } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (orderStatus) order.orderStatus = orderStatus;
    if (isDelivered !== undefined) {
      order.isDelivered = isDelivered;
      if (isDelivered) order.deliveredAt = Date.now();
    }

    const updatedOrder = await order.save();
    return res.status(200).json({ success: true, data: updatedOrder });
  } catch (error) {
    next(error);
  }
};

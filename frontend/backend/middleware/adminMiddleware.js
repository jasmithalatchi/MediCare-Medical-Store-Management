/**
 * Middleware to restrict access to administrator users only
 */
export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: 'Access denied: Requires administrator privileges',
  });
};

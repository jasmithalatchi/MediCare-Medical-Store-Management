import jwt from 'jsonwebtoken';

/**
 * Generate JSON Web Token (JWT) signed with user ID and role
 * @param {string} id - User ObjectId
 * @param {string} role - User role (customer / admin)
 * @returns {string} Signed JWT token
 */
const generateToken = (id, role = 'customer') => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET || 'medicare_default_jwt_secret_key',
    {
      expiresIn: process.env.JWT_EXPIRE || '30d',
    }
  );
};

export default generateToken;

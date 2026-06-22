/**
 * SOLUTION — middleware/validateSpice.js
 */

const AppError = require('../utils/AppError');

function validateSpice(req, res, next) {
  const { name, quantity } = req.body;
  if (typeof name !== 'string' || name.trim() === '') {
    return next(new AppError('name is required and must be a non-empty string', 400));
  }
  if (typeof quantity !== 'number' || quantity < 0) {
    return next(new AppError('quantity is required and must be a number >= 0', 400));
  }
  next();
}

module.exports = validateSpice;

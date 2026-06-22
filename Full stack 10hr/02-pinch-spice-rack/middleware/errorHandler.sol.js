/**
 * SOLUTION — middleware/errorHandler.js
 */

function errorHandler(err, req, res, next) {
  const status = err.statusCode || 500;
  const message = status === 500 ? 'Internal Server Error' : err.message;
  res.status(status).json({ error: message });
}

module.exports = errorHandler;

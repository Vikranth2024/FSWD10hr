/**
 * utils/AppError.js — operational error with an HTTP status code.
 * This file is COMPLETE. Do not edit it. Throw it from the service layer.
 */

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'AppError';
  }
}

module.exports = AppError;

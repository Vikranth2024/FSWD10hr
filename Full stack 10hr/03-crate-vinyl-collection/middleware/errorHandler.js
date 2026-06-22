/**
 * middleware/errorHandler.js — central error responder.
 * This file is COMPLETE. Do not edit it.
 *
 * It reads err.statusCode (default 500), hides unexpected-500 details, and always
 * answers in the { error: "<safe string>" } shape with no stack trace.
 */

function errorHandler(err, req, res, next) {
  const status = err.statusCode || 500;
  const message = status === 500 ? 'Internal Server Error' : err.message;
  res.status(status).json({ error: message });
}

module.exports = errorHandler;

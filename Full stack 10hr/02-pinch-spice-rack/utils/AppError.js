/**
 * utils/AppError.js — a custom, operational error type.
 *
 * Controllers and middleware throw `new AppError(message, statusCode)` instead of
 * a bare Error. The central error handler reads `.statusCode` to pick the HTTP
 * status and `.message` for the safe client message.
 *
 * FIX: implement the class so that
 *   const e = new AppError('Spice not found', 404);
 *   e instanceof Error  -> true
 *   e.message           -> 'Spice not found'
 *   e.statusCode        -> 404
 */

class AppError extends Error {
  // TODO: accept (message, statusCode), call super(message), and store statusCode.
}

module.exports = AppError;

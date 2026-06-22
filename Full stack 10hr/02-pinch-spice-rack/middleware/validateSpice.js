/**
 * middleware/validateSpice.js — request-validation middleware for POST /spices.
 *
 * It runs BEFORE the controller. Validate the body and either let the request
 * continue or stop it with a 400 — without ever touching the data store.
 *
 * Rules for req.body:
 *   - `name`     must be a non-empty string.
 *   - `quantity` must be a number and >= 0.
 *
 * FIX: if either rule fails, forward a 400 error to the central handler:
 *        next(new AppError('<message>', 400));
 *      if both rules pass, call next() with no arguments.
 */

const AppError = require('../utils/AppError');

function validateSpice(req, res, next) {
  // TODO: read name + quantity from req.body, apply the rules above,
  //       then call next(new AppError(..., 400)) or next().
}

module.exports = validateSpice;

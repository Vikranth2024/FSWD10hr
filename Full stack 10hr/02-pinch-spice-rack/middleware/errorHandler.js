/**
 * middleware/errorHandler.js — the ONE place that turns errors into responses.
 *
 * This must be an Express ERROR-handling middleware, which means it takes
 * FOUR arguments: (err, req, res, next). Express only treats a 4-arg function
 * as an error handler.
 *
 * FIX:
 *   - Pick the status code from err.statusCode, defaulting to 500 when absent.
 *   - For a 500 (unexpected) error, send a generic message — NEVER the real
 *     err.message (it may leak internals) and NEVER err.stack.
 *   - For any known status (e.g. 400/404/409), send { error: err.message }.
 *   - Always respond as JSON in the shape { error: "<safe string>" }.
 */

function errorHandler(err, req, res, next) {
  // TODO: implement the central error responder described above.
}

module.exports = errorHandler;

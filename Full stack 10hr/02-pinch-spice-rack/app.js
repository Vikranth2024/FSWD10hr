/**
 * app.js — assemble the Pinch application and its middleware pipeline.
 *
 * The router and the error handler are written for you to import, but NONE of
 * the pipeline is mounted yet. Mount everything in the correct ORDER.
 *
 * FIX (in this order):
 *   1. Mount the JSON body parser (express.json()).        [done for you]
 *   2. Mount the spices router at the path '/spices'.
 *   3. Mount a catch-all 404 handler for unknown routes that forwards
 *      next(new AppError('Route not found', 404)).
 *   4. Mount the central errorHandler LAST (after everything else).
 */

const express = require('express');
const spicesRouter = require('./routes/spices');
const errorHandler = require('./middleware/errorHandler');
const AppError = require('./utils/AppError');

const app = express();
app.use(express.json());

// TODO 2: app.use('/spices', spicesRouter);

// TODO 3: catch-all 404 -> next(new AppError('Route not found', 404));

// TODO 4: app.use(errorHandler);   // must be the LAST middleware mounted

const PORT = 3000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`Pinch API listening on http://localhost:${PORT}`));
}

module.exports = app;

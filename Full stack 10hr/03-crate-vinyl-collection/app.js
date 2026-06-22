/**
 * app.js — assembles Crate. This file is COMPLETE. Do not edit it.
 *
 * It mounts the JSON parser, the records router at /records, a catch-all 404,
 * and the central error handler last. Your work is in the four layer files.
 */

const express = require('express');
const recordsRouter = require('./routes/records');
const errorHandler = require('./middleware/errorHandler');
const AppError = require('./utils/AppError');

const app = express();
app.use(express.json());

app.use('/records', recordsRouter);

app.use((req, res, next) => {
  next(new AppError('Route not found', 404));
});

app.use(errorHandler);

const PORT = 3000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`Crate API listening on http://localhost:${PORT}`));
}

module.exports = app;

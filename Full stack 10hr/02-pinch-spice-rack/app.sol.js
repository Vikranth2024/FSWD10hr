/**
 * SOLUTION — app.js
 */

const express = require('express');
const spicesRouter = require('./routes/spices');
const errorHandler = require('./middleware/errorHandler');
const AppError = require('./utils/AppError');

const app = express();
app.use(express.json());

app.use('/spices', spicesRouter);

app.use((req, res, next) => {
  next(new AppError('Route not found', 404));
});

app.use(errorHandler);

const PORT = 3000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`Pinch API listening on http://localhost:${PORT}`));
}

module.exports = app;

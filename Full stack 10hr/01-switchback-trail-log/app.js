/**
 * Switchback — a trail-summit log API.
 *
 * This wiring file is COMPLETE. Do not edit it.
 * It mounts the JSON body parser and the trails router at /trails.
 * Your job lives in the three layer files (see README.md):
 *   routes/trails.js  ->  controllers/trailController.js  ->  repository/trailStore.js
 */

const express = require('express');
const trailsRouter = require('./routes/trails');

const app = express();
app.use(express.json());
app.use('/trails', trailsRouter);

const PORT = 3000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`Switchback API listening on http://localhost:${PORT}`));
}

module.exports = app;

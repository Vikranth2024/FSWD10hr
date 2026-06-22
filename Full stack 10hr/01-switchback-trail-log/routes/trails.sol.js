/**
 * SOLUTION — routes/trails.js
 * (Rename to trails.js to use.)
 */

const express = require('express');
const router = express.Router();
const controller = require('../controllers/trailController');

router.get('/', controller.listTrails);
router.post('/', controller.createTrail);
router.get('/:id', controller.getTrail);
router.patch('/:id/summit', controller.logSummit);
router.delete('/:id', controller.deleteTrail);

module.exports = router;

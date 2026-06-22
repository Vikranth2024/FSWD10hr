/**
 * routes/spices.js — the ROUTING layer.
 * This file is COMPLETE. Do not edit it.
 *
 * Note how `validateSpice` is mounted PER-ROUTE on POST only — it runs before
 * the controller, so bad input never reaches createSpice.
 */

const express = require('express');
const router = express.Router();
const controller = require('../controllers/spiceController');
const validateSpice = require('../middleware/validateSpice');

router.get('/', controller.listSpices);
router.post('/', validateSpice, controller.createSpice);
router.get('/:id', controller.getSpice);

module.exports = router;

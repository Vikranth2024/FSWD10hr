/**
 * SOLUTION — routes/records.js
 */

const express = require('express');
const router = express.Router();
const controller = require('../controllers/recordController');

router.get('/', controller.listRecords);
router.post('/', controller.createRecord);
router.get('/:id', controller.getRecord);
router.patch('/:id/loan', controller.setLoanStatus);
router.delete('/:id', controller.deleteRecord);

module.exports = router;

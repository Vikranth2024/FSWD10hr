/**
 * routes/records.js — the ROUTING layer.
 *
 * Map each method + path to its controller handler. Routing only.
 *
 * Required routes (relative to the /records mount in app.js):
 *   GET    /            -> listRecords
 *   POST   /            -> createRecord
 *   GET    /:id         -> getRecord
 *   PATCH  /:id/loan    -> setLoanStatus
 *   DELETE /:id         -> deleteRecord
 *
 * Build the router below, then export it.
 */

const express = require('express');
const router = express.Router();
// const controller = require('../controllers/recordController');

// FIX: register the five routes above, each pointing at its controller handler.

module.exports = router;

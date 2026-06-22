/**
 * routes/trails.js — the ROUTING layer.
 *
 * Build an Express Router that maps each HTTP method + path to the matching
 * controller handler. Mount nothing else here — routing only.
 *
 * Required routes (all relative to the /trails mount in app.js):
 *   GET    /            -> listTrails
 *   POST   /            -> createTrail
 *   GET    /:id         -> getTrail
 *   PATCH  /:id/summit  -> logSummit
 *   DELETE /:id         -> deleteTrail
 *
 * Implement the router below, then export it.
 */

const express = require('express');
const router = express.Router();
// const controller = require('../controllers/trailController');

// FIX: register the five routes above on `router`, each pointing at its handler.

module.exports = router;

/**
 * controllers/trailController.js — the CONTROLLER layer.
 *
 * Each handler reads the request, calls the repository layer (store), and sends
 * the right status code + response envelope. The controller must NOT touch the
 * data array directly — always go through `store`.
 *
 * Envelopes:  success -> { data: <payload> }   error -> { error: <safe string> }
 * Status map: 201 create · 200 read/update · 400 bad input · 404 missing · 204 delete
 *
 * Implement the FIX markers below.
 */

const store = require('../repository/trailStore');

// GET /trails  -> list all trails
function listTrails(req, res) {
  // FIX 1: respond 200 with all trails wrapped in { data }.
}

// GET /trails/:id  -> one trail
function getTrail(req, res) {
  // FIX 2: parseInt the id, look it up via store.findById.
  //        Missing -> 404 { error: 'Trail not found' }. Found -> 200 { data }.
}

// POST /trails  -> create a trail
function createTrail(req, res) {
  // FIX 3: read name + elevation from req.body.
  //        If name missing OR elevation missing -> 400 { error: 'name and elevation are required' }.
  //        If elevation is not a number -> 400 { error: 'elevation must be a number' }.
  //        Otherwise insert via the store and respond 201 { data }.
}

// PATCH /trails/:id/summit  -> record one more summit for this trail
function logSummit(req, res) {
  // FIX 4: find the trail (404 if missing). Increment its summits by 1 via store.update.
  //        Respond 200 { data: <updated trail> }.
}

// DELETE /trails/:id  -> remove a trail
function deleteTrail(req, res) {
  // FIX 5: remove via store.remove. Not found -> 404 { error: 'Trail not found' }.
  //        Success -> 204 with NO body.
}

module.exports = { listTrails, getTrail, createTrail, logSummit, deleteTrail };

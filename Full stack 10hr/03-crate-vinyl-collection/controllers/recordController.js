/**
 * controllers/recordController.js — the CONTROLLER layer (keep it THIN).
 *
 * Controllers only: read the request, call the SERVICE, send the status + envelope.
 * No business rules here, no array access here. Let service errors bubble up to
 * the central error handler (Express forwards a thrown error automatically).
 *
 * Envelopes: success -> { data }. Status: 201 create · 200 read/update · 204 delete.
 *
 * Implement the FIX markers below.
 */

const service = require('../services/recordService');

// GET /records
function listRecords(req, res) {
  // FIX 1: respond 200 { data: service.getAllRecords() }.
}

// GET /records/:id
function getRecord(req, res) {
  // FIX 2: parseInt the id, call service.getRecord, respond 200 { data }.
}

// POST /records
function createRecord(req, res) {
  // FIX 3: call service.createRecord(req.body), respond 201 { data }.
}

// PATCH /records/:id/loan   body: { onLoan: <boolean> }
function setLoanStatus(req, res) {
  // FIX 4: call service.setLoanStatus(id, req.body.onLoan), respond 200 { data }.
}

// DELETE /records/:id
function deleteRecord(req, res) {
  // FIX 5: call service.deleteRecord(id), respond 204 with no body.
}

module.exports = { listRecords, getRecord, createRecord, setLoanStatus, deleteRecord };

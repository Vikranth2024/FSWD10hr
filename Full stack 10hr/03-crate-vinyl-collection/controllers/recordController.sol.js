/**
 * SOLUTION — controllers/recordController.js
 */

const service = require('../services/recordService');

function listRecords(req, res) {
  res.status(200).json({ data: service.getAllRecords() });
}

function getRecord(req, res) {
  const id = parseInt(req.params.id, 10);
  res.status(200).json({ data: service.getRecord(id) });
}

function createRecord(req, res) {
  const record = service.createRecord(req.body);
  res.status(201).json({ data: record });
}

function setLoanStatus(req, res) {
  const id = parseInt(req.params.id, 10);
  const record = service.setLoanStatus(id, req.body.onLoan);
  res.status(200).json({ data: record });
}

function deleteRecord(req, res) {
  const id = parseInt(req.params.id, 10);
  service.deleteRecord(id);
  res.status(204).end();
}

module.exports = { listRecords, getRecord, createRecord, setLoanStatus, deleteRecord };

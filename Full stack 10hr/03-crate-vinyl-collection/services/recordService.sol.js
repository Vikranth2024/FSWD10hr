/**
 * SOLUTION — services/recordService.js
 */

const store = require('../repository/recordStore');
const AppError = require('../utils/AppError');

function getAllRecords() {
  return store.findAll();
}

function getRecord(id) {
  const record = store.findById(id);
  if (!record) throw new AppError('Record not found', 404);
  return record;
}

function createRecord(data) {
  const { title, catalogNo, artist } = data || {};
  if (!title || !catalogNo) {
    throw new AppError('title and catalogNo are required', 400);
  }
  return store.insert({
    title,
    catalogNo,
    artist: artist || 'Unknown',
    onLoan: false,
  });
}

function setLoanStatus(id, onLoan) {
  getRecord(id); // throws 404 if absent
  return store.update(id, { onLoan: Boolean(onLoan) });
}

function deleteRecord(id) {
  const record = getRecord(id); // throws 404 if absent
  if (record.onLoan) {
    throw new AppError('Cannot delete a record that is on loan', 409);
  }
  store.remove(id);
}

module.exports = { getAllRecords, getRecord, createRecord, setLoanStatus, deleteRecord };

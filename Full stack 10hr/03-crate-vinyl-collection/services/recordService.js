/**
 * services/recordService.js — the SERVICE (business-logic) layer.
 *
 * This is where the RULES live. The service calls the repository for data and
 * throws an AppError when a rule is broken; it never sees req/res. Controllers
 * call these functions.
 *
 * Implement the FIX markers below.
 */

const store = require('../repository/recordStore');
const AppError = require('../utils/AppError');

// Return every record.
function getAllRecords() {
  // FIX 1: return all records from the store.
}

// Return one record or throw a 404.
function getRecord(id) {
  // FIX 2: find by id; if missing -> throw new AppError('Record not found', 404). Else return it.
}

// Create a record after validating input.
function createRecord(data) {
  // FIX 3: require `title` and `catalogNo` (both non-empty). If either is missing ->
  //        throw new AppError('title and catalogNo are required', 400).
  //        Otherwise insert with defaults: artist falls back to 'Unknown', onLoan starts false.
  //        Return the created record.
}

// Toggle/set the loan status of a record.
function setLoanStatus(id, onLoan) {
  // FIX 4: ensure the record exists (404 if not), then update its onLoan to Boolean(onLoan).
  //        Return the updated record.
}

// Delete a record — but NOT while it is on loan.
function deleteRecord(id) {
  // FIX 5: ensure the record exists (404 if not). BUSINESS RULE: if record.onLoan is true ->
  //        throw new AppError('Cannot delete a record that is on loan', 409).
  //        Otherwise remove it.
}

module.exports = { getAllRecords, getRecord, createRecord, setLoanStatus, deleteRecord };

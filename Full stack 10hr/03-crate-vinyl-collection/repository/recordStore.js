/**
 * repository/recordStore.js — DATA-ACCESS layer (in-memory; NO database).
 *
 * Only this layer touches the array. Implement the helpers; the service layer
 * calls them and adds the business rules.
 *
 * A record looks like: { id, title, catalogNo, artist, onLoan }
 *
 * Implement the five FIX markers below.
 */

let records = [];
let nextId = 1;

// FIX 1: return all records.
function findAll() {
  // TODO
}

// FIX 2: return the record with this id, or undefined.
function findById(id) {
  // TODO
}

// FIX 3: insert a new record (assign a generated id), push it, and return it.
function insert(data) {
  // TODO
}

// FIX 4: apply changes to the record with this id and return it (null if absent).
function update(id, changes) {
  // TODO
}

// FIX 5: remove the record with this id. Return true if removed, false if absent.
function remove(id) {
  // TODO
}

// Resets/seeds the store between tests. DO NOT MODIFY.
function __resetStore() {
  records = [
    { id: 1, title: 'Kind of Blue', catalogNo: 'CL-1355', artist: 'Miles Davis', onLoan: false },
    { id: 2, title: 'Rumours', catalogNo: 'BSK-3010', artist: 'Fleetwood Mac', onLoan: true },
  ];
  nextId = 3;
}

module.exports = { findAll, findById, insert, update, remove, __resetStore };

/**
 * SOLUTION — repository/recordStore.js
 */

let records = [];
let nextId = 1;

function findAll() {
  return records;
}

function findById(id) {
  return records.find((r) => r.id === id);
}

function insert(data) {
  const record = { id: nextId++, ...data };
  records.push(record);
  return record;
}

function update(id, changes) {
  const record = findById(id);
  if (!record) return null;
  Object.assign(record, changes);
  return record;
}

function remove(id) {
  const index = records.findIndex((r) => r.id === id);
  if (index === -1) return false;
  records.splice(index, 1);
  return true;
}

function __resetStore() {
  records = [
    { id: 1, title: 'Kind of Blue', catalogNo: 'CL-1355', artist: 'Miles Davis', onLoan: false },
    { id: 2, title: 'Rumours', catalogNo: 'BSK-3010', artist: 'Fleetwood Mac', onLoan: true },
  ];
  nextId = 3;
}

module.exports = { findAll, findById, insert, update, remove, __resetStore };

/**
 * repository/spiceStore.js — in-memory data access (NO database).
 * This file is COMPLETE. Do not edit it.
 *
 * A spice looks like: { id, name, quantity }
 */

let spices = [];
let nextId = 1;

function findAll() {
  return spices;
}

function findById(id) {
  return spices.find((s) => s.id === id);
}

function findByName(name) {
  if (typeof name !== 'string') return undefined;
  return spices.find((s) => s.name.toLowerCase() === name.toLowerCase());
}

function insert(data) {
  const spice = { id: nextId++, ...data };
  spices.push(spice);
  return spice;
}

function __resetStore() {
  spices = [
    { id: 1, name: 'Cumin', quantity: 5 },
    { id: 2, name: 'Paprika', quantity: 3 },
  ];
  nextId = 3;
}

module.exports = { findAll, findById, findByName, insert, __resetStore };

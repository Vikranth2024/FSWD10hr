/**
 * SOLUTION — repository/trailStore.js
 * (Rename to trailStore.js to use.)
 */

let trails = [];
let nextId = 1;

function findAll() {
  return trails;
}

function findById(id) {
  return trails.find((t) => t.id === id);
}

function insert(data) {
  const trail = { id: nextId++, summits: 0, ...data };
  trails.push(trail);
  return trail;
}

function update(id, changes) {
  const trail = findById(id);
  if (!trail) return null;
  Object.assign(trail, changes);
  return trail;
}

function remove(id) {
  const index = trails.findIndex((t) => t.id === id);
  if (index === -1) return false;
  trails.splice(index, 1);
  return true;
}

function __resetStore() {
  trails = [
    { id: 1, name: 'Eagle Ridge', elevation: 2400, summits: 3 },
    { id: 2, name: 'Foggy Pass', elevation: 1750, summits: 1 },
  ];
  nextId = 3;
}

module.exports = { findAll, findById, insert, update, remove, __resetStore };

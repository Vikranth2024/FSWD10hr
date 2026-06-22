/**
 * repository/trailStore.js — the DATA-ACCESS layer (in-memory; NO database).
 *
 * The data lives in a plain array. Implement the helpers so the controller never
 * has to touch the array directly. Each function does ONE data operation.
 *
 * A trail looks like: { id, name, elevation, summits }
 *
 * Implement the five FIX markers below.
 */

let trails = [];
let nextId = 1;

// FIX 1: return every trail in the store.
function findAll() {
  // TODO
}

// FIX 2: return the single trail whose id matches, or undefined if none.
function findById(id) {
  // TODO
}

// FIX 3: create a new trail. Assign a generated id and start summits at 0,
//        then push it into the array and return the created trail.
function insert(data) {
  // TODO
}

// FIX 4: apply the given changes to the trail with this id and return the
//        updated trail. Return null if the trail does not exist.
function update(id, changes) {
  // TODO
}

// FIX 5: remove the trail with this id. Return true if removed, false if not found.
function remove(id) {
  // TODO
}

// Resets/seeds the store between tests. DO NOT MODIFY.
function __resetStore() {
  trails = [
    { id: 1, name: 'Eagle Ridge', elevation: 2400, summits: 3 },
    { id: 2, name: 'Foggy Pass', elevation: 1750, summits: 1 },
  ];
  nextId = 3;
}

module.exports = { findAll, findById, insert, update, remove, __resetStore };

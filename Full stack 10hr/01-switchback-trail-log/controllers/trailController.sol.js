/**
 * SOLUTION — controllers/trailController.js
 * (Rename to trailController.js to use.)
 */

const store = require('../repository/trailStore');

function listTrails(req, res) {
  res.status(200).json({ data: store.findAll() });
}

function getTrail(req, res) {
  const id = parseInt(req.params.id, 10);
  const trail = store.findById(id);
  if (!trail) return res.status(404).json({ error: 'Trail not found' });
  res.status(200).json({ data: trail });
}

function createTrail(req, res) {
  const { name, elevation } = req.body;
  if (!name || elevation === undefined) {
    return res.status(400).json({ error: 'name and elevation are required' });
  }
  if (typeof elevation !== 'number') {
    return res.status(400).json({ error: 'elevation must be a number' });
  }
  const trail = store.insert({ name, elevation });
  res.status(201).json({ data: trail });
}

function logSummit(req, res) {
  const id = parseInt(req.params.id, 10);
  const trail = store.findById(id);
  if (!trail) return res.status(404).json({ error: 'Trail not found' });
  const updated = store.update(id, { summits: trail.summits + 1 });
  res.status(200).json({ data: updated });
}

function deleteTrail(req, res) {
  const id = parseInt(req.params.id, 10);
  const removed = store.remove(id);
  if (!removed) return res.status(404).json({ error: 'Trail not found' });
  res.status(204).end();
}

module.exports = { listTrails, getTrail, createTrail, logSummit, deleteTrail };

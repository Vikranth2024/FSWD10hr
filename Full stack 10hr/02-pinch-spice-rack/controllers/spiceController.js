/**
 * controllers/spiceController.js — the CONTROLLER layer.
 * This file is COMPLETE. Do not edit it.
 *
 * Notice the controllers are thin and they THROW your AppError on a problem.
 * Express forwards a thrown error to your central error handler — so the
 * controllers never format an error response themselves.
 */

const store = require('../repository/spiceStore');
const AppError = require('../utils/AppError');

// GET /spices
function listSpices(req, res) {
  res.status(200).json({ data: store.findAll() });
}

// GET /spices/:id
function getSpice(req, res) {
  const id = parseInt(req.params.id, 10);
  const spice = store.findById(id);
  if (!spice) throw new AppError('Spice not found', 404);
  res.status(200).json({ data: spice });
}

// POST /spices   (runs AFTER your validateSpice middleware)
function createSpice(req, res) {
  const { name, quantity } = req.body;
  if (store.findByName(name)) throw new AppError('That spice is already in the rack', 409);
  const spice = store.insert({ name, quantity });
  res.status(201).json({ data: spice });
}

module.exports = { listSpices, getSpice, createSpice };

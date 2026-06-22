# Crate: Vinyl Record Collection API

## Problem Statement

Crate catalogs a collection of vinyl records. Collectors add records, browse them, lend them out, and remove ones they have sold, with one hard rule: a record that is currently on loan cannot be deleted.

The app uses a clean four layer design, routes to controller to service to repository, but the layer bodies are empty. Fill them in. The business rules live in the service layer, the controller stays thin, and the data is a plain in-memory array (no database) seeded with two records on every run. A record looks like `{ id, title, catalogNo, artist, onLoan }`.

## The Contract

The layering is enforced. The controller calls the service, and the service calls the repository. The controller holds no rules and the repository holds no rules.

Business rules in the service layer:
* `title` and `catalogNo` are required on create, otherwise `400`.
* A record that is `onLoan: true` cannot be deleted, returning `409`.

Status codes: `201` create, `200` read or update, `204` delete, `400` invalid, `404` missing, `409` rule violation.

Success responds with `{ data }` and errors respond with `{ error: "<safe string>" }`. The central handler is provided and never leaks a stack or internals.

## Files to Edit

You change four files only:

1. `repository/recordStore.js` is the data access layer.
2. `services/recordService.js` is the business logic layer.
3. `controllers/recordController.js` is the controller layer.
4. `routes/records.js` is the routing layer.

Do not edit `app.js`, `utils/AppError.js`, `middleware/errorHandler.js`, or anything inside `spec/`.

## Tasks

1. In `repository/recordStore.js`, implement `findAll`, `findById`, `insert`, `update`, and `remove` over the in memory array.

2. In `services/recordService.js`, implement the rules:
   * `getAllRecords()` returns all records.
   * `getRecord(id)` returns the record or throws `new AppError('Record not found', 404)`.
   * `createRecord(data)` requires `title` and `catalogNo`, otherwise throws `new AppError('title and catalogNo are required', 400)`. It defaults `artist` to `'Unknown'` and `onLoan` to `false`, then returns the created record.
   * `setLoanStatus(id, onLoan)` ensures the record exists (`404` if not), updates `onLoan` to a boolean, and returns the updated record.
   * `deleteRecord(id)` ensures the record exists (`404` if not). If `onLoan` is true it throws `new AppError('Cannot delete a record that is on loan', 409)`. Otherwise it removes the record.

3. In `controllers/recordController.js`, keep each handler thin. Read the request, call the matching service function, and send the status and envelope. Let service errors bubble up to the central handler.

4. In `routes/records.js`, register the five routes:
   * `GET /` to `listRecords`
   * `POST /` to `createRecord`
   * `GET /:id` to `getRecord`
   * `PATCH /:id/loan` to `setLoanStatus`
   * `DELETE /:id` to `deleteRecord`

## Input and Output Examples

```javascript
// POST /records  { "title": "Blue Train", "catalogNo": "BLP-1577", "artist": "John Coltrane" }
//   -> 201  { "data": { "id": 3, ..., "onLoan": false } }

// POST /records  { "title": "No Catalog" }     -> 400  { "error": "title and catalogNo are required" }
// PATCH /records/1/loan  { "onLoan": true }     -> 200  { "data": { ..., "onLoan": true } }
// DELETE /records/2   (record 2 is on loan)     -> 409  { "error": "Cannot delete a record that is on loan" }
// DELETE /records/1   (record 1 is free)        -> 204  (empty body)
```

## How to Test Your Solution

1. Open the terminal.
2. Run `npm test`.
3. All ten tests fail initially. Build the four layers until every test passes.

# Crate — Vinyl Record Collection API

## Problem Statement

**Crate** catalogs a collection of vinyl records. Collectors add records, browse
them, lend them out (`onLoan`), and remove ones they have sold — but there is one
hard rule: **a record that is currently on loan cannot be deleted**.

The app uses a clean four-layer design — **routes → controller → service →
repository** — but the layer bodies are empty. Fill them in. The business rules
live in the **service** layer; the controller stays thin; the data is a plain
**in-memory array** (no database) seeded with two records on every run.

A record looks like: `{ id, title, catalogNo, artist, onLoan }`.

---

## The Contract

* **Layering is enforced:** the controller calls the **service**, the service calls
  the **repository**. The controller holds no rules; the repository holds no rules.
* **Business rules (service layer):**
  * `title` and `catalogNo` are required on create → otherwise `400`.
  * A record that is `onLoan: true` cannot be deleted → `409`.
* **Status codes:** `201` create · `200` read/update · `204` delete · `400` invalid · `404` missing · `409` rule violation.
* **Envelopes:** success `{ data }`, error `{ error: "<safe string>" }` (no stack/internals — the central handler is provided).

---

## Files to Edit

You must change **four files**:

1. `repository/recordStore.js` — data access: `findAll`, `findById`, `insert`, `update`, `remove`.
2. `services/recordService.js` — the rules: validation, the 404s, and the on-loan delete block.
3. `controllers/recordController.js` — thin handlers that call the service and send the envelope.
4. `routes/records.js` — wire each route to its controller handler.

`app.js`, `utils/AppError.js`, `middleware/errorHandler.js` and the `spec/` folder are complete — **do not edit them**.

---

## Routes

| Method | Path                | Handler         | Behaviour |
|--------|---------------------|-----------------|-----------|
| GET    | `/records`          | `listRecords`   | `200 { data: [...] }` |
| POST   | `/records`          | `createRecord`  | validate → `201 { data }` |
| GET    | `/records/:id`      | `getRecord`     | found `200` / missing `404` |
| PATCH  | `/records/:id/loan` | `setLoanStatus` | `{ onLoan }` → `200 { data }` |
| DELETE | `/records/:id`      | `deleteRecord`  | free `204` / on loan `409` / missing `404` |

---

## Input / Output Examples

```javascript
// POST /records  { "title": "Blue Train", "catalogNo": "BLP-1577", "artist": "John Coltrane" }
//   -> 201  { "data": { "id": 3, ...,"onLoan": false } }
// POST /records  { "title": "No Catalog" }     -> 400  { "error": "title and catalogNo are required" }
// PATCH /records/1/loan  { "onLoan": true }     -> 200  { "data": { ...,"onLoan": true } }
// DELETE /records/2   (record 2 is on loan)     -> 409  { "error": "Cannot delete a record that is on loan" }
// DELETE /records/1   (record 1 is free)        -> 204  (empty body)
```

---

## Test Cases and Marks Distribution

*(10 tests × 2 marks = 20 marks)*

1. **POST create:** valid body → `201 { data }` with a generated id and `onLoan:false`.
2. **POST validation:** missing `catalogNo` → `400 { error }` (service rule).
3. **GET all:** `200` with seeded records inside `{ data }`.
4. **GET by id:** `200` with the matching record.
5. **GET missing → 404:** unknown id → `404 { error }`.
6. **PATCH loan:** sets `onLoan` → `200` with the updated record.
7. **DELETE free record:** `204` no body, and it is gone afterwards.
8. **DELETE on-loan record → 409:** blocked by the business rule, and the record stays.
9. **Layering:** the controller delegates creation to the service (`service.createRecord` is used).
10. **No leaks:** error responses expose only `{ error }` — no stack or internals.

---

## How to Test Your Solution

1. Open the terminal.
2. Run `npm test`.
3. **All tests fail initially.** Build the four layers until every test passes.

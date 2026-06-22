# Pinch — Spice Rack Inventory API

## Problem Statement

**Pinch** keeps track of the spices in a kitchen rack. The handlers work, but the
app has **no safety pipeline**: there is no validation guarding the writes, no
custom error type, no single place that turns errors into responses, and the
router/error handler are not even mounted. Right now a thrown error would either
crash or leak the server's **stack trace** straight to the client.

Build the missing pipeline: a validation middleware, a custom `AppError`, one
central error handler, and the correct **mount order** in `app.js`. The data is an
**in-memory array** (no database), seeded with two spices on every run.

A spice looks like: `{ id, name, quantity }`.

---

## The Contract

* **Validation runs before the controller.** Bad input never reaches the data store.
* **One error funnel.** Controllers and middleware `throw`/`next()` an `AppError`; exactly one handler formats the response.
* **Status codes:** `201` create · `200` read · `400` invalid body · `404` missing id/route · `409` duplicate.
* **Error shape:** always `{ error: "<safe string>" }` — never a stack trace, the store, or the real message of an unexpected 500.

---

## Files to Edit

You must change **four files**:

1. `utils/AppError.js` — a custom error carrying `message` + `statusCode`.
2. `middleware/validateSpice.js` — validates the POST body, forwards a `400` on failure.
3. `middleware/errorHandler.js` — the single 4-arg error responder.
4. `app.js` — mount the router, a catch-all `404`, and the error handler **in the right order**.

`repository/spiceStore.js`, `controllers/spiceController.js`, `routes/spices.js` and the `spec/` folder are complete — **do not edit them**.

---

## Input / Output Examples

```javascript
// POST /spices  { "name": "Basil", "quantity": 4 }   -> 201  { "data": { "id": 3, "name": "Basil", "quantity": 4 } }
// POST /spices  { "quantity": 4 }                     -> 400  { "error": "name is required ..." }
// POST /spices  { "name": "Cumin", "quantity": 1 }    -> 409  { "error": "That spice is already in the rack" }
// GET  /spices/999                                    -> 404  { "error": "Spice not found" }
// GET  /teapot                                        -> 404  { "error": "Route not found" }
```

---

## Test Cases and Marks Distribution

*(10 tests × 2 marks = 20 marks)*

1. **AppError shape:** carries `statusCode` + `message` and extends `Error`.
2. **Validation pass:** a valid body calls `next()` with no error.
3. **Validation fail:** an invalid body forwards a `400` `AppError` to `next()`.
4. **Create works:** valid POST passes the pipeline → `201 { data }`.
5. **Validation blocks:** invalid POST → `400 { error }` (stopped by middleware).
6. **Duplicate:** a spice already in the rack → `409 { error }`.
7. **Missing id → 404:** unknown id → `404 { error }` as JSON.
8. **Unknown route → 404:** the catch-all responds `404 { error }` as JSON.
9. **No leaks:** error bodies expose only `{ error }` — no stack, no internals.
10. **Central handler:** `errorHandler` is 4-arg, maps an `AppError` to its status, and hides unexpected `500` details.

---

## How to Test Your Solution

1. Open the terminal.
2. Run `npm test`.
3. **All tests fail initially.** Build the pipeline until every test passes.

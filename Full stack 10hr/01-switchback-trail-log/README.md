# Switchback — Trail Summit Log API

## Problem Statement

**Switchback** is a logbook for mountain trails. Hikers record trails, look them up,
mark a new **summit** each time they reach the top, and retire trails they no longer
walk. The previous developer crammed everything into one file; the team has now
split it into three clean layers — but left the bodies empty.

Your job is to make the API work by completing all three layers. The data lives in
a plain **in-memory array** (no database) that is seeded with two trails on every run.

A trail looks like: `{ id, name, elevation, summits }`.

---

## The Contract

* **Status codes:** `201` create · `200` read/update · `400` bad input · `404` missing · `204` delete.
* **Success →** `{ data: <payload> }`
* **Error →** `{ error: "<safe string>" }`
* The **controller must never touch the array directly** — every read/write goes through the repository (`store`).

---

## Files to Edit

You must change **three files**:

1. `repository/trailStore.js` — the data-access layer: `findAll`, `findById`, `insert`, `update`, `remove`.
2. `controllers/trailController.js` — the five handlers: status codes, envelopes, validation.
3. `routes/trails.js` — wire each route to its controller handler.

`app.js` and the `spec/` folder are complete — **do not edit them**.

---

## Routes

| Method | Path                 | Handler       | Behaviour |
|--------|----------------------|---------------|-----------|
| GET    | `/trails`            | `listTrails`  | `200 { data: [...] }` |
| POST   | `/trails`            | `createTrail` | validate → `201 { data }` |
| GET    | `/trails/:id`        | `getTrail`    | found `200` / missing `404` |
| PATCH  | `/trails/:id/summit` | `logSummit`   | `summits + 1` → `200 { data }` |
| DELETE | `/trails/:id`        | `deleteTrail` | `204` no body / missing `404` |

---

## Input / Output Examples

```javascript
// POST /trails  { "name": "Granite Spire", "elevation": 2890 }
//   -> 201  { "data": { "id": 3, "name": "Granite Spire", "elevation": 2890, "summits": 0 } }
// POST /trails  { "name": "No Elevation" }
//   -> 400  { "error": "name and elevation are required" }
// POST /trails  { "name": "Bad", "elevation": "high" }
//   -> 400  { "error": "elevation must be a number" }
// PATCH /trails/1/summit   -> 200  { "data": { ...summits incremented } }
// DELETE /trails/2         -> 204  (empty body)
```

---

## Test Cases and Marks Distribution

*(10 tests × 2 marks = 20 marks)*

1. **Layers present:** store helpers, five controller handlers, and a wired router all exist.
2. **POST create:** valid body → `201` with `{ data }` and a generated id.
3. **POST validation:** missing field → `400 { error }`.
4. **POST type check:** non-numeric `elevation` → `400`.
5. **GET all:** `200` with seeded trails inside `{ data }`.
6. **GET by id:** `200` with the matching trail.
7. **GET missing → 404:** unknown id → `404 { error }`.
8. **PATCH summit:** summit count increments → `200`.
9. **DELETE:** `204` no body, and the trail is gone afterwards.
10. **Layering:** the controller delegates writes through the repository (`store.insert` is used).

---

## How to Test Your Solution

1. Open the terminal.
2. Run `npm test`.
3. **All tests fail initially.** Use the feedback to complete the three layers.

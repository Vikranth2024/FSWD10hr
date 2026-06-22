Switchback is a logbook for mountain trails. Hikers record trails, look them up, mark a new summit each time they reach the top, and retire trails they no longer walk. The previous developer crammed everything into one file. The team has now split it into three clean layers but left the bodies empty.

Make the API work by completing all three layers. The data lives in a plain in-memory array (no database) that is seeded with two trails on every run. A trail looks like `{ id, name, elevation, summits }`.

## The Contract

Status codes: `201` create, `200` read or update, `400` bad input, `404` missing, `204` delete.

Success responds with `{ data: <payload> }` and errors respond with `{ error: "<safe string>" }`.

The controller must never touch the array directly. Every read and write goes through the repository (`store`).

## Files to Edit

You change three files only:

1. `repository/trailStore.js` is the data access layer.
2. `controllers/trailController.js` is the controller layer.
3. `routes/trails.js` is the routing layer.

Do not edit `app.js` or anything inside `spec/`.

## Tasks

1. In `repository/trailStore.js`, implement the five helpers:
   * `findAll()` returns every trail.
   * `findById(id)` returns the matching trail or `undefined`.
   * `insert(data)` assigns a generated id, starts `summits` at 0, pushes the trail, and returns it.
   * `update(id, changes)` applies the changes and returns the updated trail, or `null` if absent.
   * `remove(id)` deletes the trail and returns `true`, or `false` if absent.

2. In `controllers/trailController.js`, implement the five handlers:
   * `listTrails` responds `200` with all trails wrapped in `{ data }`.
   * `getTrail` looks up by id, responds `404 { error: 'Trail not found' }` when missing, else `200 { data }`.
   * `createTrail` reads `name` and `elevation`. Missing either responds `400 { error: 'name and elevation are required' }`. A non numeric `elevation` responds `400 { error: 'elevation must be a number' }`. Otherwise it inserts and responds `201 { data }`.
   * `logSummit` increments `summits` by 1 through `store.update`, responding `200 { data }` or `404` when missing.
   * `deleteTrail` removes the trail and responds `204` with no body, or `404` when missing.

3. In `routes/trails.js`, register the five routes, each pointing at its handler:
   * `GET /` to `listTrails`
   * `POST /` to `createTrail`
   * `GET /:id` to `getTrail`
   * `PATCH /:id/summit` to `logSummit`
   * `DELETE /:id` to `deleteTrail`

## Input and Output Examples

```javascript
// POST /trails  { "name": "Granite Spire", "elevation": 2890 }
//   -> 201  { "data": { "id": 3, "name": "Granite Spire", "elevation": 2890, "summits": 0 } }

// POST /trails  { "name": "No Elevation" }
//   -> 400  { "error": "name and elevation are required" }

// POST /trails  { "name": "Bad", "elevation": "high" }
//   -> 400  { "error": "elevation must be a number" }

// PATCH /trails/1/summit   -> 200  { "data": { ... summits incremented } }
// DELETE /trails/2         -> 204  (empty body)
```

## How to Test Your Solution

1. Open the terminal.
2. Run `npm test`.
3. All ten tests fail initially. Use the feedback to complete the three layers until every test passes.

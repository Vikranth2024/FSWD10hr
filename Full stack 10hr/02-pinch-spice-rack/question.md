Pinch keeps track of the spices in a kitchen rack. The handlers work, but the app has no safety pipeline. There is no validation guarding the writes, no custom error type, no single place that turns errors into responses, and the router and error handler are not even mounted. Right now a thrown error would either crash or leak the server stack trace straight to the client.

Build the missing pipeline: a validation middleware, a custom `AppError`, one central error handler, and the correct mount order in `app.js`. The data is an in-memory array (no database), seeded with two spices on every run. A spice looks like `{ id, name, quantity }`.

## The Contract

Validation runs before the controller, so bad input never reaches the data store.

There is one error funnel. Controllers and middleware throw or pass an `AppError`, and exactly one handler formats the response.

Status codes: `201` create, `200` read, `400` invalid body, `404` missing id or route, `409` duplicate.

The error shape is always `{ error: "<safe string>" }`, never a stack trace, the store, or the real message of an unexpected `500`.

## Files to Edit

You change four files only:

1. `utils/AppError.js` is the custom error type.
2. `middleware/validateSpice.js` is the validation middleware.
3. `middleware/errorHandler.js` is the central error responder.
4. `app.js` is the pipeline assembly.

Do not edit `repository/spiceStore.js`, `controllers/spiceController.js`, `routes/spices.js`, or anything inside `spec/`.

## Tasks

1. In `utils/AppError.js`, implement the class so that `new AppError('Spice not found', 404)` is an instance of `Error`, has `message` set to `'Spice not found'`, and has `statusCode` set to `404`.

2. In `middleware/validateSpice.js`, validate `req.body` for the POST route:
   * `name` must be a non empty string.
   * `quantity` must be a number that is `0` or greater.
   * On any failure call `next(new AppError('<message>', 400))`.
   * When both pass call `next()` with no arguments.

3. In `middleware/errorHandler.js`, build the single four argument handler `(err, req, res, next)`:
   * Pick the status from `err.statusCode`, defaulting to `500` when absent.
   * For a `500` send a generic message, never the real `err.message` and never `err.stack`.
   * For any known status send `{ error: err.message }`.
   * Always respond as JSON in the shape `{ error: "<safe string>" }`.

4. In `app.js`, mount the pipeline in this order:
   * The JSON body parser is already mounted for you.
   * Mount the spices router at `/spices`.
   * Mount a catch all `404` that calls `next(new AppError('Route not found', 404))`.
   * Mount the `errorHandler` last, after everything else.

## Input and Output Examples

```javascript
// POST /spices  { "name": "Basil", "quantity": 4 }   -> 201  { "data": { "id": 3, "name": "Basil", "quantity": 4 } }
// POST /spices  { "quantity": 4 }                     -> 400  { "error": "name is required ..." }
// POST /spices  { "name": "Cumin", "quantity": 1 }    -> 409  { "error": "That spice is already in the rack" }
// GET  /spices/999                                    -> 404  { "error": "Spice not found" }
// GET  /teapot                                        -> 404  { "error": "Route not found" }
```

## How to Test Your Solution

1. Open the terminal.
2. Run `npm test`.
3. All ten tests fail initially. Build the pipeline until every test passes.

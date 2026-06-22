const request = require('supertest');
const app = require('../app');
const store = require('../repository/spiceStore');
const AppError = require('../utils/AppError');
const validateSpice = require('../middleware/validateSpice');
const errorHandler = require('../middleware/errorHandler');

function mockRes() {
  const res = {};
  res.status = jasmine.createSpy('status').and.callFake(() => res);
  res.json = jasmine.createSpy('json').and.callFake(() => res);
  return res;
}

describe('Pinch — Spice Rack (middleware pipeline + central error handling)', () => {
  beforeEach(() => {
    if (typeof store.__resetStore === 'function') store.__resetStore();
  });

  // Test 1: AppError carries a status code and message and is a real Error.
  it('AppError sets statusCode and message and extends Error', () => {
    const e = new AppError('Spice not found', 404);
    expect(e instanceof Error).toBe(true);
    expect(e.statusCode).toBe(404);
    expect(e.message).toBe('Spice not found');
  });

  // Test 2: validateSpice lets a valid body through.
  it('validateSpice calls next() with no error for a valid body', () => {
    const next = jasmine.createSpy('next');
    validateSpice({ body: { name: 'Basil', quantity: 2 } }, mockRes(), next);
    expect(next).toHaveBeenCalled();
    expect(next.calls.mostRecent().args.length).toBe(0);
  });

  // Test 3: validateSpice rejects an invalid body with a 400 error to next().
  it('validateSpice forwards a 400 AppError to next() for an invalid body', () => {
    const next = jasmine.createSpy('next');
    validateSpice({ body: { quantity: 2 } }, mockRes(), next);
    const err = next.calls.mostRecent().args[0];
    expect(err).toBeDefined();
    expect(err.statusCode).toBe(400);
  });

  // Test 4: a valid POST passes the pipeline and creates -> 201 { data }.
  it('POST /spices with a valid body -> 201 with { data }', async () => {
    const res = await request(app).post('/spices').send({ name: 'Basil', quantity: 4 });
    expect(res.status).toBe(201);
    expect(res.body.data).toBeDefined();
    expect(res.body.data.name).toBe('Basil');
  });

  // Test 5: an invalid POST is stopped by the middleware -> 400 { error }.
  it('POST /spices with a missing field -> 400 { error } (via middleware)', async () => {
    const res = await request(app).post('/spices').send({ quantity: 4 });
    expect(res.status).toBe(400);
    expect(typeof res.body.error).toBe('string');
  });

  // Test 6: a duplicate spice is rejected by the controller -> 409 { error }.
  it('POST /spices for a spice already in the rack -> 409 { error }', async () => {
    const res = await request(app).post('/spices').send({ name: 'Cumin', quantity: 1 });
    expect(res.status).toBe(409);
    expect(typeof res.body.error).toBe('string');
  });

  // Test 7: an unknown id reaches the 404 path as JSON { error }.
  it('GET /spices/:id for an unknown id -> 404 { error }', async () => {
    const res = await request(app).get('/spices/999');
    expect(res.status).toBe(404);
    expect(typeof res.body.error).toBe('string');
  });

  // Test 8: an unknown ROUTE is caught by the catch-all 404 as JSON { error }.
  it('an unknown route -> 404 with a JSON { error } body', async () => {
    const res = await request(app).get('/teapot');
    expect(res.status).toBe(404);
    expect(typeof res.body.error).toBe('string');
  });

  // Test 9: error responses never leak a stack trace or internals.
  it('error responses expose only { error } — no stack, no internals', async () => {
    const res = await request(app).get('/spices/999');
    expect(res.body.stack).toBeUndefined();
    expect(Object.keys(res.body)).toEqual(['error']);
  });

  // Test 10: errorHandler is a 4-arg handler that maps known + unknown errors safely.
  it('errorHandler maps an AppError to its status and hides unexpected 500 details', () => {
    expect(errorHandler.length).toBe(4);

    const res1 = mockRes();
    errorHandler(new AppError('Teapot', 418), {}, res1, () => {});
    expect(res1.status).toHaveBeenCalledWith(418);
    expect(res1.json).toHaveBeenCalledWith({ error: 'Teapot' });

    const res2 = mockRes();
    errorHandler(new Error('secret db connection string'), {}, res2, () => {});
    expect(res2.status).toHaveBeenCalledWith(500);
    const body = res2.json.calls.mostRecent().args[0];
    expect(body.error).not.toContain('secret');
  });
});

const request = require('supertest');
const app = require('../app');
const store = require('../repository/recordStore');
const service = require('../services/recordService');

describe('Crate — Vinyl Collection (routes -> controller -> service -> repository)', () => {
  beforeEach(() => {
    if (typeof store.__resetStore === 'function') store.__resetStore();
  });

  // Test 1: POST creates -> 201 { data } with a generated id and defaults.
  it('POST /records creates a record -> 201 with { data } and a generated id', async () => {
    const res = await request(app)
      .post('/records')
      .send({ title: 'Blue Train', catalogNo: 'BLP-1577', artist: 'John Coltrane' });
    expect(res.status).toBe(201);
    expect(res.body.data).toBeDefined();
    expect(res.body.data.id).toBeDefined();
    expect(res.body.data.onLoan).toBe(false);
  });

  // Test 2: POST missing required field -> 400 { error } (service rule).
  it('POST /records without a catalogNo -> 400 { error }', async () => {
    const res = await request(app).post('/records').send({ title: 'No Catalog' });
    expect(res.status).toBe(400);
    expect(typeof res.body.error).toBe('string');
  });

  // Test 3: GET all -> 200 with the seeded records inside { data }.
  it('GET /records -> 200 with the seeded records inside { data }', async () => {
    const res = await request(app).get('/records');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBe(2);
  });

  // Test 4: GET by id -> 200 with the matching record.
  it('GET /records/:id -> 200 with the matching record', async () => {
    const res = await request(app).get('/records/1');
    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe(1);
  });

  // Test 5: GET unknown id -> 404 { error }.
  it('GET /records/:id for an unknown id -> 404 { error: "Record not found" }', async () => {
    const res = await request(app).get('/records/999');
    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Record not found');
  });

  // Test 6: PATCH loan toggles onLoan -> 200.
  it('PATCH /records/:id/loan sets onLoan -> 200 with the updated record', async () => {
    const res = await request(app).patch('/records/1/loan').send({ onLoan: true });
    expect(res.status).toBe(200);
    expect(res.body.data.onLoan).toBe(true);
  });

  // Test 7: DELETE a record that is NOT on loan -> 204 and it is gone.
  it('DELETE /records/:id for a free record -> 204 and it is gone', async () => {
    const res = await request(app).delete('/records/1');
    expect(res.status).toBe(204);
    expect(res.body).toEqual({});
    const after = await request(app).get('/records/1');
    expect(after.status).toBe(404);
  });

  // Test 8: DELETE a record that IS on loan -> 409 (business rule) and it stays.
  it('DELETE /records/:id while on loan -> 409 { error } and the record stays', async () => {
    const res = await request(app).delete('/records/2'); // seeded onLoan: true
    expect(res.status).toBe(409);
    expect(typeof res.body.error).toBe('string');
    const after = await request(app).get('/records/2');
    expect(after.status).toBe(200);
  });

  // Test 9: the controller delegates to the service layer (no logic in the controller).
  it('delegates creation to the service layer (service.createRecord is used)', async () => {
    const spy = spyOn(service, 'createRecord').and.callThrough();
    await request(app).post('/records').send({ title: 'Delegation', catalogNo: 'DEL-001' });
    expect(spy).toHaveBeenCalled();
  });

  // Test 10: errors stay safe — only { error }, no stack or internals leaked.
  it('error responses expose only { error } — no stack or internals', async () => {
    const res = await request(app).post('/records').send({ title: 'Missing Catalog' });
    expect(res.status).toBe(400);
    expect(res.body.stack).toBeUndefined();
    expect(Object.keys(res.body)).toEqual(['error']);
  });
});

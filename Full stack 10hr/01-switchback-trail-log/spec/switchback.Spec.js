const request = require('supertest');
const app = require('../app');
const store = require('../repository/trailStore');
const controller = require('../controllers/trailController');
const router = require('../routes/trails');

describe('Switchback — Trail Summit Log (layered CRUD across three files)', () => {
  beforeEach(() => {
    if (typeof store.__resetStore === 'function') store.__resetStore();
  });

  // Test 1: all three layers are present and the router is wired.
  it('exposes store helpers, five controller handlers, and a wired router', () => {
    ['findAll', 'findById', 'insert', 'update', 'remove'].forEach((fn) =>
      expect(typeof store[fn]).toBe('function')
    );
    ['listTrails', 'getTrail', 'createTrail', 'logSummit', 'deleteTrail'].forEach((fn) =>
      expect(typeof controller[fn]).toBe('function')
    );
    expect(typeof router).toBe('function');
    expect(Array.isArray(router.stack)).toBe(true);
    expect(router.stack.length).toBeGreaterThanOrEqual(5);
  });

  // Test 2: POST creates -> 201 with { data } and a generated id.
  it('POST /trails creates a trail -> 201 with { data } and a generated id', async () => {
    const res = await request(app).post('/trails').send({ name: 'Granite Spire', elevation: 2890 });
    expect(res.status).toBe(201);
    expect(res.body.data).toBeDefined();
    expect(res.body.data.id).toBeDefined();
    expect(res.body.data.name).toBe('Granite Spire');
  });

  // Test 3: POST with a missing field -> 400 { error }.
  it('POST /trails with a missing field -> 400 { error }', async () => {
    const res = await request(app).post('/trails').send({ name: 'No Elevation' });
    expect(res.status).toBe(400);
    expect(typeof res.body.error).toBe('string');
  });

  // Test 4: POST with a non-numeric elevation -> 400.
  it('POST /trails with a non-numeric elevation -> 400', async () => {
    const res = await request(app).post('/trails').send({ name: 'Bad Data', elevation: 'very high' });
    expect(res.status).toBe(400);
  });

  // Test 5: GET all -> 200 with the seeded trails inside { data }.
  it('GET /trails -> 200 with the seeded trails inside { data }', async () => {
    const res = await request(app).get('/trails');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBe(2);
  });

  // Test 6: GET by id -> 200 with the matching trail.
  it('GET /trails/:id -> 200 with the matching trail', async () => {
    const res = await request(app).get('/trails/1');
    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe(1);
  });

  // Test 7: GET unknown id -> 404 { error }.
  it('GET /trails/:id for an unknown id -> 404 { error }', async () => {
    const res = await request(app).get('/trails/999');
    expect(res.status).toBe(404);
    expect(typeof res.body.error).toBe('string');
  });

  // Test 8: PATCH increments the summit count -> 200.
  it('PATCH /trails/:id/summit increments the summit count -> 200', async () => {
    const before = (await request(app).get('/trails/1')).body.data.summits;
    const res = await request(app).patch('/trails/1/summit').send();
    expect(res.status).toBe(200);
    expect(res.body.data.summits).toBe(before + 1);
  });

  // Test 9: DELETE -> 204 with no body and the trail is gone.
  it('DELETE /trails/:id -> 204 with no body and the trail is gone', async () => {
    const res = await request(app).delete('/trails/1');
    expect(res.status).toBe(204);
    expect(res.body).toEqual({});
    const after = await request(app).get('/trails/1');
    expect(after.status).toBe(404);
  });

  // Test 10: the controller delegates writes to the repository layer.
  it('delegates writes to the repository layer (store.insert is used)', async () => {
    const spy = spyOn(store, 'insert').and.callThrough();
    await request(app).post('/trails').send({ name: 'Delegation Peak', elevation: 1500 });
    expect(spy).toHaveBeenCalled();
  });
});

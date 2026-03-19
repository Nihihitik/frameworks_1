const request = require('supertest');
const app = require('../src/app');
const carStore = require('../src/store/carStore');

const validCar = {
  brand: 'Toyota',
  model: 'Camry',
  year: 2020,
  price: 25000,
  color: 'Silver',
  mileage: 15000,
};

beforeEach(() => {
  carStore.clear();
});

describe('GET /api/items', () => {
  test('returns empty array when no cars exist', async () => {
    const res = await request(app).get('/api/items');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  test('returns list of cars', async () => {
    carStore.create(validCar);
    carStore.create({ ...validCar, brand: 'BMW', model: 'X5' });

    const res = await request(app).get('/api/items');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
  });

  test('includes X-Request-Id header', async () => {
    const res = await request(app).get('/api/items');
    expect(res.headers['x-request-id']).toBeDefined();
  });
});

describe('GET /api/items/:id', () => {
  test('returns car by id', async () => {
    const car = carStore.create(validCar);
    const res = await request(app).get(`/api/items/${car.id}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(car.id);
    expect(res.body.brand).toBe('Toyota');
  });

  test('returns 404 for non-existent id', async () => {
    const res = await request(app).get('/api/items/non-existent-id');
    expect(res.status).toBe(404);
    expect(res.body.error).toBe('NOT_FOUND');
    expect(res.body.message).toMatch(/not found/i);
    expect(res.body.requestId).toBeDefined();
  });
});

describe('POST /api/items', () => {
  test('creates a new car and returns 201', async () => {
    const res = await request(app)
      .post('/api/items')
      .send(validCar);

    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.brand).toBe('Toyota');
    expect(res.body.model).toBe('Camry');
  });

  test('created car appears in GET list', async () => {
    await request(app).post('/api/items').send(validCar);
    const res = await request(app).get('/api/items');
    expect(res.body).toHaveLength(1);
    expect(res.body[0].brand).toBe('Toyota');
  });

  test('created car is retrievable by id', async () => {
    const createRes = await request(app).post('/api/items').send(validCar);
    const getRes = await request(app).get(`/api/items/${createRes.body.id}`);
    expect(getRes.status).toBe(200);
    expect(getRes.body.id).toBe(createRes.body.id);
  });

  test('returns 400 for invalid data', async () => {
    const res = await request(app)
      .post('/api/items')
      .send({ brand: '', price: -1 });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('VALIDATION_ERROR');
    expect(res.body.message).toBeDefined();
    expect(res.body.requestId).toBeDefined();
  });

  test('returns 400 for empty body', async () => {
    const res = await request(app)
      .post('/api/items')
      .send({});

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('VALIDATION_ERROR');
  });
});

describe('Logging and Request ID', () => {
  test('every response includes X-Request-Id header', async () => {
    const res1 = await request(app).get('/api/items');
    const res2 = await request(app).post('/api/items').send(validCar);
    const res3 = await request(app).get('/api/items/fake-id');

    expect(res1.headers['x-request-id']).toBeDefined();
    expect(res2.headers['x-request-id']).toBeDefined();
    expect(res3.headers['x-request-id']).toBeDefined();

    // Each request gets a unique ID
    expect(res1.headers['x-request-id']).not.toBe(res2.headers['x-request-id']);
  });

  test('error response includes matching requestId in body', async () => {
    const res = await request(app).get('/api/items/fake-id');
    expect(res.body.requestId).toBe(res.headers['x-request-id']);
  });
});

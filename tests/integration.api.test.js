process.env.DB_PATH = ':memory:';

const request = require('supertest');
const { app, initDb } = require('../src/app');

describe('API integration', () => {
  beforeAll(async () => {
    await initDb();
  });

  test('GET /api/health returns ok', async () => {
    const response = await request(app).get('/api/health');
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('ok');
  });

  test('POST /api/items creates item', async () => {
    const response = await request(app)
      .post('/api/items')
      .send({ name: 'Item de prueba' });

    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe('Item de prueba');
  });

  test('GET /api/items returns list', async () => {
    const response = await request(app).get('/api/items');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

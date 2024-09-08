import request from 'supertest';
import app from '../app';
import { initDb } from '../config/database';

beforeAll(async () => {
  await initDb();
});

describe('Client Routes', () => {
    it('GET /api/v1/clients should return all clients', async () => {
        const res = await request(app).get('/api/v1/clients');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });

    it('POST /api/v1/clients should create a new client', async () => {
        const newClient = {
            GivenName: 'John',
            Surname: 'Doe',
            DateOfBirth: '1990-01-01',
            PrimaryLanguageId: 1,
            FundingSourceId: 1
        };
        const res = await request(app)
            .post('/api/v1/clients')
            .send(newClient);
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');  // Changed from 'Id' to 'id'
        expect(res.body.GivenName).toBe(newClient.GivenName);
        expect(res.body.Surname).toBe(newClient.Surname);
    });
});
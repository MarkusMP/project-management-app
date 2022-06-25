import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import {
  clientStub,
  clientStubTwo,
} from '../src/modules/clients/tests/stubs/client.stub';

describe('ClientsController (e2e)', () => {
  let app: INestApplication;
  let httpServer: any;
  let id: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('createClient', () => {
    test('then it should request createClient', async () => {
      const res = await request(httpServer).post('/clients').send({
        email: clientStub().email,
        name: clientStub().name,
        phone: clientStub().phone,
      });

      id = res.body.id;

      expect(res.status).toBe(201);
      expect(res.body.email).toBe(clientStub().email);
      expect(res.body.name).toBe(clientStub().name);
      expect(res.body.phone).toBe(clientStub().phone);
    });
  });
  describe('updateClient', () => {
    test('then it should request createClient', async () => {
      const res = await request(httpServer).patch(`/clients/${id}`).send({
        name: clientStubTwo().name,
      });

      expect(res.status).toBe(200);
      expect(res.body.email).toBe(clientStub().email);
      expect(res.body.name).toBe(clientStubTwo().name);
      expect(res.body.phone).toBe(clientStub().phone);
    });
  });
  describe('getClients', () => {
    test('then it should request getClients', async () => {
      const res = await request(httpServer).get('/clients');

      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0].email).toBe(clientStub().email);
      expect(res.body[0].name).toBe(clientStubTwo().name);
      expect(res.body[0].phone).toBe(clientStub().phone);
    });
  });
  describe('getClient', () => {
    test('then it should request getClient', async () => {
      const res = await request(httpServer).get(`/clients/${id}`);

      expect(res.status).toBe(200);

      expect(res.body.email).toBe(clientStub().email);
      expect(res.body.name).toBe(clientStubTwo().name);
      expect(res.body.phone).toBe(clientStub().phone);
    });
  });
  describe('deleteClient', () => {
    test('then it should request deleteClient', async () => {
      const res = await request(httpServer).delete(`/clients/${id}`);

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Successfully deleted client');
    });
  });
});

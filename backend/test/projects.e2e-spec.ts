import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { clientStub } from '../src/modules/clients/tests/stubs/client.stub';
import { projectStub } from '../src/modules/projects/tests/stubs/project.stub';

describe('ProjectsController (e2e)', () => {
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

  describe('createProject', () => {
    test('then it should request createProject', async () => {
      const client = await request(httpServer).post('/clients').send({
        email: clientStub().email,
        name: clientStub().name,
        phone: clientStub().phone,
      });

      expect(client.status).toBe(201);

      const res = await request(httpServer)
        .post(`/projects/${client.body.id}`)
        .send({
          name: projectStub().name,
          description: projectStub().description,
          status: projectStub().status,
        });

      id = res.body.id;

      expect(res.status).toBe(201);
      expect(res.body.status).toBe(projectStub().status);
      expect(res.body.name).toBe(projectStub().name);
      expect(res.body.description).toBe(projectStub().description);
    });
  });

  describe('updateProject', () => {
    test('then it should request updateProject', async () => {
      const res = await request(httpServer).patch(`/projects/${id}`).send({
        status: 'Completed',
      });

      expect(res.status).toBe(200);
      expect(res.body.name).toBe(projectStub().name);
      expect(res.body.description).toBe(projectStub().description);
      expect(res.body.status).toBe('Completed');
    });
  });

  describe('getProjects', () => {
    test('then it should request getProjects', async () => {
      const res = await request(httpServer).get(`/projects/`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0].status).toBe('Completed');
      expect(res.body[0].name).toBe(projectStub().name);
      expect(res.body[0].description).toBe(projectStub().description);
    });
  });

  describe('deleteProject', () => {
    test('then it should request delteProject', async () => {
      const res = await request(httpServer).delete(`/projects/${id}`);

      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        message: 'Successfully deleted project',
      });
    });
  });
});

import request from 'supertest';

import app from '../../src/app';
import factory from '../factories';

describe('Session', () => {
  beforeAll(async () => {
    await factory.create('User');
  });
  it('should return a valid token and user data', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'admin@gympoint.com',
        password: 'admin'
      });

    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('user');
  });
  it('should return a bad request when the email is not informed', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        password: 'admin'
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
  it('should return a bad request when the password is not informed', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'admin.gympoint.com'
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
  it('should return a bad request for invalid email', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'admin.gympoint.com',
        password: 'admin'
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
  it('should return unauthorized when user does not exists', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'test@gympoint.com',
        password: 'admin'
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Usuário não encontrado!');
  });
  it('should return unauthorized when password is not valid', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'admin@gympoint.com',
        password: 'test'
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Senha inválida!');
  });
});

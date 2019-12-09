import request from 'supertest';

import app from '../../src/app';
import factory from '../factories';
import truncate from '../util/truncate';

describe('Fetching students', () => {
  let token = '';
  beforeEach(async () => {
    await truncate();
    await factory.create('User');
    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'admin@gympoint.com',
        password: 'admin'
      });
    token = response.body.token;
  });
  it('should return an array when fetching students', async () => {
    const response = await request(app)
      .get('/students')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.body).toEqual([]);
  });
  it('should return an array when fetching students by name', async () => {
    await factory.createMany('Student', 10);

    const response = await request(app)
      .get('/students?q=a')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(Array.isArray(response.body)).toBeTruthy();
  });
});

describe('Finding student', () => {
  let token = '';
  beforeEach(async () => {
    await truncate();
    await factory.create('User');
    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'admin@gympoint.com',
        password: 'admin'
      });
    token = response.body.token;
  });
  it('should return a student when fetching by id', async () => {
    const student = await factory.create('Student');

    const response = await request(app)
      .get(`/students/${student.id}`)
      .send();

    expect(response.body.id).toBe(student.id);
    expect(response.body.name).toBe(student.name);
  });
  it('should return not found error when the student does not exists', async () => {
    const response = await request(app)
      .get('/students/1')
      .send();

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Aluno não encontrado!');
  });
});

describe('Registering a student', () => {
  let token = '';
  beforeEach(async () => {
    await truncate();
    await factory.create('User');
    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'admin@gympoint.com',
        password: 'admin'
      });
    token = response.body.token;
  });
  it('should return a valid student when registering', async () => {
    const student = await factory.attrs('Student');

    const response = await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${token}`)
      .send(student);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });
  it('should return error when student has no email', async () => {
    const student = await factory.attrs('Student', { email: null });

    const response = await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${token}`)
      .send(student);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
  it('should return error when student has no name', async () => {
    const student = await factory.attrs('Student', { name: null });

    const response = await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${token}`)
      .send(student);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
  it('should return error when student has no age', async () => {
    const student = await factory.attrs('Student', { age: null });

    const response = await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${token}`)
      .send(student);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
  it('should return error when student has no weight', async () => {
    const student = await factory.attrs('Student', { weight: null });

    const response = await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${token}`)
      .send(student);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
  it('should return error when student has no height', async () => {
    const student = await factory.attrs('Student', { height: null });

    const response = await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${token}`)
      .send(student);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
  it('should return error for invalid email', async () => {
    const student = await factory.attrs('Student', { email: 'invalid.email' });

    const response = await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${token}`)
      .send(student);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
  it('should return error for invalid age', async () => {
    const student = await factory.attrs('Student', { age: 'invalid.age' });

    const response = await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${token}`)
      .send(student);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
  it('should return error for invalid weight', async () => {
    const student = await factory.attrs('Student', {
      weight: 'invalid.weight'
    });

    const response = await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${token}`)
      .send(student);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
  it('should return error for invalid height', async () => {
    const student = await factory.attrs('Student', {
      height: 'invalid.height'
    });

    const response = await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${token}`)
      .send(student);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
  it('should return error for negative age', async () => {
    const student = await factory.attrs('Student', { age: -35 });

    const response = await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${token}`)
      .send(student);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
  it('should return error for negative weight', async () => {
    const student = await factory.attrs('Student', { weight: -75 });

    const response = await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${token}`)
      .send(student);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
  it('should return error for negative height', async () => {
    const student = await factory.attrs('Student', { height: -163 });

    const response = await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${token}`)
      .send(student);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
  it('should return error for floating age', async () => {
    const student = await factory.attrs('Student', { age: 35.3 });

    const response = await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${token}`)
      .send(student);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
  it('should return error for floating weight', async () => {
    const student = await factory.attrs('Student', { weight: 75.43 });

    const response = await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${token}`)
      .send(student);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
  it('should return error for floating height', async () => {
    const student = await factory.attrs('Student', { height: 1.63 });

    const response = await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${token}`)
      .send(student);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
  it('should return error for existing email', async () => {
    await factory.create('Student', { email: 'test@gympoint.com' });
    const student = await factory.attrs('Student', {
      email: 'test@gympoint.com'
    });

    const response = await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${token}`)
      .send(student);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Já existe um aluno com esse e-mail!');
  });
});

describe('Updating a student', () => {
  let token = '';
  beforeEach(async () => {
    await truncate();
    await factory.create('User');
    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'admin@gympoint.com',
        password: 'admin'
      });
    token = response.body.token;
  });
  it('should return error when student has no email', async () => {
    const student = await factory.attrs('Student', { email: null });

    const response = await request(app)
      .put(`/students/1`)
      .set('Authorization', `Bearer ${token}`)
      .send(student);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
  it('should return error when student has no name', async () => {
    const student = await factory.attrs('Student', { name: null });

    const response = await request(app)
      .put(`/students/1`)
      .set('Authorization', `Bearer ${token}`)
      .send(student);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
  it('should return error when student has no age', async () => {
    const student = await factory.attrs('Student', { age: null });

    const response = await request(app)
      .put(`/students/1`)
      .set('Authorization', `Bearer ${token}`)
      .send(student);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
  it('should return error when student has no weight', async () => {
    const student = await factory.attrs('Student', { weight: null });

    const response = await request(app)
      .put(`/students/1`)
      .set('Authorization', `Bearer ${token}`)
      .send(student);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
  it('should return error when student has no height', async () => {
    const student = await factory.attrs('Student', { height: null });

    const response = await request(app)
      .put(`/students/1`)
      .set('Authorization', `Bearer ${token}`)
      .send(student);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
  it('should return error for invalid email', async () => {
    const student = await factory.attrs('Student', { email: 'invalid.email' });

    const response = await request(app)
      .put(`/students/1`)
      .set('Authorization', `Bearer ${token}`)
      .send(student);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
  it('should return error for invalid age', async () => {
    const student = await factory.attrs('Student', { age: 'invalid.age' });

    const response = await request(app)
      .put(`/students/1`)
      .set('Authorization', `Bearer ${token}`)
      .send(student);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
  it('should return error for invalid weight', async () => {
    const student = await factory.attrs('Student', {
      weight: 'invalid.weight'
    });

    const response = await request(app)
      .put(`/students/1`)
      .set('Authorization', `Bearer ${token}`)
      .send(student);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
  it('should return error for invalid height', async () => {
    const student = await factory.attrs('Student', {
      height: 'invalid.height'
    });

    const response = await request(app)
      .put(`/students/1`)
      .set('Authorization', `Bearer ${token}`)
      .send(student);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
  it('should return error for negative age', async () => {
    const student = await factory.attrs('Student', { age: -35 });

    const response = await request(app)
      .put(`/students/1`)
      .set('Authorization', `Bearer ${token}`)
      .send(student);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
  it('should return error for negative weight', async () => {
    const student = await factory.attrs('Student', { weight: -75 });

    const response = await request(app)
      .put(`/students/1`)
      .set('Authorization', `Bearer ${token}`)
      .send(student);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
  it('should return error for negative height', async () => {
    const student = await factory.attrs('Student', { height: -163 });

    const response = await request(app)
      .put(`/students/1`)
      .set('Authorization', `Bearer ${token}`)
      .send(student);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
  it('should return error for floating age', async () => {
    const student = await factory.attrs('Student', { age: 35.3 });

    const response = await request(app)
      .put(`/students/1`)
      .set('Authorization', `Bearer ${token}`)
      .send(student);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
  it('should return error for floating weight', async () => {
    const student = await factory.attrs('Student', { weight: 75.43 });

    const response = await request(app)
      .put(`/students/1`)
      .set('Authorization', `Bearer ${token}`)
      .send(student);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
  it('should return error for floating height', async () => {
    const student = await factory.attrs('Student', { height: 1.63 });

    const response = await request(app)
      .put(`/students/1`)
      .set('Authorization', `Bearer ${token}`)
      .send(student);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
  it('should return error when student does not exists', async () => {
    const student = await factory.attrs('Student', {
      email: 'test@gympoint.com'
    });

    const response = await request(app)
      .put(`/students/1`)
      .set('Authorization', `Bearer ${token}`)
      .send(student);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Aluno não encontrado!');
  });
  it('should return error when there is another student with the same email', async () => {
    const studentToCompare = await factory.create('Student', {
      email: 'student01@gympoint.com'
    });
    const studentToUpdate = await factory.create('Student', {
      email: 'student02@gympoint.com'
    });
    const student = await factory.attrs('Student', {
      email: 'student01@gympoint.com'
    });

    const response = await request(app)
      .put(`/students/${studentToUpdate.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(student);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('E-mail indisponível');
  });
  it('should return updated student', async () => {
    const studentToUpdate = await factory.create('Student');
    const student = await factory.attrs('Student', {
      email: 'updated@gympoint.com'
    });

    const response = await request(app)
      .put(`/students/${studentToUpdate.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(student);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('email');
    expect(response.body.email).toBe(student.email);
  });
  it('should return updated student when updating only one field', async () => {
    const studentToUpdate = await factory.create('Student');
    const student = { name: 'Student Updated' };

    const response = await request(app)
      .put(`/students/${studentToUpdate.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(student);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name');
    expect(response.body.name).toBe(student.name);
  });
});

describe('Deleting a student', () => {
  let token = '';
  beforeEach(async () => {
    await truncate();
    await factory.create('User');
    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'admin@gympoint.com',
        password: 'admin'
      });
    token = response.body.token;
  });
  it('should return error when student does not exists', async () => {
    const response = await request(app)
      .delete(`/students/1`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Aluno não encontrado!');
  });
  it('should return success when student exists', async () => {
    const student = await factory.create('Student');

    const response = await request(app)
      .delete(`/students/${student.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.status).toBe(200);
  });
});

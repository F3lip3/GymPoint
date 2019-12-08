import faker from 'faker';
import bcrypt from 'bcrypt';
import { factory } from 'factory-girl';

import User from '../src/app/models/User';
import Student from '../src/app/models/Student';

factory.define('User', User, {
  name: 'Administrador',
  email: 'admin@gympoint.com',
  password_hash: bcrypt.hashSync('admin', 8)
});

factory.define('Student', Student, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  age: Math.floor(Math.random() * 100),
  weight: Math.floor(Math.random() * 450),
  height: Math.floor(Math.random() * 250)
});

export default factory;

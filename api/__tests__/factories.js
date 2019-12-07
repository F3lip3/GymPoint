import bcrypt from 'bcrypt';
import { factory } from 'factory-girl';

import User from '../src/app/models/User';

factory.define('User', User, {
  name: 'Administrador',
  email: 'admin@gympoint.com',
  password_hash: bcrypt.hashSync('admin', 8)
});

export default factory;

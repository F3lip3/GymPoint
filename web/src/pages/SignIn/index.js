import React from 'react';
import * as yup from 'yup';
import { Form, Input } from '@rocketseat/unform';

import logo from '~/assets/logo.svg';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: yup.string().required('A senha é obrigatória')
});

export default function SignIn() {
  function handleSubmit(data) {
    console.tron.log(data);
  }

  return (
    <>
      <img src={logo} alt="GymPoint" />
      <Form schema={schema} autoComplete="off" onSubmit={handleSubmit}>
        <label htmlFor="email">SEU E-MAIL</label>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="exemplo@email.com"
        />
        <label htmlFor="password">SUA SENHA</label>
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
        />
        <button type="submit">Entrar no Sistema</button>
      </Form>
    </>
  );
}

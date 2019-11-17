import React from 'react';

import logo from '~/assets/logo.svg';

export default function SignIn() {
  return (
    <>
      <img src={logo} alt="GymPoint" />
      <form autoComplete="off">
        <label htmlFor="email">
          SEU E-MAIL
          <input
            type="email"
            id="email"
            name="email"
            placeholder="exemplo@email.com"
          />
        </label>
        <label htmlFor="password">
          SUA SENHA
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
          />
        </label>
        <button type="submit">Entrar no Sistema</button>
      </form>
    </>
  );
}

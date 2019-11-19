import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { signOut } from '~/store/modules/auth/actions';
import { Container, Content, NavLink } from './styles';

import logo from '~/assets/logo-header.svg';

export default function Header() {
  const currentRoute = window.location.pathname;
  const dispatch = useDispatch();
  const { name } = useSelector(state => state.user.profile);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <div>
            <img src={logo} alt="GymPoint" />
            <span>GYMPOINT</span>
          </div>
          <NavLink to="/students" active={currentRoute === '/students' ? 1 : 0}>
            ALUNOS
          </NavLink>
          <NavLink to="/plans" active={currentRoute === '/plans' ? 1 : 0}>
            PLANOS
          </NavLink>
          <NavLink
            to="/registrations"
            active={currentRoute === '/registrations' ? 1 : 0}
          >
            MATRÍCULAS
          </NavLink>
          <NavLink
            to="/helporders"
            active={currentRoute === '/helporders' ? 1 : 0}
          >
            PEDIDOS DE AUXÍLIO
          </NavLink>
        </nav>
        <aside>
          <strong>{name}</strong>
          <button type="button" onClick={handleSignOut}>
            sair do sistema
          </button>
        </aside>
      </Content>
    </Container>
  );
}

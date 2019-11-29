import React from 'react';

import logo from '~/assets/logo-header.png';
import { Container, Title, Logo } from './styles';

export default function Header() {
  return (
    <Container>
      <Logo source={logo} />
      <Title>GYMPOINT</Title>
    </Container>
  );
}

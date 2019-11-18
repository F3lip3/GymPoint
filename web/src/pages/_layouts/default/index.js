import React from 'react';
import PropTypes from 'prop-types';

import logo from '~/assets/logo-header.svg';
import { Wrapper, Header } from './styles';

export default function DefaultLayout({ children }) {
  return (
    <Wrapper>
      <Header>
        <img src={logo} alt="GymPoint" />
        <span>GYMPOINT</span>
      </Header>
      {children}
    </Wrapper>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired
};

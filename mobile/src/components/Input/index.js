import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { Container, TInput, TIcon } from './styles';

function Input({ style, icon, ...rest }, ref) {
  return (
    <Container style={style}>
      {icon && <TIcon name={icon} size={20} color="#666" />}
      <TInput {...rest} ref={ref} />
    </Container>
  );
}

Input.propTypes = {
  icon: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

Input.defaultProps = {
  icon: null,
  style: {}
};

export default forwardRef(Input);

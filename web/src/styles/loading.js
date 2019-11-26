import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
`;

export const LoadingWrapper = styled.div`
  margin: 135px auto;
  max-width: ${props => `${props.width}px`};
  width: 100%;
  text-align: center;

  svg {
    animation: ${rotate} 2s linear infinite;
  }
`;

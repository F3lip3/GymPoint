import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  background: #fff;
  border-bottom: 1px solid #ddd;
  padding: 0 30px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`;

export const Content = styled.div`
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    div {
      margin-right: 30px;
      padding-right: 30px;
      border-right: 1px solid #ddd;
      display: flex;
      align-items: center;

      img {
        margin-right: 12px;
      }

      span {
        font-size: 15px;
        font-weight: bold;
        color: #ee4d64;
      }
    }
  }

  aside {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;

    strong {
      color: #666;
    }

    button {
      color: #de3b3b;
      border: none;
      background: #fff;
    }
  }
`;

export const NavLink = styled(Link)`
  font-size: 15px;
  font-weight: bold;
  color: ${props => (props.active ? '#444' : '#999')};
  margin-right: 20px;
`;

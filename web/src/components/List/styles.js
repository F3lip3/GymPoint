import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  margin: 35px auto;
  max-width: 900px;
  width: 100%;
`;

export const Header = styled.header`
  margin-bottom: 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    color: #444;
  }

  div.headerActions {
    display: flex;
    flex-direction: row;
    align-items: center;

    button {
      height: 36px;
      border: none;
      border-radius: 4px;
      background: #ee4d64;
      padding: 8px 16px;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        width: 20px;
        height: 20px;
        font-size: 20px;
        color: #fff;
        margin-right: 8px;
      }

      span {
        color: #fff;
        font-size: 14px;
        font-weight: bold;
        text-transform: uppercase;
      }

      &:hover {
        background: ${darken(0.08, '#ee4d64')};
      }
    }

    div.search {
      background: #fff;
      padding: 0 16px;
      border: 1px solid #ddd;
      border-radius: 4px;
      height: 36px;
      width: 235px;
      margin-left: 16px;
      display: flex;
      flex-direction: row;
      align-items: center;

      input {
        border: none;
        font-size: 14px;
        color: #666;
        margin-left: 8px;
        height: 100%;
        width: 100%;

        &::placeholder {
          color: #999;
        }
      }
    }
  }
`;

export const Container = styled.div`
  background: #fff;
  border-radius: 4px;
  padding: 30px;

  table {
    width: 100%;

    tbody {
      tr {
        & + tr {
          td {
            border-top: 1px solid #ddd;
          }
        }
      }
    }
  }

  h2 {
    color: #444;
    text-align: center;
  }
`;

export const HeaderColumn = styled.th`
  font-size: 16px;
  color: #444;
  padding-bottom: 4px;
  text-align: ${props => props.align};
  width: ${props => `${props.width}%`};
`;

export const Column = styled.td`
  font-size: 16px;
  color: #666;
  padding: 16px 0;
  text-align: ${props => props.align};
  width: ${props => `${props.width}%`};

  button {
    font-size: 15px;
    border: none;
    padding: 0 10px;
  }

  button.edit,
  button.answer {
    color: #4d85ee;
  }

  button.remove {
    color: #de3b3b;
  }
`;

import styled from 'styled-components';

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
`;

export const HeaderColumn = styled.th`
  font-size: 16px;
  color: #444;
  padding-bottom: 4px;
  text-align: ${props => props.align};
`;

export const Column = styled.td`
  font-size: 16px;
  color: #666;
  padding: 16px 0;
  text-align: ${props => props.align};
`;

import styled from 'styled-components';

export const Wrapper = styled.div`
  background-color: #ee4d64;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 360px;
  text-align: center;
  border: 0;
  border-radius: 4px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  background: #fff;
  padding: 50px 30px;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    label {
      font-family: Roboto;
      font-size: 14px;
      font-weight: bold;
      display: flex;
      flex-direction: column;
      text-align: left;
      margin-bottom: 15px;
      color: #444;
    }

    input {
      height: 45px;
      border-radius: 4px;
      border: solid 1px #ddd;
      background-color: #fff !important;
      color: #333 !important;
      margin-top: 5px;
      padding: 0 15px;

      &::placeholder {
        color: #999;
      }

      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus {
        background-color: #fff !important;
        color: #333 !important;
      }
    }

    button {
      height: 45px;
      border: 0;
      border-radius: 4px;
      background-color: #ee4d64;
      font-family: Roboto;
      font-size: 16px;
      font-weight: bold;
      color: #fff;
    }
  }
`;

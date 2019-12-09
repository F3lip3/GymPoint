import styled from 'styled-components';
import { Form } from '@rocketseat/unform';
import { darken } from 'polished';

export const PopupWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Popup = styled(Form)`
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  width: 450px;
  padding: 30px;
  position: relative;

  button.close {
    position: absolute;
    top: 5px;
    right: 5px;
    border: none;
    background: transparent;
  }

  label,
  strong {
    color: #444;
    font-size: 14px;
    font-weight: bold;
  }

  div {
    font-size: 16px;
    line-height: 1.63;
    color: #666;
    margin: 8px 0 20px;
  }

  textarea {
    width: 100%;
    height: 127px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 13px 15px;
    margin-top: 8px;
    font-size: 16px;
    resize: none;

    &::placeholder {
      color: #999;
    }
  }

  span {
    color: #ed4c63;
    line-height: 25px;
  }

  button[type='submit'] {
    height: 45px;
    width: 100%;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ee4d64;

    &:hover {
      background: ${darken(0.08, '#ee4d64')};
    }

    span {
      color: #fff;
      font-size: 16px;
      font-weight: bold;
    }
  }
`;

import styled from 'styled-components';
import { Form } from '@rocketseat/unform';
import { darken } from 'polished';

export const FormWrapper = styled(Form)`
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

  div {
    display: flex;
    flex-direction: row;
    align-items: center;

    button {
      height: 36px;
      border: none;
      border-radius: 4px;
      padding: 8px 16px;
      margin-left: 16px;
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

      &.back {
        background: #ccc;
        &:hover {
          background: ${darken(0.08, '#ccc')};
        }
      }

      &.save {
        background: #ee4d64;
        &:hover {
          background: ${darken(0.08, '#ee4d64')};
        }
      }
    }
  }
`;

export const Container = styled.div`
  background: #fff;
  border-radius: 4px;
  padding: 30px;
`;

export const FieldBox = styled.div`
  display: flex;
  flex-direction: ${props => props.direction};
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0 !important;
  }

  > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-right: 16px;
    width: 100%;

    &:last-child {
      padding-right: 0 !important;
    }
  }

  label,
  div.fakeLabel {
    color: #444;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 8px;
  }

  input {
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 13px 15px;
    font-size: 16px;
    color: #666;

    &::placeholder {
      color: #999;
    }

    &:disabled {
      background: #f5f5f5 !important;
    }
  }

  div.fakeInput {
    background: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 13px 15px;
    font-size: 16px;
    color: #666;
  }

  span {
    color: #ed4c63;
    line-height: 25px;
  }
`;

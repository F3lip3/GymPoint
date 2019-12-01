import { Platform } from 'react-native';
import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
  keyboardVerticalOffset: 85
})`
  flex: 1;
  background: #f5f5f5;
  align-items: center;
  justify-content: flex-start;
  padding: 0 20px;
`;

export const Input = styled.TextInput`
  color: #666;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  line-height: 24px;
  padding: 20px;
  margin: 20px;
  flex: 1;
  width: 100%;
`;

export const AddButton = styled(Button)`
  width: 100%;
  margin-bottom: 20px;
`;
